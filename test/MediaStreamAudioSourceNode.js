"use strict";

describe("MediaStreamAudioSourceNode", function() {
  describe("constructor", function() {
    it("() throws TypeError", function() {
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
