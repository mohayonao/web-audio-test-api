import * as util from "./util";
import AudioNode from "./AudioNode";

export default class MediaStreamAudioSourceNode extends AudioNode {
  constructor(admission, context, mediaStream) {
    super(admission, {
      name: "MediaStreamAudioSourceNode",
      context: context,
      numberOfInputs: 0,
      numberOfOutputs: 1,
      channelCount: 2,
      channelCountMode: "max",
      channelInterpretation: "speakers",
    });

    this._.inspector.describe("constructor", (assert) => {
      assert(util.isInstanceOf(mediaStream, global.MediaStream), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(mediaStream, "mediaStream", "MediaStream")}
        `);
      });
    });
  }
}
