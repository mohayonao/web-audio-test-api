export default function readonly() {
  return (target, name, descriptor) => {
    const func = descriptor.value;

    return {
      get() {
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
