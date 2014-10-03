"use strict";

var format = require("./format");
var id = require("./id");
var article = require("./article");
var toS = require("./toS");

module.exports = function(obj, name, type, value) {
  var getter, setter;

  getter = function() {
    return obj["_" + name];
  };
  setter = function(newValue) {
    var err = false;

    if (typeof type === "string") {
      if (typeof newValue !== type) {
        err = true;
      }
    } else if (!(newValue instanceof type)) {
      err = true;
      type = type.constructor.name;
    }

    if (err) {
      throw new TypeError(format(
        "#{object}##{property} should be #{type}, but got #{given}", {
          object  : id(obj, true),
          property: name,
          type    : article(type) + " " + type,
          given   : toS(newValue)
        }
      ));
    }

    obj["_" + name] = newValue;
  };

  if (typeof type === "object") {
    getter = type.getter || /* istanbul ignore next */ getter;
    setter = type.setter || /* istanbul ignore next */ setter;
    type   = type.type;
  }

  Object.defineProperty(obj, name, {
    get: getter,
    set: setter,
    enumerable: true
  });
  obj["_" + name] = value;
};
