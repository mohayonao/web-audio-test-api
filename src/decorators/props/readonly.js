export default function readonly(value) {
  return (target, name, descriptor) => {
    const func = descriptor.value;

    return {
      get() {
        if (typeof value !== "undefined") {
          return value;
        }
        return this::func();
      },
      set() {
        throw new TypeError(`${this.constructor.name}; Attempt to assign to readonly property: "${name}"`);
      },
      enumerable: true,
      configurable: true,
    };
  };
}
