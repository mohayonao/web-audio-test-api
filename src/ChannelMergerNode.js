import Immigration from "./utils/Immigration";
import AudioNode from "./AudioNode";

export default class ChannelMergerNode extends AudioNode {
  static $JSONKeys = [];

  static $new(...args) {
    return Immigration.getInstance().
      apply(admission => new ChannelMergerNode(admission, ...args));
  }

  constructor(admission, context, numberOfInputs = 6) {
    super(admission, {
      name: "ChannelMergerNode",
      context: context,
      numberOfInputs: +numberOfInputs|0,
      numberOfOutputs: 1,
      channelCount: 2,
      channelCountMode: "max",
      channelInterpretation: "speakers"
    });
  }
}
