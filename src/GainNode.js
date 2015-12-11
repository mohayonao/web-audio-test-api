import AudioNode from "./AudioNode";
import * as props from "./decorators/props";

export default class GainNode extends AudioNode {
  static $JSONKeys = [ "gain" ];

  constructor(admission, context) {
    super(admission, {
      name: "GainNode",
      context: context,
      numberOfInputs: 1,
      numberOfOutputs: 1,
      channelCount: 2,
      channelCountMode: "max",
      channelInterpretation: "speakers"
    });
  }

  @props.audioparam(1)
  gain() {}
}
