import utils from "./utils";
import AudioNode from "./AudioNode";
import * as props from "./decorators/props";

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

  @props.typed(null, value => utils.isNullOrInstanceOf(value, global.AudioBuffer), "AudioBuffer")
  buffer() {}

  @props.typed(true, utils.isBoolean, "boolean")
  normalize() {}
}

ConvolverNode.$JSONKeys = [
  "normalize",
];
