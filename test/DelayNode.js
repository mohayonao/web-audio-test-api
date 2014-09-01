/* global describe, it, expect, beforeEach */
"use strict";

require("../web-audio-mock");

describe("DelayNode", function() {
  var ctx = null;
  var node = null;

  beforeEach(function() {
    ctx = new AudioContext();
    node = ctx.createDelay();
  });

  describe("()", function() {
    it("throw illegal constructor", function() {
      expect(function() {
        return new DelayNode();
      }).to.throw(TypeError, "Illegal constructor");
    });
    it("should have been inherited from AudioNode", function() {
      expect(node).to.be.instanceOf(AudioNode);
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
      expect(node.delayTime).to.be.instanceOf(AudioParam);
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
