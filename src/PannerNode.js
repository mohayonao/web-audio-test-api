import * as util from "./util";
import Enumerator from "./util/Enumerator";
import AudioNode from "./AudioNode";

export default class PannerNode extends AudioNode {
  constructor(admission, context) {
    super(admission, {
      name: "PannerNode",
      context: context,
      numberOfInputs: 1,
      numberOfOutputs: 1,
      channelCount: 2,
      channelCountMode: "clamped-max",
      channelInterpretation: "speakers",
    });

    this._.panningModel = "HRTF";
    this._.distanceModel = "inverse";
    this._.refDistance = 1;
    this._.maxDistance = 10000;
    this._.rolloffFactor = 1;
    this._.coneInnerAngle = 360;
    this._.coneOuterAngle = 360;
    this._.coneOuterGain = 0;
    this._.JSONKeys = PannerNode.$JSONKeys.slice();
  }

  get panningModel() {
    return this._.panningModel;
  }

  set panningModel(value) {
    this._.inspector.describe("panningModel", (assert) => {
      let enumPanningModelType = new Enumerator([
        "equalpower", "HRTF",
      ]);

      assert(enumPanningModelType.contains(value), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(value, "panningModel", enumPanningModelType.toString())}
        `);
      });
    });

    this._.panningModel = value;
  }

  get distanceModel() {
    return this._.distanceModel;
  }

  set distanceModel(value) {
    this._.inspector.describe("distanceModel", (assert) => {
      let enumDistanceModelType = new Enumerator([
        "linear", "inverse", "exponential",
      ]);

      assert(enumDistanceModelType.contains(value), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(value, "distanceModel", enumDistanceModelType.toString())}
        `);
      });
    });

    this._.distanceModel = value;
  }

  get refDistance() {
    return this._.refDistance;
  }

  set refDistance(value) {
    this._.inspector.describe("refDistance", (assert) => {
      assert(util.isNumber(value), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(value, "refDistance", "number")}
        `);
      });
    });

    this._.refDistance = value;
  }

  get maxDistance() {
    return this._.maxDistance;
  }

  set maxDistance(value) {
    this._.inspector.describe("maxDistance", (assert) => {
      assert(util.isNumber(value), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(value, "maxDistance", "number")}
        `);
      });
    });

    this._.maxDistance = value;
  }

  get rolloffFactor() {
    return this._.rolloffFactor;
  }

  set rolloffFactor(value) {
    this._.inspector.describe("rolloffFactor", (assert) => {
      assert(util.isNumber(value), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(value, "rolloffFactor", "number")}
        `);
      });
    });

    this._.rolloffFactor = value;
  }

  get coneInnerAngle() {
    return this._.coneInnerAngle;
  }

  set coneInnerAngle(value) {
    this._.inspector.describe("coneInnerAngle", (assert) => {
      assert(util.isNumber(value), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(value, "coneInnerAngle", "number")}
        `);
      });
    });

    this._.coneInnerAngle = value;
  }

  get coneOuterAngle() {
    return this._.coneOuterAngle;
  }

  set coneOuterAngle(value) {
    this._.inspector.describe("coneOuterAngle", (assert) => {
      assert(util.isNumber(value), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(value, "coneOuterAngle", "number")}
        `);
      });
    });

    this._.coneOuterAngle = value;
  }

  get coneOuterGain() {
    return this._.coneOuterGain;
  }

  set coneOuterGain(value) {
    this._.inspector.describe("coneOuterGain", (assert) => {
      assert(util.isNumber(value), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(value, "coneOuterGain", "number")}
        `);
      });
    });

    this._.coneOuterGain = value;
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

  setOrientation(x, y, z) {
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

PannerNode.$JSONKeys = [
  "panningModel",
  "distanceModel",
  "refDistance",
  "maxDistance",
  "rolloffFactor",
  "coneInnerAngle",
  "coneOuterAngle",
  "coneOuterGain",
];
