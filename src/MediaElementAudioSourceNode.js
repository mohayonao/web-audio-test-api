import Immigration from "./utils/Immigration";
import AudioNode from "./AudioNode";

export default class MediaElementAudioSourceNode extends AudioNode {
  static $JSONKeys = [];

  static $new(...args) {
    return Immigration.getInstance().
      apply(admission => new MediaElementAudioSourceNode(admission, ...args));
  }

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
    this._.mediaElement = mediaElement;
  }

  get $mediaElement() {
    return this._.mediaElement;
  }
}
