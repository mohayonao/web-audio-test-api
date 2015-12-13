describe("MediaStreamAudioDestinationNode", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;
  var audioContext;

  beforeEach(function() {
    audioContext = new WebAudioTestAPI.AudioContext();
  });

  describe("constructor()", function() {
    it("works", function() {
      var node = audioContext.createMediaStreamDestination();

      assert(node instanceof global.MediaStreamAudioDestinationNode);
      assert(node instanceof global.AudioNode);
    });
    it("not work when 'new' directly", function() {
      assert.throws(function() { new global.MediaStreamAudioDestinationNode(); }, TypeError);
    });
  });

  describe("#toJSON(): object", function() {
    it("works", function() {
      var node = audioContext.createMediaStreamDestination();

      assert.deepEqual(node.toJSON(), {
        name: "MediaStreamAudioDestinationNode",
        inputs: []
      });
    });
  });

  describe("$name: string", function() {
    it("works", function() {
      var node = audioContext.createMediaStreamDestination();

      assert(node.$name === "MediaStreamAudioDestinationNode");
    });
  });

  describe("$context: AudioContext", function() {
    it("works", function() {
      var node = audioContext.createMediaStreamDestination();

      assert(node.$context === audioContext);
    });
  });
});
