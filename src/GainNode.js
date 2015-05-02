import * as util from "./util";
import AudioNode from "./AudioNode";
import AudioParam from "./AudioParam";

export default class GainNode extends AudioNode {
  constructor(admission, context) {
    super(admission, {
      name: "GainNode",
      context: context,
      numberOfInputs: 1,
      numberOfOutputs: 1,
      channelCount: 2,
      channelCountMode: "max",
      channelInterpretation: "speakers",
    });

    this._.gain = util.immigration.apply(admission =>
      new AudioParam(admission, this, "gain", 1.0, 0.0, 1.0)
    );
    this._.JSONKeys = GainNode.$JSONKeys.slice();
  }

  get gain() {
    return this._.gain;
  }

  set gain(value) {
    this._.inspector.describe("gain", (assert) => {
      assert.throwReadOnlyTypeError(value);
    });
  }
}

GainNode.$JSONKeys = [
  "gain",
];
