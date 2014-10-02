"use strict";

var id = require("./id");

module.exports = function(node, func, memo) {
  if (memo.indexOf(node) !== -1) {
    return "<circular:" + id(node) + ">";
  }
  memo.push(node);

  var result = func.call(node, memo);

  memo.pop();

  return result;
};
