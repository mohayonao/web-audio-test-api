import utils from "./utils";
import AudioNode from "./AudioNode";

export default class ChannelMergerNode extends AudioNode {
  constructor(admission, context, numberOfInputs) {
    super(admission, {
      name: "ChannelMergerNode",
      context: context,
      numberOfInputs: numberOfInputs,
      numberOfOutputs: 1,
      channelCount: 2,
      channelCountMode: "max",
      channelInterpretation: "speakers",
    });

    this._.inspector.describe("constructor", ($assert) => {
      $assert(utils.isPositiveInteger(numberOfInputs), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(numberOfInputs, "numberOfInputs", "positive integer")}
        `);
      });
    });
  }
}
