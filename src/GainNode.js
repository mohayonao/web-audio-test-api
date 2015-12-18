const AudioNode = require("./AudioNode");
const auth = require("./utils/auth");
const testapi = require("./testapi");

module.exports = class GainNode extends AudioNode {
  static $JSONKeys = [ "gain" ];

  static $new(...args) {
    return auth.request((token) => {
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
