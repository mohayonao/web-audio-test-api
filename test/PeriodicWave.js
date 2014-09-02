/* global describe, it, expect, beforeEach */
"use strict";

require("../web-audio-mock");

describe("PeriodicWave", function() {
  var ctx = null;
  var f128 = new Float32Array(128);
  var f256 = new Float32Array(256);
  var f8192 = new Float32Array(8192);

  beforeEach(function() {
    ctx = new AudioContext();
  });

  describe("()", function() {
    it("throw illegal constructor", function() {
      expect(function() {
        return new PeriodicWave();
      }).to.throw(TypeError, "Illegal constructor");
    });
    it("throw error if length is not match", function() {
      expect(function() {
        ctx.createPeriodicWave(f128, f256);
      }).to.throw(Error, "must match");
    });
    it("throw error if length > 4096", function() {
      expect(function() {
        ctx.createPeriodicWave(f8192, f8192);
      }).to.throw(Error, "maximum of 4096");
    });
  });

});
