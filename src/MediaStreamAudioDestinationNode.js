const AudioNode = require("./AudioNode");
const auth = require("./utils/auth");

module.exports = class MediaStreamAudioDestinationNode extends AudioNode {
  static $JSONKeys = [];

  static $new(...args) {
    return auth.request((token) => {
      return new MediaStreamAudioDestinationNode(token, ...args);
    });
  }

  constructor(token, context) {
    super(token, {
      name: "MediaStreamAudioDestinationNode",
      context: context,
      numberOfInputs: 1,
      numberOfOutputs: 0,
      channelCount: 2,
      channelCountMode: "explicit",
      channelInterpretation: "speakers"
    });
  }
};
