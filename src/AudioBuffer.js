import Immigration from "./utils/Immigration";
import versions from "./decorators/versions";
import * as props from "./decorators/props";
import * as methods from "./decorators/methods";
import * as validators from "./validators";

export default class AudioBuffer {
  static $new(...args) {
    return Immigration.getInstance().
      apply(admission => new AudioBuffer(admission, ...args));
  }

  constructor(admission, context, numberOfChannels, length, sampleRate) {
    Immigration.getInstance().
      check(admission, () => { throw new TypeError("Illegal constructor"); });
    Object.defineProperty(this, "_", { value: {} });

    this._.context = context;
    this._.numberOfChannels = +numberOfChannels|0;
    this._.length = +length|0;
    this._.sampleRate = +sampleRate|0;
    this._.data = new Array(numberOfChannels);

    for (let i = 0; i < numberOfChannels; i++) {
      this._.data[i] = new Float32Array(length);
    }
  }

  @props.readonly()
  sampleRate() {
    return this._.sampleRate;
  }

  @props.readonly()
  length() {
    return this._.length;
  }

  @props.readonly()
  duration() {
    return this.length / this.sampleRate;
  }

  @props.readonly()
  numberOfChannels() {
    return this._.numberOfChannels;
  }

  @methods.param("channel", validators.isPositiveInteger)
  @methods.contract({
    precondition(channel) {
      if (this._.data.length <= channel) {
        throw new TypeError(`
          The {{channel}} index (${channel}) exceeds number of channels (${this._.data.length}).`
        );
      }
    }
  })
  @methods.returns(validators.isInstanceOf(Float32Array))
  getChannelData(channel) {
    return this._.data[channel];
  }

  @methods.param("destination", validators.isInstanceOf(Float32Array))
  @methods.param("channelNumber", validators.isPositiveInteger)
  @methods.param("[ startInChannel ]", validators.isPositiveInteger)
  @methods.contract({
    precondition(destination, channelNumber, startInChannel = 0) {
      if (this._.data.length <= channelNumber) {
        throw new TypeError(`
          The {{channelNumber}} provided (${channelNumber}) is outside the range [0, ${this._.data.length}).`
        );
      }
      if (this._.length <= startInChannel) {
        throw new TypeError(`
          The {{startInChannel}} provided (${startInChannel}) is outside the range [0, ${this._.length}).`
        );
      }
    }
  })
  @versions({ chrome: "43-", firefox: "27-", safari: "none" })
  copyFromChannel(destination, channelNumber, startInChannel = 0) {
    let source = this._.data[channelNumber].subarray(startInChannel);

    destination.set(source.subarray(0, Math.min(source.length, destination.length)));
  }

  @methods.param("source", validators.isInstanceOf(Float32Array))
  @methods.param("channelNumber", validators.isPositiveInteger)
  @methods.param("[ startInChannel ]", validators.isPositiveInteger)
  @methods.contract({
    precondition(source, channelNumber, startInChannel = 0) {
      if (this._.data.length <= channelNumber) {
        throw new TypeError(
          `The {{channelNumber}} provided (${channelNumber}) is outside the range [0, ${this._.data.length}).`
        );
      }
      if (this._.length <= startInChannel) {
        throw new TypeError(
          `The {{startInChannel}} provided (${startInChannel}) is outside the range [0, ${this._.length}).`
        );
      }
    }
  })
  @versions({ chrome: "43-", firefox: "27-", safari: "none" })
  copyToChannel(source, channelNumber, startInChannel = 0) {
    let clipped = source.subarray(0, Math.min(source.length, this._.length - startInChannel));

    this._.data[channelNumber].set(clipped, startInChannel);
  }

  toJSON() {
    let json = {
      name: this.$name,
      sampleRate: this.sampleRate,
      length: this.length,
      duration: this.duration,
      numberOfChannels: this.numberOfChannels
    };

    if (this.$context.VERBOSE_JSON) {
      json.data = this._.data.map((data) => {
        return Array.prototype.slice.call(data);
      });
    }

    return json;
  }

  get $name() {
    return "AudioBuffer";
  }

  get $context() {
    return this._.context;
  }
}
