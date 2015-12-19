const testapi = require("./testapi");
const utils = require("./utils");
const AudioNode = require("./AudioNode");

module.exports = class DynamicsCompressorNode extends AudioNode {
  static $JSONKeys = [ "threshold", "knee", "ratio", "reduction", "attack", "release" ];

  static $new(...args) {
    return utils.auth.request((token) => {
      return new DynamicsCompressorNode(token, ...args);
    });
  }

  constructor(token, context) {
    super(token, {
      name: "DynamicsCompressorNode",
      context: context,
      numberOfInputs: 1,
      numberOfOutputs: 1,
      channelCount: 2,
      channelCountMode: "explicit",
      channelInterpretation: "speakers"
    });
  }

  @testapi.props.audioparam(-24)
  threshold() {}

  @testapi.props.audioparam(30)
  knee() {}

  @testapi.props.audioparam(12)
  ratio() {}

  @testapi.props.audioparam(0)
  reduction() {}

  @testapi.props.audioparam(0.003)
  attack() {}

  @testapi.props.audioparam(0.25)
  release() {}
};
