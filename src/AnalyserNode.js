import Configuration from "./utils/Configuration";
import AudioNode from "./AudioNode";
import * as props from "./decorators/props";
import * as methods from "./decorators/methods";
import * as validators from "./validators";

let configuration = Configuration.getInstance();

export default class AnalyserNode extends AudioNode {
  static $JSONKeys = [ "fftSize", "minDecibels", "maxDecibels", "smoothingTimeConstant" ];

  constructor(admission, context) {
    super(admission, {
      name: "AnalyserNode",
      context: context,
      numberOfInputs: 1,
      numberOfOutputs: 1,
      channelCount: 1,
      channelCountMode: "explicit",
      channelInterpretation: "speakers",
    });
    this._.fftSize = 2048;
  }

  @props.enum([ 32, 64, 128, 256, 512, 1024, 2048 ])
  fftSize() {}

  @props.readonly()
  frequencyBinCount() {
    return this.fftSize >> 1;
  }

  @props.typed(validators.isNumber, -100)
  minDecibels() {}

  @props.typed(validators.isNumber, 30)
  maxDecibels() {}

  @props.typed(validators.isNumber, 0.8)
  smoothingTimeConstant() {}

  @methods.param("array", validators.isInstanceOf(Float32Array))
  getFloatFrequencyData() {}

  @methods.param("array", validators.isInstanceOf(Uint8Array))
  getByteFrequencyData() {}

  @methods.param("array", validators.isInstanceOf(Float32Array))
  @methods.contract({
    precondition() {
      if (configuration.getState("AnalyserNode#getFloatTimeDomainData") !== "enabled") {
        throw new TypeError("not enabled");
      }
    }
  })
  getFloatTimeDomainData() {}

  @methods.param("array", validators.isInstanceOf(Uint8Array))
  getByteTimeDomainData() {}
}
