export default function typed(validator, defaultValue) {
  return (target, name, descriptor) => {
    function get() {
      if (!this._.hasOwnProperty(name)) {
        this._[name] = defaultValue;
      }
      return this._[name];
    }

    function set(value) {
      if (!validator.test(value)) {
        throw new TypeError(`${this.constructor.name}; "${name}" should be a ${validator.name}, but got: ${value}`);
      }
      this._[name] = value;
    }

    return {
      get: descriptor.get || get,
      set: descriptor.set || set,
      enumerable: true,
      configurable: true,
    }
  };
}
