import utils from "./utils";
import AudioNode from "./AudioNode";
import * as props from "./decorators/props";

export default class WaveShaperNode extends AudioNode {
  constructor(admission, context) {
    super(admission, {
      name: "WaveShaperNode",
      context: context,
      numberOfInputs: 1,
      numberOfOutputs: 1,
      channelCount: 2,
      channelCountMode: "max",
      channelInterpretation: "speakers",
    });

    this._.curve = null;
    this._.oversample = "none";
    this._.JSONKeys = WaveShaperNode.$JSONKeys.slice();
  }

  @props.typed(null, value => utils.isNullOrInstanceOf(value, Float32Array), "Float32Array")
  curve() {}

  @props.enum([ "none", "2x", "4x" ])
  oversample() {}
}

WaveShaperNode.$JSONKeys = [
  "oversample",
];
