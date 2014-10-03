"use strict";

var format = require("./format");
var id = require("./id");
var toS = require("./toS");

module.exports = function(obj, name, list, value) {
  var strList = "[ " + list.join(", ") + " ]";
  Object.defineProperty(obj, name, {
    get: function() {
      return obj["_" + name];
    },
    set: function(newValue) {
      if (list.indexOf(newValue) === -1) {
        throw new TypeError(format(
          "#{object}##{property} should be any #{list}, but got #{given}", {
            object  : id(obj, true),
            property: name,
            list    : strList,
            given   : toS(newValue)
          }
        ));
      }
      obj["_" + name] = newValue;
    },
    enumerable: true
  });
  obj["_" + name] = value;
};
