import AudioNode from "./AudioNode";

export default class MediaStreamAudioDestinationNode extends AudioNode {
  constructor(admission, context) {
    super(admission, {
      name: "MediaStreamAudioDestinationNode",
      context: context,
      numberOfInputs: 1,
      numberOfOutputs: 0,
      channelCount: 2,
      channelCountMode: "explicit",
      channelInterpretation: "speakers",
    });
  }
}
