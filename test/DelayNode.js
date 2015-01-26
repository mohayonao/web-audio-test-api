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
      expect(function() {
        return new global.DelayNode();
      }).to.throw(TypeError, "Illegal constructor");
    });
    it("should have been inherited from AudioNode", function() {
      expect(node).to.be.instanceOf(global.AudioNode);
    });
  });

  describe("#delayTime", function() {
    it("should be exist", function() {
      expect(node).to.have.property("delayTime");
    });
    it("should be readonly", function() {
      expect(function() {
        node.delayTime = 0;
      }).to.throw(Error, "readonly");
    });
    it("should be an instance of AudioParam", function() {
      expect(node.delayTime).to.be.instanceOf(global.AudioParam);
    });
  });

  describe("#toJSON()", function() {
    it("return json", function() {
      expect(node.toJSON()).to.eql({
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
