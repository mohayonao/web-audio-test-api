"use strict";

var argsCheck = require("../../src/utils/argsCheck");

describe("utils/argsCheck", function() {
  it("(args: any[], types: string[]): boolean", function() {
    assert(argsCheck([ 0, 0 ], [ "number", "number" ]) === -1);
    assert(argsCheck([ 0, 0 ], [ "string", "number" ]) === 0);
    assert(argsCheck([ 0, 0 ], [ "number", "string" ]) === 1);
    assert(argsCheck([ 0, 0 ], [ "string", "string" ]) === 0);
    assert(argsCheck([ 0, 0 ], [ "number", "number", "number" ]) === 2);
    assert(argsCheck([ 0, 0 ], [ "number", "number", "optional number" ]) === -1);
  });
});
