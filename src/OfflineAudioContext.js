"use strict";

var _ = require("./utils");
var AudioBuffer = require("./AudioBuffer");
var AudioDestinationNode = require("./AudioDestinationNode");
var AudioListener = require("./AudioListener");
var OfflineAudioCompletionEvent = require("./OfflineAudioCompletionEvent");

function OfflineAudioContext(numberOfChannels, length, sampleRate) {
  _.check("OfflineAudioContext(numberOfChannels, length, sampleRate)", {
    numberOfChannels: { type: "number", given: numberOfChannels },
    length          : { type: "number", given: length           },
    sampleRate      : { type: "number", given: sampleRate       },
  });

  _.$read(this, "destination", new AudioDestinationNode(this));
  _.$read(this, "sampleRate", sampleRate);
  _.$read(this, "currentTime", function() { return this._currentTime; });
  _.$read(this, "listener", new AudioListener(this));
  _.$type(this, "oncomplete", "function");

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
    var e = new OfflineAudioCompletionEvent();

    e.renderedBuffer = new AudioBuffer(this, this._numberOfChannels, this._length, this.sampleRate);

    this.oncomplete(e);
  }
};

OfflineAudioContext.prototype.startRendering = function() {
  if (this._rendering) {
    throw new Error(_.format(
      "#{caption} must only be called one time", {
        caption: _.caption(this, "startRendering()")
      }
    ));
  }
  this._rendering = true;
};

module.exports = OfflineAudioContext;
