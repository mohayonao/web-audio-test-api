"use strict";

var _ = require("./utils");

function OfflineAudioCompletionEvent(node) {
  Object.defineProperties(this, {
    $name: { value: "OfflineAudioCompletionEvent" }
  });
  Object.defineProperties(this, {
    $node: { value: node }
  });
}
_.inherits(OfflineAudioCompletionEvent, global.OfflineAudioCompletionEvent);

module.exports = OfflineAudioCompletionEvent;
