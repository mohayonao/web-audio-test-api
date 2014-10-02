"use strict";

module.exports = function(obj, wrapping) {
  if (obj.hasOwnProperty("$id")) {
    if (wrapping) {
      return "(" + obj.$name + "#" + obj.$id + ")";
    }
    return obj.$name + "#" + obj.$id;
  }
  return obj.$name;
};
