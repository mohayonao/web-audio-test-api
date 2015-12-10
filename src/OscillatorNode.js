import utils from "./utils";
import Immigration from "./utils/Immigration";
import AudioNode from "./AudioNode";
import audioparam from "./decorators/audioparam";
import enumerate from "./decorators/enumerate";
import Event from "./Event";

let immigration = Immigration.getInstance();

export default class OscillatorNode extends AudioNode {
  constructor(admission, context) {
    super(admission, {
      name: "OscillatorNode",
      context: context,
      numberOfInputs: 0,
      numberOfOutputs: 1,
      channelCount: 2,
      channelCountMode: "max",
      channelInterpretation: "speakers",
    });

    this._.onended = null;
    this._.custom = null;
    this._.startTime = Infinity;
    this._.stopTime = Infinity;
    this._.firedOnEnded = false;
    this._.JSONKeys = OscillatorNode.$JSONKeys.slice();
  }

  @enumerate([ "sine", "square", "sawtooth", "triangle" ])
  type() {}

  @audioparam({ defaultValue: 440 })
  frequency() {}

  @audioparam({ defaultValue: 0 })
  detune() {}

  get onended() {
    return this._.onended;
  }

  set onended(value) {
    this._.inspector.describe("onended", ($assert) => {
      $assert(utils.isNullOrFunction(value), (fmt) => {
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

  get $custom() {
    return this._.custom;
  }

  get $startTime() {
    return this._.startTime;
  }

  get $stopTime() {
    return this._.stopTime;
  }

  start(when) {
    if (arguments.length < 1) {
      when = 0;
    }

    this._.inspector.describe("start", ($assert) => {
      $assert(utils.isPositiveNumber(when), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(when, "when", "positive number")}
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

    this._.inspector.describe("stop", ($assert) => {
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

  setPeriodicWave(periodicWave) {
    this._.inspector.describe("setPeriodicWave", ($assert) => {
      $assert(utils.isInstanceOf(periodicWave, global.PeriodicWave), (fmt) => {
        throw new TypeError(fmt.plain`
          ${fmt.form};
          ${fmt.butGot(periodicWave, "periodicWave", "PeriodicWave")}
        `);
      });
    });

    this._.type = "custom";
    this._.custom = periodicWave;
  }

  $stateAtTime(_time) {
    let time = utils.toSeconds(_time);

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

OscillatorNode.$JSONKeys = [
  "type",
  "frequency",
  "detune",
];
