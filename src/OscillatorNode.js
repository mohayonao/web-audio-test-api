import AudioNode from "./AudioNode";
import PeriodicWave from "./PeriodicWave";
import Event from "./dom/Event";
import toSeconds from "./utils/toSeconds";
import * as props from "./decorators/props";
import * as methods from "./decorators/methods";
import * as validators from "./validators";

export default class OscillatorNode extends AudioNode {
  static $JSONKeys = [ "type", "frequency", "detune" ];

  constructor(admission, context) {
    super(admission, {
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

  @props.enums([ "sine", "square", "sawtooth", "triangle" ])
  type() {}

  @props.audioparam(440)
  frequency() {}

  @props.audioparam(0)
  detune() {}

  @props.on("ended")
  onended() {}

  @methods.param("[ when ]", validators.isPositiveNumber)
  @methods.contract({
    precondition() {
      if (this._.startTime !== Infinity) {
        throw new Error(`cannot start more than once`);
      }
    }
  })
  start(when = 0) {
    this._.startTime = when;
  }

  @methods.param("[ when ]", validators.isPositiveNumber)
  @methods.contract({
    precondition() {
      if (this._.startTime === Infinity) {
        throw new Error(`cannot call stop without calling start first`);
      }
      if (this._.stopTime !== Infinity) {
        throw new Error(`cannot stop more than once`);
      }
    }
  })
  stop(when = 0) {
    this._.stopTime = when;
  }

  @methods.param("periodicWave", validators.isInstanceOf(PeriodicWave))
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

  $stateAtTime(_time) {
    let time = toSeconds(_time);

    if (this._.startTime === Infinity) {
      return "UNSCHEDULED";
    }
    if (time < this._.startTime) {
      return "SCHEDULED";
    }
    if (time < this._.stopTime) {
      return "PLAYING";
    }

    return "FINISHED";
  }

  _process() {
    if (!this._.firedOnEnded && this.$stateAtTime(this.context.currentTime) === "FINISHED") {
      this.dispatchEvent(new Event("ended", this));
      this._.firedOnEnded = true;
    }
  }
}
