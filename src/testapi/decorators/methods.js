import format from "../../utils/format";
import toS from "../../utils/toS";

const repository = new WeakMap();

function createMethodForm(klassName, methodName, parameters, returnValue, errParamName) {
  const retType = returnValue ? returnValue.typeName : "void";
  let result = "";
  let optional = false;
  let errArgIndex = -1;

  if (klassName === methodName) {
    result += "new ";
  }

  result += methodName + "(";

  for (let i = 0; i < parameters.length; i++) {
    if (!optional && parameters[i].optional) {
      optional = true;
      result += "[ ";
    }
    if (parameters[i].paramName === errParamName) {
      errArgIndex = result.length;
    }
    result += parameters[i].paramName;
    // result += ": " + parameters[i].validator.typeName;
    if (i < parameters.length - 1) {
      result += ", ";
    }
  }

  if (optional) {
    result += " ]";
  }

  result += "): " + retType;

  return [ errArgIndex, result ];
}

function repeat(ch, n) {
  let str = "";

  while (n--) {
    str += ch;
  }

  return str;
}

function createExecuteError(klassName, methodName, parameters, returnValue, message) {
  const matches = /{{(\w+)}}/.exec(message);

  if (matches) {
    const [ errArgIndex, methodForm ] = createMethodForm(klassName, methodName, parameters, returnValue, matches[1]);

    if (errArgIndex !== -1) {
      message = [
        "\t" + methodForm,
        "\t" + repeat(" ", errArgIndex) + "|",
        "\t" + repeat(" ", errArgIndex - 1) + message
      ].join("\n");
    }
  }

  let header;

  if (klassName === methodName) {
    header = `Failed to construct '${klassName}'`;
  } else {
    header = `Failed to execute the '${methodName}' on '${klassName}'`;
  }

  return new TypeError(format(`
    ${header}

    ${message}
  `) + "\n");
}

function createValidator(methodName) {
  const config = {};

  function validate(...args) {
    const methodName = config.methodName;
    const parameters = config.parameters;
    const returnValue = config.returnValue;
    const errArgIndex = validateArguments(args, parameters);

    if (errArgIndex !== -1) {
      const errParamName = parameters[errArgIndex].paramName;
      const expectedType = parameters[errArgIndex].validator.description;
      const actualValue = toS(args[errArgIndex]);
      const errMessage = `'{{${errParamName}}}' require $a ${expectedType}, but got ${actualValue}.`;

      throw createExecuteError(this.constructor.name, methodName, parameters, returnValue, errMessage);
    }

    if (typeof config.precondition === "function") {
      try {
        this::config.precondition(...args);
      } catch (e) {
        throw createExecuteError(this.constructor.name, methodName, parameters, returnValue, e.message.trim());
      }
    }

    const res = this::config.methodBody(...args);

    if (typeof config.postcondition === "function") {
      try {
        this::config.postcondition(res);
      } catch (e) {
        throw createExecuteError(this.constructor.name, methodName, parameters, returnValue, e.message.trim());
      }
    }

    return res;
  }

  config.methodName = /(?:__)?(\w+)/.exec(methodName)[1];
  config.parameters = [];
  config.descriptor = {
    value: validate, enumerable: true, configurable: true
  };

  return config;
}

function validateArguments(values, validators) {
  for (let i = 0; i < validators.length; i++) {
    if (validators[i].optional === true && values.length <= i) {
      break;
    }
    if (!validators[i].validator.test(values[i])) {
      return i;
    }
  }
  return -1;
}

function getMethodConfig(target, methodName) {
  let classConfig = repository.get(target);

  if (!classConfig) {
    repository.set(target, (classConfig = {}));
  }

  if (!classConfig[methodName]) {
    classConfig[methodName] = createValidator(methodName);
  }

  return classConfig[methodName];
}

export function param(paramName, validator) {
  return (target, methodName, descriptor) => {
    const methodConfig = getMethodConfig(target, methodName);
    const optional = /^\[\s*\w+?\s*\]$/.test(paramName);

    if (optional) {
      paramName = paramName.replace(/^\[|\]$/g, "").trim();
    }

    methodConfig.parameters.unshift({ paramName, validator, optional });
    methodConfig.methodBody = methodConfig.methodBody || descriptor.value;

    return methodConfig.descriptor;
  };
}

export function returns(validator) {
  return (target, methodName, descriptor) => {
    const methodConfig = getMethodConfig(target, methodName);

    methodConfig.returnValue = validator;
    methodConfig.methodBody = methodConfig.methodBody || descriptor.value;

    return methodConfig.descriptor;
  };
}

export function contract({ precondition, postcondition }) {
  return (target, methodName, descriptor) => {
    const methodConfig = getMethodConfig(target, methodName);

    methodConfig.precondition = precondition;
    methodConfig.postcondition = postcondition;
    methodConfig.methodBody = methodConfig.methodBody || descriptor.value;

    return methodConfig.descriptor;
  };
}
