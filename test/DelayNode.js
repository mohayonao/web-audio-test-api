"use strict";

describe("DelayNode", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;
  var audioContext;

  beforeEach(function() {
    audioContext = new global.AudioContext();
  });

  describe("constructor", function() {
    it("() throws TypeError", function() {
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

      assert(node.delayTime instanceof global.AudioParam);

      assert.throws(function() {
        node.delayTime = 0;
      }, function(e) {
        return e instanceof TypeError && /readonly/.test(e.message);
      });
    });
  });

  describe("$maxDelayTime", function() {
    it("get: AudioParam", function() {
      var node = new WebAudioTestAPI.DelayNode(audioContext, 10);

      assert(typeof node.$maxDelayTime === "number");
      assert(node.$maxDelayTime === 10);
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

});
