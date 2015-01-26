"use strict";

describe("BiquadFilterNode", function() {
  var ctx = null;
  var node = null;

  beforeEach(function() {
    ctx = new global.AudioContext();
    node = ctx.createBiquadFilter();
  });

  describe("()", function() {
    it("throw illegal constructor", function() {
      assert.throws(function() {
        return new global.BiquadFilterNode();
      }, TypeError, "Illegal constructor");
    });
    it("should have been inherited from AudioNode", function() {
      assert(node instanceof global.AudioNode);
    });
  });

  describe("#type", function() {
    it("should be exist", function() {
      assert(typeof node.type === "string");
    });
    it("should be an enum", function() {
      assert.doesNotThrow(function() {
        node.type = "lowshelf";
      });
      assert.throws(function() {
        node.type = "INVALID";
      }, TypeError);
    });
  });

  describe("#frequency", function() {
    it("should be exist", function() {
      assert(node.frequency instanceof global.AudioParam);
    });
    it("should be readonly", function() {
      assert.throws(function() {
        node.frequency = 0;
      }, Error, "readonly");
    });
  });

  describe("#detune", function() {
    it("should be exist", function() {
      assert(node.detune instanceof global.AudioParam);
    });
    it("should be readonly", function() {
      assert.throws(function() {
        node.detune = 0;
      }, Error, "readonly");
    });
  });

  describe("#Q", function() {
    it("should be exist", function() {
      assert(node.Q instanceof global.AudioParam);
    });
    it("should be readonly", function() {
      assert.throws(function() {
        node.Q = 0;
      }, Error, "readonly");
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

  describe("#getFrequencyResponse(frequencyHz, magResponse, phaseResponse)", function() {
    it("should work", function() {
      assert.doesNotThrow(function() {
        node.getFrequencyResponse(new Float32Array(128), new Float32Array(128), new Float32Array(128));
      });
    });
    it("throw error", function() {
      assert.throws(function() {
        node.getFrequencyResponse("INVALID", new Float32Array(128), new Float32Array(128));
      }, TypeError, "BiquadFilterNode#getFrequencyResponse(frequencyHz, magResponse, phaseResponse)");
    });
    it("throw error", function() {
      assert.throws(function() {
        node.getFrequencyResponse(new Float32Array(128), "INVALID", new Float32Array(128));
      }, TypeError, "BiquadFilterNode#getFrequencyResponse(frequencyHz, magResponse, phaseResponse)");
    });
    it("throw error", function() {
      assert.throws(function() {
        node.getFrequencyResponse(new Float32Array(128), new Float32Array(128), "INVALID");
      }, TypeError, "BiquadFilterNode#getFrequencyResponse(frequencyHz, magResponse, phaseResponse)");
    });
  });

  describe("#toJSON()", function() {
    it("return json", function() {
      assert.deepEqual(node.toJSON(), {
        name: "BiquadFilterNode",
        type: "lowpass",
        frequency: {
          value: 350,
          inputs: []
        },
        detune: {
          value: 0,
          inputs: []
        },
        Q: {
          value: 1,
          inputs: []
        },
        gain: {
          value: 0,
          inputs: []
        },
        inputs: []
      });
    });
  });

});
