const testapi = require("./testapi");
const utils = require("./utils");
const AudioNode = require("./AudioNode");

module.exports = class GainNode extends AudioNode {
  static $JSONKeys = [ "gain" ];

  static $new(...args) {
    return utils.auth.request((token) => {
      return new GainNode(token, ...args);
    });
  }

  constructor(token, context) {
    super(token, {
      name: "GainNode",
      context: context,
      numberOfInputs: 1,
      numberOfOutputs: 1,
      channelCount: 2,
      channelCountMode: "max",
      channelInterpretation: "speakers"
    });
  }

  @testapi.props.audioparam(1)
  gain() {}
};
