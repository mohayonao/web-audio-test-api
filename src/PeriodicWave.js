import Immigration from "./utils/Immigration";
import * as methods from "./decorators/methods";
import * as validators from "./validators";

let immigration = Immigration.getInstance();

export default class PeriodicWave {
  constructor(admission, context, real, imag) {
    immigration.check(admission, () => {
      throw new TypeError("Illegal constructor");
    });
    Object.defineProperty(this, "_", { value: {} });

    this._.context = context;
    this.__createPeriodicWave(real, imag);
  }

  @methods.param("real", validators.isInstanceOf(Float32Array))
  @methods.param("imag", validators.isInstanceOf(Float32Array))
  @methods.contract({
    precondition(real, imag) {
      if (4096 < real.length) {
        throw new TypeError(`The length of "{{real}}" array (${real.length}) exceeds allow maximum of 4096.`);
      }
      if (4096 < imag.length) {
        throw new TypeError(`The length of "{{imag}}" array (${imag.length}) exceeds allow maximum of 4096.`);
      }
      if (real.length !== imag.length) {
        throw new TypeError(`The length of "{{real}}" array (${real.length}) and length of "imag" array (${imag.length}) must match.`);
      }
    }
  })
  __createPeriodicWave(real, imag) {
    this._.real = real;
    this._.imag = imag;
  }

  get $name() {
    return "PeriodicWave";
  }

  get $context() {
    return this._.context;
  }

  get $real() {
    return this._.real;
  }

  get $imag() {
    return this._.imag;
  }
}
