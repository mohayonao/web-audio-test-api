"use strict";

describe("ChannelSplitterNode", function() {
  var audioContext;

  beforeEach(function() {
    audioContext = new global.AudioContext();
  });

  describe("constructor", function() {
    it("() throws TypeError", function() {
      assert.throws(function() {
        global.ChannelSplitterNode();
      }, TypeError, "Illegal constructor");
    });
  });

  describe("#toJSON", function() {
    it("(): object", function() {
      var node = audioContext.createChannelSplitter();

      assert.deepEqual(node.toJSON(), {
        name: "ChannelSplitterNode",
        inputs: []
      });
    });
  });

});
