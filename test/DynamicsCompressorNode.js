"use strict";

describe("DynamicsCompressorNode", function() {
  var audioContext;

  beforeEach(function() {
    audioContext = new global.AudioContext();
  });

  describe("constructor", function() {
    it("() throws TypeError", function() {
      assert.throws(function() {
        global.DynamicsCompressorNode();
      }, TypeError);
    });
  });

  describe("#threshold", function() {
    it("get: AudioParam", function() {
      var node = audioContext.createDynamicsCompressor();

      assert(node.threshold instanceof global.AudioParam);

      assert.throws(function() {
        node.threshold = 0;
      }, Error);
    });
  });

  describe("#knee", function() {
    it("get: AudioParam", function() {
      var node = audioContext.createDynamicsCompressor();

      assert(node.knee instanceof global.AudioParam);

      assert.throws(function() {
        node.knee = 0;
      }, Error);
    });
  });

  describe("#ratio", function() {
    it("get: AudioParam", function() {
      var node = audioContext.createDynamicsCompressor();

      assert(node.ratio instanceof global.AudioParam);

      assert.throws(function() {
        node.ratio = 0;
      }, Error);
    });
  });

  describe("#reduction", function() {
    it("get: AudioParam", function() {
      var node = audioContext.createDynamicsCompressor();

      assert(node.reduction instanceof global.AudioParam);

      assert.throws(function() {
        node.reduction = 0;
      }, Error);
    });
  });

  describe("#attack", function() {
    it("get: AudioParam", function() {
      var node = audioContext.createDynamicsCompressor();

      assert(node.attack instanceof global.AudioParam);

      assert.throws(function() {
        node.attack = 0;
      }, Error);
    });
  });

  describe("#release", function() {
    it("get: AudioParam", function() {
      var node = audioContext.createDynamicsCompressor();

      assert(node.release instanceof global.AudioParam);

      assert.throws(function() {
        node.release = 0;
      }, Error);
    });
  });

  describe("#toJSON", function() {
    it("(): object", function() {
      var node = audioContext.createDynamicsCompressor();

      assert.deepEqual(node.toJSON(), {
        name: "DynamicsCompressorNode",
        threshold: {
          value: -24,
          inputs: []
        },
        knee: {
          value: 30,
          inputs: []
        },
        ratio: {
          value: 12,
          inputs: []
        },
        reduction: {
          value: 0,
          inputs: []
        },
        attack: {
          value: 0.003,
          inputs: []
        },
        release: {
          value: 0.25,
          inputs: []
        },
        inputs: []
      });
    });
  });

});
