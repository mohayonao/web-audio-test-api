import AudioNode from "./AudioNode";
import * as props from "./decorators/props";

export default class AudioDestinationNode extends AudioNode {
  constructor(admission, context) {
    super(admission, {
      name: "AudioDestinationNode",
      context: context,
      numberOfInputs: 1,
      numberOfOutputs: 0,
      channelCount: 2,
      channelCountMode: "explicit",
      channelInterpretation: "speakers",
    });
  }

  @props.readonly(2)
  maxChannelCount() {}
}
