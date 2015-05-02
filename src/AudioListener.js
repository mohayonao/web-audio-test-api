import * as util from "./util";
import Inspector from "./util/Inspector";

export default class AudioListener {
  constructor(admission, context) {
    Object.defineProperty(this, "_", {
      value: {
        inspector: new Inspector(this),
      },
    });

    this._.context = context;
    this._.dopplerFactor = 1;
    this._.speedOfSound = 343.3;

    util.immigration.check(admission, () => {
      throw new TypeError("Illegal constructor");
    });
  }

  get dopplerFactor() {
    return this._.dopplerFactor;
  }

  set dopplerFactor(value) {
    this._.inspector.describe("dopplerFactor", (assert) => {
      assert(util.isNumber(value), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(value, "dopplerFactor", "number")}
        `);
      });
    });

    this._.dopplerFactor = value;
  }

  get speedOfSound() {
    return this._.speedOfSound;
  }

  set speedOfSound(value) {
    this._.inspector.describe("speedOfSound", (assert) => {
      assert(util.isNumber(value), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(value, "speedOfSound", "number")}
        `);
      });
    });

    this._.speedOfSound = value;
  }

  get $name() {
    return "AudioListener";
  }

  get $context() {
    return this._.context;
  }

  setPosition(x, y, z) {
    this._.inspector.describe("setPosition", (assert) => {
      assert(util.isNumber(x), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(x, "x", "number")}
        `);
      });

      assert(util.isNumber(y), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(y, "y", "number")}
        `);
      });

      assert(util.isNumber(z), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(z, "z", "number")}
        `);
      });
    });
  }

  setOrientation(x, y, z, xUp, yUp, zUp) {
    this._.inspector.describe("setOrientation", (assert) => {
      assert(util.isNumber(x), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(x, "x", "number")}
        `);
      });

      assert(util.isNumber(y), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(y, "y", "number")}
        `);
      });

      assert(util.isNumber(z), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(z, "z", "number")}
        `);
      });

      assert(util.isNumber(xUp), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(xUp, "xUp", "number")}
        `);
      });

      assert(util.isNumber(yUp), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(yUp, "yUp", "number")}
        `);
      });

      assert(util.isNumber(zUp), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(zUp, "zUp", "number")}
        `);
      });
    });
  }

  setVelocity(x, y, z) {
    this._.inspector.describe("setVelocity", (assert) => {
      assert(util.isNumber(x), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(x, "x", "number")}
        `);
      });

      assert(util.isNumber(y), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(y, "y", "number")}
        `);
      });

      assert(util.isNumber(z), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(z, "z", "number")}
        `);
      });
    });
  }
}
