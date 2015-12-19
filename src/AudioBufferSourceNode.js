const dom = require("./dom");
const testapi = require("./testapi");
const utils = require("./utils");
const AudioNode = require("./AudioNode");
const AudioBuffer = require("./AudioBuffer");

module.exports = class AudioBufferSourceNode extends AudioNode {
  static $JSONKeys = [ "buffer", "playbackRate", "loop", "loopStart", "loopEnd" ];

  static $new(...args) {
    return utils.auth.request((token) => {
      return new AudioBufferSourceNode(token, ...args);
    });
  }

  constructor(token, context) {
    super(token, {
      name: "AudioBufferSourceNode",
      context: context,
      numberOfInputs: 0,
      numberOfOutputs: 1,
      channelCount: 2,
      channelCountMode: "max",
      channelInterpretation: "speakers"
    });
    this._.startTime = Infinity;
    this._.stopTime = Infinity;
    this._.firedOnEnded = false;
  }

  @testapi.props.typed(testapi.isNullOrInstanceOf(AudioBuffer), null)
  buffer() {}

  @testapi.props.audioparam(1)
  playbackRate() {}

  @testapi.props.audioparam(0)
  @testapi.versions({ chrome: "", firefox: "", safari: "" })
  detune() {}

  @testapi.props.typed(testapi.isBoolean, false)
  loop() {}

  @testapi.props.typed(testapi.isPositiveNumber, 0)
  loopStart() {}

  @testapi.props.typed(testapi.isPositiveNumber, 0)
  loopEnd() {}

  @testapi.props.typed(testapi.isNullOrInstanceOf(Function), null)
  onended() {}

  @testapi.methods.param("[ when ]", testapi.isPositiveNumber)
  @testapi.methods.param("[ offset ]", testapi.isPositiveNumber)
  @testapi.methods.param("[ duration ]", testapi.isPositiveNumber)
  @testapi.methods.contract({
    precondition() {
      if (this._.startTime !== Infinity) {
        throw new TypeError("Cannot start more than once.");
      }
    }
  })
  start(when = 0, offset = 0, duration = 0) {
    this._.startTime = when;
    this._.offset = offset;
    this._.duration = duration;
  }

  @testapi.methods.param("[ when ]", testapi.isPositiveNumber)
  @testapi.methods.contract({
    precondition() {
      if (this._.startTime === Infinity) {
        throw new TypeError("Cannot call stop without calling start first.");
      }
      if (this._.stopTime !== Infinity) {
        throw new TypeError("Cannot stop more than once.");
      }
    }
  })
  stop(when = 0) {
    this._.stopTime = when;
  }

  get $state() {
    return this.$stateAtTime(this.context.currentTime);
  }

  get $startTime() {
    return this._.startTime;
  }

  get $stopTime() {
    return this._.stopTime;
  }

  $stateAtTime(when) {
    const playbackTime = utils.toSeconds(when);

    if (this._.startTime === Infinity) {
      return "UNSCHEDULED";
    }
    if (playbackTime < this._.startTime) {
      return "SCHEDULED";
    }

    let stopTime = this._.stopTime;

    if (!this.loop && this.buffer) {
      stopTime = Math.min(stopTime, this._.startTime + this.buffer.duration);
    }

    if (playbackTime < stopTime) {
      return "PLAYING";
    }

    return "FINISHED";
  }

  __process() {
    if (!this._.firedOnEnded && this.$stateAtTime(this.context.currentTime) === "FINISHED") {
      this.dispatchEvent(new dom.Event("ended", this));
      this._.firedOnEnded = true;
    }
  }
};
