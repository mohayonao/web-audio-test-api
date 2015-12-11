export default function typed(validator, defaultValue) {
  return (target, name, descriptor) => {
    if (typeof descriptor.get !== "function") {
      descriptor.get = function get() {
        if (!this._.hasOwnProperty(name)) {
          this._[name] = defaultValue;
        }
        return this._[name];
      };
    }

    if (typeof descriptor.set !== "function") {
      descriptor.set = function set(value) {
        if (!validator.test(value)) {
          throw new TypeError(`${this.constructor.name}; "${name}" should be a ${validator.name}, but got: ${value}`);
        }
        this._[name] = value;
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
