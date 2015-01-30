"use strict";

var _ = require("./utils");
var Inspector = require("./utils/Inspector");
var AudioNode = require("./AudioNode");
var AudioParam = require("./AudioParam");

function OscillatorNode(context) {
  AudioNode.call(this, {
    context: context,
    name: "OscillatorNode",
    jsonAttrs:  [ "type", "frequency", "detune" ],
    numberOfInputs  : 0,
    numberOfOutputs : 1,
    channelCount    : 2,
    channelCountMode: "max",
    channelInterpretation: "speakers"
  });

  _.$enum(this, "type", [ "sine", "square", "sawtooth", "triangle" ], "sine");
  _.$read(this, "frequency", new AudioParam(this, "frequency", 440, 0, 100000));
  _.$read(this, "detune", new AudioParam(this, "detune", 0, -4800, 4800));
  _.$type(this, "onended", "function", null);

  Object.defineProperties(this, {
    $state: {
      get: function() {
        return this.$stateAtTime(this.context.currentTime);
      }
    },
    $custom: {
      get: function() {
        return this._custom;
      }
    }
  });

  this._custom = null;
  this._startTime = Infinity;
  this._stopTime  = Infinity;
  this._firedOnEnded = false;
}
_.inherits(OscillatorNode, global.OscillatorNode);

OscillatorNode.prototype.$stateAtTime = function(t) {
  if (this._startTime === Infinity) {
    return "UNSCHEDULED";
  } else if (t < this._startTime) {
    return "SCHEDULED";
  } else if (t < this._stopTime) {
    return "PLAYING";
  }
  return "FINISHED";
};

OscillatorNode.prototype._process = function(currentTime) {
  if (!this._firedOnEnded && this.$stateAtTime(currentTime) === "FINISHED" && this.onended) {
    this.onended({});
    this._firedOnEnded = true;
  }
};

OscillatorNode.prototype.start = function(when) {
  var inspector = new Inspector(this, "start", [
    { name: "when", type: "optional number" },
  ]);

  inspector.validateArguments(arguments, function(msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });
  inspector.assert(this._startTime === Infinity, function() {
    throw new Error(inspector.form + "; cannot start more than once");
  });

  this._startTime = _.defaults(when, 0);
};

OscillatorNode.prototype.stop = function(when) {
  var inspector = new Inspector(this, "stop", [
    { name: "when", type: "optional number" },
  ]);

  inspector.validateArguments(arguments, function(msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });
  inspector.assert(this._startTime !== Infinity, function() {
    throw new Error(inspector.form + "; cannot call stop without calling start first");
  });
  inspector.assert(this._stopTime === Infinity, function() {
    throw new Error(inspector.form + "; cannot stop more than once");
  });

  this._stopTime = _.defaults(when, 0);
};

OscillatorNode.prototype.setPeriodicWave = function(periodicWave) {
  var inspector = new Inspector(this, "setPeriodicWave", [
    { name: "periodicWave", type: "PeriodicWave" },
  ]);

  inspector.validateArguments(arguments, function(msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });

  this._type = "custom";
  this._custom = periodicWave;
};

module.exports = OscillatorNode;
