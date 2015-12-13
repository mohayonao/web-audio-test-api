describe("MediaStreamAudioSourceNode", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;
  var audioContext, mediaStream;

  beforeEach(function() {
    audioContext = new WebAudioTestAPI.AudioContext();
    mediaStream = new WebAudioTestAPI.MediaStream();
  });

  describe("constructor()", function() {
    it("works", function() {
      var node = audioContext.createMediaStreamSource(mediaStream);

      assert(node instanceof global.MediaStreamAudioSourceNode);
      assert(node instanceof global.AudioNode);

      assert.throws(function() {
        audioContext.createMediaStreamSource("INVALID");
      }, TypeError);
    });
    it("not work when 'new' directly", function() {
      assert.throws(function() { new global.MediaStreamAudioSourceNode(); }, TypeError);
    });
  });

  describe("#toJSON(): object", function() {
    it("works", function() {
      var node = audioContext.createMediaStreamSource(mediaStream);

      assert.deepEqual(node.toJSON(), {
        name: "MediaStreamAudioSourceNode",
        inputs: []
      });
    });
  });

  describe("$name: string", function() {
    it("works", function() {
      var node = audioContext.createMediaStreamSource(mediaStream);

      assert(node.$name === "MediaStreamAudioSourceNode");
    });
  });

  describe("$context: AudioContext", function() {
    it("works", function() {
      var node = audioContext.createMediaStreamSource(mediaStream);

      assert(node.$context === audioContext);
    });
  });
});
