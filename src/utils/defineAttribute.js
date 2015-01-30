"use strict";

var typeCheck = require("./typeCheck");
var formatter = require("./formatter");

function defineAttribute(instance, name, type, value, callback) {
  var spec = { enumerable: true };

  if (typeof value === "function") {
    type = "readonly";
    spec.get = value;
  } else {
    spec.get = function() {
      return value;
    };
  }

  if (type === "readonly") {
    spec.set = function() {
      callback.call(instance, name + " is readonly");
    };
  } else {
    spec.set = function(newValue) {
      if (!typeCheck(newValue, type)) {
        callback.call(instance, name + " " + formatter.shouldBeButGot(type, newValue));
      } else {
        value = newValue;
      }
    };
  }

  Object.defineProperty(instance, name, spec);
}

module.exports = defineAttribute;
