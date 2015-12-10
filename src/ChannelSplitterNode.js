import AudioNode from "./AudioNode";
import * as methods from "./decorators/methods";
import * as validators from "./validators";

export default class ChannelSplitterNode extends AudioNode {
  constructor(admission, context, numberOfOutputs) {
    super(admission, {
      name: "ChannelSplitterNode",
      context: context,
      numberOfInputs: 1,
      numberOfOutputs: numberOfOutputs,
      channelCount: 2,
      channelCountMode: "max",
      channelInterpretation: "speakers",
    });
    this.__createChannelSplitter(numberOfOutputs);
  }

  @methods.param("numberOfOutputs", validators.isPositiveInteger)
  __createChannelSplitter() {}
}
