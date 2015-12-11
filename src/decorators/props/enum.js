export default function _enum(values) {
  return (target, name) => {
    return {
      get() {
        if (!this._.hasOwnProperty(name)) {
          this._[name] = values[0];
        }
        return this._[name];
      },
      set(value) {
        if (values.indexOf(value) === -1) {
          throw new TypeError(`${this.constructor.name}; "${name}" should be an enum [ ${values.join(", ")} ], but got: ${value}`);
        }
        this._[name] = value;
      },
      enumerable: true,
      configurable: true
    };
  };
}
