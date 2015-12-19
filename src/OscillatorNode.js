const dom = require("./dom");
const testapi = require("./testapi");
const utils = require("./utils");
const AudioNode = require("./AudioNode");
const PeriodicWave = require("./PeriodicWave");

module.exports = class OscillatorNode extends AudioNode {
  static $JSONKeys = [ "type", "frequency", "detune" ];

  static $new(...args) {
    return utils.auth.request((token) => {
      return new OscillatorNode(token, ...args);
    });
  }

  constructor(token, context) {
    super(token, {
      name: "OscillatorNode",
      context: context,
      numberOfInputs: 0,
      numberOfOutputs: 1,
      channelCount: 2,
      channelCountMode: "max",
      channelInterpretation: "speakers"
    });
    this._.custom = null;
    this._.startTime = Infinity;
    this._.stopTime = Infinity;
    this._.firedOnEnded = false;
  }

  @testapi.props.typed(testapi.isEnum([ "sine", "square", "sawtooth", "triangle" ]), "sine")
  type() {}

  @testapi.props.audioparam(440)
  frequency() {}

  @testapi.props.audioparam(0)
  detune() {}

  @testapi.props.on("ended")
  onended() {}

  @testapi.methods.param("[ when ]", testapi.isPositiveNumber)
  @testapi.methods.contract({
    precondition() {
      if (this._.startTime !== Infinity) {
        throw new Error("Cannot start more than once.");
      }
    }
  })
  start(when = 0) {
    this._.startTime = when;
  }

  @testapi.methods.param("[ when ]", testapi.isPositiveNumber)
  @testapi.methods.contract({
    precondition() {
      if (this._.startTime === Infinity) {
        throw new Error("Cannot call stop without calling start first.");
      }
      if (this._.stopTime !== Infinity) {
        throw new Error("Cannot stop more than once.");
      }
    }
  })
  stop(when = 0) {
    this._.stopTime = when;
  }

  @testapi.methods.param("periodicWave", testapi.isInstanceOf(PeriodicWave))
  setPeriodicWave(periodicWave) {
    this._.type = "custom";
    this._.custom = periodicWave;
  }

  get $state() {
    return this.$stateAtTime(this.context.currentTime);
  }

  get $custom() {
    return this._.custom;
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
    if (playbackTime < this._.stopTime) {
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
