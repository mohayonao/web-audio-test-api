import Immigration from "./utils/Immigration";
import AudioNode from "./AudioNode";

export default class MediaStreamAudioDestinationNode extends AudioNode {
  static $JSONKeys = [];

  static $new(...args) {
    return Immigration.getInstance().
      apply(admission => new MediaStreamAudioDestinationNode(admission, ...args));
  }

  constructor(admission, context) {
    super(admission, {
      name: "MediaStreamAudioDestinationNode",
      context: context,
      numberOfInputs: 1,
      numberOfOutputs: 0,
      channelCount: 2,
      channelCountMode: "explicit",
      channelInterpretation: "speakers"
    });
  }
}
