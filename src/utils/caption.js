"use strict";

var format = require("./format");
var id = require("./id");

module.exports = function(obj, method) {
  return format(
    "#{object}##{method}", {
      object: id(obj, true),
      method: method
    }
  );
};
