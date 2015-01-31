"use strict";

var _ = require("./utils");
var WebAudioTestAPI = require("./WebAudioTestAPI");
var EventTarget = require("./EventTarget");

/* istanbul ignore else */
if (typeof global.MediaStream === "undefined") {
  global.MediaStream = function MediaStream() {
    throw new TypeError("Illegal constructor");
  };
  _.inherits(global.MediaStream, EventTarget);
}

function MediaStream() {
}
_.inherits(MediaStream, global.MediaStream);

module.exports = WebAudioTestAPI.MediaStream = MediaStream;
