const utils = require("./utils");

module.exports = class PeriodicWave {
  static $new(...args) {
    return utils.auth.request((token) => {
      return new PeriodicWave(token, ...args);
    });
  }

  constructor(token, context, real, imag) {
    utils.auth.grant(token, () => {
      throw new TypeError("Illegal constructor");
    });
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
};
