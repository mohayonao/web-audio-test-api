describe("MediaStreamAudioDestinationNode", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;
  var audioContext;

  beforeEach(function() {
    audioContext = new WebAudioTestAPI.AudioContext();
  });

  describe("constructor", function() {
    it("()", function() {
      var node = audioContext.createMediaStreamDestination();

      assert(node instanceof global.MediaStreamAudioDestinationNode);
      assert(node instanceof global.AudioNode);

      assert.throws(function() {
        return new global.MediaStreamAudioDestinationNode();
      }, function(e) {
        return e instanceof TypeError && /Illegal constructor/.test(e.message);
      });
    });
  });

  describe("#toJSON", function() {
    it("(): object", function() {
      var node = audioContext.createMediaStreamDestination();

      assert.deepEqual(node.toJSON(), {
        name: "MediaStreamAudioDestinationNode",
        inputs: [],
      });
    });
  });

  describe("#$name", function() {
    it("get: string", function() {
      var node = audioContext.createMediaStreamDestination();

      assert(node.$name === "MediaStreamAudioDestinationNode");
    });
  });

  describe("#$context", function() {
    it("get: AudioContext", function() {
      var node = audioContext.createMediaStreamDestination();

      assert(node.$context === audioContext);
    });
  });

});
