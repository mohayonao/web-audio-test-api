import AudioNode from "./AudioNode";
<<<<<<< HEAD
import permission from "./utils/permission";
import * as props from "./decorators/props";
=======
import auth from "./utils/auth";
import testapi from "./testapi";
>>>>>>> 14aef02... x

export default class StereoPannerNode extends AudioNode {
  static $JSONKeys = [ "pan" ];

  static $new(...args) {
    return auth.request((token) => {
      return new StereoPannerNode(token, ...args);
    });
  }

  constructor(token, context) {
    super(token, {
      name: "StereoPannerNode",
      context: context,
      numberOfInputs: 1,
      numberOfOutputs: 1,
      channelCount: 2,
      channelCountMode: "clamped-max",
      channelInterpretation: "speakers"
    });
  }

  @props.audioparam(0)
  pan() {}
}
