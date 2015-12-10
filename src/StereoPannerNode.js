import AudioNode from "./AudioNode";
import * as props from "./decorators/props";

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

  @props.audioparam(0)
  pan() {}
}

StereoPannerNode.$JSONKeys = [
  "pan",
];
