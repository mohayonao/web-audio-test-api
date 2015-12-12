describe("GainNode", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;
  var audioContext;

  beforeEach(function() {
    audioContext = new WebAudioTestAPI.AudioContext();
  });

  describe("constructor", function() {
    it("()", function() {
      var node = audioContext.createGain();

      assert(node instanceof global.GainNode);
      assert(node instanceof global.AudioNode);

      assert.throws(function() {
        return new global.GainNode();
      }, TypeError);
    });
  });

  describe("#gain", function() {
    it("get: AudioParam", function() {
      var node = audioContext.createGain();

      assert(node.gain instanceof WebAudioTestAPI.AudioParam);

      assert.throws(function() {
        node.gain = 0;
      }, TypeError);
    });
  });

  describe("#toJSON", function() {
    it("(): object", function() {
      var node = audioContext.createGain();

      assert.deepEqual(node.toJSON(), {
        name: "GainNode",
        gain: {
          value: 1,
          inputs: []
        },
        inputs: []
      });
    });
  });

  describe("#$name", function() {
    it("get: string", function() {
      var node = audioContext.createGain();

      assert(node.$name === "GainNode");
    });
  });

  describe("#$context", function() {
    it("get: AudioContext", function() {
      var node = audioContext.createDynamicsCompressor();

      assert(node.$context === audioContext);
    });
  });
});
