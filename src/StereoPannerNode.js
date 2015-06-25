import * as util from "./util";
import AudioNode from "./AudioNode";
import AudioParam from "./AudioParam";

export default class StereoPannerNode extends AudioNode {
  constructor(admission, context) {
    super(admission, {
      name: "StereoPannerNode",
      context: context,
      numberOfInputs: 1,
      numberOfOutputs: 1,
      channelCount: 2,
      channelCountMode: "clamped-max",
      channelInterpretation: "speakers",
    });

    this._.pan = util.immigration.apply(admission =>
      new AudioParam(admission, this, "pan", 0, -1, 1)
    );
    this._.JSONKeys = StereoPannerNode.$JSONKeys.slice();
  }

  get pan() {
    return this._.pan;
  }

  set pan(value) {
    this._.inspector.describe("pan", (assert) => {
      assert.throwReadOnlyTypeError(value);
    });
  }
}

StereoPannerNode.$JSONKeys = [
  "pan",
];
