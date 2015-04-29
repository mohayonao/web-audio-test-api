describe("DynamicsCompressorNode", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;
  var audioContext;

  beforeEach(function() {
    audioContext = new WebAudioTestAPI.AudioContext();
  });

  describe("constructor", function() {
    it("()", function() {
      var node = audioContext.createDynamicsCompressor();

      assert(node instanceof global.DynamicsCompressorNode);
      assert(node instanceof global.AudioNode);

      assert.throws(function() {
        return new global.DynamicsCompressorNode();
      }, function(e) {
        return e instanceof TypeError && /Illegal constructor/.test(e.message);
      });
    });
  });

  describe("#threshold", function() {
    it("get: AudioParam", function() {
      var node = audioContext.createDynamicsCompressor();

      assert(node.threshold instanceof WebAudioTestAPI.AudioParam);

      assert.throws(function() {
        node.threshold = 0;
      }, function(e) {
        return e instanceof TypeError && /readonly/.test(e.message);
      });
    });
  });

  describe("#knee", function() {
    it("get: AudioParam", function() {
      var node = audioContext.createDynamicsCompressor();

      assert(node.knee instanceof WebAudioTestAPI.AudioParam);

      assert.throws(function() {
        node.knee = 0;
      }, function(e) {
        return e instanceof TypeError && /readonly/.test(e.message);
      });
    });
  });

  describe("#ratio", function() {
    it("get: AudioParam", function() {
      var node = audioContext.createDynamicsCompressor();

      assert(node.ratio instanceof WebAudioTestAPI.AudioParam);

      assert.throws(function() {
        node.ratio = 0;
      }, function(e) {
        return e instanceof TypeError && /readonly/.test(e.message);
      });
    });
  });

  describe("#reduction", function() {
    it("get: AudioParam", function() {
      var node = audioContext.createDynamicsCompressor();

      assert(node.reduction instanceof WebAudioTestAPI.AudioParam);

      assert.throws(function() {
        node.reduction = 0;
      }, function(e) {
        return e instanceof TypeError && /readonly/.test(e.message);
      });
    });
  });

  describe("#attack", function() {
    it("get: AudioParam", function() {
      var node = audioContext.createDynamicsCompressor();

      assert(node.attack instanceof WebAudioTestAPI.AudioParam);

      assert.throws(function() {
        node.attack = 0;
      }, function(e) {
        return e instanceof TypeError && /readonly/.test(e.message);
      });
    });
  });

  describe("#release", function() {
    it("get: AudioParam", function() {
      var node = audioContext.createDynamicsCompressor();

      assert(node.release instanceof WebAudioTestAPI.AudioParam);

      assert.throws(function() {
        node.release = 0;
      }, function(e) {
        return e instanceof TypeError && /readonly/.test(e.message);
      });
    });
  });

  describe("#toJSON", function() {
    it("(): object", function() {
      var node = audioContext.createDynamicsCompressor();

      assert.deepEqual(node.toJSON(), {
        name: "DynamicsCompressorNode",
        threshold: {
          value: -24,
          inputs: [],
        },
        knee: {
          value: 30,
          inputs: [],
        },
        ratio: {
          value: 12,
          inputs: [],
        },
        reduction: {
          value: 0,
          inputs: [],
        },
        attack: {
          value: 0.003,
          inputs: [],
        },
        release: {
          value: 0.25,
          inputs: [],
        },
        inputs: [],
      });
    });
  });

  describe("#$name", function() {
    it("get: string", function() {
      var node = audioContext.createDynamicsCompressor();

      assert(node.$name === "DynamicsCompressorNode");
    });
  });

  describe("#$context", function() {
    it("get: AudioContext", function() {
      var node = audioContext.createDynamicsCompressor();

      assert(node.$context === audioContext);
    });
  });

});
