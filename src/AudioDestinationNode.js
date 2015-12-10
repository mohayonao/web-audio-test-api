import AudioNode from "./AudioNode";

export default class AudioDestinationNode extends AudioNode {
  constructor(admission, context) {
    super(admission, {
      name: "AudioDestinationNode",
      context: context,
      numberOfInputs: 1,
      numberOfOutputs: 0,
      channelCount: 2,
      channelCountMode: "explicit",
      channelInterpretation: "speakers",
    });

    this._.maxChannelCount = 2;
  }

  get maxChannelCount() {
    return this._.maxChannelCount;
  }

  set maxChannelCount(value) {
    this._.inspector.describe("maxChannelCount", ($assert) => {
      $assert.throwReadOnlyTypeError(value);
    });
  }
}
