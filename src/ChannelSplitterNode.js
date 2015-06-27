import utils from "./utils";
import AudioNode from "./AudioNode";

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

    this._.inspector.describe("constructor", (assert) => {
      assert(utils.isPositiveInteger(numberOfOutputs), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(numberOfOutputs, "numberOfOutputs", "positive integer")}
        `);
      });
    });
  }
}
