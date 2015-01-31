"use strict";

var MIN_VALUE = 0;
var MAX_VALUE = 24 * 60 * 60 * 1000 * 1000;

function toMicroseconds(time) {
  var value = 0;

  if (typeof time === "number") {
    // seconds -> microseconds
    value = Math.floor(time * 1000 * 1000) || 0;
    return Math.max(MIN_VALUE, Math.min(value, MAX_VALUE));
  }

  var matches = /^([0-5]\d):([0-5]\d)\.(\d\d\d)$/.exec(time);
  if (matches) {
    value += +matches[1]; // minutes
    value *= 60;
    value += +matches[2]; // seconds
    value *= 1000;
    value += +matches[3];  // milliseconds
    value *= 1000;
    return Math.max(MIN_VALUE, Math.min(value, MAX_VALUE));
  }

  return value;
}

module.exports = toMicroseconds;
