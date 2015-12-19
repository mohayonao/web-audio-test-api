const testapi = require("./testapi");
const utils = require("./utils");
const AudioNode = require("./AudioNode");

module.exports = class AudioDestinationNode extends AudioNode {
  static $JSONKeys = [];

  static $new(...args) {
    return utils.auth.request((token) => {
      return new AudioDestinationNode(token, ...args);
    });
  }

  constructor(token, context) {
    super(token, {
      name: "AudioDestinationNode",
      context: context,
      numberOfInputs: 1,
      numberOfOutputs: 0,
      channelCount: 2,
      channelCountMode: "explicit",
      channelInterpretation: "speakers"
    });
  }

  @testapi.props.readonly(2)
  maxChannelCount() {}
};
