import utils from "./utils";
import AudioNode from "./AudioNode";

export default class MediaElementAudioSourceNode extends AudioNode {
  constructor(admission, context, mediaElement) {
    super(admission, {
      name: "MediaElementAudioSourceNode",
      context: context,
      numberOfInputs: 0,
      numberOfOutputs: 1,
      channelCount: 2,
      channelCountMode: "max",
      channelInterpretation: "speakers",
    });

    this._.inspector.describe("constructor", ($assert) => {
      $assert(utils.isInstanceOf(mediaElement, global.HTMLMediaElement), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(mediaElement, "mediaElement", "HTMLMediaElement")}
        `);
      });
    });
  }
}
