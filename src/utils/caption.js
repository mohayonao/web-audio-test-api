"use strict";

var id = require("./id");

module.exports = function(obj, method) {
  return id(obj, true) + "#" + method;
};
