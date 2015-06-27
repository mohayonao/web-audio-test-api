import utils from "./utils";
import Enumerator from "./utils/Enumerator";
import Immigration from "./utils/Immigration";
import EventTarget from "./EventTarget";

let immigration = Immigration.getInstance();

export default class AudioNode extends EventTarget {
  constructor(admission, spec) {
    super();

    immigration.check(admission, () => {
      throw new TypeError("Illegal constructor");
    });

    this._.context = spec.context;
    this._.name = utils.defaults(spec.name, "AudioNode");
    this._.numberOfInputs = utils.defaults(spec.numberOfInputs, 1);
    this._.numberOfOutputs = utils.defaults(spec.numberOfOutputs, 1);
    this._.channelCount = utils.defaults(spec.channelCount, 2);
    this._.channelCountMode = utils.defaults(spec.channelCountMode, "max");
    this._.channelInterpretation = utils.defaults(spec.channelInterpretation, "speakers");
    this._.JSONKeys = [];
    this._.inputs = [];
    this._.outputs = [];
    this._.tick = -1;
  }

  get context() {
    return this._.context;
  }

  set context(value) {
    this._.inspector.describe("context", (assert) => {
      assert.throwReadOnlyTypeError(value);
    });
  }

  get numberOfInputs() {
    return this._.numberOfInputs;
  }

  set numberOfInputs(value) {
    this._.inspector.describe("numberOfInputs", (assert) => {
      assert.throwReadOnlyTypeError(value);
    });
  }

  get numberOfOutputs() {
    return this._.numberOfOutputs;
  }

  set numberOfOutputs(value) {
    this._.inspector.describe("numberOfOutputs", (assert) => {
      assert.throwReadOnlyTypeError(value);
    });
  }

  get channelCount() {
    return this._.channelCount;
  }

  set channelCount(value) {
    this._.inspector.describe("channelCount", (assert) => {
      assert(utils.isPositiveInteger(value), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(value, "channelCount", "positive integer")}
        `);
      });
    });

    this._.channelCount = value;
  }

  get channelCountMode() {
    return this._.channelCountMode;
  }

  set channelCountMode(value) {
    this._.inspector.describe("channelCountMode", (assert) => {
      let enumChannelCountMode = new Enumerator([
        "max", "clamped-max", "explicit",
      ]);

      assert(enumChannelCountMode.contains(value), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(value, "channelCountMode", enumChannelCountMode.toString())}
        `);
      });
    });

    this._.channelCountMode = value;
  }

  get channelInterpretation() {
    return this._.channelInterpretation;
  }

  set channelInterpretation(value) {
    this._.inspector.describe("channelInterpretation", (assert) => {
      let enumChannelInterpretation = new Enumerator([
        "speakers", "discrete",
      ]);

      assert(enumChannelInterpretation.contains(value), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(value, "channelInterpretation", enumChannelInterpretation.toString())}
        `);
      });
    });

    this._.channelInterpretation = value;
  }

  get $name() {
    return this._.name;
  }

  get $context() {
    return this._.context;
  }

  get $inputs() {
    return this._.inputs;
  }

  connect(destination, output = 0, input = 0) {
    this._.inspector.describe("connect", (assert) => {
      assert(utils.isInstanceOf(destination, global.AudioNode) || utils.isInstanceOf(destination, global.AudioParam), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(destination, "destination", "AudioNode or an AudioParam")}
        `);
      });

      assert(this.$context === destination.$context, (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          cannot connect to a destination belonging to a different audio context
        `);
      });

      assert(utils.isPositiveInteger(output), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(output, "output", "positive integer")}
        `);
      });

      assert(utils.isPositiveInteger(input), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(input, "input", "positive integer")}
        `);
      });

      assert(output < this.numberOfOutputs, (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          output index (${output}) exceeds number of outputs (${this.numberOfOutputs})
        `);
      });

      assert(input < (destination.numberOfInputs || 1), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          input index (${input}) exceeds number of inputs (${destination.numberOfInputs || 1})
        `);
      });
    });

    let index = this._.outputs.indexOf(destination);

    if (index === -1) {
      this._.outputs.push(destination);
      destination.$inputs.push(this);
    }
  }

  disconnect(output = 0) {
    this._.inspector.describe("disconnect", (assert) => {
      assert(utils.isPositiveInteger(output), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(output, "output", "positive integer")}
        `);
      });

      assert(output < this.numberOfOutputs, (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          output index (${output}) exceeds number of outputs (${this.numberOfOutputs})
        `);
      });
    });

    this._.outputs.splice(0).forEach((dst) => {
      let index = dst.$inputs.indexOf(this);

      if (index !== -1) {
        dst.$inputs.splice(index, 1);
      }
    });
  }

  toJSON(memo) {
    function toJSON(obj, memo) {
      if (obj && typeof obj.toJSON === "function") {
        return obj.toJSON(memo);
      }
      return obj;
    }

    return utils.toJSON(this, (node, memo) => {
      let json = {};

      json.name = utils.toNodeName(node);

      node._.JSONKeys.forEach((key) => {
        json[key] = toJSON(node[key], memo);
      });

      if (node.$context.VERBOSE_JSON) {
        json.numberOfInputs = node.numberOfInputs;
        json.numberOfOutputs = node.numberOfOutputs;
        json.channelCount = node.channelCount;
        json.channelCountMode = node.channelCountMode;
        json.channelInterpretation = node.channelInterpretation;
      }

      json.inputs = node.$inputs.map(node => node.toJSON(memo));

      return json;
    }, memo);
  }

  $process(inNumSamples, tick) {
    if (this._.tick !== tick) {
      this._.tick = tick;
      this.$inputs.forEach((src) => {
        src.$process(inNumSamples, tick);
      });
      Object.keys(this._).forEach((key) => {
        if (this[key] instanceof global.AudioParam) {
          this[key].$process(inNumSamples, tick);
        }
      });
      if (this._process) {
        this._process(inNumSamples);
      }
    }
  }
}
