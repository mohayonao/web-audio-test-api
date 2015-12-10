import Immigration from "./utils/Immigration";
import AudioNode from "./AudioNode";
import audioparam from "./decorators/audioparam";

let immigration = Immigration.getInstance();

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

    this._.JSONKeys = StereoPannerNode.$JSONKeys.slice();
  }

  @audioparam({ defaultValue: 0 })
  pan() {}
}

StereoPannerNode.$JSONKeys = [
  "pan",
];
