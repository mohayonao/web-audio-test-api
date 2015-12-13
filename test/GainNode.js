describe("GainNode", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;
  var audioContext;

  beforeEach(function() {
    audioContext = new WebAudioTestAPI.AudioContext();
  });

  describe("constructor()", function() {
    it("works", function() {
      var node = audioContext.createGain();

      assert(node instanceof global.GainNode);
      assert(node instanceof global.AudioNode);
    });
    it("not work when 'new' directly", function() {
      assert.throws(function() { new global.GainNode(); }, TypeError);
    });
  });

  describe("#gain: AudioParam", function() {
    it("works", function() {
      var node = audioContext.createGain();

      assert(node.gain instanceof WebAudioTestAPI.AudioParam);

      assert.throws(function() {
        node.gain = 0;
      }, TypeError);
    });
  });

  describe("#toJSON(): object", function() {
    it("works", function() {
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

  describe("$name: string", function() {
    it("works", function() {
      var node = audioContext.createGain();

      assert(node.$name === "GainNode");
    });
  });

  describe("$context: AudioContext", function() {
    it("works", function() {
      var node = audioContext.createDynamicsCompressor();

      assert(node.$context === audioContext);
    });
  });
});
