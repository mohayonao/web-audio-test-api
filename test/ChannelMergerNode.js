describe("ChannelMergerNode", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;
  var audioContext;

  beforeEach(function() {
    audioContext = new WebAudioTestAPI.AudioContext();
  });

  describe("constructor", function() {
    it("()", function() {
      var node = audioContext.createChannelMerger();

      assert(node instanceof global.ChannelMergerNode);
      assert(node instanceof global.AudioNode);

      assert.throws(function() {
        audioContext.createChannelMerger(5.1);
      }, TypeError);

      assert.throws(function() {
        return new global.ChannelMergerNode();
      }, TypeError);
    });
  });

  describe("#toJSON", function() {
    it("(): object", function() {
      var node = audioContext.createChannelMerger();

      assert.deepEqual(node.toJSON(), {
        name: "ChannelMergerNode",
        inputs: [ [], [], [], [], [], [] ]
      });
    });
  });

  describe("#$name", function() {
    it("get: string", function() {
      var node = audioContext.createChannelMerger();

      assert(node.$name === "ChannelMergerNode");
    });
  });

  describe("#$context", function() {
    it("get: AudioContext", function() {
      var node = audioContext.createChannelMerger();

      assert(node.$context === audioContext);
    });
  });
});
