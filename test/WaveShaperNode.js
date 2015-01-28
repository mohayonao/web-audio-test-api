"use strict";

describe("WaveShaperNode", function() {
  var audioContext;

  beforeEach(function() {
    audioContext = new global.AudioContext();
  });

  describe("constructor", function() {
    it("() throws", function() {
      assert.throws(function() {
        return new global.ScriptProcessorNode();
      }, TypeError);
    });
  });

  describe("constructor", function() {
    it("() throws TypeError", function() {
      assert.throws(function() {
        global.WaveShaperNode();
      }, TypeError);
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

      assert.throws(function() {
        node.curve = "INVALID";
      }, TypeError);
    });
  });

  describe("#oversample", function() {
    it("get/set: [none,2x,4x]", function() {
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
      }, Error);
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
