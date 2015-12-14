import AudioNode from "./AudioNode";
import auth from "./utils/auth";

export default class MediaStreamAudioDestinationNode extends AudioNode {
  static $JSONKeys = [];

  static $new(...args) {
    return auth.request((token) => {
      return new MediaStreamAudioDestinationNode(token, ...args);
    });
  }

  constructor(token, context) {
    super(token, {
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
