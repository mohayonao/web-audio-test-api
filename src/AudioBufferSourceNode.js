"use strict";

var _ = require("./utils");
var Inspector = require("./utils/Inspector");
var AudioNode = require("./AudioNode");
var AudioParam = require("./AudioParam");

function AudioBufferSourceNode(context) {
  AudioNode.call(this, {
    context: context,
    name: "AudioBufferSourceNode",
    jsonAttrs: [ "buffer", "playbackRate", "loop", "loopStart", "loopEnd" ],
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
_.inherits(AudioBufferSourceNode, global.AudioBufferSourceNode);

AudioBufferSourceNode.prototype.$stateAtTime = function(t) {
  if (this._startTime === Infinity) {
    return "UNSCHEDULED";
  } else if (t < this._startTime) {
    return "SCHEDULED";
  } else if (t < this._stopTime) {
    return "PLAYING";
  }
  return "FINISHED";
};

AudioBufferSourceNode.prototype._process = function(currentTime, nextCurrentTime) {
  if (!this._firedOnEnded) {
    if (!this.loop && this.buffer && this._startTime + this.buffer.duration <= nextCurrentTime) {
      this._stopTime = Math.min(this._startTime + this.buffer.duration, this._stopTime);
    }

    if (this.$stateAtTime(currentTime) === "FINISHED" && this.onended) {
      this.onended({});
      this._firedOnEnded = true;
    }
  }
};

AudioBufferSourceNode.prototype.start = function(when) {
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

AudioBufferSourceNode.prototype.stop = function(when) {
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

module.exports = global.WebAudioTestAPI.AudioBufferSourceNode = AudioBufferSourceNode;
