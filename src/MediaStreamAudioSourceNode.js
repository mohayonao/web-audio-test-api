const utils = require("./utils");
const AudioNode = require("./AudioNode");

module.exports = class MediaStreamAudioSourceNode extends AudioNode {
  static $JSONKeys = [];

  static $new(...args) {
    return utils.auth.request((token) => {
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
};
