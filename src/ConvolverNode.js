import AudioNode from "./AudioNode";
import AudioBuffer from "./AudioBuffer";
import auth from "./utils/auth";
import testapi from "./testapi";

export default class ConvolverNode extends AudioNode {
  static $JSONKeys = [ "normalize" ];

  static $new(...args) {
    return auth.request((token) => {
      return new ConvolverNode(token, ...args);
    });
  }

  constructor(token, context) {
    super(token, {
      name: "ConvolverNode",
      context: context,
      numberOfInputs: 1,
      numberOfOutputs: 1,
      channelCount: 2,
      channelCountMode: "clamped-max",
      channelInterpretation: "speakers"
    });
  }

  @testapi.props.typed(testapi.isNullOrInstanceOf(AudioBuffer), null)
  buffer() {}

  @testapi.props.typed(testapi.isBoolean, true)
  normalize() {}
}
