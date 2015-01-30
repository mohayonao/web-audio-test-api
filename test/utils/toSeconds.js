"use strict";

var toSeconds = require("../../src/utils/toSeconds");

describe("utils/toSeconds", function() {
  it("(time: number|string): number", function() {
    assert(toSeconds(1.500) === 1.500);
    assert(toSeconds(NaN) === 0);
    assert(toSeconds("00:00.250") === 0.250);
    assert(toSeconds("00:01.250") === 1.250);
    assert(toSeconds("01:01.250") === 61.250);
    assert(toSeconds(null) === 0);
  });
});
