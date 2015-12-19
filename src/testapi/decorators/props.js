const format = require("../../utils/format");
const toS = require("../../utils/toS");

function createSetterError(klassName, propName, message) {
  return new TypeError(format(`
    Failed to set the '${propName}' property on '${klassName}'
    ${message}
  `) + "\n");
}

function audioparam(defaultValue) {
  return (target, propName, descriptor) => {
    descriptor.get = function get() {
      if (!this._.hasOwnProperty(propName)) {
        this._[propName] = global.WebAudioTestAPI.AudioParam.$new(this, propName, defaultValue);
      }
      return this._[propName];
    };

    descriptor.set = function set(value) {
      throw createSetterError(this.constructor.name, propName, `
        \tAttempt to assign to readonly property. Do you mean this?

        \t\t\t${propName}.value = ${toS(value)};
      `);
    };

    return {
      get: descriptor.get,
      set: descriptor.set,
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable
    };
  };
}

function readonly(value) {
  return (target, propName, descriptor) => {
    const getter = descriptor.get || descriptor.value;

    if (typeof descriptor.get !== "function") {
      descriptor.get = function get() {
        if (typeof value !== "undefined") {
          return value;
        }
        if (typeof getter === "function") {
          return this::getter();
        }
      };
    }

    descriptor.set = function set() {
      throw createSetterError(this.constructor.name, propName, `
        \tAttempt to assign to readonly property.
      `);
    };

    return {
      get: descriptor.get,
      set: descriptor.set,
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable
    };
  };
}

function typed(validator, defaultValue) {
  return (target, propName, descriptor) => {
    if (typeof descriptor.get !== "function") {
      descriptor.get = function get() {
        if (!this._.hasOwnProperty(propName)) {
          this._[propName] = defaultValue;
        }
        return this._[propName];
      };
    }

    if (typeof descriptor.set !== "function") {
      descriptor.set = function set(value) {
        if (!validator.test(value)) {
          throw createSetterError(this.constructor.name, propName, `
            \tThis property should be $a ${validator.description}, but got ${toS(value)}.
          `);
        }
        this._[propName] = value;
      };
    }

    return {
      get: descriptor.get,
      set: descriptor.set,
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable
    };
  };
}

module.exports = { audioparam, readonly, typed };
