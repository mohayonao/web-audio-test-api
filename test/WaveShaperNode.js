describe("WaveShaperNode", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;
  var audioContext;

  beforeEach(function() {
    audioContext = new WebAudioTestAPI.AudioContext();
  });

  describe("constructor()", function() {
    it("works", function() {
      var node = audioContext.createWaveShaper();

      assert(node instanceof global.WaveShaperNode);
      assert(node instanceof global.AudioNode);

      assert.throws(function() {
        return new global.WaveShaperNode();
      }, TypeError);
    });
  });

  describe("#curve: Float32Array", function() {
    it("works", function() {
      var node = audioContext.createWaveShaper();
      var f32a = new Float32Array(128);
      var f32b = new Float32Array(128);

      assert(node.curve === null);

      node.curve = f32a;
      assert(node.curve === f32a);

      node.curve = f32b;
      assert(node.curve === f32b);

      node.curve = null;
      assert(node.curve === null);

      assert.throws(function() {
        node.curve = "INVALID";
      }, TypeError);
    });
  });

  describe("#oversample: string", function() {
    it("works", function() {
      var node = audioContext.createWaveShaper();

      assert(typeof node.oversample === "string");

      node.oversample = "none";
      assert(node.oversample === "none");

      node.oversample = "2x";
      assert(node.oversample === "2x");

      node.oversample = "4x";
      assert(node.oversample === "4x");

      assert.throws(function() {
        node.oversample = "custom";
      }, TypeError);
    });
  });

  describe("#toJSON(): object", function() {
    it("works", function() {
      var node = audioContext.createWaveShaper();

      assert.deepEqual(node.toJSON(), {
        name: "WaveShaperNode",
        oversample: "none",
        inputs: []
      });
    });
  });

  describe("$name: string", function() {
    it("works", function() {
      var node = audioContext.createWaveShaper();

      assert(node.$name === "WaveShaperNode");
    });
  });

  describe("$context: AudioContext", function() {
    it("works", function() {
      var node = audioContext.createWaveShaper();

      assert(node.$context === audioContext);
    });
  });
});
