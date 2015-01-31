"use strict";

describe("MediaStreamAudioDestinationNode", function() {
  describe("constructor", function() {
    it("() throws TypeError", function() {
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
