import AudioNode from "./AudioNode";
import auth from "./utils/auth";

export default class ChannelSplitterNode extends AudioNode {
  static $JSONKeys = [];

  static $new(...args) {
    return auth.request((token) => {
      return new ChannelSplitterNode(token, ...args);
    });
  }

  constructor(token, context, numberOfOutputs = 6) {
    super(token, {
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
