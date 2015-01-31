"use strict";

describe("GainNode", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;
  var audioContext;

  beforeEach(function() {
    audioContext = new WebAudioTestAPI.AudioContext();
  });

  describe("constructor", function() {
    it("()", function() {
      var node = new WebAudioTestAPI.GainNode(audioContext);

      assert(node instanceof global.GainNode);
      assert(node instanceof global.AudioNode);

      assert.throws(function() {
        global.GainNode();
      }, function(e) {
        return e instanceof TypeError && /Illegal constructor/.test(e.message);
      });
    });
  });

  describe("#gain", function() {
    it("get: AudioParam", function() {
      var node = new WebAudioTestAPI.GainNode(audioContext);

      assert(node.gain instanceof WebAudioTestAPI.AudioParam);

      assert.throws(function() {
        node.gain = 0;
      }, function(e) {
        return e instanceof TypeError && /readonly/.test(e.message);
      });
    });
  });

  describe("#toJSON", function() {
    it("(): object", function() {
      var node = new WebAudioTestAPI.GainNode(audioContext);

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
