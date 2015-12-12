import AudioNode from "./AudioNode";
import * as props from "./decorators/props";
import * as validators from "./validators";

export default class WaveShaperNode extends AudioNode {
  static $JSONKeys = [ "oversample" ];

  constructor(admission, context) {
    super(admission, {
      name: "WaveShaperNode",
      context: context,
      numberOfInputs: 1,
      numberOfOutputs: 1,
      channelCount: 2,
      channelCountMode: "max",
      channelInterpretation: "speakers"
    });
  }

  @props.typed(validators.isNullOrInstanceOf(Float32Array), null)
  curve() {}

  @props.enums([ "none", "2x", "4x" ])
  oversample() {}
}
