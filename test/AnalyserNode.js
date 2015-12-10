describe("AnalyserNode", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;
  var audioContext;

  beforeEach(function() {
    audioContext = new WebAudioTestAPI.AudioContext();
  });

  describe("constructor", function() {
    it("()", function() {
      var node = audioContext.createAnalyser();

      assert(node instanceof global.AnalyserNode);
      assert(node instanceof global.AudioNode);

      assert.throws(function() {
        return new global.AnalyserNode();
      }, function(e) {
        return e instanceof TypeError && /Illegal constructor/.test(e.message);
      });
    });
  });

  describe("#fftSize", function() {
    it("get/set: FFTSize", function() {
      var node = audioContext.createAnalyser();

      assert(typeof node.fftSize === "number");

      node.fftSize = 32;
      assert(node.fftSize === 32);

      node.fftSize = 64;
      assert(node.fftSize === 64);

      node.fftSize = 128;
      assert(node.fftSize === 128);

      node.fftSize = 256;
      assert(node.fftSize === 256);

      node.fftSize = 512;
      assert(node.fftSize === 512);

      node.fftSize = 512;
      assert(node.fftSize === 512);

      node.fftSize = 1024;
      assert(node.fftSize === 1024);

      node.fftSize = 2048;
      assert(node.fftSize === 2048);

      assert.throws(function() {
        node.fftSize = 4096;
      }, function(e) {
        return e instanceof TypeError && /should be an enum/.test(e.message);
      });
    });
  });

  describe("#frequencyBinCount", function() {
    it("get: number", function() {
      var node = audioContext.createAnalyser();

      assert(typeof node.frequencyBinCount === "number");

      node.fftSize = 2048;
      assert(node.frequencyBinCount === 1024);

      node.fftSize = 1024;
      assert(node.frequencyBinCount === 512);

      assert.throws(function() {
        node.frequencyBinCount = 256;
      }, function(e) {
        return e instanceof TypeError && /readonly/.test(e.message);
      });
    });
  });

  describe("#minDecibels", function() {
    it("get/set: number", function() {
      var node = audioContext.createAnalyser();

      assert(typeof node.minDecibels === "number");

      node.minDecibels = -50;
      assert(node.minDecibels === -50);

      node.minDecibels = -25;
      assert(node.minDecibels === -25);

      assert.throws(function() {
        node.minDecibels = "INVALID";
      }, function(e) {
        return e instanceof TypeError && /should be a number/.test(e.message);
      });
    });
  });

  describe("#maxDecibels", function() {
    it("get/set: number", function() {
      var node = audioContext.createAnalyser();

      assert(typeof node.maxDecibels === "number");

      node.maxDecibels = 15;
      assert(node.maxDecibels === 15);

      node.maxDecibels = 7.5;
      assert(node.maxDecibels === 7.5);

      assert.throws(function() {
        node.maxDecibels = "INVALID";
      }, function(e) {
        return e instanceof TypeError && /should be a number/.test(e.message);
      });
    });
  });

  describe("#smoothingTimeConstant", function() {
    it("get/set: number", function() {
      var node = audioContext.createAnalyser();

      assert(typeof node.smoothingTimeConstant === "number");

      node.smoothingTimeConstant = 0.4;
      assert(node.smoothingTimeConstant === 0.4);

      node.smoothingTimeConstant = 0.2;
      assert(node.smoothingTimeConstant === 0.2);

      assert.throws(function() {
        node.smoothingTimeConstant = "INVALID";
      }, function(e) {
        return e instanceof TypeError && /should be a number/.test(e.message);
      });
    });
  });

  describe("#getFloatFrequencyData", function() {
    it("(array: Float32Array): void", function() {
      var node = audioContext.createAnalyser();
      var f32 = new Float32Array(128);
      var i16 = new Int16Array(128);

      node.getFloatFrequencyData(f32);

      assert.throws(function() {
        node.getFloatFrequencyData(i16);
      }, function(e) {
        return e instanceof TypeError && /should be a Float32Array/.test(e.message);
      });

      assert(node.getFloatFrequencyData === global.AnalyserNode.prototype.getFloatFrequencyData);
    });
  });

  describe("#getByteFrequencyData", function() {
    it("(array: Uint8Array): void", function() {
      var node = audioContext.createAnalyser();
      var ui8 = new Uint8Array(128);
      var i16 = new Int16Array(128);

      node.getByteFrequencyData(ui8);

      assert.throws(function() {
        node.getByteFrequencyData(i16);
      }, function(e) {
        return e instanceof TypeError && /should be a Uint8Array/.test(e.message);
      });

      assert(node.getByteFrequencyData === global.AnalyserNode.prototype.getByteFrequencyData);
    });
  });

  describe("#getFloatTimeDomainData", function() {
    it("(array: Float32Array): void", function() {
      var node = audioContext.createAnalyser();
      var f32 = new Float32Array(128);
      var i16 = new Int16Array(128);

      assert.throws(function() {
        node.getFloatTimeDomainData(f32);
      }, function(e) {
        return e instanceof TypeError && /not enabled/.test(e.message);
      });

      WebAudioTestAPI.setState("AnalyserNode#getFloatTimeDomainData", "enabled");

      assert.doesNotThrow(function() {
        node.getFloatTimeDomainData(f32);
      });

      assert.throws(function() {
        node.getFloatTimeDomainData(i16);
      }, function(e) {
        return e instanceof TypeError && /should be a Float32Array/.test(e.message);
      });

      WebAudioTestAPI.setState("AnalyserNode#getFloatTimeDomainData", "disabled");

      assert(node.getFloatTimeDomainData === global.AnalyserNode.prototype.getFloatTimeDomainData);
    });
  });

  describe("#getByteTimeDomainData", function() {
    it("(array: Uint8Array): void", function() {
      var node = audioContext.createAnalyser();
      var ui8 = new Uint8Array(128);
      var i16 = new Int16Array(128);

      node.getByteTimeDomainData(ui8);

      assert.throws(function() {
        node.getByteTimeDomainData(i16);
      }, function(e) {
        return e instanceof TypeError && /should be a Uint8Array/.test(e.message);
      });

      assert(node.getByteTimeDomainData === global.AnalyserNode.prototype.getByteTimeDomainData);
    });
  });

  describe("#toJSON", function() {
    it("(): object", function() {
      var node = audioContext.createAnalyser();

      assert.deepEqual(node.toJSON(), {
        name: "AnalyserNode",
        fftSize: 2048,
        minDecibels: -100,
        maxDecibels: 30,
        smoothingTimeConstant: 0.8,
        inputs: [],
      });
    });
  });

  describe("#$name", function() {
    it("get: string", function() {
      var node = audioContext.createAnalyser();

      assert(node.$name === "AnalyserNode");
    });
  });

  describe("#$context", function() {
    it("get: AudioContext", function() {
      var node = audioContext.createAnalyser();

      assert(node.$context === audioContext);
    });
  });
});
