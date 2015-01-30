"use strict";

var name = require("./name");

function jsonCircularCheck(node, func, memo) {
  if (memo.indexOf(node) !== -1) {
    return "<circular:" + name(node) + ">";
  }
  memo.push(node);

  var result = func.call(node, memo);

  memo.pop();

  return result;
}

module.exports = jsonCircularCheck;
