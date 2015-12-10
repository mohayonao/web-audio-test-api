import utils from "./utils";
import Enumerator from "./utils/Enumerator";
import Immigration from "./utils/Immigration";
import AudioNode from "./AudioNode";
import audioparam from "./decorators/audioparam";

let immigration = Immigration.getInstance();

export default class BiquadFilterNode extends AudioNode {
  constructor(admission, context) {
    super(admission, {
      name: "BiquadFilterNode",
      context: context,
      numberOfInputs: 1,
      numberOfOutputs: 1,
      channelCount: 2,
      channelCountMode: "max",
      channelInterpretation: "speakers",
    });

    this._.type = "lowpass";
    this._.JSONKeys = BiquadFilterNode.$JSONKeys.slice();
  }

  get type() {
    return this._.type;
  }

  set type(value) {
    this._.inspector.describe("type", ($assert) => {
      let enumBiquadFilterType = new Enumerator([
        "lowpass", "highpass", "bandpass", "lowshelf", "highshelf", "peaking", "notch", "allpass",
      ]);

      $assert(enumBiquadFilterType.contains(value), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(value, "type", enumBiquadFilterType.toString())}
        `);
      });
    });

    this._.type = value;
  }

  @audioparam({ defaultValue: 350 })
  frequency() {}

  @audioparam({ defaultValue: 0 })
  detune() {}

  @audioparam({ defaultValue: 1 })
  Q() {}

  @audioparam({ defaultValue: 0 })
  gain() {}

  getFrequencyResponse(frequencyHz, magResponse, phaseResponse) {
    this._.inspector.describe("getFrequencyResponse", ($assert) => {
      $assert(utils.isInstanceOf(frequencyHz, Float32Array), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(frequencyHz, "frequencyHz", "Float32Array")}
        `);
      });

      $assert(utils.isInstanceOf(magResponse, Float32Array), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(magResponse, "magResponse", "Float32Array")}
        `);
      });

      $assert(utils.isInstanceOf(phaseResponse, Float32Array), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(phaseResponse, "phaseResponse", "Float32Array")}
        `);
      });
    });
  }
}

BiquadFilterNode.$JSONKeys = [
  "type",
  "frequency",
  "detune",
  "Q",
  "gain",
];
