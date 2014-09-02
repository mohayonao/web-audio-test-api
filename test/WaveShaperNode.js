/* global describe, it, expect, beforeEach */
"use strict";

require("../web-audio-mock");

describe("WaveShaperNode", function() {
  var ctx = null;
  var node = null;

  beforeEach(function() {
    ctx = new AudioContext();
    node = ctx.createWaveShaper();
  });

  describe("()", function() {
    it("throw illegal constructor", function() {
      expect(function() {
        return new WaveShaperNode();
      }).to.throw(TypeError, "Illegal constructor");
    });
    it("should have been inherited from AudioNode", function() {
      expect(node).to.be.instanceOf(AudioNode);
    });
  });

  describe("#curve", function() {
    it("should be exist", function() {
      expect(node).to.have.property("curve");
    });
    it("should be a Float32Array", function() {
      expect(function() {
        node.curve = new Float32Array(64);
      }).to.not.throw();
      expect(function() {
        node.curve = "INVALID";
      }).to.throw(TypeError);
    });
  });

  describe("#oversample", function() {
    it("should be exist", function() {
      expect(node).to.have.property("oversample");
    });
    it("should be an enum", function() {
      expect(function() {
        node.oversample = "2x";
      }).to.not.throw();
      expect(function() {
        node.oversample = "INVALID";
      }).to.throw(TypeError);
    });
  });

  describe("#toJSON()", function() {
    it("return json", function() {
      expect(node.toJSON()).to.eql({
        name: "WaveShaperNode",
        oversample: "none",
        inputs: []
      });
    });
  });

});
