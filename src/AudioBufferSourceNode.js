import utils from "./utils";
import Immigration from "./utils/Immigration";
import AudioNode from "./AudioNode";
import Event from "./Event";
import * as props from "./decorators/props";

let immigration = Immigration.getInstance();

export default class AudioBufferSourceNode extends AudioNode {
  constructor(admission, context) {
    super(admission, {
      name: "AudioBufferSourceNode",
      context: context,
      numberOfInputs: 0,
      numberOfOutputs: 1,
      channelCount: 2,
      channelCountMode: "max",
      channelInterpretation: "speakers",
    });

    this._.buffer = null;
    this._.loop = false;
    this._.loopStart = 0;
    this._.loopEnd = 0;
    this._.startTime = Infinity;
    this._.stopTime = Infinity;
    this._.firedOnEnded = false;
    this._.JSONKeys = AudioBufferSourceNode.$JSONKeys.slice();
  }

  @props.typed(null, value => utils.isNullOrInstanceOf(value, global.AudioBuffer), "AudioBuffer")
  buffer() {}

  @props.audioparam(1)
  playbackRate() {}

  @props.audioparam(0)
  detune() {}

  @props.typed(false, utils.isBoolean, "boolean")
  loop() {}

  @props.typed(0, utils.isPositiveNumber, "positive number")
  loopStart() {}

  @props.typed(0, utils.isPositiveNumber, "positive number")
  loopEnd() {}

  @props.on("ended")
  onended() {}

  get $state() {
    return this.$stateAtTime(this.context.currentTime);
  }

  get $startTime() {
    return this._.startTime;
  }

  get $stopTime() {
    return this._.stopTime;
  }

  start(when, offset, duration) {
    if (arguments.length < 3) {
      duration = 0;
    }
    if (arguments.length < 2) {
      offset = 0;
    }
    if (arguments.length < 1) {
      when = 0;
    }

    this._.inspector.describe("start", [ "when", "offset", "duration" ], ($assert) => {
      $assert(utils.isPositiveNumber(when), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(when, "when", "positive number")}
        `);
      });

      $assert(utils.isPositiveNumber(offset), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(offset, "offset", "positive number")}
        `);
      });

      $assert(utils.isPositiveNumber(duration), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(duration, "duration", "positive number")}
        `);
      });

      $assert(this._.startTime === Infinity, (fmt) => {
        throw new Error(fmt.plain `
          ${fmt.form};
          cannot start more than once
        `);
      });
    });

    this._.startTime = when;
  }

  stop(when) {
    if (arguments.length < 1) {
      when = 0;
    }

    this._.inspector.describe("stop", [ "when" ], ($assert) => {
      $assert(utils.isPositiveNumber(when), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(when, "when", "positive number")}
        `);
      });

      $assert(this._.startTime !== Infinity, (fmt) => {
        throw new Error(fmt.plain `
          ${fmt.form};
          cannot call stop without calling start first
        `);
      });

      $assert(this._.stopTime === Infinity, (fmt) => {
        throw new Error(fmt.plain `
          ${fmt.form};
          cannot stop more than once
        `);
      });
    });

    this._.stopTime = when;
  }

  $stateAtTime(_time) {
    let time = utils.toSeconds(_time);

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

AudioBufferSourceNode.$JSONKeys = [
  "buffer",
  "playbackRate",
  "loop",
  "loopStart",
  "loopEnd",
];
