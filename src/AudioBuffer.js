import utils from "./utils";
import Configuration from "./utils/Configuration";
import Immigration from "./utils/Immigration";
import Inspector from "./utils/Inspector";

let configuration = Configuration.getInstance();
let immigration = Immigration.getInstance();

export default class AudioBuffer {
  constructor(admission, context, numberOfChannels, length, sampleRate) {
    immigration.check(admission, () => {
      throw new TypeError("Illegal constructor");
    });

    Object.defineProperty(this, "_", {
      value: {
        inspector: new Inspector(this),
      },
    });

    this._.inspector.describe("constructor", (assert) => {
      assert(utils.isPositiveInteger(numberOfChannels), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(numberOfChannels, "numberOfChannels", "positive integer")}
        `);
      });

      assert(utils.isPositiveInteger(length), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(length, "length", "positive integer")}
        `);
      });

      assert(utils.isPositiveInteger(sampleRate), (fmt) => {
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
      assert(utils.isPositiveInteger(channel), (fmt) => {
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

  copyFromChannel(destination, channelNumber, startInChannel = 0) {
    this._.inspector.describe("copyFromChannel", (assert) => {
      assert(configuration.getState("AudioBuffer#copyFromChannel") === "enabled", (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          not enabled
        `);
      });

      assert(utils.isInstanceOf(destination, Float32Array), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(destination, "destination", "Float32Array")}
        `);
      });

      assert(utils.isPositiveInteger(channelNumber), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(channelNumber, "channelNumber", "positive integer")}
        `);
      });

      assert(utils.isPositiveInteger(startInChannel), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(channelNumber, "startInChannel", "positive integer")}
        `);
      });

      assert(0 <= channelNumber && channelNumber < this._.data.length, (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          The channelNumber provided (${channelNumber}) is outside the range [0, ${this._.data.length})
        `);
      });

      assert(0 <= startInChannel && startInChannel < this._.length, (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          The startInChannel provided (${startInChannel}) is outside the range [0, ${this._.length}).
        `);
      });
    });

    let source = this._.data[channelNumber].subarray(startInChannel);

    destination.set(source.subarray(0, Math.min(source.length, destination.length)));
  }

  copyToChannel(source, channelNumber, startInChannel = 0) {
    this._.inspector.describe("copyToChannel", (assert) => {
      assert(configuration.getState("AudioBuffer#copyToChannel") === "enabled", (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          not enabled
        `);
      });

      assert(utils.isInstanceOf(source, Float32Array), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(source, "destination", "Float32Array")}
        `);
      });

      assert(utils.isPositiveInteger(channelNumber), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(channelNumber, "channelNumber", "positive integer")}
        `);
      });

      assert(utils.isPositiveInteger(startInChannel), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(channelNumber, "startInChannel", "positive integer")}
        `);
      });

      assert(0 <= channelNumber && channelNumber < this._.data.length, (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          The channelNumber provided (${channelNumber}) is outside the range [0, ${this._.data.length})
        `);
      });

      assert(0 <= startInChannel && startInChannel < this._.length, (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          The startInChannel provided (${startInChannel}) is outside the range [0, ${this._.length}).
        `);
      });
    });

    let clipped = source.subarray(0, Math.min(source.length, this._.length - startInChannel));

    this._.data[channelNumber].set(clipped, startInChannel);
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
