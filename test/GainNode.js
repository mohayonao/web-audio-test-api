"use strict";

describe("GainNode", function() {
  var audioContext;

  beforeEach(function() {
    audioContext = new global.AudioContext();
  });

  describe("constructor", function() {
    it("() throws TypeError", function() {
      assert.throws(function() {
        global.GainNode();
      }, TypeError);
    });
  });

  describe("#gain", function() {
    it("get: AudioParam", function() {
      var node = audioContext.createGain();

      assert(node.gain instanceof global.AudioParam);

      assert.throws(function() {
        node.gain = 0;
      }, Error, "readonly");
    });
  });

  describe("#toJSON", function() {
    it("(): object", function() {
      var node = audioContext.createGain();

      assert.deepEqual(node.toJSON(), {
        name: "GainNode",
        gain: {
          value: 1,
          inputs: []
        },
        inputs: []
      });
    });
  });

});
