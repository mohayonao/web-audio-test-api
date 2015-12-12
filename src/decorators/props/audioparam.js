import Immigration from "../../utils/Immigration";
import AudioParam from "../../AudioParam";

const immigration = Immigration.getInstance();

export default function audioparam(defaultValue) {
  return (target, name, descriptor) => {
    descriptor.get = function get() {
      if (!this._.hasOwnProperty(name)) {
        this._[name] = immigration.apply(admission =>
          new AudioParam(admission, this, name, defaultValue)
        );
      }
      return this._[name];
    };

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
