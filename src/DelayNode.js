import AudioNode from "./AudioNode";
import * as props from "./decorators/props";
import * as methods from "./decorators/methods";
import * as validators from "./validators";

export default class DelayNode extends AudioNode {
  static $JSONKeys = [ "delayTime" ]

  constructor(admission, context, maxDelayTime) {
    super(admission, {
      name: "DelayNode",
      context: context,
      numberOfInputs: 1,
      numberOfOutputs: 1,
      channelCount: 2,
      channelCountMode: "max",
      channelInterpretation: "speakers"
    });
    this.__createDelay(maxDelayTime);
  }

  @methods.param("maxDelayTime", validators.isPositiveNumber)
  __createDelay(maxDelayTime) {
    this._.maxDelayTime = maxDelayTime;
  }

  @props.audioparam(0)
  delayTime() {}

  get $maxDelayTime() {
    return this._.maxDelayTime;
  }
}
