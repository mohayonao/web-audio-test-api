"use strict";

var _ = require("./utils");
var Inspector = require("./utils/Inspector");

function AudioBuffer(context, numberOfChannels, length, sampleRate) {
  _.defineAttribute(this, "sampleRate", "readonly", sampleRate, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "length", "readonly", length, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "duration", "readonly", length / sampleRate, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "numberOfChannels", "readonly", numberOfChannels, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });

  Object.defineProperties(this, {
    $name   : { value: "AudioBuffer" },
    $context: { value: context }
  });

  this._data = new Array(numberOfChannels);
  for (var i = 0; i < numberOfChannels; i++) {
    this._data[i] = new Float32Array(length);
  }
}
_.inherits(AudioBuffer, global.AudioBuffer);

function f32ToArray(f32) {
  var a = new Array(f32.length);
  for (var i = 0, imax = a.length; i < imax; ++i) {
    a[i] = f32[i];
  }
  return a;
}

AudioBuffer.prototype.toJSON = function() {
  var json = {
    name: this.$name,
    sampleRate: this.sampleRate,
    length: this.length,
    duration: this.duration,
    numberOfChannels: this.numberOfChannels
  };

  if (this.$context.VERBOSE_JSON) {
    json.data = this._data.map(f32ToArray);
  }

  return json;
};

AudioBuffer.prototype.getChannelData = function(channel) {
  var inspector = new Inspector(this, "getChannelData", [
    { name: "channel", type: "number" }
  ]);
  inspector.validateArguments(arguments, function(msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });
  inspector.assert(0 <= channel && channel < this._data.length, function() {
    throw new TypeError(
      inspector.form + "; channel index (" + channel + ") exceeds number of channels (#{" + this._data.length + "})"
    );
  });
  return this._data[channel];
};

module.exports = global.WebAudioTestAPI.AudioBuffer = AudioBuffer;
