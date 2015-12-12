import AudioNode from "./AudioNode";
import AudioBuffer from "./AudioBuffer";
import Event from "./dom/Event";
import toSeconds from "./utils/toSeconds";
import * as props from "./decorators/props";
import * as methods from "./decorators/methods";
import * as validators from "./validators";

export default class AudioBufferSourceNode extends AudioNode {
  static $JSONKeys = [ "buffer", "playbackRate", "loop", "loopStart", "loopEnd" ];

  constructor(admission, context) {
    super(admission, {
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

  @props.typed(validators.isNullOrInstanceOf(AudioBuffer), null)
  buffer() {}

  @props.audioparam(1)
  playbackRate() {}

  @props.audioparam(0)
  detune() {}

  @props.typed(validators.isBoolean, false)
  loop() {}

  @props.typed(validators.isPositiveNumber, 0)
  loopStart() {}

  @props.typed(validators.isPositiveNumber, 0)
  loopEnd() {}

  @props.on("ended")
  onended() {}

  @methods.param("[ when ]", validators.isPositiveNumber)
  @methods.param("[ offset ]", validators.isPositiveNumber)
  @methods.param("[ duration ]", validators.isPositiveNumber)
  @methods.contract({
    precondition() {
      if (this._.startTime !== Infinity) {
        throw new TypeError("cannot start more than once");
      }
    }
  })
  start(when = 0, offset = 0, duration = 0) {
    this._.startTime = when;
    this._.offset = offset;
    this._.duration = duration;
  }

  @methods.param("[ when ]", validators.isPositiveNumber)
  @methods.contract({
    precondition() {
      if (this._.startTime === Infinity) {
        throw new TypeError("cannot call stop without calling start first");
      }
      if (this._.stopTime !== Infinity) {
        throw new TypeError("cannot stop more than once");
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

  $stateAtTime(_time) {
    let time = toSeconds(_time);

    if (this._.startTime === Infinity) {
      return "UNSCHEDULED";
    }
    if (time < this._.startTime) {
      return "SCHEDULED";
    }

    let stopTime = this._.stopTime;

    if (!this.loop && this.buffer) {
      stopTime = Math.min(stopTime, this._.startTime + this.buffer.duration);
    }

    if (time < stopTime) {
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
