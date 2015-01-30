"use strict";

describe("DynamicsCompressorNode", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;
  var audioContext;

  beforeEach(function() {
    audioContext = new global.AudioContext();
  });

  describe("constructor", function() {
    it("() throws TypeError", function() {
      assert.throws(function() {
        global.DynamicsCompressorNode();
      }, function(e) {
        return e instanceof TypeError && /Illegal constructor/.test(e.message);
      });
    });
  });

  describe("#threshold", function() {
    it("get: AudioParam", function() {
      var node = new WebAudioTestAPI.DynamicsCompressorNode(audioContext);

      assert(node.threshold instanceof global.AudioParam);

      assert.throws(function() {
        node.threshold = 0;
      }, function(e) {
        return e instanceof TypeError && /readonly/.test(e.message);
      });
    });
  });

  describe("#knee", function() {
    it("get: AudioParam", function() {
      var node = new WebAudioTestAPI.DynamicsCompressorNode(audioContext);

      assert(node.knee instanceof global.AudioParam);

      assert.throws(function() {
        node.knee = 0;
      }, function(e) {
        return e instanceof TypeError && /readonly/.test(e.message);
      });
    });
  });

  describe("#ratio", function() {
    it("get: AudioParam", function() {
      var node = new WebAudioTestAPI.DynamicsCompressorNode(audioContext);

      assert(node.ratio instanceof global.AudioParam);

      assert.throws(function() {
        node.ratio = 0;
      }, function(e) {
        return e instanceof TypeError && /readonly/.test(e.message);
      });
    });
  });

  describe("#reduction", function() {
    it("get: AudioParam", function() {
      var node = new WebAudioTestAPI.DynamicsCompressorNode(audioContext);

      assert(node.reduction instanceof global.AudioParam);

      assert.throws(function() {
        node.reduction = 0;
      }, function(e) {
        return e instanceof TypeError && /readonly/.test(e.message);
      });
    });
  });

  describe("#attack", function() {
    it("get: AudioParam", function() {
      var node = new WebAudioTestAPI.DynamicsCompressorNode(audioContext);

      assert(node.attack instanceof global.AudioParam);

      assert.throws(function() {
        node.attack = 0;
      }, function(e) {
        return e instanceof TypeError && /readonly/.test(e.message);
      });
    });
  });

  describe("#release", function() {
    it("get: AudioParam", function() {
      var node = new WebAudioTestAPI.DynamicsCompressorNode(audioContext);

      assert(node.release instanceof global.AudioParam);

      assert.throws(function() {
        node.release = 0;
      }, function(e) {
        return e instanceof TypeError && /readonly/.test(e.message);
      });
    });
  });

  describe("#toJSON", function() {
    it("(): object", function() {
      var node = new WebAudioTestAPI.DynamicsCompressorNode(audioContext);

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
