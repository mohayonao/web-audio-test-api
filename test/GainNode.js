"use strict";

require("../web-audio-test-api");

describe("GainNode", function() {
  var ctx = null;
  var node = null;

  beforeEach(function() {
    ctx = new AudioContext();
    node = ctx.createGain();
  });

  describe("()", function() {
    it("throw illegal constructor", function() {
      expect(function() {
        return new GainNode();
      }).to.throw(TypeError, "Illegal constructor");
    });
    it("should have been inherited from AudioNode", function() {
      expect(node).to.be.instanceOf(AudioNode);
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
      expect(node.gain).to.be.instanceOf(AudioParam);
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
