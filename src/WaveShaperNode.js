import utils from "./utils";
import AudioNode from "./AudioNode";
import enumerate from "./decorators/enumerate";

export default class WaveShaperNode extends AudioNode {
  constructor(admission, context) {
    super(admission, {
      name: "WaveShaperNode",
      context: context,
      numberOfInputs: 1,
      numberOfOutputs: 1,
      channelCount: 2,
      channelCountMode: "max",
      channelInterpretation: "speakers",
    });

    this._.curve = null;
    this._.oversample = "none";
    this._.JSONKeys = WaveShaperNode.$JSONKeys.slice();
  }

  get curve() {
    return this._.curve;
  }

  set curve(value) {
    this._.inspector.describe("curve", ($assert) => {
      $assert(utils.isNullOrInstanceOf(value, Float32Array), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(value, "curve", "Float32Array")}
        `);
      });
    });

    this._.curve = value;
  }

  @enumerate([ "none", "2x", "4x" ])
  oversample() {}
}

WaveShaperNode.$JSONKeys = [
  "oversample",
];
