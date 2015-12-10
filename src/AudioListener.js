import utils from "./utils";
import Immigration from "./utils/Immigration";
import Inspector from "./utils/Inspector";
import typedvalue from "./decorators/typedvalue";

let immigration = Immigration.getInstance();

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

    immigration.check(admission, () => {
      throw new TypeError("Illegal constructor");
    });
  }

  @typedvalue(1, utils.isNumber, "number")
  dopplerFactor() {}

  @typedvalue(343.3, utils.isNumber, "number")
  speedOfSound() {}

  get $name() {
    return "AudioListener";
  }

  get $context() {
    return this._.context;
  }

  setPosition(x, y, z) {
    this._.inspector.describe("setPosition", ($assert) => {
      $assert(utils.isNumber(x), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(x, "x", "number")}
        `);
      });

      $assert(utils.isNumber(y), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(y, "y", "number")}
        `);
      });

      $assert(utils.isNumber(z), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(z, "z", "number")}
        `);
      });
    });
  }

  setOrientation(x, y, z, xUp, yUp, zUp) {
    this._.inspector.describe("setOrientation", ($assert) => {
      $assert(utils.isNumber(x), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(x, "x", "number")}
        `);
      });

      $assert(utils.isNumber(y), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(y, "y", "number")}
        `);
      });

      $assert(utils.isNumber(z), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(z, "z", "number")}
        `);
      });

      $assert(utils.isNumber(xUp), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(xUp, "xUp", "number")}
        `);
      });

      $assert(utils.isNumber(yUp), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(yUp, "yUp", "number")}
        `);
      });

      $assert(utils.isNumber(zUp), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(zUp, "zUp", "number")}
        `);
      });
    });
  }

  setVelocity(x, y, z) {
    this._.inspector.describe("setVelocity", ($assert) => {
      $assert(utils.isNumber(x), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(x, "x", "number")}
        `);
      });

      $assert(utils.isNumber(y), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(y, "y", "number")}
        `);
      });

      $assert(utils.isNumber(z), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(z, "z", "number")}
        `);
      });
    });
  }
}
