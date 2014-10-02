"use strict";

var _ = require("./utils");

function AudioProcessingEvent() {
  Object.defineProperties(this, {
    $name: { value: "AudioProcessingEvent" }
  });
}
_.inherits(AudioProcessingEvent, global.AudioProcessingEvent);

module.exports = AudioProcessingEvent;
