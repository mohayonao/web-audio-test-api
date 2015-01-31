"use strict";

var _ = require("./utils");
var WebAudioTestAPI = require("./WebAudioTestAPI");
var Element = require("./Element");

/* istanbul ignore else */
if (typeof global.HTMLElement === "undefined") {
  global.HTMLElement = function HTMLElement() {
    throw new TypeError("Illegal constructor");
  };
  _.inherits(global.HTMLElement, Element);
}

function HTMLElement() {
}
_.inherits(HTMLElement, global.HTMLElement);

module.exports = WebAudioTestAPI.HTMLElement = HTMLElement;
