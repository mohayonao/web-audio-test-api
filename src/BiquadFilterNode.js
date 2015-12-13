import Immigration from "./utils/Immigration";
import AudioNode from "./AudioNode";
import * as props from "./decorators/props";
import * as methods from "./decorators/methods";
import * as validators from "./validators";

export default class BiquadFilterNode extends AudioNode {
  static $JSONKeys = [ "type", "frequency", "detune", "Q", "gain" ];

  static $new(...args) {
    return Immigration.getInstance().
      apply(admission => new BiquadFilterNode(admission, ...args));
  }

  constructor(admission, context) {
    super(admission, {
      name: "BiquadFilterNode",
      context: context,
      numberOfInputs: 1,
      numberOfOutputs: 1,
      channelCount: 2,
      channelCountMode: "max",
      channelInterpretation: "speakers"
    });
  }

  @props.enums([ "lowpass", "highpass", "bandpass", "lowshelf", "highshelf", "peaking", "notch", "allpass" ])
  type() {}

  @props.audioparam(350)
  frequency() {}

  @props.audioparam(0)
  detune() {}

  @props.audioparam(1)
  Q() {}

  @props.audioparam(0)
  gain() {}

  @methods.param("frequencyHz", validators.isInstanceOf(Float32Array))
  @methods.param("magResponse", validators.isInstanceOf(Float32Array))
  @methods.param("phaseResponse", validators.isInstanceOf(Float32Array))
  getFrequencyResponse() {}
}
