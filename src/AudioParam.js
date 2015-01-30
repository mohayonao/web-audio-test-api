"use strict";

var _ = require("./utils");
var Inspector = require("./utils/Inspector");

/* istanbul ignore else */
if (typeof global.AudioParam === "undefined") {
  global.AudioParam = function AudioParam() {
    throw new TypeError("Illegal constructor");
  };
}

function AudioParam(node, name, defaultValue, minValue, maxValue) {
  var context = node.context;

  _.defineAttribute(this, "name", "readonly", name, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "defaultValue", "readonly", defaultValue, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "minValue", "readonly", minValue, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "maxValue", "readonly", maxValue, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  Object.defineProperty(this, "value", {
    get: function() {
      this._value = this.$valueAtTime(context.currentTime);
      return this._value;
    },
    set: function(newValue) {
      if (_.typeCheck(newValue, "number")) {
        this._value = newValue;
      } else {
        var msg = "";

        msg += "type ";
        msg += _.formatter.shouldBeButGot("number", newValue);

        throw new TypeError(_.formatter.concat(this, msg));
      }
    },
    enumerable: true
  });

  Object.defineProperties(this, {
    $name   : { value: "AudioParam" },
    $context: { value: context },
    $node   : { value: node },
    $inputs : { value: [] },
    $events : { value: [] },
  });

  this._value = this.defaultValue;
  this._currentTime = -1;
}
_.inherits(AudioParam, global.AudioParam);

AudioParam.prototype.setValueAtTime = function(value, startTime) {
  var inspector = new Inspector(this, "setValueTime", [
    { name: "value"    , type: "number" },
    { name: "startTime", type: "number" },
  ]);

  inspector.validateArguments(arguments, function(msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });

  insertEvent(this, {
    type : "SetValue",
    value: value,
    time : startTime,
  });
};

AudioParam.prototype.linearRampToValueAtTime = function(value, endTime) {
  var inspector = new Inspector(this, "linearRampToValueAtTime", [
    { name: "value"  , type: "number" },
    { name: "endTime", type: "number" },
  ]);

  inspector.validateArguments(arguments, function(msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });

  insertEvent(this, {
    type : "LinearRampToValue",
    value: value,
    time : endTime,
  });
};

AudioParam.prototype.exponentialRampToValueAtTime = function(value, endTime) {
  var inspector = new Inspector(this, "exponentialRampToValueAtTime", [
    { name: "value"  , type: "number" },
    { name: "endTime", type: "number" },
  ]);

  inspector.validateArguments(arguments, function(msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });

  insertEvent(this, {
    type : "ExponentialRampToValue",
    value: value,
    time : endTime,
  });
};

AudioParam.prototype.setTargetAtTime = function(target, startTime, timeConstant) {
  var inspector = new Inspector(this, "setTargetAtTime", [
    { name: "target"      , type: "number" },
    { name: "startTime"   , type: "number" },
    { name: "timeConstant", type: "number" },
  ]);

  inspector.validateArguments(arguments, function(msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });

  insertEvent(this, {
    type : "SetTarget",
    value: target,
    time : startTime,
    timeConstant: timeConstant
  });
};

AudioParam.prototype.setValueCurveAtTime = function(values, startTime, duration) {
  var inspector = new Inspector(this, "setValueCurveAtTime", [
    { name: "values"   , type: "Float32Array" },
    { name: "startTime", type: "number" },
    { name: "duration" , type: "number" },
  ]);

  inspector.validateArguments(arguments, function(msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });

  insertEvent(this, {
    type : "SetValueCurve",
    time : startTime,
    duration: duration,
    curve: values
  });
};

AudioParam.prototype.cancelScheduledValues = function(startTime) {
  var inspector = new Inspector(this, "cancelScheduledValues", [
    { name: "startTime", type: "number" },
  ]);

  inspector.validateArguments(arguments, function(msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });

  var events = this.$events;

  for (var i = 0, imax = events.length; i < imax; ++i) {
    if (events[i].time >= startTime) {
      return events.splice(i);
    }
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

module.exports = global.WebAudioTestAPI.AudioParam = AudioParam;
