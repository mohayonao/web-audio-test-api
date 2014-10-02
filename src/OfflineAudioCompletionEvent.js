"use strict";

var _ = require("./utils");

function OfflineAudioCompletionEvent() {
  Object.defineProperties(this, {
    $name: { value: "OfflineAudioCompletionEvent" }
  });
}
_.inherits(OfflineAudioCompletionEvent, global.OfflineAudioCompletionEvent);

module.exports = OfflineAudioCompletionEvent;
