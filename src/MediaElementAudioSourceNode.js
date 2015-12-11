import AudioNode from "./AudioNode";
import HTMLMediaElement from "./HTMLMediaElement";
import * as methods from "./decorators/methods";
import * as validators from "./validators";

export default class MediaElementAudioSourceNode extends AudioNode {
  static $JSONKeys = [];

  constructor(admission, context, mediaElement) {
    super(admission, {
      name: "MediaElementAudioSourceNode",
      context: context,
      numberOfInputs: 0,
      numberOfOutputs: 1,
      channelCount: 2,
      channelCountMode: "max",
      channelInterpretation: "speakers"
    });
    this.__createMediaElementSource(mediaElement);
  }

  @methods.param("mediaElement", validators.isInstanceOf(HTMLMediaElement))
  __createMediaElementSource() {}
}
