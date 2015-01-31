"use strict";

describe("ChannelMergerNode", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;
  var audioContext;

  beforeEach(function() {
    audioContext = new WebAudioTestAPI.AudioContext();
  });

  describe("constructor", function() {
    it("()", function() {
      var node = new WebAudioTestAPI.ChannelMergerNode(audioContext);

      assert(node instanceof global.ChannelMergerNode);
      assert(node instanceof global.AudioNode);

      assert.throws(function() {
        global.ChannelMergerNode();
      }, function(e) {
        return e instanceof TypeError && /Illegal constructor/.test(e.message);
      });
    });
  });

  describe("#toJSON", function() {
    it("(): object", function() {
      var node = new WebAudioTestAPI.ChannelMergerNode(audioContext);

      assert.deepEqual(node.toJSON(), {
        name: "ChannelMergerNode",
        inputs: []
      });
    });
  });

});
