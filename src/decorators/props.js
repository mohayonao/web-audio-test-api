import Immigration from "../utils/Immigration";
import format from "../utils/format";
import toS from "../utils/toS";

const immigration = Immigration.getInstance();

function createSetterError(klassName, propName, message) {
  return new TypeError(format(`
    Failed to set the '${propName}' property on '${klassName}'
    ${message}
  `) + "\n");
}

export function audioparam(defaultValue) {
  return (target, propName, descriptor) => {
    descriptor.get = function get() {
      if (!this._.hasOwnProperty(propName)) {
        this._[propName] = immigration.apply(admission =>
          new global.WebAudioTestAPI.AudioParam(admission, this, propName, defaultValue)
        );
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

export function enums(values) {
  return (target, propName, descriptor) => {
    if (typeof descriptor.get !== "function") {
      descriptor.get = function get() {
        if (!this._.hasOwnProperty(propName)) {
          this._[propName] = values[0];
        }
        return this._[propName];
      };
    }

    descriptor.set = function set(value) {
      if (values.indexOf(value) === -1) {
        throw createSetterError(this.constructor.name, propName, `
          \tThis property should be one of [ ${values.map(toS).join(", ")} ], but got ${toS(value)}.
        `);
      }
      this._[propName] = value;
    };

    return {
      get: descriptor.get,
      set: descriptor.set,
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable
    };
  };
}

export function on() {
  return (target, propName, descriptor) => {
    descriptor.get = function get() {
      if (!this._.hasOwnProperty(propName)) {
        this._[propName] = null;
      }
      return this._[propName];
    };
    descriptor.set = function set(value) {
      if (value !== null && typeof value !== "function") {
        throw createSetterError(this.constructor.name, propName, `
          \tA callback should be a function or null, but got ${toS(value)}.
        `);
      }
      this._[propName] = value;
    };

    return {
      get: descriptor.get,
      set: descriptor.set,
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable
    };
  };
}

export function readonly(value) {
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

export function typed(validator, defaultValue) {
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
