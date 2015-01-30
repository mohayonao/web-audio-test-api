"use strict";

var toMicroseconds = require("../../src/utils/toMicroseconds");

describe("utils/toMicroseconds", function() {
  it("(time: number|string): number", function() {
    assert(toMicroseconds(1.5) === 1500000);
    assert(toMicroseconds(NaN) === 0);
    assert(toMicroseconds("00:00.250") === 250000);
    assert(toMicroseconds("00:01.250") === 1250000);
    assert(toMicroseconds("01:01.250") === 61250000);
    assert(toMicroseconds(null) === 0);
  });
});
