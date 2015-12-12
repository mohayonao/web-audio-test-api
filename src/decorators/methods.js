const repository = new WeakMap();

function createValidator(methodname) {
  const config = {};

  function validate(...args) {
    const header = `${this.constructor.name}#${config.methodname}()`;
    const argErrIndex = argscheck(args, config.parameters);

    if (argErrIndex !== -1) {
      throw new TypeError(`${header}; argument(${argErrIndex}) should be a ${config.parameters[argErrIndex].validator.name}, but got: ${args[argErrIndex]}`);
    }

    if (typeof config.precondition === "function") {
      try {
        this::config.precondition(...args);
      } catch (e) {
        e.message = `${header}; ${e.message}`;
        throw e;
      }
    }

    const res = this::config.methodBody(...args);

    if (typeof config.postcondition === "function") {
      try {
        this::config.postcondition(res);
      } catch (e) {
        e.message = `${header}; ${e.message}`;
        throw e;
      }
    }

    if (config.returnValue) {
      if (!config.returnValue.test(res)) {
        throw new TypeError(`${header}; required a ${config.returnValue.name}, but got ${res}`);
      }
    }

    return res;
  }

  config.methodname = methodname;
  config.parameters = [];
  config.descriptor = {
    value: validate, enumerable: true, configurable: true
  };

  return config;
}

function argscheck(values, validators) {
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

function getMethodConfig(target, methodname) {
  let classConfig = repository.get(target);

  if (!classConfig) {
    repository.set(target, (classConfig = {}));
  }

  if (!classConfig[methodname]) {
    classConfig[methodname] = createValidator(methodname);
  }

  return classConfig[methodname];
}

export function name($methodname) {
  return (target, methodname, descriptor) => {
    const methodConfig = getMethodConfig(target, methodname);

    methodConfig.methodname = $methodname;
    methodConfig.methodBody = methodConfig.methodBody || descriptor.value;

    return methodConfig.descriptor;
  };
}

export function param(paramname, validator) {
  return (target, methodname, descriptor) => {
    const methodConfig = getMethodConfig(target, methodname);
    const optional = /^\[\s*\w+?\s*\]$/.test(paramname);

    if (optional) {
      paramname = paramname.replace(/^\[|\]$/g, "").trim();
    }

    methodConfig.parameters.unshift({ paramname, validator, optional });
    methodConfig.methodBody = methodConfig.methodBody || descriptor.value;

    return methodConfig.descriptor;
  };
}

export function returns(validator) {
  return (target, methodname, descriptor) => {
    const methodConfig = getMethodConfig(target, methodname);

    methodConfig.returnValue = validator;
    methodConfig.methodBody = methodConfig.methodBody || descriptor.value;

    return methodConfig.descriptor;
  };
}

export function contract({ precondition, postcondition }) {
  return (target, methodname, descriptor) => {
    const methodConfig = getMethodConfig(target, methodname);

    methodConfig.precondition = precondition;
    methodConfig.postcondition = postcondition;
    methodConfig.methodBody = methodConfig.methodBody || descriptor.value;

    return methodConfig.descriptor;
  };
}
