import utils from "./utils";
import AudioNode from "./AudioNode";
import typedvalue from "./decorators/typedvalue";

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

    this._.buffer = null;
    this._.normalize = true;
    this._.JSONKeys = ConvolverNode.$JSONKeys.slice();
  }

  @typedvalue(null, value => utils.isNullOrInstanceOf(value, global.AudioBuffer), "AudioBuffer")
  buffer() {}

  @typedvalue(true, utils.isBoolean, "boolean")
  normalize() {}
}

ConvolverNode.$JSONKeys = [
  "normalize",
];
