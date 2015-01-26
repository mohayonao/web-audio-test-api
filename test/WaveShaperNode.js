"use strict";

describe("WaveShaperNode", function() {
  var ctx = null;
  var node = null;

  beforeEach(function() {
    ctx = new global.AudioContext();
    node = ctx.createWaveShaper();
  });

  describe("()", function() {
    it("throw illegal constructor", function() {
      assert.throws(function() {
        return new global.WaveShaperNode();
      }, TypeError, "Illegal constructor");
    });
    it("should have been inherited from AudioNode", function() {
      assert(node instanceof global.AudioNode);
    });
  });

  describe("#curve", function() {
    it("should be exist", function() {
      assert(node.curve === null);
    });
    it("should be a Float32Array", function() {
      assert.doesNotThrow(function() {
        node.curve = new Float32Array(64);
      });
      assert.throws(function() {
        node.curve = "INVALID";
      }, TypeError);
    });
  });

  describe("#oversample", function() {
    it("should be exist", function() {
      assert(typeof node.oversample === "string");
    });
    it("should be an enum", function() {
      assert.doesNotThrow(function() {
        node.oversample = "2x";
      });
      assert.throws(function() {
        node.oversample = "INVALID";
      }, TypeError);
    });
  });

  describe("#toJSON()", function() {
    it("return json", function() {
      assert.deepEqual(node.toJSON(), {
        name: "WaveShaperNode",
        oversample: "none",
        inputs: []
      });
    });
  });

});
