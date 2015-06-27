import * as util from "./util";
import Inspector from "./util/Inspector";

export default class AudioBuffer {
  constructor(admission, context, numberOfChannels, length, sampleRate) {
    util.immigration.check(admission, () => {
      throw new TypeError("Illegal constructor");
    });

    Object.defineProperty(this, "_", {
      value: {
        inspector: new Inspector(this),
      },
    });

    this._.inspector.describe("constructor", (assert) => {
      assert(util.isPositiveInteger(numberOfChannels), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(numberOfChannels, "numberOfChannels", "positive integer")}
        `);
      });

      assert(util.isPositiveInteger(length), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(length, "length", "positive integer")}
        `);
      });

      assert(util.isPositiveInteger(sampleRate), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(sampleRate, "sampleRate", "positive integer")}
        `);
      });
    });

    this._.context = context;
    this._.numberOfChannels = numberOfChannels;
    this._.length = length;
    this._.sampleRate = sampleRate;
    this._.data = new Array(numberOfChannels);

    for (let i = 0; i < numberOfChannels; i++) {
      this._.data[i] = new Float32Array(length);
    }
  }

  get sampleRate() {
    return this._.sampleRate;
  }

  set sampleRate(value) {
    this._.inspector.describe("sampleRate", (assert) => {
      assert.throwReadOnlyTypeError(value);
    });
  }

  get length() {
    return this._.length;
  }

  set length(value) {
    this._.inspector.describe("length", (assert) => {
      assert.throwReadOnlyTypeError(value);
    });
  }

  get duration() {
    return this.length / this.sampleRate;
  }

  set duration(value) {
    this._.inspector.describe("duration", (assert) => {
      assert.throwReadOnlyTypeError(value);
    });
  }

  get numberOfChannels() {
    return this._.numberOfChannels;
  }

  set numberOfChannels(value) {
    this._.inspector.describe("numberOfChannels", (assert) => {
      assert.throwReadOnlyTypeError(value);
    });
  }

  get $name() {
    return "AudioBuffer";
  }

  get $context() {
    return this._.context;
  }

  getChannelData(channel) {
    this._.inspector.describe("getChannelData", (assert) => {
      assert(util.isPositiveInteger(channel), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(channel, "channel", "positive integer")}
        `);
      });

      assert(channel < this._.data.length, (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          channel index (${channel}) exceeds number of channels (${this._.data.length})
        `);
      });
    });

    return this._.data[channel];
  }

  toJSON() {
    let json = {
      name: this.$name,
      sampleRate: this.sampleRate,
      length: this.length,
      duration: this.duration,
      numberOfChannels: this.numberOfChannels,
    };

    if (this.$context.VERBOSE_JSON) {
      json.data = this._.data.map((data) => {
        return Array.prototype.slice.call(data);
      });
    }

    return json;
  }
}
