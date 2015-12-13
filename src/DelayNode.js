import Immigration from "./utils/Immigration";
import AudioNode from "./AudioNode";
import * as props from "./decorators/props";

export default class DelayNode extends AudioNode {
  static $JSONKeys = [ "delayTime" ]

  static $new(...args) {
    return Immigration.getInstance().
      apply(admission => new DelayNode(admission, ...args));
  }

  constructor(admission, context, maxDelayTime = 1) {
    super(admission, {
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
