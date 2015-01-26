"use strict";

describe("DelayNode", function() {
  var ctx = null;
  var node = null;

  beforeEach(function() {
    ctx = new global.AudioContext();
    node = ctx.createDelay();
  });

  describe("()", function() {
    it("throw illegal constructor", function() {
      assert.throws(function() {
        return new global.DelayNode();
      }, TypeError, "Illegal constructor");
    });
    it("should have been inherited from AudioNode", function() {
      assert(node instanceof global.AudioNode);
    });
  });

  describe("#delayTime", function() {
    it("should be exist", function() {
      assert(node.delayTime instanceof global.AudioParam);
    });
    it("should be readonly", function() {
      assert.throws(function() {
        node.delayTime = 0;
      }, Error, "readonly");
    });
  });

  describe("#toJSON()", function() {
    it("return json", function() {
      assert.deepEqual(node.toJSON(), {
        name: "DelayNode",
        delayTime: {
          value: 0,
          inputs: []
        },
        inputs: []
      });
    });
  });

});
