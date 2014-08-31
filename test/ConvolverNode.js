/* global describe, it, expect, beforeEach */
"use strict";

require("../web-audio-mock");

describe("ConvolverNode", function() {
  var ctx = null;
  var node = null;

  beforeEach(function() {
    ctx = new AudioContext();
    node = ctx.createConvolver();
  });

  describe("#buffer", function() {
    it("should be exist", function() {
      expect(node).to.have.property("buffer");
    });
    it("should be an AudioBuffer", function() {
      expect(function() {
        node.buffer = ctx.createBuffer(1, 128, 44100);
      }).to.not.throw();
      expect(function() {
        node.buffer = "INVALID";
      }).to.throw(TypeError);
    });
  });

  describe("#normalize", function() {
    it("should be exist", function() {
      expect(node).to.have.property("normalize");
    });
    it("should be a boolean", function() {
      expect(function() {
        node.normalize = false;
      }).to.not.throw();
      expect(function() {
        node.normalize = "INVALID";
      }).to.throw(TypeError);
    });
  });

  describe("#toJSON", function() {
    it("return json", function() {
      expect(node.toJSON()).to.eql({
        name: "ConvolverNode",
        normalize: true,
        inputs: []
      });
    });
  });

});
