import utils from "./utils";
import AudioNode from "./AudioNode";

export default class ConvolverNode extends AudioNode {
  constructor(admission, context) {
    super(admission, {
      name: "ConvolverNode",
      context: context,
      numberOfInputs: 1,
      numberOfOutputs: 1,
      channelCount: 2,
      channelCountMode: "clamped-max",
      channelInterpretation: "speakers",
    });

    this._.buffer = null;
    this._.normalize = true;
    this._.JSONKeys = ConvolverNode.$JSONKeys.slice();
  }

  get buffer() {
    return this._.buffer;
  }

  set buffer(value) {
    this._.inspector.describe("buffer", (assert) => {
      assert(utils.isNullOrInstanceOf(value, global.AudioBuffer), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(value, "buffer", "AudioBuffer")}
        `);
      });
    });

    this._.buffer = value;
  }

  get normalize() {
    return this._.normalize;
  }

  set normalize(value) {
    this._.inspector.describe("normalize", (assert) => {
      assert(utils.isBoolean(value), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(value, "normalize", "boolean")}
        `);
      });
    });

    this._.normalize = value;
  }
}

ConvolverNode.$JSONKeys = [
  "normalize",
];
