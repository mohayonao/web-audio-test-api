import Immigration from "./utils/Immigration";
import AudioNode from "./AudioNode";

export default class MediaStreamAudioSourceNode extends AudioNode {
  static $JSONKeys = [];

  static $new(...args) {
    return Immigration.getInstance().
      apply(admission => new MediaStreamAudioSourceNode(admission, ...args));
  }

  constructor(admission, context, mediaStream) {
    super(admission, {
      name: "MediaStreamAudioSourceNode",
      context: context,
      numberOfInputs: 0,
      numberOfOutputs: 1,
      channelCount: 2,
      channelCountMode: "max",
      channelInterpretation: "speakers"
    });
    this._.mediaStream = mediaStream;
  }

  get $mediaStream() {
    return this._.mediaStream;
  }
}
