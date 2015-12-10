import AudioNode from "./AudioNode";
import * as props from "./decorators/props";

export default class GainNode extends AudioNode {
  constructor(admission, context) {
    super(admission, {
      name: "GainNode",
      context: context,
      numberOfInputs: 1,
      numberOfOutputs: 1,
      channelCount: 2,
      channelCountMode: "max",
      channelInterpretation: "speakers",
    });
    this._.JSONKeys = GainNode.$JSONKeys.slice();
  }

  @props.audioparam(1)
  gain() {}
}

GainNode.$JSONKeys = [
  "gain",
];
