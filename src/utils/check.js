"use strict";

var format = require("./format");
var article = require("./article");
var toS = require("./toS");

var check = function(caption, spec) {
  Object.keys(spec).forEach(function(argName) {
    var type = spec[argName].type;
    var given = spec[argName].given;

    if (!check[type](given)) {
      throw new TypeError(format(
        "#{caption}: '#{name}' should be #{type}, but got #{given}", {
          caption: caption,
          name   : argName,
          type   : article(type),
          given  : toS(given)
        }
      ));
    }
  });
};

check.number = function isNumber(value) {
  return typeof value === "number" && !isNaN(value);
};
check.function = function isNumber(value) {
  return typeof value === "function";
};
check.ArrayBuffer = function(value) {
  return value instanceof ArrayBuffer;
};
check.Uint8Array = function isUint8Array(value) {
  return value instanceof Uint8Array;
};
check.Float32Array = function isFloat32Array(value) {
  return value instanceof Float32Array;
};
check.PeriodicWave = function(value) {
  return value instanceof PeriodicWave;
};

module.exports = check;
