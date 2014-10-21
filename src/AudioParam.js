"use strict";

var _ = require("./utils");

function AudioParam(node, name, defaultValue, minValue, maxValue) {
  var context = node.context;

  _.$read(this, "name", name);
  _.$read(this, "defaultValue", defaultValue);
  _.$read(this, "minValue", minValue);
  _.$read(this, "maxValue", maxValue);
  _.$type(this, "value", {
    type: "number",
    getter: function() {
      this._value = this.$valueAtTime(context.currentTime);
      return this._value;
    }
  }, defaultValue);

  Object.defineProperties(this, {
    $name   : { value: "AudioParam" },
    $context: { value: context },
    $node   : { value: node },
    $inputs : { value: [] },
    $events : { value: [] },
  });

  this._currentTime = -1;
}
_.inherits(AudioParam, global.AudioParam);

function linTo(v, v0, v1, t, t0, t1) {
  var dt = (t - t0) / (t1 - t0);
  return (1 - dt) * v0 + dt * v1;
}

function expTo(v, v0, v1, t, t0, t1) {
  var dt = (t - t0) / (t1 - t0);
  return 0 < v0 && 0 < v1 ? v0 * Math.pow(v1 / v0, dt) : /* istanbul ignore next */ v;
}

function setTarget(v0, v1, t, t0, timeConstant) {
  return v1 + (v0 - v1) * Math.exp((t0 - t) / timeConstant);
}

function setCurveValue(v, t, t0, t1, curve) {
  var dt = (t - t0) / (t1 - t0);

  if (dt <= 0) {
    return _.defaults(curve[0], v);
  }

  if (1 <= dt) {
    return _.defaults(curve[curve.length - 1], v);
  }

  return _.defaults(curve[(curve.length * dt)|0], v);
}

AudioParam.prototype.$valueAtTime = function(t) {
  var value  = this._value;
  var events = this.$events;
  var t0;

  for (var i = 0; i < events.length; i++) {
    var e0 = events[i];
    var e1 = events[i + 1];

    if (t < e0.time) {
      break;
    }
    t0 = Math.min(t, e1 ? e1.time : t);

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
      }
    }
  }

  return value;
};

AudioParam.prototype.$process = function(currentTime, nextCurrentTime) {
  /* istanbul ignore else */
  if (currentTime !== this._currentTime) {
    this._currentTime = currentTime;

    this.$inputs.forEach(function(src) {
      src.$process(currentTime, nextCurrentTime);
    });
  }
};

AudioParam.prototype.toJSON = function(memo) {
  return _.jsonCircularCheck(this, function(memo) {
    var json = {};

    json.value = this.value;

    json.inputs = this.$inputs.map(function(node) {
      return node.toJSON(memo);
    });

    return json;
  }, memo || /* istanbul ignore next */ []);
};

function insertEvent(_this, event) {
  var time = event.time;
  var events = _this.$events;
  var replace = 0;
  var i, imax = events.length;

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

AudioParam.prototype.setValueAtTime = function(value, startTime) {
  _.check("AudioParam#setValueAtTime(value, startTime)", {
    value    : { type: "number", given: value     },
    startTime: { type: "number", given: startTime },
  });
  insertEvent(this, {
    type : "SetValue",
    value: value,
    time : startTime,
  });
};

AudioParam.prototype.linearRampToValueAtTime = function(value, endTime) {
  _.check("AudioParam#linearRampToValueAtTime(value, endTime)", {
    value  : { type: "number", given: value   },
    endTime: { type: "number", given: endTime },
  });
  insertEvent(this, {
    type : "LinearRampToValue",
    value: value,
    time : endTime,
  });
};

AudioParam.prototype.exponentialRampToValueAtTime = function(value, endTime) {
  _.check("AudioParam#exponentialRampToValueAtTime(value, endTime)", {
    value  : { type: "number", given: value   },
    endTime: { type: "number", given: endTime },
  });
  insertEvent(this, {
    type : "ExponentialRampToValue",
    value: value,
    time : endTime,
  });
};

AudioParam.prototype.setTargetAtTime = function(target, startTime, timeConstant) {
  _.check("AudioParam#setTargetAtTime(target, startTime, timeConstant)", {
    target      : { type: "number", given: target       },
    startTime   : { type: "number", given: startTime    },
    timeConstant: { type: "number", given: timeConstant },
  });
  insertEvent(this, {
    type : "SetTarget",
    value: target,
    time : startTime,
    timeConstant: timeConstant
  });
};

AudioParam.prototype.setValueCurveAtTime = function(values, startTime, duration) {
  _.check("AudioParam#setValueCurveAtTime(values, startTime, duration)", {
    values   : { type: "Float32Array", given: values },
    startTime: { type: "number"      , given: startTime },
    duration : { type: "number"      , given: duration }
  });
  insertEvent(this, {
    type : "SetValueCurve",
    time : startTime,
    duration: duration,
    curve: values
  });
};

AudioParam.prototype.cancelScheduledValues = function(startTime) {
  _.check("AudioParam#cancelScheduledValues(startTime)", {
    startTime: { type: "number", given: startTime }
  });
  var events = this.$events;

  for (var i = 0, imax = events.length; i < imax; ++i) {
    if (events[i].time >= startTime) {
      return events.splice(i);
    }
  }
};

module.exports = AudioParam;
