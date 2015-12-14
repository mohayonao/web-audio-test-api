import AudioNode from "./AudioNode";
import auth from "./utils/auth";
import * as props from "./decorators/props";

export default class AudioDestinationNode extends AudioNode {
  static $JSONKeys = [];

  static $new(...args) {
    return auth.request((token) => {
      return new AudioDestinationNode(token, ...args);
    });
  }

  constructor(token, context) {
    super(token, {
      name: "AudioDestinationNode",
      context: context,
      numberOfInputs: 1,
      numberOfOutputs: 0,
      channelCount: 2,
      channelCountMode: "explicit",
      channelInterpretation: "speakers"
    });
  }

  @props.readonly(2)
  maxChannelCount() {}
}
