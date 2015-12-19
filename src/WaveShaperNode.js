const testapi = require("./testapi");
const utils = require("./utils");
const AudioNode = require("./AudioNode");

module.exports = class WaveShaperNode extends AudioNode {
  static $JSONKeys = [ "oversample" ];

  static $new(...args) {
    return utils.auth.request((token) => {
      return new WaveShaperNode(token, ...args);
    });
  }

  constructor(token, context) {
    super(token, {
      name: "WaveShaperNode",
      context: context,
      numberOfInputs: 1,
      numberOfOutputs: 1,
      channelCount: 2,
      channelCountMode: "max",
      channelInterpretation: "speakers"
    });
  }

  @testapi.props.typed(testapi.isNullOrInstanceOf(Float32Array), null)
  curve() {}

  @testapi.props.enums([ "none", "2x", "4x" ])
  oversample() {}
};
