import utils from "./utils";
import Immigration from "./utils/Immigration";
import Inspector from "./utils/Inspector";

let immigration = Immigration.getInstance();

export default class PeriodicWave {
  constructor(admission, context, real, imag) {
    immigration.check(admission, () => {
      throw new TypeError("Illegal constructor");
    });

    Object.defineProperty(this, "_", {
      value: {
        inspector: new Inspector(this),
      },
    });

    this._.inspector.describe("constructor", ($assert) => {
      $assert(utils.isInstanceOf(real, Float32Array), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(real, "real", "Float32Array")}
        `);
      });

      $assert(real.length <= 4096, (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          length of "real" array (${real.length}) exceeds allow maximum of 4096
        `);
      });

      $assert(utils.isInstanceOf(imag, Float32Array), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(imag, "imag", "Float32Array")}
        `);
      });

      $assert(imag.length <= 4096, (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          length of "imag" array (${imag.length}) exceeds allow maximum of 4096
        `);
      });

      $assert(real.length === imag.length, (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          length of real array (${real.length}) and length of imaginary array (${imag.length}) must match
        `);
      });
    });

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
