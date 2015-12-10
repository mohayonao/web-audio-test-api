import utils from "./utils";
import AudioNode from "./AudioNode";
import enumerate from "./decorators/enumerate";
import typedvalue from "./decorators/typedvalue";

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

    this._.rolloffFactor = 1;
    this._.coneInnerAngle = 360;
    this._.coneOuterAngle = 360;
    this._.coneOuterGain = 0;
    this._.JSONKeys = PannerNode.$JSONKeys.slice();
  }

  @enumerate([ "HRTF", "equalpower" ])
  panningModel() {}

  @enumerate([ "inverse", "linear", "exponential" ])
  distanceModel() {}

  @typedvalue(1, utils.isNumber, "number")
  refDistance() {}

  @typedvalue(10000, utils.isNumber, "number")
  maxDistance() {}

  @typedvalue(1, utils.isNumber, "number")
  rolloffFactor() {}

  @typedvalue(360, utils.isNumber, "number")
  coneInnerAngle() {}

  @typedvalue(360, utils.isNumber, "number")
  coneOuterAngle() {}

  @typedvalue(0, utils.isNumber, "number")
  coneOuterGain() {}

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

  setOrientation(x, y, z) {
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
