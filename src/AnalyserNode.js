import utils from "./utils";
import Configuration from "./utils/Configuration";
import AudioNode from "./AudioNode";
import enumerate from "./decorators/enumerate";

let configuration = Configuration.getInstance();

export default class AnalyserNode extends AudioNode {
  constructor(admission, context) {
    super(admission, {
      name: "AnalyserNode",
      context: context,
      numberOfInputs: 1,
      numberOfOutputs: 1,
      channelCount: 1,
      channelCountMode: "explicit",
      channelInterpretation: "speakers",
    });

    this._.minDecibels = -100;
    this._.maxDecibels = 30;
    this._.smoothingTimeConstant = 0.8;
    this._.JSONKeys = AnalyserNode.$JSONKeys.slice();
  }

  @enumerate([ 32, 64, 128, 256, 512, 1024, 2048 ], 2048)
  fftSize() {}

  get frequencyBinCount() {
    return this.fftSize >> 1;
  }

  set frequencyBinCount(value) {
    this._.inspector.describe("frequencyBinCount", ($assert) => {
      $assert.throwReadOnlyTypeError(value);
    });
  }

  get minDecibels() {
    return this._.minDecibels;
  }

  set minDecibels(value) {
    this._.inspector.describe("minDecibels", ($assert) => {
      $assert(utils.isNumber(value), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(value, "minDecibels", "number")}
        `);
      });
    });

    this._.minDecibels = value;
  }

  get maxDecibels() {
    return this._.maxDecibels;
  }

  set maxDecibels(value) {
    this._.inspector.describe("maxDecibels", ($assert) => {
      $assert(utils.isNumber(value), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(value, "maxDecibels", "number")}
        `);
      });
    });

    this._.maxDecibels = value;
  }

  get smoothingTimeConstant() {
    return this._.smoothingTimeConstant;
  }

  set smoothingTimeConstant(value) {
    this._.inspector.describe("smoothingTimeConstant", ($assert) => {
      $assert(utils.isNumber(value), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(value, "smoothingTimeConstant", "number")}
        `);
      });
    });

    this._.smoothingTimeConstant = value;
  }

  getFloatFrequencyData(array) {
    this._.inspector.describe("getFloatFrequencyData", ($assert) => {
      $assert(utils.isInstanceOf(array, Float32Array), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(array, "array", "Float32Array")}
        `);
      });
    });
  }

  getByteFrequencyData(array) {
    this._.inspector.describe("getByteFrequencyData", ($assert) => {
      $assert(utils.isInstanceOf(array, Uint8Array), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(array, "array", "Uint8Array")}
        `);
      });
    });
  }

  getFloatTimeDomainData(array) {
    this._.inspector.describe("getFloatTimeDomainData", ($assert) => {
      $assert(configuration.getState("AnalyserNode#getFloatTimeDomainData") === "enabled", (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          not enabled
        `);
      });
      $assert(utils.isInstanceOf(array, Float32Array), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(array, "array", "Float32Array")}
        `);
      });
    });
  }

  getByteTimeDomainData(array) {
    this._.inspector.describe("getByteTimeDomainData", ($assert) => {
      $assert(utils.isInstanceOf(array, Uint8Array), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(array, "array", "Uint8Array")}
        `);
      });
    });
  }
}

AnalyserNode.$JSONKeys = [
  "fftSize",
  "minDecibels",
  "maxDecibels",
  "smoothingTimeConstant",
];
