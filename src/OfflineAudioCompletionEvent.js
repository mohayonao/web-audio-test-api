"use strict";

var _ = require("./utils");
var Event = require("./Event");

/* istanbul ignore else */
if (typeof global.OfflineAudioCompletionEvent === "undefined") {
  global.OfflineAudioCompletionEvent = function OfflineAudioCompletionEvent() {
    throw new TypeError("Illegal constructor");
  };
  _.inherits(global.OfflineAudioCompletionEvent, Event);
}

function OfflineAudioCompletionEvent(node) {
  Event.call(this, "complete", node);
  Object.defineProperties(this, {
    $name: { value: "OfflineAudioCompletionEvent" },
    $node: { value: node }
  });
}
_.inherits(OfflineAudioCompletionEvent, global.OfflineAudioCompletionEvent);

module.exports = global.WebAudioTestAPI.OfflineAudioCompletionEvent = OfflineAudioCompletionEvent;
