import AudioNode from "./AudioNode";
import * as props from "./decorators/props";
import * as methods from "./decorators/methods";
import * as validators from "./validators";

export default class PannerNode extends AudioNode {
  constructor(admission, context) {
    super(admission, {
      name: "PannerNode",
      context: context,
      numberOfInputs: 1,
      numberOfOutputs: 1,
      channelCount: 2,
      channelCountMode: "clamped-max",
      channelInterpretation: "speakers",
    });
    this._.JSONKeys = PannerNode.$JSONKeys.slice();
  }

  @props.enum([ "HRTF", "equalpower" ])
  panningModel() {}

  @props.enum([ "inverse", "linear", "exponential" ])
  distanceModel() {}

  @props.typed(validators.isNumber, 1)
  refDistance() {}

  @props.typed(validators.isNumber, 10000)
  maxDistance() {}

  @props.typed(validators.isNumber, 1)
  rolloffFactor() {}

  @props.typed(validators.isNumber, 360)
  coneInnerAngle() {}

  @props.typed(validators.isNumber, 360)
  coneOuterAngle() {}

  @props.typed(validators.isNumber, 0)
  coneOuterGain() {}

  @methods.param("x", validators.isNumber)
  @methods.param("y", validators.isNumber)
  @methods.param("z", validators.isNumber)
  setPosition() {}

  @methods.param("x", validators.isNumber)
  @methods.param("y", validators.isNumber)
  @methods.param("z", validators.isNumber)
  setOrientation() {}

  @methods.param("x", validators.isNumber)
  @methods.param("y", validators.isNumber)
  @methods.param("z", validators.isNumber)
  setVelocity() {}
}

PannerNode.$JSONKeys = [
  "panningModel",
  "distanceModel",
  "refDistance",
  "maxDistance",
  "rolloffFactor",
  "coneInnerAngle",
  "coneOuterAngle",
  "coneOuterGain",
];
