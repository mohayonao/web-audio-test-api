const testapi = require("./testapi");
const utils = require("./utils");
const AudioNode = require("./AudioNode");

module.exports = class StereoPannerNode extends AudioNode {
  static $JSONKeys = [ "pan" ];

  static $new(...args) {
    return utils.auth.request((token) => {
      return new StereoPannerNode(token, ...args);
    });
  }

  constructor(token, context) {
    super(token, {
      name: "StereoPannerNode",
      context: context,
      numberOfInputs: 1,
      numberOfOutputs: 1,
      channelCount: 2,
      channelCountMode: "clamped-max",
      channelInterpretation: "speakers"
    });
  }

  @testapi.props.audioparam(0)
  pan() {}
};
