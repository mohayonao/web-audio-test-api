import Immigration from "./utils/Immigration";
import AudioNode from "./AudioNode";
import * as props from "./decorators/props";

export default class StereoPannerNode extends AudioNode {
  static $JSONKeys = [ "pan" ];

  static $new(...args) {
    return Immigration.getInstance().
      apply(admission => new StereoPannerNode(admission, ...args));
  }

  constructor(admission, context) {
    super(admission, {
      name: "StereoPannerNode",
      context: context,
      numberOfInputs: 1,
      numberOfOutputs: 1,
      channelCount: 2,
      channelCountMode: "clamped-max",
      channelInterpretation: "speakers"
    });
  }

  @props.audioparam(0)
  pan() {}
}
