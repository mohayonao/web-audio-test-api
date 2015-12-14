import AudioNode from "./AudioNode";
import auth from "./utils/auth";
import testapi from "./testapi";

export default class AnalyserNode extends AudioNode {
  static $JSONKeys = [ "fftSize", "minDecibels", "maxDecibels", "smoothingTimeConstant" ];

  static $new(...args) {
    return auth.request((token) => {
      return new AnalyserNode(token, ...args);
    });
  }

  constructor(token, context) {
    super(token, {
      name: "AnalyserNode",
      context: context,
      numberOfInputs: 1,
      numberOfOutputs: 1,
      channelCount: 1,
      channelCountMode: "explicit",
      channelInterpretation: "speakers"
    });
    this._.fftSize = 2048;
  }

  @testapi.props.enums([ 32, 64, 128, 256, 512, 1024, 2048 ])
  fftSize() {}

  @testapi.props.readonly()
  frequencyBinCount() {
    return this.fftSize >> 1;
  }

  @testapi.props.typed(testapi.isNumber, -100)
  minDecibels() {}

  @testapi.props.typed(testapi.isNumber, 30)
  maxDecibels() {}

  @testapi.props.typed(testapi.isNumber, 0.8)
  smoothingTimeConstant() {}

  @testapi.methods.param("array", testapi.isInstanceOf(Float32Array))
  getFloatFrequencyData() {}

  @testapi.methods.param("array", testapi.isInstanceOf(Uint8Array))
  getByteFrequencyData() {}

  @testapi.methods.param("array", testapi.isInstanceOf(Float32Array))
  @testapi.versions({ chrome: "37-", firefox: "30-", safari: "none" })
  getFloatTimeDomainData() {}

  @testapi.methods.param("array", testapi.isInstanceOf(Uint8Array))
  getByteTimeDomainData() {}
}
