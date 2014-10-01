"use strict";

var _ = require("./utils");

function AudioProcessingEvent() {
  _.$read(this, "name", "AudioProcessingEvent");
}
_.inherits(AudioProcessingEvent, global.AudioProcessingEvent);

module.exports = AudioProcessingEvent;
