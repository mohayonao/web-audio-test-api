import Immigration from "./utils/Immigration";
import AudioNode from "./AudioNode";
import audioparam from "./decorators/audioparam";

let immigration = Immigration.getInstance();

export default class DynamicsCompressorNode extends AudioNode {
  constructor(admission, context) {
    super(admission, {
      name: "DynamicsCompressorNode",
      context: context,
      numberOfInputs: 1,
      numberOfOutputs: 1,
      channelCount: 2,
      channelCountMode: "explicit",
      channelInterpretation: "speakers",
    });

    this._.JSONKeys = DynamicsCompressorNode.$JSONKeys.slice();
  }

  @audioparam({ defaultValue: -24 })
  threshold() {}

  @audioparam({ defaultValue: 30 })
  knee() {}

  @audioparam({ defaultValue: 12 })
  ratio() {}

  @audioparam({ defaultValue: 0 })
  reduction() {}

  @audioparam({ defaultValue: 0.003 })
  attack() {}

  @audioparam({ defaultValue: 0.25 })
  release() {}
}

DynamicsCompressorNode.$JSONKeys = [
  "threshold",
  "knee",
  "ratio",
  "reduction",
  "attack",
  "release",
];
