"use strict";

describe("WaveShaperNode", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;
  var audioContext;

  beforeEach(function() {
    audioContext = new WebAudioTestAPI.AudioContext();
  });

  describe("constructor", function() {
    it("()", function() {
      var node = new WebAudioTestAPI.WaveShaperNode(audioContext);

      assert(node instanceof global.WaveShaperNode);
      assert(node instanceof global.AudioNode);

      assert.throws(function() {
        global.WaveShaperNode();
      }, function(e) {
        return e instanceof TypeError && /Illegal constructor/.test(e.message);
      });
    });
  });

  describe("#curve", function() {
    it("get/set: Float32Array", function() {
      var node = new WebAudioTestAPI.WaveShaperNode(audioContext);
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
      var node = new WebAudioTestAPI.WaveShaperNode(audioContext);

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
      var node = new WebAudioTestAPI.WaveShaperNode(audioContext);

      assert.deepEqual(node.toJSON(), {
        name: "WaveShaperNode",
        oversample: "none",
        inputs: []
      });
    });
  });

});
