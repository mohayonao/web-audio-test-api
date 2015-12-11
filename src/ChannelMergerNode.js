import AudioNode from "./AudioNode";
import * as methods from "./decorators/methods";
import * as validators from "./validators";

export default class ChannelMergerNode extends AudioNode {
  static $JSONKeys = [];

  constructor(admission, context, numberOfInputs) {
    super(admission, {
      name: "ChannelMergerNode",
      context: context,
      numberOfInputs: numberOfInputs,
      numberOfOutputs: 1,
      channelCount: 2,
      channelCountMode: "max",
      channelInterpretation: "speakers"
    });
    this.__createChannelMerger(numberOfInputs);
  }

  @methods.param("numberOfInputs", validators.isPositiveInteger)
  __createChannelMerger() {}
}
