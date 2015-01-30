"use strict";

describe("ConvolverNode", function() {
  var audioContext;

  beforeEach(function() {
    audioContext = new global.AudioContext();
  });

  describe("constructor", function() {
    it("() throws TypeError", function() {
      assert.throws(function() {
        global.ConvolverNode();
      }, function(e) {
        return e instanceof TypeError && /Illegal constructor/.test(e.message);
      });
    });
  });

  describe("#buffer", function() {
    it("get/set: AudioBuffer", function() {
      var node = audioContext.createConvolver();
      var buf1 = audioContext.createBuffer(1, 16, 44100);
      var buf2 = audioContext.createBuffer(2, 32, 44100);

      assert(node.buffer === null);

      node.buffer = buf1;
      assert(node.buffer === buf1);

      node.buffer = buf2;
      assert(node.buffer === buf2);

      node.buffer = null;
      assert(node.buffer === null);

      assert.throws(function() {
        node.buffer = "INVALID";
      }, TypeError);
    });
  });

  describe("#normalize", function() {
    it("get/set: boolean", function() {
      var node = audioContext.createConvolver();

      assert(typeof node.normalize === "boolean");

      node.normalize = true;
      assert(node.normalize === true);

      node.normalize = false;
      assert(node.normalize === false);

      assert.throws(function() {
        node.normalize = "INVALID";
      }, TypeError);
    });
  });

  describe("#toJSON", function() {
    it("(): object", function() {
      var node = audioContext.createConvolver();

      assert.deepEqual(node.toJSON(), {
        name: "ConvolverNode",
        normalize: true,
        inputs: []
      });
    });
  });

});
