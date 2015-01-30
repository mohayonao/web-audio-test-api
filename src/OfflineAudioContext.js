"use strict";

var _ = require("./utils");
var Inspector = require("./utils/Inspector");
var EventTarget = require("./EventTarget");
var AudioBuffer = require("./AudioBuffer");
var AudioDestinationNode = require("./AudioDestinationNode");
var AudioListener = require("./AudioListener");
var OfflineAudioCompletionEvent = require("./OfflineAudioCompletionEvent");

function OfflineAudioContext(numberOfChannels, length, sampleRate) {
  if (!(this instanceof OfflineAudioContext)) {
    throw new TypeError("Failed to construct 'AudioContext': Please use the 'new' operator");
  }

  EventTarget.call(this);

  var inspector = new Inspector(this, null, [
    { name: "numberOfChannels", type: "number" },
    { name: "length"          , type: "number" },
    { name: "sampleRate"      , type: "number" },
  ]);

  inspector.validateArguments(arguments, function(msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });

  var destination = new AudioDestinationNode(this);
  var currentTime = function() { return this._microCurrentTime / (1000 * 1000); };
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

  this._microCurrentTime = 0;
  this._processedSamples = 0;
  this._tick = 0;

  this._numberOfChannels = numberOfChannels;
  this._length = length;
  this._rendering = false;
}
_.inherits(OfflineAudioContext, global.AudioContext);

OfflineAudioContext.prototype.startRendering = function() {
  var inspector = new Inspector(this, "startRendering", []);

  inspector.assert(!this._rendering, function() {
    throw Error(inspector.form + "; must only be called one time");
  });

  this._rendering = true;
};

OfflineAudioContext.prototype._process = function(microseconds) {
  if (!this._rendering || this._length <= this._processedSamples) {
    return;
  }

  var nextMicroCurrentTime = this._microCurrentTime + microseconds;

  while (this._microCurrentTime < nextMicroCurrentTime) {
    var _nextMicroCurrentTime = Math.min(this._microCurrentTime + 1000, nextMicroCurrentTime);
    var _nextProcessedSamples = Math.floor(_nextMicroCurrentTime / (1000 * 1000) * this.sampleRate);
    var inNumSamples = _nextProcessedSamples - this._processedSamples;

    this.destination.$process(inNumSamples, ++this._tick);

    this._microCurrentTime = _nextMicroCurrentTime;
    this._processedSamples = _nextProcessedSamples;

    if (this._length <= this._processedSamples) {
      break;
    }
  }

  if (this._length <= this._processedSamples) {
    var event = new OfflineAudioCompletionEvent(this);

    event.renderedBuffer = new AudioBuffer(this, this._numberOfChannels, this._length, this.sampleRate);

    this.dispatchEvent(event);
  }
};

module.exports = global.WebAudioTestAPI.OfflineAudioContext = OfflineAudioContext;
