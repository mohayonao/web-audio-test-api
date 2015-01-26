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
      expect(function() {
        return new global.GainNode();
      }).to.throw(TypeError, "Illegal constructor");
    });
    it("should have been inherited from AudioNode", function() {
      expect(node).to.be.instanceOf(global.AudioNode);
    });
  });

  describe("#gain", function() {
    it("should be exist", function() {
      expect(node).to.have.property("gain");
    });
    it("should be readonly", function() {
      expect(function() {
        node.gain = 0;
      }).to.throw(Error, "readonly");
    });
    it("should be an instance of AudioParam", function() {
      expect(node.gain).to.be.instanceOf(global.AudioParam);
    });
  });

  describe("#toJSON()", function() {
    it("return json", function() {
      expect(node.toJSON()).to.eql({
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
