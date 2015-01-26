"use strict";

describe("GainNode", function() {
  var ctx = null;
  var node = null;

  beforeEach(function() {
    ctx = new global.AudioContext();
    node = ctx.createGain();
  });

  describe("()", function() {
    it("throw illegal constructor", function() {
      assert.throws(function() {
        return new global.GainNode();
      }, TypeError, "Illegal constructor");
    });
    it("should have been inherited from AudioNode", function() {
      assert(node instanceof global.AudioNode);
    });
  });

  describe("#gain", function() {
    it("should be exist", function() {
      assert(node.gain instanceof global.AudioParam);
    });
    it("should be readonly", function() {
      assert.throws(function() {
        node.gain = 0;
      }, Error, "readonly");
    });
  });

  describe("#toJSON()", function() {
    it("return json", function() {
      assert.deepEqual(node.toJSON(), {
        name: "GainNode",
        gain: {
          value: 1,
          inputs: []
        },
        inputs: []
      });
    });
  });

});
