describe("DynamicsCompressorNode", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;
  var audioContext;

  beforeEach(function() {
    audioContext = new WebAudioTestAPI.AudioContext();
  });

  describe("constructor()", function() {
    it("works", function() {
      var node = audioContext.createDynamicsCompressor();

      assert(node instanceof global.DynamicsCompressorNode);
      assert(node instanceof global.AudioNode);
    });
    it("not work when 'new' directly", function() {
      assert.throws(function() { new global.DynamicsCompressorNode(); }, TypeError);
    });
  });

  describe("#threshold: AudioParam", function() {
    it("works", function() {
      var node = audioContext.createDynamicsCompressor();

      assert(node.threshold instanceof WebAudioTestAPI.AudioParam);

      assert.throws(function() {
        node.threshold = 0;
      }, TypeError);
    });
  });

  describe("#knee: AudioParam", function() {
    it("works", function() {
      var node = audioContext.createDynamicsCompressor();

      assert(node.knee instanceof WebAudioTestAPI.AudioParam);

      assert.throws(function() {
        node.knee = 0;
      }, TypeError);
    });
  });

  describe("#ratio: AudioParam", function() {
    it("works", function() {
      var node = audioContext.createDynamicsCompressor();

      assert(node.ratio instanceof WebAudioTestAPI.AudioParam);

      assert.throws(function() {
        node.ratio = 0;
      }, TypeError);
    });
  });

  describe("#reduction: AudioParam", function() {
    it("works", function() {
      var node = audioContext.createDynamicsCompressor();

      assert(node.reduction instanceof WebAudioTestAPI.AudioParam);

      assert.throws(function() {
        node.reduction = 0;
      }, TypeError);
    });
  });

  describe("#attack: AudioParam", function() {
    it("works", function() {
      var node = audioContext.createDynamicsCompressor();

      assert(node.attack instanceof WebAudioTestAPI.AudioParam);

      assert.throws(function() {
        node.attack = 0;
      }, TypeError);
    });
  });

  describe("#release: AudioParam", function() {
    it("works", function() {
      var node = audioContext.createDynamicsCompressor();

      assert(node.release instanceof WebAudioTestAPI.AudioParam);

      assert.throws(function() {
        node.release = 0;
      }, TypeError);
    });
  });

  describe("#toJSON(): object", function() {
    it("works", function() {
      var node = audioContext.createDynamicsCompressor();

      assert.deepEqual(node.toJSON(), {
        name: "DynamicsCompressorNode",
        threshold: {
          value: -24,
          inputs: []
        },
        knee: {
          value: 30,
          inputs: []
        },
        ratio: {
          value: 12,
          inputs: []
        },
        reduction: {
          value: 0,
          inputs: []
        },
        attack: {
          value: 0.003,
          inputs: []
        },
        release: {
          value: 0.25,
          inputs: []
        },
        inputs: []
      });
    });
  });

  describe("$name: string", function() {
    it("works", function() {
      var node = audioContext.createDynamicsCompressor();

      assert(node.$name === "DynamicsCompressorNode");
    });
  });

  describe("$context: AudioContext", function() {
    it("works", function() {
      var node = audioContext.createDynamicsCompressor();

      assert(node.$context === audioContext);
    });
  });
});
