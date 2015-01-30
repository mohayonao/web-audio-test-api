"use strict";

function article(str) {
  return (/[aeiou]/i.test(str.charAt(0)) ? "an" : "a");
}

module.exports = article;
