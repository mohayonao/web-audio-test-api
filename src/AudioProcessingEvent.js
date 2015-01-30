"use strict";

var _ = require("./utils");
var Event = require("./Event");

/* istanbul ignore else */
if (typeof global.AudioProcessingEvent === "undefined") {
  global.AudioProcessingEvent = function AudioProcessingEvent() {
    throw new TypeError("Illegal constructor");
  };
  _.inherits(global.AudioProcessingEvent, Event);
}

function AudioProcessingEvent(node) {
  Event.call(this, "audioprocess", node);
  Object.defineProperties(this, {
    $name: { value: "AudioProcessingEvent" },
    $node: { value: node }
  });
}
_.inherits(AudioProcessingEvent, global.AudioProcessingEvent);

module.exports = global.WebAudioTestAPI.AudioProcessingEvent = AudioProcessingEvent;
