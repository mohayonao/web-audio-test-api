"use strict";

var format = require("./format");
var id = require("./id");
var article = require("./article");
var toS = require("./toS");

module.exports = function(obj, name, type, value) {
  var _value;
  Object.defineProperty(obj, name, {
    get: function() {
      return _value;
    },
    set: function(newValue) {
      var err = false;

      if (typeof type === "string") {
        if (typeof newValue !== type) {
          err = true;
        }
      } else if (newValue !== null && !(newValue instanceof type)) {
        err = true;
        type = type.constructor.name;
      }

      if (err) {
        throw new TypeError(format(
          "#{object}##{property} should be #{type}, but got #{given}", {
            object  : id(obj, true),
            property: name,
            type    : article(type),
            given   : toS(newValue)
          }
        ));
      }

      _value = newValue;
    },
    enumerable: true
  });
  if (typeof value === "undefined") {
    value = null;
  }
  obj[name] = value;
};
