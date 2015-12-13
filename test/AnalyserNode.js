describe("AnalyserNode", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;
  var audioContext;
  var versions;

  beforeEach(function() {
    versions = WebAudioTestAPI.getTargetVersions();
    audioContext = new WebAudioTestAPI.AudioContext();
  });
  afterEach(function() {
    WebAudioTestAPI.setTargetVersions(versions);
  });

  describe("constructor()", function() {
    it("works", function() {
      var node = audioContext.createAnalyser();

      assert(node instanceof global.AnalyserNode);
      assert(node instanceof global.AudioNode);
    });
    it("not work when 'new' directly", function() {
      assert.throws(function() { new global.AnalyserNode(); }, TypeError);
    });
  });

  describe("#fftSize: number", function() {
    it("works", function() {
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
      }, TypeError);
    });
  });

  describe("#frequencyBinCount: number", function() {
    it("works", function() {
      var node = audioContext.createAnalyser();

      assert(typeof node.frequencyBinCount === "number");

      node.fftSize = 2048;
      assert(node.frequencyBinCount === 1024);

      node.fftSize = 1024;
      assert(node.frequencyBinCount === 512);

      assert.throws(function() {
        node.frequencyBinCount = 256;
      }, TypeError);
    });
  });

  describe("#minDecibels: number", function() {
    it("works", function() {
      var node = audioContext.createAnalyser();

      assert(typeof node.minDecibels === "number");

      node.minDecibels = -50;
      assert(node.minDecibels === -50);

      node.minDecibels = -25;
      assert(node.minDecibels === -25);

      assert.throws(function() {
        node.minDecibels = "INVALID";
      }, TypeError);
    });
  });

  describe("#maxDecibels: number", function() {
    it("works", function() {
      var node = audioContext.createAnalyser();

      assert(typeof node.maxDecibels === "number");

      node.maxDecibels = 15;
      assert(node.maxDecibels === 15);

      node.maxDecibels = 7.5;
      assert(node.maxDecibels === 7.5);

      assert.throws(function() {
        node.maxDecibels = "INVALID";
      }, TypeError);
    });
  });

  describe("#smoothingTimeConstant: number", function() {
    it("works", function() {
      var node = audioContext.createAnalyser();

      assert(typeof node.smoothingTimeConstant === "number");

      node.smoothingTimeConstant = 0.4;
      assert(node.smoothingTimeConstant === 0.4);

      node.smoothingTimeConstant = 0.2;
      assert(node.smoothingTimeConstant === 0.2);

      assert.throws(function() {
        node.smoothingTimeConstant = "INVALID";
      }, TypeError);
    });
  });

  describe("#getFloatFrequencyData(array: Float32Array): void", function() {
    it("works", function() {
      var node = audioContext.createAnalyser();
      var f32 = new Float32Array(128);
      var i16 = new Int16Array(128);

      node.getFloatFrequencyData(f32);

      assert.throws(function() {
        node.getFloatFrequencyData(i16);
      }, TypeError);
    });
  });

  describe("#getByteFrequencyData(array: Uint8Array): void", function() {
    it("works", function() {
      var node = audioContext.createAnalyser();
      var ui8 = new Uint8Array(128);
      var i16 = new Int16Array(128);

      node.getByteFrequencyData(ui8);

      assert.throws(function() {
        node.getByteFrequencyData(i16);
      }, TypeError);
    });
  });

  describe("#getFloatTimeDomainData(array: Float32Array): void", function() {
    it("works", function() {
      var node = audioContext.createAnalyser();
      var f32 = new Float32Array(128);
      var i16 = new Int16Array(128);

      WebAudioTestAPI.setTargetVersions(Infinity);

      assert.doesNotThrow(function() {
        node.getFloatTimeDomainData(f32);
      });

      assert.throws(function() {
        node.getFloatTimeDomainData(i16);
      }, TypeError);
    });
    it("not work in unsupported version", function() {
      WebAudioTestAPI.setTargetVersions(0);

      var node = audioContext.createAnalyser();
      var f32 = new Float32Array(128);

      assert.throws(function() {
        node.getFloatTimeDomainData(f32);
      }, TypeError);
    });
  });

  describe("#getByteTimeDomainData(array: Uint8Array): void", function() {
    it("works", function() {
      var node = audioContext.createAnalyser();
      var ui8 = new Uint8Array(128);
      var i16 = new Int16Array(128);

      node.getByteTimeDomainData(ui8);

      assert.throws(function() {
        node.getByteTimeDomainData(i16);
      }, TypeError);
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
        inputs: []
      });
    });
  });

  describe("$name", function() {
    it("get: string", function() {
      var node = audioContext.createAnalyser();

      assert(node.$name === "AnalyserNode");
    });
  });

  describe("$context", function() {
    it("get: AudioContext", function() {
      var node = audioContext.createAnalyser();

      assert(node.$context === audioContext);
    });
  });
});
