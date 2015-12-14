import AudioNode from "./AudioNode";
import auth from "./utils/auth";
import * as props from "./decorators/props";
import * as methods from "./decorators/methods";
import * as validators from "./validators";

export default class PannerNode extends AudioNode {
  static $JSONKeys = [
    "panningModel", "distanceModel", "refDistance", "maxDistance",
    "rolloffFactor", "coneInnerAngle", "coneOuterAngle", "coneOuterGain"
  ];

  static $new(...args) {
    return auth.request((token) => {
      return new PannerNode(token, ...args);
    });
  }

  constructor(token, context) {
    super(token, {
      name: "PannerNode",
      context: context,
      numberOfInputs: 1,
      numberOfOutputs: 1,
      channelCount: 2,
      channelCountMode: "clamped-max",
      channelInterpretation: "speakers"
    });
  }

  @props.enums([ "HRTF", "equalpower" ])
  panningModel() {}

  @props.enums([ "inverse", "linear", "exponential" ])
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
