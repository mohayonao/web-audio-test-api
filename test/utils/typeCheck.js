"use strict";

var typeCheck = require("../../src/utils/typeCheck");

describe("utils/type", function() {
  it("(value:any, type:string): boolean", function() {
    assert(typeCheck(true , "boolean") === true);
    assert(typeCheck(false, "boolean") === true);
    assert(typeCheck(0    , "boolean") === false);
    assert(typeCheck(1    , "boolean") === false);
    assert(typeCheck(""   , "boolean") === false);
    assert(typeCheck(null , "boolean") === false);

    assert(typeCheck(function() {}, "function") === true);
    assert(typeCheck("function"   , "function") === false);

    assert(typeCheck(10  , "number") === true);
    assert(typeCheck(NaN , "number") === false);
    assert(typeCheck("10", "number") === false);

    assert(typeCheck("10", "string") === true);
    assert(typeCheck(NaN , "string") === false);

    assert(typeCheck(null     , "null") === true);
    assert(typeCheck(undefined, "null") === false);

    assert(typeCheck(new Float32Array(0), "Float32Array") === true);
    assert(typeCheck(new Uint8Array(0)  , "Float32Array") === false);

    assert(typeCheck(new Uint8Array(0)  , "Uint8Array") === true);
    assert(typeCheck(new Float32Array(0), "Uint8Array") === false);

    assert(typeCheck(0   , "number | null") === true);
    assert(typeCheck(null, "number | null") === true);
    assert(typeCheck({}  , "number | null") === false);

    assert(typeCheck("sine"    , "enum { sine, square, sawtooth, triangle }") === true);
    assert(typeCheck("square"  , "enum { sine, square, sawtooth, triangle }") === true);
    assert(typeCheck("sawtooth", "enum { sine, square, sawtooth, triangle }") === true);
    assert(typeCheck("triangle", "enum { sine, square, sawtooth, triangle }") === true);
    assert(typeCheck("custom"  , "enum { sine, square, sawtooth, triangle }") === false);

    assert(typeCheck(256  , "enum { 256, 512, 2x }") === true);
    assert(typeCheck(512  , "enum { 256, 512, 2x }") === true);
    assert(typeCheck("2x" , "enum { 256, 512, 2x }") === true);
    assert(typeCheck("256", "enum { 256, 512, 2x }") === false);

    assert(typeCheck("", "") === false);
  });
});
