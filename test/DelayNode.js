"use strict";

describe("DelayNode", function() {
  var audioContext;

  beforeEach(function() {
    audioContext = new global.AudioContext();
  });

  describe("constructor", function() {
    it("() throws TypeError", function() {
      assert.throws(function() {
        global.DelayNode();
      }, TypeError);
    });
  });

  describe("#delayTime", function() {
    it("get: AudioParam", function() {
      var node = audioContext.createDelay();

      assert(node.delayTime instanceof global.AudioParam);

      assert.throws(function() {
        node.delayTime = 0;
      }, Error);
    });
  });

  describe("$maxDelayTime", function() {
    it("get: AudioParam", function() {
      var node = audioContext.createDelay(10);

      assert(typeof node.$maxDelayTime === "number");
      assert(node.$maxDelayTime === 10);
    });
  });

  describe("#toJSON", function() {
    it("(): object", function() {
      var node = audioContext.createDelay();

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
