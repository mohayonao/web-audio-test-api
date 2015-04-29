import * as util from "./util";
import Enumerator from "./util/Enumerator";
import AudioNode from "./AudioNode";

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
    this._.inspector.describe("curve", (assert) => {
      assert(util.isNullOrInstanceOf(value, Float32Array), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(value, "curve", "Float32Array")}
        `);
      });
    });

    this._.curve = value;
  }

  get oversample() {
    return this._.oversample;
  }

  set oversample(value) {
    this._.inspector.describe("oversample", (assert) => {
      let enumOverSampleType = new Enumerator([
        "none", "2x", "4x",
      ]);

      assert(enumOverSampleType.contains(value), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(value, "oversample", enumOverSampleType.toString())}
        `);
      });
    });

    this._.oversample = value;
  }
}

WaveShaperNode.$JSONKeys = [
  "oversample",
];
