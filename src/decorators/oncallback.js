export default function oncallback() {
  return (target, name) => {
    return {
      get() {
        if (!this._.hasOwnProperty(name)) {
          this._[name] = null;
        }
        return this._[name];
      },
      set(value) {
        if (value !== null && typeof value !== "function") {
          throw new TypeError(`${this.constructor.name}; "${name}" should be a function, but got: ${value}`);
        }
        this._[name] = value;
      },
      enumerable: true,
      configurable: true,
    };
  };
}
