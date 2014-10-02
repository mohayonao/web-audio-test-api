"use strict";

var _ = require("./utils");

function OfflineAudioCompletionEvent() {
  this.$name = "OfflineAudioCompletionEvent";
}
_.inherits(OfflineAudioCompletionEvent, global.OfflineAudioCompletionEvent);

module.exports = OfflineAudioCompletionEvent;
