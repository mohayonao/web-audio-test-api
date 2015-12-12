export default function _enum(values) {
  return (target, name, descriptor) => {
    if (typeof descriptor.get !== "function") {
      descriptor.get = function get() {
        if (!this._.hasOwnProperty(name)) {
          this._[name] = values[0];
        }
        return this._[name];
      };
    }

    descriptor.set = function set(value) {
      if (values.indexOf(value) === -1) {
        throw new TypeError(`${this.constructor.name}; "${name}" should be an enum [ ${values.join(", ")} ], but got: ${value}`);
      }
      this._[name] = value;
    };

    return {
      get: descriptor.get,
      set: descriptor.set,
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable
    };
  };
}
