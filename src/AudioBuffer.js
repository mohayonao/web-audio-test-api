"use strict";

var _ = require("./utils");
var Inspector = require("./utils/Inspector");

/* istanbul ignore else */
if (typeof global.AudioBuffer === "undefined") {
  global.AudioBuffer = function AudioBuffer() {
    throw new TypeError("Illegal constructor: use audioContext.createBuffer(numberOfChannels: number, length: number, sampleRate: number)");
  };
}

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

AudioBuffer.prototype.toJSON = function() {
  var json = {
    name: this.$name,
    sampleRate: this.sampleRate,
    length: this.length,
    duration: this.duration,
    numberOfChannels: this.numberOfChannels
  };

  if (this.$context.VERBOSE_JSON) {
    json.data = this._data.map(function(data) {
      return Array.prototype.slice.call(data);
    });
  }

  return json;
};

module.exports = global.WebAudioTestAPI.AudioBuffer = AudioBuffer;
