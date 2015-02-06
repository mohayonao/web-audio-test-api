"use strict";

var _ = require("./utils");
var Inspector = require("./utils/Inspector");
var WebAudioTestAPI = require("./WebAudioTestAPI");
var AudioNode = require("./AudioNode");
var AudioParam = require("./AudioParam");
var Event = require("./Event");

var AudioBufferSourceNodeConstructor = function AudioBufferSourceNode() {
  throw new TypeError("Illegal constructor: use audioContext.createBufferSource()");
};
_.inherits(AudioBufferSourceNodeConstructor, AudioNode);

function AudioBufferSourceNode(context) {
  AudioNode.call(this, context, {
    name: "AudioBufferSourceNode",
    numberOfInputs  : 0,
    numberOfOutputs : 1,
    channelCount    : 2,
    channelCountMode: "max",
    channelInterpretation: "speakers"
  });

  var buffer = null;
  var playbackRate = new AudioParam(this, "playbackRate", 1, 0, 1024);
  var loop = false;
  var loopStart = 0;
  var loopEnd = 0;
  var onended = null;

  _.defineAttribute(this, "buffer", "AudioBuffer|null", buffer, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "playbackRate", "readonly", playbackRate, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "loop", "boolean", loop, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "loopStart", "number", loopStart, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "loopEnd", "number", loopEnd, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "onended", "function|null", onended, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });

  Object.defineProperties(this, {
    $state: {
      get: function() {
        return this.$stateAtTime(this.context.currentTime);
      }
    }
  });

  this._startTime = Infinity;
  this._stopTime  = Infinity;
  this._firedOnEnded = false;
}
_.inherits(AudioBufferSourceNode, AudioBufferSourceNodeConstructor);

AudioBufferSourceNode.exports = AudioBufferSourceNodeConstructor;
AudioBufferSourceNode.jsonAttrs = [ "buffer", "playbackRate", "loop", "loopStart", "loopEnd" ];

AudioBufferSourceNodeConstructor.prototype.start = function(when) {
  var inspector = new Inspector(this, "start", [
    { name: "when", type: "optional number" },
    { name: "offset", type: "optional number" },
    { name: "duration", type: "optional number" },
  ]);

  inspector.validateArguments(arguments, function(msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });
  inspector.assert(this._startTime === Infinity, function() {
    throw new Error(inspector.form + "; cannot start more than once");
  });

  this._startTime = _.defaults(when, 0);
};

AudioBufferSourceNodeConstructor.prototype.stop = function(when) {
  var inspector = new Inspector(this, "stop", [
    { name: "when", type: "optional number" }
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

  this._stopTime = when;
};

AudioBufferSourceNode.prototype.$stateAtTime = function(time) {
  time = _.toSeconds(time);

  if (this._startTime === Infinity) {
    return "UNSCHEDULED";
  }
  if (time < this._startTime) {
    return "SCHEDULED";
  }

  var stopTime = this._stopTime;
  if (!this.loop && this.buffer) {
    stopTime = Math.min(stopTime, this._startTime + this.buffer.duration);
  }

  if (time < stopTime) {
    return "PLAYING";
  }

  return "FINISHED";
};

AudioBufferSourceNode.prototype._process = function() {
  if (!this._firedOnEnded && this.$stateAtTime(this.context.currentTime) === "FINISHED") {
    this.dispatchEvent(new Event("ended", this));
    this._firedOnEnded = true;
  }
};

module.exports = WebAudioTestAPI.AudioBufferSourceNode = AudioBufferSourceNode;
