"use strict";

describe("MediaStreamAudioDestinationNode", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;
  var audioContext;

  beforeEach(function() {
    audioContext = new WebAudioTestAPI.AudioContext();
  });

  describe("constructor", function() {
    it("()", function() {
      var node = new WebAudioTestAPI.MediaStreamAudioDestinationNode(audioContext);

      assert(node instanceof global.MediaStreamAudioDestinationNode);
      assert(node instanceof global.AudioNode);

      assert.throws(function() {
        global.MediaStreamAudioDestinationNode();
      }, function(e) {
        return e instanceof TypeError && /Illegal constructor/.test(e.message);
      });
    });
  });

  describe("#toJSON", function() {
    it("(): object", function() {
      var node = new WebAudioTestAPI.MediaStreamAudioDestinationNode(audioContext);

      assert.deepEqual(node.toJSON(), {
        name: "MediaStreamAudioDestinationNode",
        inputs: []
      });
    });
  });

});
