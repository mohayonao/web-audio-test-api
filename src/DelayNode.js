const AudioNode = require("./AudioNode");
const auth = require("./utils/auth");
const testapi = require("./testapi");

module.exports = class DelayNode extends AudioNode {
  static $JSONKeys = [ "delayTime" ]

  static $new(...args) {
    return auth.request((token) => {
      return new DelayNode(token, ...args);
    });
  }

  constructor(token, context, maxDelayTime = 1) {
    super(token, {
      name: "DelayNode",
      context: context,
      numberOfInputs: 1,
      numberOfOutputs: 1,
      channelCount: 2,
      channelCountMode: "max",
      channelInterpretation: "speakers"
    });
    this._.maxDelayTime = +maxDelayTime || 0;
  }

  @testapi.props.audioparam(0)
  delayTime() {}

  get $maxDelayTime() {
    return this._.maxDelayTime;
  }
};
