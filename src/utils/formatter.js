"use strict";

var article = require("../utils/article");
var pp = require("../utils/pp");

function methodForm(instance, methodName, argsInfo) {
  var msg = "";

  if (instance) {
    msg += instance.constructor.name;
    if (methodName) {
      msg += "#" + methodName;
    }
  } else {
    msg += methodName;
  }
  msg += "(";
  msg += argsInfo.map(function(info) {
    return info.name + ": " + info.type;
  }).join(", ");
  msg += ")";

  return msg;
}

function shouldBeButGot(type, value) {
  var msg = "";

  type = type.replace(/^optional\s*/, "").trim();

  msg += "should be " + article(type) + " " + type + ", ";
  msg += "but got: " + pp(value);

  return msg;
}

function concat(instance, msg) {
  return instance.constructor.name + "#" + msg;
}

module.exports = {
  methodForm: methodForm,
  shouldBeButGot: shouldBeButGot,
  concat: concat
};
