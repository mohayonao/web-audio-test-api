"use strict";

var _ = require("./utils");

function AudioProcessingEvent(node) {
  Object.defineProperties(this, {
    $name: { value: "AudioProcessingEvent" }
  });
  Object.defineProperties(this, {
    $node: { value: node }
  });
}
_.inherits(AudioProcessingEvent, global.AudioProcessingEvent);

module.exports = AudioProcessingEvent;
