export default function readonly(value) {
  return (target, name, descriptor) => {
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
      throw new TypeError(`${this.constructor.name}; Attempt to assign to readonly property: "${name}"`);
    };

    return {
      get: descriptor.get,
      set: descriptor.set,
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable
    };
  };
}
