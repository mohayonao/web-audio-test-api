import Immigration from "./utils/Immigration";
import AudioNode from "./AudioNode";
import AudioBuffer from "./AudioBuffer";
import * as props from "./decorators/props";
import * as validators from "./validators";

export default class ConvolverNode extends AudioNode {
  static $JSONKeys = [ "normalize" ];

  static $new(...args) {
    return Immigration.getInstance().
      apply(admission => new ConvolverNode(admission, ...args));
  }

  constructor(admission, context) {
    super(admission, {
      name: "ConvolverNode",
      context: context,
      numberOfInputs: 1,
      numberOfOutputs: 1,
      channelCount: 2,
      channelCountMode: "clamped-max",
      channelInterpretation: "speakers"
    });
  }

  @props.typed(validators.isNullOrInstanceOf(AudioBuffer), null)
  buffer() {}

  @props.typed(validators.isBoolean, true)
  normalize() {}
}
