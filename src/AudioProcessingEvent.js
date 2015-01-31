"use strict";

var _ = require("./utils");
var WebAudioTestAPI = require("./WebAudioTestAPI");
var Event = require("./Event");

var AudioProcessingEventConstructor = function AudioProcessingEvent() {
  throw new TypeError("Illegal constructor");
};
_.inherits(AudioProcessingEventConstructor, Event);

function AudioProcessingEvent(node) {
  Event.call(this, "audioprocess", node);
  Object.defineProperties(this, {
    $name: { value: "AudioProcessingEvent" },
    $node: { value: node }
  });
}
_.inherits(AudioProcessingEvent, AudioProcessingEventConstructor);

AudioProcessingEvent.exports = AudioProcessingEventConstructor;

module.exports = WebAudioTestAPI.AudioProcessingEvent = AudioProcessingEvent;
