"use strict";

var _ = require("./utils");
var Inspector = require("./utils/Inspector");
var AudioBuffer = require("./AudioBuffer");
var AudioDestinationNode = require("./AudioDestinationNode");
var AudioListener = require("./AudioListener");
var OfflineAudioCompletionEvent = require("./OfflineAudioCompletionEvent");

function OfflineAudioContext(numberOfChannels, length, sampleRate) {
  var inspector = new Inspector(this, null, [
    { name: "numberOfChannels", type: "number" },
    { name: "length"          , type: "number" },
    { name: "sampleRate"      , type: "number" },
  ]);

  inspector.validateArguments(arguments, function(msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });

  var destination = new AudioDestinationNode(this);
  var currentTime = function() { return this._currentTime; };
  var listener = new AudioListener(this);
  var oncomplete = null;

  _.defineAttribute(this, "destination", "readonly", destination, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "sampleRate", "readonly", sampleRate, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "currentTime", "readonly", currentTime, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "listener", "readonly", listener, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "oncomplete", "function|null", oncomplete, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });

  Object.defineProperties(this, {
    $name   : { value: "OfflineAudioContext" },
    $context: { value: this }
  });

  this._currentTime = 0;
  this._targetTime  = 0;
  this._remain = 0;

  this._numberOfChannels = numberOfChannels;
  this._length = length;
  this._processed = 0;
  this._rendering = false;
}
_.inherits(OfflineAudioContext, global.AudioContext);

OfflineAudioContext.prototype.$process = function(duration) {
  var dx;

  if (!this._rendering || this._length <= this._processed) {
    return;
  }

  this._targetTime += duration;

  while (this._currentTime < this._targetTime) {
    if (this._remain) {
      dx = this._remain;
      this._remain = 0;
    } else {
      dx = Math.min(_.CURRENT_TIME_INCR, this._targetTime - this._currentTime);
      this._remain = _.CURRENT_TIME_INCR - dx;
    }
    this.destination.$process(this._currentTime, this._currentTime + dx);
    this._currentTime = this._currentTime + dx;
    this._processed += _.BUFFER_SIZE * (dx / _.CURRENT_TIME_INCR);
  }

  if (this._length <= this._processed && this.oncomplete) {
    var e = new OfflineAudioCompletionEvent(this);

    e.renderedBuffer = new AudioBuffer(this, this._numberOfChannels, this._length, this.sampleRate);

    this.oncomplete(e);
  }
};

OfflineAudioContext.prototype.startRendering = function() {
  var inspector = new Inspector(this, "startRendering", []);

  inspector.assert(!this._rendering, function() {
    throw Error(inspector.form + "; must only be called one time");
  });

  this._rendering = true;
};

module.exports = OfflineAudioContext;
