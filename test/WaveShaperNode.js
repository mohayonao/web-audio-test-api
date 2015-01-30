"use strict";

describe("WaveShaperNode", function() {
  var audioContext;

  beforeEach(function() {
    audioContext = new global.AudioContext();
  });

  describe("constructor", function() {
    it("() throws TypeError", function() {
      assert.throws(function() {
        global.WaveShaperNode();
      }, function(e) {
        return e instanceof TypeError && /Illegal constructor/.test(e.message);
      });
    });
  });

  describe("#curve", function() {
    it("get/set: Float32Array", function() {
      var node = audioContext.createWaveShaper();
      var f32a = new Float32Array(128);
      var f32b = new Float32Array(128);

      assert(node.curve === null);

      node.curve = f32a;
      assert(node.curve === f32a);

      node.curve = f32b;
      assert(node.curve === f32b);

      node.curve = null;
      assert(node.curve === null);

      assert.throws(function() {
        node.curve = "INVALID";
      }, function(e) {
        return e instanceof TypeError && /should be a Float32Array/.test(e.message);
      });
    });
  });

  describe("#oversample", function() {
    it("get/set: OverSampleType", function() {
      var node = audioContext.createWaveShaper();

      assert(typeof node.oversample === "string");

      node.oversample = "none";
      assert(node.oversample === "none");

      node.oversample = "2x";
      assert(node.oversample === "2x");

      node.oversample = "4x";
      assert(node.oversample === "4x");

      assert.throws(function() {
        node.oversample = "custom";
      }, function(e) {
        return e instanceof TypeError && /should be an enum/.test(e.message);
      });
    });
  });

  describe("#toJSON", function() {
    it("(): object", function() {
      var node = audioContext.createWaveShaper();

      assert.deepEqual(node.toJSON(), {
        name: "WaveShaperNode",
        oversample: "none",
        inputs: []
      });
    });
  });

});
