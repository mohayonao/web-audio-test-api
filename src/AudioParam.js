import * as util from "./util";
import Inspector from "./util/Inspector";

function insertEvent(that, event) {
  let time = event.time;
  let events = that.$events;
  let replace = 0;
  let i, imax = events.length;

  for (i = 0; i < imax; ++i) {
    if (events[i].time === time && events[i].type === event.type) {
      replace = 1;
      break;
    }

    if (events[i].time > time) {
      break;
    }
  }

  events.splice(i, replace, event);
}

function linTo(v, v0, v1, t, t0, t1) {
  let dt = (t - t0) / (t1 - t0);

  return (1 - dt) * v0 + dt * v1;
}

function expTo(v, v0, v1, t, t0, t1) {
  let dt = (t - t0) / (t1 - t0);

  return 0 < v0 && 0 < v1 ? v0 * Math.pow(v1 / v0, dt) : v;
}

function setTarget(v0, v1, t, t0, timeConstant) {
  return v1 + (v0 - v1) * Math.exp((t0 - t) / timeConstant);
}

function setCurveValue(v, t, t0, t1, curve) {
  let dt = (t - t0) / (t1 - t0);

  if (dt <= 0) {
    return util.defaults(curve[0], v);
  }

  if (1 <= dt) {
    return util.defaults(curve[curve.length - 1], v);
  }

  return util.defaults(curve[(curve.length * dt)|0], v);
}

export default class AudioParam {
  constructor(admission, node, name, defaultValue, minValue, maxValue) {
    util.immigration.check(admission, () => {
      throw new TypeError("Illegal constructor");
    });

    Object.defineProperty(this, "_", {
      value: {
        inspector: new Inspector(this),
      },
    });

    this._.value = defaultValue;
    this._.name = name;
    this._.defaultValue = defaultValue;
    this._.minValue = minValue;
    this._.maxValue = maxValue;
    this._.context = node.context;
    this._.node = node;
    this._.inputs = [];
    this._.events = [];
    this._.tick = -1;
  }

  get value() {
    this._.value = this.$valueAtTime(this.$context.currentTime);
    return this._.value;
  }

  set value(value) {
    this._.inspector.describe("value", (assert) => {
      assert(util.isNumber(value), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(value, "value", "number")}
        `);
      });
    });

    this._.value = value;
  }

  get name() {
    return this._.name;
  }

  set name(value) {
    this._.inspector.describe("name", (assert) => {
      assert.throwReadOnlyTypeError(value);
    });
  }

  get defaultValue() {
    return this._.defaultValue;
  }

  set defaultValue(value) {
    this._.inspector.describe("defaultValue", (assert) => {
      assert.throwReadOnlyTypeError(value);
    });
  }

  get $name() {
    return "AudioParam";
  }

  get $context() {
    return this._.context;
  }

  get $node() {
    return this._.node;
  }

  get $inputs() {
    return this._.inputs;
  }

  get $events() {
    return this._.events;
  }

  setValueAtTime(value, startTime) {
    this._.inspector.describe("setValueAtTime", (assert) => {
      assert(util.isNumber(value), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(value, "value", "number")}
        `);
      });

      assert(util.isNumber(startTime), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(startTime, "startTime", "number")}
        `);
      });
    });

    insertEvent(this, {
      type: "SetValue",
      value: value,
      time: startTime,
    });
  }

  linearRampToValueAtTime(value, endTime) {
    this._.inspector.describe("linearRampToValueAtTime", (assert) => {
      assert(util.isNumber(value), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(value, "value", "number")}
        `);
      });

      assert(util.isNumber(endTime), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(endTime, "endTime", "number")}
        `);
      });
    });

    insertEvent(this, {
      type: "LinearRampToValue",
      value: value,
      time: endTime,
    });
  }

  exponentialRampToValueAtTime(value, endTime) {
    this._.inspector.describe("exponentialRampToValueAtTime", (assert) => {
      assert(util.isNumber(value), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(value, "value", "number")}
        `);
      });

      assert(util.isNumber(endTime), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(endTime, "endTime", "number")}
        `);
      });
    });

    insertEvent(this, {
      type: "ExponentialRampToValue",
      value: value,
      time: endTime,
    });
  }

  setTargetAtTime(target, startTime, timeConstant) {
    this._.inspector.describe("setTargetAtTime", (assert) => {
      assert(util.isNumber(target), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(target, "target", "number")}
        `);
      });

      assert(util.isNumber(startTime), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(startTime, "startTime", "number")}
        `);
      });

      assert(util.isNumber(timeConstant), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(timeConstant, "timeConstant", "number")}
        `);
      });
    });

    insertEvent(this, {
      type: "SetTarget",
      value: target,
      time: startTime,
      timeConstant: timeConstant,
    });
  }

  setValueCurveAtTime(values, startTime, duration) {
    this._.inspector.describe("setValueCurveAtTime", (assert) => {
      assert(util.isInstanceOf(values, Float32Array), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(values, "values", "Float32Array")}
        `);
      });

      assert(util.isNumber(startTime), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(startTime, "startTime", "number")}
        `);
      });

      assert(util.isNumber(duration), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(duration, "duration", "number")}
        `);
      });
    });

    insertEvent(this, {
      type: "SetValueCurve",
      time: startTime,
      duration: duration,
      curve: values,
    });
  }

  cancelScheduledValues(startTime) {
    this._.inspector.describe("cancelScheduledValues", (assert) => {
      assert(util.isNumber(startTime), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(startTime, "startTime", "number")}
        `);
      });
    });

    let events = this.$events;

    for (let i = 0, imax = events.length; i < imax; ++i) {
      if (events[i].time >= startTime) {
        return events.splice(i);
      }
    }
  }

  toJSON(memo) {
    return util.toJSON(this, (node, memo) => {
      let json = {};

      json.value = node.value;

      json.inputs = node.$inputs.map(node => node.toJSON(memo));

      return json;
    }, memo);
  }

  $valueAtTime(_time) {
    let time = util.toSeconds(_time);

    let value = this._.value;
    let events = this.$events;
    let t0;

    for (let i = 0; i < events.length; i++) {
      let e0 = events[i];
      let e1 = events[i + 1];

      if (time < e0.time) {
        break;
      }
      t0 = Math.min(time, e1 ? e1.time : time);

      if (e1 && e1.type === "LinearRampToValue") {
        value = linTo(value, e0.value, e1.value, t0, e0.time, e1.time);
      } else if (e1 && e1.type === "ExponentialRampToValue") {
        value = expTo(value, e0.value, e1.value, t0, e0.time, e1.time);
      } else {
        switch (e0.type) {
        case "SetValue":
        case "LinearRampToValue":
        case "ExponentialRampToValue":
          value = e0.value;
          break;
        case "SetTarget":
          value = setTarget(value, e0.value, t0, e0.time, e0.timeConstant);
          break;
        case "SetValueCurve":
          value = setCurveValue(value, t0, e0.time, e0.time + e0.duration, e0.curve);
          break;
        default:
        // no default
        }
      }
    }

    return value;
  }

  $process(inNumSamples, tick) {
    if (this._.tick !== tick) {
      this._.tick = tick;
      this.$inputs.forEach((src) => {
        src.$process(inNumSamples, tick);
      });
    }
  }
}
