"use strict";

module.exports = function(fmt, dict) {
  var msg = fmt;

  Object.keys(dict).forEach(function(key) {
    msg = msg.replace(new RegExp("#\\{" + key + "\\}", "g"), dict[key]);
  });

  return msg;
};
