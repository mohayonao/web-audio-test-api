import AudioNode from "./AudioNode";
import auth from "./utils/auth";

export default class MediaElementAudioSourceNode extends AudioNode {
  static $JSONKeys = [];

  static $new(...args) {
    return auth.request((token) => {
      return new MediaElementAudioSourceNode(token, ...args);
    });
  }

  constructor(token, context, mediaElement) {
    super(token, {
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
