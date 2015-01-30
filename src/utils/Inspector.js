"use strict";

var argsCheck = require("./argsCheck");
var formatter = require("./formatter");
var nth = require("./nth");

function Inspector(instance, methodName, argsInfo) {
  this.instance = instance;
  this.argsInfo = argsInfo;
  this.form = formatter.methodForm(instance, methodName, argsInfo);
}

Inspector.prototype.validateArguments = function(args, callback) {
  var errIndex = argsCheck(args, this.argsInfo.map(function(info) {
    return info.type;
  }));
  var msg = "";
  if (errIndex !== -1) {
    msg += "the " + nth(errIndex) + " argument ";
    msg += formatter.shouldBeButGot(this.argsInfo[errIndex].type, args[errIndex]);
    callback.call(this.instance, msg);
  }
  this.argsInfo.forEach(function(info, index) {
    var msg = info.validate && info.validate.call(this.instance, args[index], this.argsInfo[index].name);
    if (msg) {
      callback.call(this.instance, msg);
    }
  }, this);
};

Inspector.prototype.assert = function(test, callback) {
  if (!test) {
    callback.call(this.instance);
  }
};

module.exports = Inspector;
