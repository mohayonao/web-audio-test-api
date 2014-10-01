"use strict";

var _ = require("./utils");

function AudioBuffer(context, numberOfChannels, length, sampleRate) {
  _.check("AudioBuffer(numerOfChannels, length, sampleRate)", {
    numberOfChannels: { type: "number", given: numberOfChannels },
    length          : { type: "number", given: length           },
    sampleRate      : { type: "number", given: sampleRate       },
  });
  _.$read(this, "context", context);
  _.$read(this, "name", "AudioBuffer");
  _.$read(this, "sampleRate", sampleRate);
  _.$read(this, "length", length);
  _.$read(this, "duration", length / sampleRate);
  _.$read(this, "numberOfChannels", numberOfChannels);

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
    name: this.name,
    sampleRate: this.sampleRate,
    length: this.length,
    duration: this.duration,
    numberOfChannels: this.numberOfChannels
  };

  if (this.context.VERBOSE_JSON) {
    json.data = this._data.map(f32ToArray);
  }

  return json;
};

AudioBuffer.prototype.getChannelData = function(channel) {
  if (0 <= channel && channel < this._data.length) {
    return this._data[channel];
  }
  throw new Error(_.format(
    "#{caption}: channel index (#{index}) exceeds number of channels (#{length})", {
      caption: _.caption(this, "getChannelData(channel)"),
      index  : channel,
      length : this._data.length
    }
  ));
};

module.exports = AudioBuffer;
