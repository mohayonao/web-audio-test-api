"use strict";

var toMicroseconds = require("./toMicroseconds");

function toSeconds(time) {
  return toMicroseconds(time) / (1000 * 1000);
}

module.exports = toSeconds;
