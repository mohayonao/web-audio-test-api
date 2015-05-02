import * as util from "./util";
import Enumerator from "./util/Enumerator";
import AudioNode from "./AudioNode";
import AudioParam from "./AudioParam";

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
    this._.frequency = util.immigration.apply(admission =>
      new AudioParam(admission, this, "frequency", 350, 10, context.sampleRate / 2)
    );
    this._.detune = util.immigration.apply(admission =>
      new AudioParam(admission, this, "detune", 0, -4800, 4800)
    );
    this._.Q = util.immigration.apply(admission =>
      new AudioParam(admission, this, "Q", 1, 0.0001, 1000)
    );
    this._.gain = util.immigration.apply(admission =>
      new AudioParam(admission, this, "gain", 0, -40, 40)
    );
    this._.JSONKeys = BiquadFilterNode.$JSONKeys.slice();
  }

  get type() {
    return this._.type;
  }

  set type(value) {
    this._.inspector.describe("type", (assert) => {
      let enumBiquadFilterType = new Enumerator([
        "lowpass", "highpass", "bandpass", "lowshelf", "highshelf", "peaking", "notch", "allpass",
      ]);

      assert(enumBiquadFilterType.contains(value), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(value, "type", enumBiquadFilterType.toString())}
        `);
      });
    });

    this._.type = value;
  }

  get frequency() {
    return this._.frequency;
  }

  set frequency(value) {
    this._.inspector.describe("frequency", (assert) => {
      assert.throwReadOnlyTypeError(value);
    });
  }

  get detune() {
    return this._.detune;
  }

  set detune(value) {
    this._.inspector.describe("detune", (assert) => {
      assert.throwReadOnlyTypeError(value);
    });
  }

  get Q() {
    return this._.Q;
  }

  set Q(value) {
    this._.inspector.describe("Q", (assert) => {
      assert.throwReadOnlyTypeError(value);
    });
  }

  get gain() {
    return this._.gain;
  }

  set gain(value) {
    this._.inspector.describe("gain", (assert) => {
      assert.throwReadOnlyTypeError(value);
    });
  }

  getFrequencyResponse(frequencyHz, magResponse, phaseResponse) {
    this._.inspector.describe("getFrequencyResponse", (assert) => {
      assert(util.isInstanceOf(frequencyHz, Float32Array), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(frequencyHz, "frequencyHz", "Float32Array")}
        `);
      });

      assert(util.isInstanceOf(magResponse, Float32Array), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(magResponse, "magResponse", "Float32Array")}
        `);
      });

      assert(util.isInstanceOf(phaseResponse, Float32Array), (fmt) => {
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
