"use strict";

var _ = require("./utils");
var WebAudioTestAPI = require("./WebAudioTestAPI");
var EventTarget = require("./EventTarget");

/* istanbul ignore else */
if (typeof global.Element === "undefined") {
  global.Element = function Element() {
    throw new TypeError("Illegal constructor");
  };
  _.inherits(global.Element, EventTarget);
}

function Element() {
}
_.inherits(Element, global.Element);

module.exports = WebAudioTestAPI.Element = Element;
