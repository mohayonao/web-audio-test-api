describe("MediaElementAudioSourceNode", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;
  var audioContext, mediaElement;

  beforeEach(function() {
    audioContext = new WebAudioTestAPI.AudioContext();
    mediaElement = new WebAudioTestAPI.DOM.HTMLMediaElement();
  });

  describe("constructor()", function() {
    it("works", function() {
      var node = audioContext.createMediaElementSource(mediaElement);

      assert(node instanceof global.MediaElementAudioSourceNode);
      assert(node instanceof global.AudioNode);

      assert.throws(function() {
        audioContext.createMediaElementSource("INVALID");
      }, TypeError);
    });
    it("not work when 'new' directly", function() {
      assert.throws(function() { new global.MediaElementAudioSourceNode(); }, TypeError);
    });
  });

  describe("#toJSON(): object", function() {
    it("works", function() {
      var node = audioContext.createMediaElementSource(mediaElement);

      assert.deepEqual(node.toJSON(), {
        name: "MediaElementAudioSourceNode",
        inputs: []
      });
    });
  });

  describe("$name: string", function() {
    it("works", function() {
      var node = audioContext.createMediaElementSource(mediaElement);

      assert(node.$name === "MediaElementAudioSourceNode");
    });
  });

  describe("$context: AudioContext", function() {
    it("works", function() {
      var node = audioContext.createMediaElementSource(mediaElement);

      assert(node.$context === audioContext);
    });
  });
});
