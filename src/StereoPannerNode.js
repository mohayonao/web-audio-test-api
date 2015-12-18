const AudioNode = require("./AudioNode");
const auth = require("./utils/auth");
const testapi = require("./testapi");

module.exports = class StereoPannerNode extends AudioNode {
  static $JSONKeys = [ "pan" ];

  static $new(...args) {
    return auth.request((token) => {
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
