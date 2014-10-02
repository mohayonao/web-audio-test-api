"use strict";

var format = require("./format");
var id = require("./id");

module.exports = function(obj, name, value) {
  Object.defineProperty(obj, name, {
    get: typeof value === "function" ? value : function() {
      return value;
    },
    set: function() {
      throw new Error(format(
        "#{object}##{property} is readonly", {
          object  : id(obj, true),
          property: name
        }
      ));
    },
    enumerable: true
  });
};
