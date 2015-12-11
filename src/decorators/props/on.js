export default function oncallback() {
  return (target, name, descriptor) => {
    descriptor.get = function get() {
      if (!this._.hasOwnProperty(name)) {
        this._[name] = null;
      }
      return this._[name];
    };
    descriptor.set = function set(value) {
      if (value !== null && typeof value !== "function") {
        throw new TypeError(`${this.constructor.name}; "${name}" should be a function, but got: ${value}`);
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
