import AudioNode from "./AudioNode";
import MediaStream from "./MediaStream";
import * as methods from "./decorators/methods";
import * as validators from "./validators";

export default class MediaStreamAudioSourceNode extends AudioNode {
  static $JSONKeys = [];

  constructor(admission, context, mediaStream) {
    super(admission, {
      name: "MediaStreamAudioSourceNode",
      context: context,
      numberOfInputs: 0,
      numberOfOutputs: 1,
      channelCount: 2,
      channelCountMode: "max",
      channelInterpretation: "speakers",
    });
    this.__createMediaStreamSource(mediaStream)
  }

  @methods.param("mediaStream", validators.isInstanceOf(MediaStream))
  __createMediaStreamSource() {}
}
