import AudioNode from "./AudioNode";
import readonly from "./decorators/readonly";

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

    this._.maxChannelCount = 2;
  }

  @readonly()
  maxChannelCount() {
    return this._.maxChannelCount;
  }
}
