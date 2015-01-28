"use strict";

describe("BiquadFilterNode", function() {
  var audioContext;

  beforeEach(function() {
    audioContext = new global.AudioContext();
  });

  describe("constructor", function() {
    it("() throws TypeError", function() {
      assert.throws(function() {
        global.BiquadFilterNode();
      }, TypeError, "Illegal constructor");
    });
  });

  describe("#type", function() {
    it("get/set: enum[lowpass,highpass,bandpass,lowshelf,highshelf,peaking,notch,allpass]", function() {
      var node = audioContext.createBiquadFilter();

      assert(typeof node.type === "string");

      node.type = "lowpass";
      assert(node.type === "lowpass");

      node.type = "highpass";
      assert(node.type === "highpass");

      node.type = "bandpass";
      assert(node.type === "bandpass");

      node.type = "lowshelf";
      assert(node.type === "lowshelf");

      node.type = "highshelf";
      assert(node.type === "highshelf");

      node.type = "peaking";
      assert(node.type === "peaking");

      node.type = "notch";
      assert(node.type === "notch");

      node.type = "allpass";
      assert(node.type === "allpass");

      assert.throws(function() {
        node.type = "custom";
      }, TypeError);
    });
  });

  describe("#frequency", function() {
    it("get: AudioParam", function() {
      var node = audioContext.createBiquadFilter();

      assert(node.frequency instanceof global.AudioParam);

      assert.throws(function() {
        node.frequency = 0;
      }, Error);
    });
  });

  describe("#detune", function() {
    it("get: AudioParam", function() {
      var node = audioContext.createBiquadFilter();

      assert(node.detune instanceof global.AudioParam);

      assert.throws(function() {
        node.detune = 0;
      }, Error);
    });
  });

  describe("#Q", function() {
    it("get: AudioParam", function() {
      var node = audioContext.createBiquadFilter();

      assert(node.Q instanceof global.AudioParam);

      assert.throws(function() {
        node.Q = 0;
      }, Error);
    });
  });

  describe("#gain", function() {
    it("get: AudioParam", function() {
      var node = audioContext.createBiquadFilter();

      assert(node.gain instanceof global.AudioParam);
      assert.throws(function() {
        node.gain = 0;
      }, Error);
    });
  });

  describe("#getFrequencyResponse", function() {
    it("(frequencyHz: Float32Array, magResponse: Float32Array, phaseResponse: Float32Array): void", function() {
      var node = audioContext.createBiquadFilter();
      var f32f = new Float32Array(128);
      var f32m = new Float32Array(128);
      var f32p = new Float32Array(128);

      node.getFrequencyResponse(f32f, f32p, f32m);

      assert.throws(function() {
        node.getFrequencyResponse("INVALID", f32p, f32m);
      }, TypeError);

      assert.throws(function() {
        node.getFrequencyResponse(f32f, "INVALID", f32m);
      }, TypeError);

      assert.throws(function() {
        node.getFrequencyResponse(f32f, f32p, "INVALID");
      }, TypeError);
    });
  });

  describe("#toJSON", function() {
    it("(): object", function() {
      var node = audioContext.createBiquadFilter();

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
