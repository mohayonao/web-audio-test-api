describe("BiquadFilterNode", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;
  var audioContext;

  beforeEach(function() {
    audioContext = new WebAudioTestAPI.AudioContext();
  });

  describe("constructor", function() {
    it("()", function() {
      var node = audioContext.createBiquadFilter();

      assert(node instanceof global.BiquadFilterNode);
      assert(node instanceof global.AudioNode);

      assert.throws(function() {
        return new global.BiquadFilterNode();
      }, TypeError);
    });
  });

  describe("#type", function() {
    it("get/set: BiquadFilterType", function() {
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

      assert(node.frequency instanceof WebAudioTestAPI.AudioParam);

      assert.throws(function() {
        node.frequency = 0;
      }, TypeError);
    });
  });

  describe("#detune", function() {
    it("get: AudioParam", function() {
      var node = audioContext.createBiquadFilter();

      assert(node.detune instanceof WebAudioTestAPI.AudioParam);

      assert.throws(function() {
        node.detune = 0;
      }, TypeError);
    });
  });

  describe("#Q", function() {
    it("get: AudioParam", function() {
      var node = audioContext.createBiquadFilter();

      assert(node.Q instanceof WebAudioTestAPI.AudioParam);

      assert.throws(function() {
        node.Q = 0;
      }, TypeError);
    });
  });

  describe("#gain", function() {
    it("get: AudioParam", function() {
      var node = audioContext.createBiquadFilter();

      assert(node.gain instanceof WebAudioTestAPI.AudioParam);
      assert.throws(function() {
        node.gain = 0;
      }, TypeError);
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

      assert(node.getFrequencyResponse === global.BiquadFilterNode.prototype.getFrequencyResponse);
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

  describe("#$name", function() {
    it("get: string", function() {
      var node = audioContext.createBiquadFilter();

      assert(node.$name === "BiquadFilterNode");
    });
  });

  describe("#$context", function() {
    it("get: AudioContext", function() {
      var node = audioContext.createBiquadFilter();

      assert(node.$context === audioContext);
    });
  });
});
