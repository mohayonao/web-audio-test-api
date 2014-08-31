/* global describe, it, expect, beforeEach */
"use strict";

require("../web-audio-mock");

describe("BiquadFilterNode", function() {
  var ctx = null;
  var node = null;

  beforeEach(function() {
    ctx = new AudioContext();
    node = ctx.createBiquadFilter();
  });

  describe("#type", function() {
    it("should be exist", function() {
      expect(node).to.have.property("type");
    });
    it("should be an enum", function() {
      expect(function() {
        node.type = "lowshelf";
      }).to.not.throw();
      expect(function() {
        node.type = "INVALID";
      }).to.throw(TypeError);
    });
  });

  describe("#frequency", function() {
    it("should be exist", function() {
      expect(node).to.have.property("frequency");
    });
    it("should be readonly", function() {
      expect(function() {
        node.frequency = 0;
      }).to.throw(Error, "readonly");
    });
    it("should be an instance of AudioParam", function() {
      expect(node.frequency).to.be.instanceOf(AudioParam);
    });
  });

  describe("#detune", function() {
    it("should be exist", function() {
      expect(node).to.have.property("detune");
    });
    it("should be readonly", function() {
      expect(function() {
        node.detune = 0;
      }).to.throw(Error, "readonly");
    });
    it("should be an instance of AudioParam", function() {
      expect(node.detune).to.be.instanceOf(AudioParam);
    });
  });

  describe("#Q", function() {
    it("should be exist", function() {
      expect(node).to.have.property("Q");
    });
    it("should be readonly", function() {
      expect(function() {
        node.Q = 0;
      }).to.throw(Error, "readonly");
    });
    it("should be an instance of AudioParam", function() {
      expect(node.Q).to.be.instanceOf(AudioParam);
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

  describe("#getFrequencyResponse(frequencyHz, magResponse, phaseResponse)", function() {
    it("should work", function() {
      node.getFrequencyResponse(new Float32Array(128), new Float32Array(128), new Float32Array(128));
    });
    it("throw error", function() {
      expect(function() {
        node.getFrequencyResponse("INVALID", new Float32Array(128), new Float32Array(128));
      }).to.throw(TypeError, "BiquadFilterNode#getFrequencyResponse(frequencyHz, magResponse, phaseResponse)");
    });
    it("throw error", function() {
      expect(function() {
        node.getFrequencyResponse(new Float32Array(128), "INVALID", new Float32Array(128));
      }).to.throw(TypeError, "BiquadFilterNode#getFrequencyResponse(frequencyHz, magResponse, phaseResponse)");
    });
    it("throw error", function() {
      expect(function() {
        node.getFrequencyResponse(new Float32Array(128), new Float32Array(128), "INVALID");
      }).to.throw(TypeError, "BiquadFilterNode#getFrequencyResponse(frequencyHz, magResponse, phaseResponse)");
    });
  });

});
