"use strict";

module.exports = function(str) {
  return (/[aeiou]/i.test(str.charAt(0)) ? "an" : "a");
};
