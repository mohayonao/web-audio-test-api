describe("MediaStreamAudioSourceNode", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;
  var audioContext, mediaStream;

  beforeEach(function() {
    audioContext = new WebAudioTestAPI.AudioContext();
    mediaStream = new WebAudioTestAPI.MediaStream();
  });

  describe("constructor", function() {
    it("()", function() {
      var node = audioContext.createMediaStreamSource(mediaStream);

      assert(node instanceof global.MediaStreamAudioSourceNode);
      assert(node instanceof global.AudioNode);

      assert.throws(function() {
        audioContext.createMediaStreamSource("INVALID");
      }, TypeError);

      assert.throws(function() {
        return new global.MediaStreamAudioSourceNode();
      }, TypeError);
    });
  });

  describe("#toJSON", function() {
    it("(): object", function() {
      var node = audioContext.createMediaStreamSource(mediaStream);

      assert.deepEqual(node.toJSON(), {
        name: "MediaStreamAudioSourceNode",
        inputs: []
      });
    });
  });

  describe("#$name", function() {
    it("get: string", function() {
      var node = audioContext.createMediaStreamSource(mediaStream);

      assert(node.$name === "MediaStreamAudioSourceNode");
    });
  });

  describe("#$context", function() {
    it("get: AudioContext", function() {
      var node = audioContext.createMediaStreamSource(mediaStream);

      assert(node.$context === audioContext);
    });
  });
});
