"use strict";

describe("ConvolverNode", function() {
  var ctx = null;
  var node = null;

  beforeEach(function() {
    ctx = new global.AudioContext();
    node = ctx.createConvolver();
  });

  describe("()", function() {
    it("throw illegal constructor", function() {
      assert.throws(function() {
        return new global.ConvolverNode();
      }, TypeError, "Illegal constructor");
    });
    it("should have been inherited from AudioNode", function() {
      assert(node instanceof global.AudioNode);
    });
  });

  describe("#buffer", function() {
    it("should be exist", function() {
      assert(node.buffer === null);
    });
    it("should be an AudioBuffer", function() {
      assert.doesNotThrow(function() {
        node.buffer = ctx.createBuffer(1, 128, 44100);
      });
      assert.throws(function() {
        node.buffer = "INVALID";
      }, TypeError);
    });
  });

  describe("#normalize", function() {
    it("should be exist", function() {
      assert(typeof node.normalize === "boolean");
    });
    it("should be a boolean", function() {
      assert.doesNotThrow(function() {
        node.normalize = false;
      });
      assert.throws(function() {
        node.normalize = "INVALID";
      }, TypeError);
    });
  });

  describe("#toJSON()", function() {
    it("return json", function() {
      assert.deepEqual(node.toJSON(), {
        name: "ConvolverNode",
        normalize: true,
        inputs: []
      });
    });
  });

});
