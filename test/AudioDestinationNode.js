describe("AudioDestinationNode", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;
  var audioContext;

  beforeEach(function() {
    audioContext = new WebAudioTestAPI.AudioContext();
  });

  describe("constructor()", function() {
    it("works", function() {
      var node = audioContext.destination;

      assert(node instanceof global.AudioDestinationNode);
      assert(node instanceof global.AudioNode);
    });
    it("not work when 'new' directly", function() {
      assert.throws(function() { new global.AudioDestinationNode(); }, TypeError);
    });
  });

  describe("#maxChannelCount: number", function() {
    it("works", function() {
      var node = audioContext.destination;

      assert(typeof node.maxChannelCount === "number");

      assert.throws(function() {
        node.maxChannelCount = 256;
      }, TypeError);
    });
  });

  describe("#toJSON(): object", function() {
    it("works", function() {
      var node = audioContext.destination;

      assert.deepEqual(node.toJSON(), {
        name: "AudioDestinationNode",
        inputs: []
      });
    });
  });

  describe("$name: string", function() {
    it("works", function() {
      var node = audioContext.destination;

      assert(node.$name === "AudioDestinationNode");
    });
  });

  describe("$context: AudioContext", function() {
    it("works", function() {
      var node = audioContext.destination;

      assert(node.$context === audioContext);
    });
  });
});
