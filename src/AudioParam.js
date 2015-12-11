import Immigration from "./utils/Immigration";
import Junction from "./utils/Junction";
import defaults from "./utils/defaults";
import toJSON from "./utils/toJSON";
import toSeconds from "./utils/toSeconds";
import typed from "./decorators/props/typed";
import readonly from "./decorators/props/readonly";
import * as methods from "./decorators/methods";
import * as validators from "./validators";

let immigration = Immigration.getInstance();

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

export function linTo(v, v0, v1, t, t0, t1) {
  if (t <= t0) {
    return v0;
  }
  if (t1 <= t) {
    return v1;
  }
  let dt = (t - t0) / (t1 - t0);

  return (1 - dt) * v0 + dt * v1;
}

export function expTo(v, v0, v1, t, t0, t1) {
  if (t <= t0) {
    return v0;
  }
  if (t1 <= t) {
    return v1;
  }
  if (v0 === v1) {
    return v0;
  }

  let dt = (t - t0) / (t1 - t0);

  if ((0 < v0 && 0 < v1) || (v0 < 0 && v1 < 0)) {
    return v0 * Math.pow(v1 / v0, dt);
  }

  return v;
}

export function setTarget(v0, v1, t, t0, timeConstant) {
  if (t <= t0) {
    return v0;
  }
  return v1 + (v0 - v1) * Math.exp((t0 - t) / timeConstant);
}

export function setCurveValue(v, t, t0, t1, curve) {
  let dt = (t - t0) / (t1 - t0);

  if (dt <= 0) {
    return defaults(curve[0], v);
  }

  if (1 <= dt) {
    return defaults(curve[curve.length - 1], v);
  }

  return defaults(curve[(curve.length * dt)|0], v);
}

export default class AudioParam {
  constructor(admission, node, name, defaultValue) {
    immigration.check(admission, () => {
      throw new TypeError("Illegal constructor");
    });
    Object.defineProperty(this, "_", { value: {} });

    this._.value = defaultValue;
    this._.name = name;
    this._.defaultValue = defaultValue;
    this._.context = node.context;
    this._.node = node;
    this._.inputs = [ new Junction(this, 0) ];
    this._.events = [];
    this._.tick = -1;
  }

  @typed(validators.isNumber, 0)
  get value() {
    this._.value = this.$valueAtTime(this.$context.currentTime);
    return this._.value;
  }

  @readonly()
  name() {
    return this._.name;
  }

  @readonly()
  defaultValue() {
    return this._.defaultValue;
  }

  @methods.param("value", validators.isNumber)
  @methods.param("startTime", validators.isNumber)
  setValueAtTime(value, startTime) {
    insertEvent(this, {
      type: "SetValue",
      value: value,
      time: startTime
    });
  }

  @methods.param("value", validators.isNumber)
  @methods.param("endTime", validators.isNumber)
  linearRampToValueAtTime(value, endTime) {
    insertEvent(this, {
      type: "LinearRampToValue",
      value: value,
      time: endTime
    });
  }

  @methods.param("value", validators.isNumber)
  @methods.param("endTime", validators.isNumber)
  exponentialRampToValueAtTime(value, endTime) {
    insertEvent(this, {
      type: "ExponentialRampToValue",
      value: value,
      time: endTime
    });
  }

  @methods.param("value", validators.isNumber)
  @methods.param("endTime", validators.isNumber)
  @methods.param("timeConstant", validators.isNumber)
  setTargetAtTime(target, startTime, timeConstant) {
    insertEvent(this, {
      type: "SetTarget",
      value: target,
      time: startTime,
      timeConstant: timeConstant
    });
  }

  @methods.param("values", validators.isInstanceOf(Float32Array))
  @methods.param("startTime", validators.isNumber)
  @methods.param("duration", validators.isNumber)
  setValueCurveAtTime(values, startTime, duration) {
    insertEvent(this, {
      type: "SetValueCurve",
      time: startTime,
      duration: duration,
      curve: values
    });
  }

  @methods.param("startTime", validators.isNumber)
  cancelScheduledValues(startTime) {
    let events = this.$events;

    for (let i = 0, imax = events.length; i < imax; ++i) {
      if (events[i].time >= startTime) {
        return events.splice(i);
      }
    }
  }

  toJSON(memo) {
    return toJSON(this, (node, memo) => {
      let json = {};

      json.value = node.value;
      json.inputs = node.$inputs[0].toJSON(memo);

      return json;
    }, memo);
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

  $valueAtTime(_time) {
    let time = toSeconds(_time);

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
      this.$inputs[0].process(inNumSamples, tick);
    }
  }

  $isConnectedFrom(destination, output = 0) {
    if (!(destination instanceof global.AudioNode)) {
      return false;
    }

    let outputJunction = destination._.outputs[output];
    let inputJunction = this._.inputs[0];

    if (!outputJunction || !inputJunction) {
      return false;
    }

    return inputJunction.inputs.some(junction => junction === outputJunction);
  }
}
