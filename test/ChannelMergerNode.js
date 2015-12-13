describe("ChannelMergerNode", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;
  var audioContext;

  beforeEach(function() {
    audioContext = new WebAudioTestAPI.AudioContext();
  });

  describe("constructor()", function() {
    it("works", function() {
      var node = audioContext.createChannelMerger();

      assert(node instanceof global.ChannelMergerNode);
      assert(node instanceof global.AudioNode);

      assert.throws(function() {
        audioContext.createChannelMerger(5.1);
      }, TypeError);
    });
    it("not work when 'new' directly", function() {
      assert.throws(function() { new global.ChannelMergerNode(); }, TypeError);
    });
  });

  describe("#toJSON(): object", function() {
    it("works", function() {
      var node = audioContext.createChannelMerger();

      assert.deepEqual(node.toJSON(), {
        name: "ChannelMergerNode",
        inputs: [ [], [], [], [], [], [] ]
      });
    });
  });

  describe("$name: string", function() {
    it("works", function() {
      var node = audioContext.createChannelMerger();

      assert(node.$name === "ChannelMergerNode");
    });
  });

  describe("$context: AudioContext", function() {
    it("works", function() {
      var node = audioContext.createChannelMerger();

      assert(node.$context === audioContext);
    });
  });
});
