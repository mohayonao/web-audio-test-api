describe("AudioDestinationNode", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;
  var audioContext;

  beforeEach(function() {
    audioContext = new WebAudioTestAPI.AudioContext();
  });

  describe("constructor", function() {
    it("()", function() {
      var node = audioContext.destination;

      assert(node instanceof global.AudioDestinationNode);
      assert(node instanceof global.AudioNode);

      assert.throws(function() {
        return new global.AudioDestinationNode();
      }, function(e) {
        return e instanceof TypeError && /Illegal constructor/.test(e.message);
      });
    });
  });

  describe("#maxChannelCount", function() {
    it("get: number", function() {
      var node = audioContext.destination;

      assert(typeof node.maxChannelCount === "number");

      assert.throws(function() {
        node.maxChannelCount = 256;
      }, function(e) {
        return e instanceof TypeError && /readonly/.test(e.message);
      });
    });
  });

  describe("#toJSON", function() {
    it("(): object", function() {
      var node = audioContext.destination;

      assert.deepEqual(node.toJSON(), {
        name: "AudioDestinationNode",
        inputs: []
      });
    });
  });

  describe("#$name", function() {
    it("get: string", function() {
      var node = audioContext.destination;

      assert(node.$name === "AudioDestinationNode");
    });
  });

  describe("#$context", function() {
    it("get: AudioContext", function() {
      var node = audioContext.destination;

      assert(node.$context === audioContext);
    });
  });
});
