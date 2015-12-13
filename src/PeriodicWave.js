import Immigration from "./utils/Immigration";

export default class PeriodicWave {
  static $new(...args) {
    return Immigration.getInstance().
      apply(admission => new PeriodicWave(admission, ...args));
  }

  constructor(admission, context, real, imag) {
    Immigration.getInstance().
      check(admission, () => { throw new TypeError("Illegal constructor"); });
    Object.defineProperty(this, "_", { value: {} });

    this._.context = context;
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
