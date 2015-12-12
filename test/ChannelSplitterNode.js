describe("ChannelSplitterNode", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;
  var audioContext;

  beforeEach(function() {
    audioContext = new WebAudioTestAPI.AudioContext();
  });

  describe("constructor", function() {
    it("()", function() {
      var node = audioContext.createChannelSplitter();

      assert(node instanceof global.ChannelSplitterNode);
      assert(node instanceof global.AudioNode);

      assert.throws(function() {
        audioContext.createChannelSplitter(5.1);
      }, TypeError);

      assert.throws(function() {
        return new global.ChannelSplitterNode();
      }, TypeError);
    });
  });

  describe("#toJSON", function() {
    it("(): object", function() {
      var node = audioContext.createChannelSplitter();

      assert.deepEqual(node.toJSON(), {
        name: "ChannelSplitterNode",
        inputs: []
      });
    });
  });

  describe("#$name", function() {
    it("get: string", function() {
      var node = audioContext.createChannelSplitter();

      assert(node.$name === "ChannelSplitterNode");
    });
  });

  describe("#$context", function() {
    it("get: AudioContext", function() {
      var node = audioContext.createChannelSplitter();

      assert(node.$context === audioContext);
    });
  });
});
