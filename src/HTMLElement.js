"use strict";

var _ = require("./utils");
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

module.exports = global.WebAudioTestAPI.HTMLElement = HTMLElement;
