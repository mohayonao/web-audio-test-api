"use strict";

describe("ChannelMergerNode", function() {
  var audioContext;

  beforeEach(function() {
    audioContext = new global.AudioContext();
  });

  describe("constructor", function() {
    it("() throws TypeError", function() {
      assert.throws(function() {
        global.ChannelMergerNode();
      }, TypeError, "Illegal constructor");
    });
  });

  describe("#toJSON()", function() {
    it("(): object", function() {
      var node = audioContext.createChannelMerger();

      assert.deepEqual(node.toJSON(), {
        name: "ChannelMergerNode",
        inputs: []
      });
    });
  });

});
