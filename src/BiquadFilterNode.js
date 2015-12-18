const AudioNode = require("./AudioNode");
const auth = require("./utils/auth");
const testapi = require("./testapi");

module.exports = class BiquadFilterNode extends AudioNode {
  static $JSONKeys = [ "type", "frequency", "detune", "Q", "gain" ];

  static $new(...args) {
    return auth.request((token) => {
      return new BiquadFilterNode(token, ...args);
    });
  }

  constructor(token, context) {
    super(token, {
      name: "BiquadFilterNode",
      context: context,
      numberOfInputs: 1,
      numberOfOutputs: 1,
      channelCount: 2,
      channelCountMode: "max",
      channelInterpretation: "speakers"
    });
  }

  @testapi.props.enums([ "lowpass", "highpass", "bandpass", "lowshelf", "highshelf", "peaking", "notch", "allpass" ])
  type() {}

  @testapi.props.audioparam(350)
  frequency() {}

  @testapi.props.audioparam(0)
  detune() {}

  @testapi.props.audioparam(1)
  Q() {}

  @testapi.props.audioparam(0)
  gain() {}

  @testapi.methods.param("frequencyHz", testapi.isInstanceOf(Float32Array))
  @testapi.methods.param("magResponse", testapi.isInstanceOf(Float32Array))
  @testapi.methods.param("phaseResponse", testapi.isInstanceOf(Float32Array))
  getFrequencyResponse() {}
};
