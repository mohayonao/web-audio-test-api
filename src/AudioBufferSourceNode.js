import utils from "./utils";
import Immigration from "./utils/Immigration";
import AudioNode from "./AudioNode";
import AudioParam from "./AudioParam";
import Event from "./Event";

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
    this._.playbackRate = immigration.apply(admission =>
      new AudioParam(admission, this, "playbackRate", 1, 0, 1024)
    );
    this._.loop = false;
    this._.loopStart = 0;
    this._.loopEnd = 0;
    this._.onended = null;
    this._.startTime = Infinity;
    this._.stopTime = Infinity;
    this._.firedOnEnded = false;
    this._.JSONKeys = AudioBufferSourceNode.$JSONKeys.slice();
  }

  get buffer() {
    return this._.buffer;
  }

  set buffer(value) {
    this._.inspector.describe("buffer", (assert) => {
      assert(utils.isNullOrInstanceOf(value, global.AudioBuffer), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(value, "buffer", "AudioBuffer")}
        `);
      });
    });

    this._.buffer = value;
  }

  get playbackRate() {
    return this._.playbackRate;
  }

  set playbackRate(value) {
    this._.inspector.describe("playbackRate", (assert) => {
      assert.throwReadOnlyTypeError(value);
    });
  }

  get loop() {
    return this._.loop;
  }

  set loop(value) {
    this._.inspector.describe("loop", (assert) => {
      assert(utils.isBoolean(value), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(value, "loop", "boolean")}
        `);
      });
    });

    this._.loop = value;
  }

  get loopStart() {
    return this._.loopStart;
  }

  set loopStart(value) {
    this._.inspector.describe("loopStart", (assert) => {
      assert(utils.isPositiveNumber(value), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(value, "loopStart", "positive number")}
        `);
      });
    });

    this._.loopStart = value;
  }

  get loopEnd() {
    return this._.loopEnd;
  }

  set loopEnd(value) {
    this._.inspector.describe("loopEnd", (assert) => {
      assert(utils.isPositiveNumber(value), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(value, "loopEnd", "positive number")}
        `);
      });
    });

    this._.loopEnd = value;
  }

  get onended() {
    return this._.onended;
  }

  set onended(value) {
    this._.inspector.describe("onended", (assert) => {
      assert(utils.isNullOrFunction(value), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(value, "onended", "function")}
        `);
      });
    });

    this._.onended = value;
  }

  get $state() {
    return this.$stateAtTime(this.context.currentTime);
  }

  start(when = 0, offset = 0, duration = 0) {
    this._.inspector.describe("start", [ "when", "offset", "duration" ], (assert) => {
      assert(utils.isPositiveNumber(when), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(when, "when", "positive number")}
        `);
      });

      assert(utils.isPositiveNumber(offset), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(offset, "offset", "positive number")}
        `);
      });

      assert(utils.isPositiveNumber(duration), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(duration, "duration", "positive number")}
        `);
      });

      assert(this._.startTime === Infinity, (fmt) => {
        throw new Error(fmt.plain `
          ${fmt.form};
          cannot start more than once
        `);
      });
    });

    this._.startTime = when;
  }

  stop(when = 0) {
    this._.inspector.describe("stop", [ "when" ], (assert) => {
      assert(utils.isPositiveNumber(when), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(when, "when", "positive number")}
        `);
      });

      assert(this._.startTime !== Infinity, (fmt) => {
        throw new Error(fmt.plain `
          ${fmt.form};
          cannot call stop without calling start first
        `);
      });

      assert(this._.stopTime === Infinity, (fmt) => {
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
