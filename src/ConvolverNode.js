import AudioNode from "./AudioNode";
import AudioBuffer from "./AudioBuffer";
import * as props from "./decorators/props";
import * as validators from "./validators";

export default class ConvolverNode extends AudioNode {
  constructor(admission, context) {
    super(admission, {
      name: "ConvolverNode",
      context: context,
      numberOfInputs: 1,
      numberOfOutputs: 1,
      channelCount: 2,
      channelCountMode: "clamped-max",
      channelInterpretation: "speakers",
    });
    this._.JSONKeys = ConvolverNode.$JSONKeys.slice();
  }

  @props.typed(validators.isNullOrInstanceOf(AudioBuffer), null)
  buffer() {}

  @props.typed(validators.isBoolean, true)
  normalize() {}
}

ConvolverNode.$JSONKeys = [
  "normalize",
];
