describe("ChannelSplitterNode", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;
  var audioContext;

  beforeEach(function() {
    audioContext = new WebAudioTestAPI.AudioContext();
  });

  describe("constructor()", function() {
    it("works", function() {
      var node = audioContext.createChannelSplitter();

      assert(node instanceof global.ChannelSplitterNode);
      assert(node instanceof global.AudioNode);

      assert.throws(function() {
        audioContext.createChannelSplitter(5.1);
      }, TypeError);
    });
    it("not work when 'new' directly", function() {
      assert.throws(function() { new global.ChannelSplitterNode(); }, TypeError);
    });
  });

  describe("#toJSON(): object", function() {
    it("works", function() {
      var node = audioContext.createChannelSplitter();

      assert.deepEqual(node.toJSON(), {
        name: "ChannelSplitterNode",
        inputs: []
      });
    });
  });

  describe("$name: string", function() {
    it("works", function() {
      var node = audioContext.createChannelSplitter();

      assert(node.$name === "ChannelSplitterNode");
    });
  });

  describe("$context: AudioContext", function() {
    it("works", function() {
      var node = audioContext.createChannelSplitter();

      assert(node.$context === audioContext);
    });
  });
});
