import utils from "./utils";
import AudioNode from "./AudioNode";
import enumerate from "./decorators/enumerate";
import typedvalue from "./decorators/typedvalue";

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

  @typedvalue(null, value => utils.isNullOrInstanceOf(value, Float32Array), "Float32Array")
  curve() {}

  @enumerate([ "none", "2x", "4x" ])
  oversample() {}
}

WaveShaperNode.$JSONKeys = [
  "oversample",
];
