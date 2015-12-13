import Immigration from "./utils/Immigration";
import AudioNode from "./AudioNode";

export default class ChannelSplitterNode extends AudioNode {
  static $JSONKeys = [];

  static $new(...args) {
    return Immigration.getInstance().
      apply(admission => new ChannelSplitterNode(admission, ...args));
  }

  constructor(admission, context, numberOfOutputs = 6) {
    super(admission, {
      name: "ChannelSplitterNode",
      context: context,
      numberOfInputs: 1,
      numberOfOutputs: +numberOfOutputs|0,
      channelCount: 2,
      channelCountMode: "max",
      channelInterpretation: "speakers"
    });
  }
}
