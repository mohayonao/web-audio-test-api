"use strict";

describe("AudioDestinationNode", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;
  var audioContext;

  beforeEach(function() {
    audioContext = new global.AudioContext();
  });

  describe("constructor", function() {
    it("() throws TypeError", function() {
      assert.throws(function() {
        global.AudioDestinationNode();
      }, function(e) {
        return e instanceof TypeError && /Illegal constructor/.test(e.message);
      });
    });
  });

  describe("#maxChannelCount", function() {
    it("get: number", function() {
      var node = new WebAudioTestAPI.AudioDestinationNode(audioContext);

      assert(typeof node.maxChannelCount === "number");

      assert.throws(function() {
        node.maxChannelCount = 256;
      }, function(e) {
        return e instanceof TypeError && /readonly/.test(e.message);
      });
    });
  });

});
