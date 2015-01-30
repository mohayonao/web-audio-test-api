"use strict";

var typeCheck = require("./typeCheck");

function argsCheck(args, types) {
  types = types.filter(function(type, index) {
    return !(/^optional/.test(type) && args.length <= index);
  });

  types = types.map(function(type) {
    return type.replace(/^optional\s*/, "");
  });

  for (var i = 0, imax = types.length; i < imax; i++) {
    if (!typeCheck(args[i], types[i])) {
      return i;
    }
  }

  return -1;
}

module.exports = argsCheck;
