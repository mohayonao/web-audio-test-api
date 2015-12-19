const testapi = require("./testapi");
const utils = require("./utils");
const AudioNode = require("./AudioNode");
const AudioBuffer = require("./AudioBuffer");

module.exports = class ConvolverNode extends AudioNode {
  static $JSONKeys = [ "normalize" ];

  static $new(...args) {
    return utils.auth.request((token) => {
      return new ConvolverNode(token, ...args);
    });
  }

  constructor(token, context) {
    super(token, {
      name: "ConvolverNode",
      context: context,
      numberOfInputs: 1,
      numberOfOutputs: 1,
      channelCount: 2,
      channelCountMode: "clamped-max",
      channelInterpretation: "speakers"
    });
  }

  @testapi.props.typed(testapi.isNullOrInstanceOf(AudioBuffer), null)
  buffer() {}

  @testapi.props.typed(testapi.isBoolean, true)
  normalize() {}
};
