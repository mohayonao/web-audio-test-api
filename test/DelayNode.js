"use strict";

describe("DelayNode", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;
  var audioContext;

  beforeEach(function() {
    audioContext = new WebAudioTestAPI.AudioContext();
  });

  describe("constructor", function() {
    it("()", function() {
      var node = new WebAudioTestAPI.DelayNode(audioContext);

      assert(node instanceof global.DelayNode);
      assert(node instanceof global.AudioNode);

      assert.throws(function() {
        global.DelayNode();
      }, function(e) {
        return e instanceof TypeError && /Illegal constructor/.test(e.message);
      });
    });
  });

  describe("#delayTime", function() {
    it("get: AudioParam", function() {
      var node = new WebAudioTestAPI.DelayNode(audioContext, 0);

      assert(node.delayTime instanceof WebAudioTestAPI.AudioParam);

      assert.throws(function() {
        node.delayTime = 0;
      }, function(e) {
        return e instanceof TypeError && /readonly/.test(e.message);
      });
    });
  });

  describe("#toJSON", function() {
    it("(): object", function() {
      var node = new WebAudioTestAPI.DelayNode(audioContext, 0);

      assert.deepEqual(node.toJSON(), {
        name: "DelayNode",
        delayTime: {
          value: 0,
          inputs: []
        },
        inputs: []
      });
    });
  });

  describe("$maxDelayTime", function() {
    it("get: number", function() {
      var node = new WebAudioTestAPI.DelayNode(audioContext, 10);

      assert(typeof node.$maxDelayTime === "number");
      assert(node.$maxDelayTime === 10);
    });
  });

});
