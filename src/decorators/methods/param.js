const map = new WeakMap();

function getFromMap(map, key, Container) {
  if (map.has(key)) {
    return map.get(key);
  }

  const value = new Container();

  map.set(key, value);

  return value;
}

function check(values, validators) {
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

export default function param(paramName, validator) {
  return (target, name, descriptor) => {
    const func = descriptor.value;
    const klasses = getFromMap(map, target, Map);
    const validators = getFromMap(klasses, name, Array);
    const optional = /^\[\s*\w+?\s*\]$/.test(paramName);

    if (optional) {
      paramName = paramName.replace(/^\[|\]$/g, "").trim();
    }

    validators.unshift({ paramName, validator, optional });

    if (validators.length === 1) {
      return {
        value(...args) {
          const errIndex = check(args, validators);

          if (errIndex !== -1) {
            throw new TypeError(`${this.constructor.name}#${name}(); argument(${errIndex}) should be a ${validators[errIndex].validator.name}, but got: ${args[errIndex]}`);
          }

          return this::func(...args);
        },
        enumerable: true,
        configurable: true
      };
    }
  };
}
