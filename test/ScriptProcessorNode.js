"use strict";

var BUFFER_SIZE = 256;
var PROCESS_INTERVAL = BUFFER_SIZE / 44100;

describe("ScriptProcessorNode", function() {
  var ctx = null;
  var node = null;

  beforeEach(function() {
    ctx = new global.AudioContext();
    node = ctx.createScriptProcessor(BUFFER_SIZE, 2, 1);
  });

  describe("()", function() {
    it("throw illegal constructor", function() {
      assert.throws(function() {
        return new global.ScriptProcessorNode();
      }, TypeError, "Illegal constructor");
    });
    it("should have been inherited from AudioNode", function() {
      assert(node instanceof global.AudioNode);
    });
  });

  describe("invalid arguments", function() {
    it("invalid buffer size", function() {
      assert.throws(function() {
        ctx.createScriptProcessor(0, 0, 0);
      }, TypeError, "ScriptProcessorNode(bufferSize, numberOfInputChannels, numberOfOutputChannels)");
    });
    it("invalid numberOfInputChannels", function() {
      assert.throws(function() {
        ctx.createScriptProcessor(BUFFER_SIZE, "INVALID", 0);
      }, TypeError, "ScriptProcessorNode(bufferSize, numberOfInputChannels, numberOfOutputChannels)");
    });
    it("invalid numberOfOutputChannels", function() {
      assert.throws(function() {
        ctx.createScriptProcessor(BUFFER_SIZE, 0, "INVALID");
      }, TypeError, "ScriptProcessorNode(bufferSize, numberOfInputChannels, numberOfOutputChannels)");
    });
  });

  describe("#numberOfInputChannels", function() {
    it("should be exist", function() {
      assert(node.numberOfInputChannels === 2);
    });
  });

  describe("#numberOfOutputChannels", function() {
    it("should be exist", function() {
      assert(node.numberOfOutputChannels === 1);
    });
  });

  describe("#bufferSize", function() {
    it("should be exist", function() {
      assert(node.bufferSize === BUFFER_SIZE);
    });
    it("should be readonly", function() {
      assert.throws(function() {
        node.bufferSize = 0;
      }, Error, "readonly");
    });
  });

  describe("#onaudioprocess", function() {
    it("should be exist", function() {
      assert(node.onaudioprocess === null);
    });
    it("should work", function() {
      var passed = 0;
      var interval = PROCESS_INTERVAL * 0.25;

      node.connect(ctx.destination);
      node.onaudioprocess = function(e) {
        passed += 1;
        assert(e instanceof global.Event);
        assert(e instanceof global.AudioProcessingEvent);
        assert(typeof e.playbackTime === "number");
        assert(e.inputBuffer instanceof global.AudioBuffer);
        assert(e.outputBuffer instanceof global.AudioBuffer);
      };
      ctx.$process(0);
      assert(passed === 0, "0/4");
      ctx.$process(interval);
      assert(passed === 1, "1/4");
      ctx.$process(interval);
      assert(passed === 1, "2/4");
      ctx.$process(interval);
      assert(passed === 1, "3/4");
      ctx.$process(interval);
      assert(passed === 2, "4/4");
      ctx.$process(interval);
      assert(passed === 2, "5/4");
      ctx.$process(interval);
      assert(passed === 2, "6/4");
      ctx.$process(interval);
      assert(passed === 2, "7/4");
      ctx.$process(interval);
      assert(passed === 3, "8/4");
      ctx.$process(interval);
      assert(passed === 3, "9/4");
    });
  });

  describe("#toJSON()", function() {
    it("return json", function() {
      assert.deepEqual(node.toJSON(), {
        name: "ScriptProcessorNode",
        inputs: []
      });
    });
  });

});

describe("AudioProcessingEvent", function() {
  describe("()", function() {
    it("throw illegal constructor", function() {
      assert.throws(function() {
        return new global.AudioProcessingEvent();
      }, TypeError, "Illegal constructor");
    });
  });
});
