"use strict";

function nth(index) {
  index = index + 1;
  return { 1: "1st", 2: "2nd", 3: "3rd" }[index] || (index + "th");
}

module.exports = nth;
