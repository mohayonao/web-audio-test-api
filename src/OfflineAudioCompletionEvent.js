"use strict";

var _ = require("./utils");
var WebAudioTestAPI = require("./WebAudioTestAPI");
var Event = require("./Event");

var OfflineAudioCompletionEventConstructor = function OfflineAudioCompletionEvent() {
  throw new TypeError("Illegal constructor");
};
_.inherits(OfflineAudioCompletionEventConstructor, Event);

function OfflineAudioCompletionEvent(node) {
  Event.call(this, "complete", node);
  Object.defineProperties(this, {
    $name: { value: "OfflineAudioCompletionEvent" },
    $node: { value: node }
  });
}
_.inherits(OfflineAudioCompletionEvent, OfflineAudioCompletionEventConstructor);

OfflineAudioCompletionEvent.exports = OfflineAudioCompletionEventConstructor;

module.exports = WebAudioTestAPI.OfflineAudioCompletionEvent = OfflineAudioCompletionEvent;
