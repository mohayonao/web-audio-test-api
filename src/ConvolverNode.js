import AudioNode from "./AudioNode";
import AudioBuffer from "./AudioBuffer";
import auth from "./utils/auth";
import * as props from "./decorators/props";
import * as validators from "./validators";

export default class ConvolverNode extends AudioNode {
  static $JSONKeys = [ "normalize" ];

  static $new(...args) {
    return auth.request((token) => {
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

  @props.typed(validators.isNullOrInstanceOf(AudioBuffer), null)
  buffer() {}

  @props.typed(validators.isBoolean, true)
  normalize() {}
}
