const utils = require("./utils");
const AudioNode = require("./AudioNode");

module.exports = class ChannelMergerNode extends AudioNode {
  static $JSONKeys = [];

  static $new(...args) {
    return utils.auth.request((token) => {
      return new ChannelMergerNode(token, ...args);
    });
  }

  constructor(token, context, numberOfInputs = 6) {
    super(token, {
      name: "ChannelMergerNode",
      context: context,
      numberOfInputs: +numberOfInputs|0,
      numberOfOutputs: 1,
      channelCount: 2,
      channelCountMode: "max",
      channelInterpretation: "speakers"
    });
  }
};
