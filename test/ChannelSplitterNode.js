"use strict";

describe("ChannelSplitterNode", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;
  var audioContext;

  beforeEach(function() {
    audioContext = new WebAudioTestAPI.AudioContext();
  });

  describe("constructor", function() {
    it("()", function() {
      var node = new WebAudioTestAPI.ChannelSplitterNode(audioContext);

      assert(node instanceof global.ChannelSplitterNode);
      assert(node instanceof global.AudioNode);

      assert.throws(function() {
        global.ChannelSplitterNode();
      }, function(e) {
        return e instanceof TypeError && /Illegal constructor/.test(e.message);
      });
    });
  });

  describe("#toJSON", function() {
    it("(): object", function() {
      var node = new WebAudioTestAPI.ChannelSplitterNode(audioContext);

      assert.deepEqual(node.toJSON(), {
        name: "ChannelSplitterNode",
        inputs: []
      });
    });
  });

});
