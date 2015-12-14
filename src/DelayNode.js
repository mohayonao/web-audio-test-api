import AudioNode from "./AudioNode";
import auth from "./utils/auth";
import * as props from "./decorators/props";

export default class DelayNode extends AudioNode {
  static $JSONKeys = [ "delayTime" ]

  static $new(...args) {
    return auth.request((token) => {
      return new DelayNode(token, ...args);
    });
  }

  constructor(token, context, maxDelayTime = 1) {
    super(token, {
      name: "DelayNode",
      context: context,
      numberOfInputs: 1,
      numberOfOutputs: 1,
      channelCount: 2,
      channelCountMode: "max",
      channelInterpretation: "speakers"
    });
    this._.maxDelayTime = +maxDelayTime || 0;
  }

  @props.audioparam(0)
  delayTime() {}

  get $maxDelayTime() {
    return this._.maxDelayTime;
  }
}
