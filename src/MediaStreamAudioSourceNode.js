import AudioNode from "./AudioNode";
import auth from "./utils/auth";

export default class MediaStreamAudioSourceNode extends AudioNode {
  static $JSONKeys = [];

  static $new(...args) {
    return auth.request((token) => {
      return new MediaStreamAudioSourceNode(token, ...args);
    });
  }

  constructor(token, context, mediaStream) {
    super(token, {
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
