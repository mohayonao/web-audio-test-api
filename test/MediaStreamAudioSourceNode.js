"use strict";

describe("MediaStreamAudioSourceNode", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;
  var audioContext;

  beforeEach(function() {
    audioContext = new WebAudioTestAPI.AudioContext();
  });

  describe("constructor", function() {
    it("()", function() {
      var node = new WebAudioTestAPI.MediaStreamAudioSourceNode(audioContext);

      assert(node instanceof global.MediaStreamAudioSourceNode);
      assert(node instanceof global.AudioNode);

      assert.throws(function() {
        global.MediaStreamAudioSourceNode();
      }, function(e) {
        return e instanceof TypeError && /Illegal constructor/.test(e.message);
      });
    });
  });

  describe("#toJSON", function() {
    it("(): object", function() {
      var node = new WebAudioTestAPI.MediaStreamAudioSourceNode(audioContext);

      assert.deepEqual(node.toJSON(), {
        name: "MediaStreamAudioSourceNode",
        inputs: []
      });
    });
  });

});
