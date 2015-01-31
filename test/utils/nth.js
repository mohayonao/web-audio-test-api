"use strict";

var nth = require("../../src/utils/nth");

describe("utils/nth", function() {
  it("(value: number): string", function() {
    assert(nth(0) === "1st");
    assert(nth(1) === "2nd");
    assert(nth(2) === "3rd");
    assert(nth(3) === "4th");
    assert(nth(4) === "5th");
  });
});
