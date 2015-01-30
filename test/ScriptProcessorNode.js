"use strict";

var BUFFER_SIZE = 256;
var PROCESS_INTERVAL = BUFFER_SIZE / 44100;

describe("ScriptProcessorNode", function() {
  var audioContext;

  beforeEach(function() {
    audioContext = new global.AudioContext();
  });

  describe("constructor", function() {
    it("() throws", function() {
      assert.throws(function() {
        return new global.ScriptProcessorNode();
      }, function(e) {
        return e instanceof TypeError && /Illegal constructor/.test(e.message);
      });
    });
  });

  describe("#numberOfInputChannels", function() {
    it("get: number", function() {
      var node1 = audioContext.createScriptProcessor(1024, 1, 0);
      var node2 = audioContext.createScriptProcessor(2048, 2, 0);

      assert(node1.numberOfInputChannels === 1);
      assert(node2.numberOfInputChannels === 2);

      assert.throws(function() {
        node1.numberOfInputChannels = 2;
      }, function(e) {
        return e instanceof TypeError && /readonly/.test(e.message);
      });
    });
  });

  describe("#numberOfOutputChannels", function() {
    it("get: number", function() {
      var node1 = audioContext.createScriptProcessor(1024, 0, 1);
      var node2 = audioContext.createScriptProcessor(2048, 0, 2);

      assert(node1.numberOfOutputChannels === 1);
      assert(node2.numberOfOutputChannels === 2);

      assert.throws(function() {
        node1.numberOfOutputChannels = 2;
      }, function(e) {
        return e instanceof TypeError && /readonly/.test(e.message);
      });
    });
  });

  describe("#bufferSize", function() {
    it("get: number", function() {
      var node1 = audioContext.createScriptProcessor(1024, 0, 1);
      var node2 = audioContext.createScriptProcessor(2048, 0, 2);

      assert(node1.bufferSize === 1024);
      assert(node2.bufferSize === 2048);

      assert.throws(function() {
        node1.bufferSize = 2048;
      }, function(e) {
        return e instanceof TypeError && /readonly/.test(e.message);
      });
    });
  });

  describe("#onaudioprocess", function() {
    it("get/set: function", function() {
      var node = audioContext.createScriptProcessor(1024, 0, 1);
      var fn1 = function() {};
      var fn2 = function() {};

      assert(node.onaudioprocess === null);

      node.onaudioprocess = fn1;
      assert(node.onaudioprocess === fn1);

      node.onaudioprocess = fn2;
      assert(node.onaudioprocess === fn2);

      node.onaudioprocess = null;
      assert(node.onaudioprocess === null);

      assert.throws(function() {
        node.onaudioprocess = "INVALID";
      }, function(e) {
        return e instanceof TypeError && /should be a function/.test(e.message);
      });
    });
    it("works", function() {
      var node = audioContext.createScriptProcessor(256, 1, 1);
      var spy = sinon.spy();
      var interval = PROCESS_INTERVAL * 0.25;

      node.onaudioprocess = spy;

      node.connect(audioContext.destination);

      audioContext.$process(0);
      assert(spy.callCount === 0, "0/4");

      audioContext.$process(interval);
      assert(spy.callCount === 1, "1/4");

      audioContext.$process(interval);
      assert(spy.callCount === 1, "2/4");

      audioContext.$process(interval);
      assert(spy.callCount === 1, "3/4");

      audioContext.$process(interval);
      assert(spy.callCount === 2, "4/4");

      audioContext.$process(interval);
      assert(spy.callCount === 2, "5/4");

      audioContext.$process(interval);
      assert(spy.callCount === 2, "6/4");

      audioContext.$process(interval);
      assert(spy.callCount === 2, "7/4");

      audioContext.$process(interval);
      assert(spy.callCount === 3, "8/4");

      audioContext.$process(interval);
      assert(spy.callCount === 3, "9/4");

      var e = spy.args[0][0];

      assert(e instanceof global.AudioProcessingEvent);
      assert(typeof e.playbackTime === "number");
      assert(e.inputBuffer instanceof global.AudioBuffer);
      assert(e.outputBuffer instanceof global.AudioBuffer);
    });
  });

  describe("#toJSON", function() {
    it("(): object", function() {
      var node = audioContext.createScriptProcessor(1024, 0, 1);

      assert.deepEqual(node.toJSON(), {
        name: "ScriptProcessorNode",
        inputs: []
      });
    });
  });

});

describe("AudioProcessingEvent", function() {
  describe("constructor", function() {
    it("() throws TypeError", function() {
      assert.throws(function() {
        global.AudioProcessingEvent();
      }, function(e) {
        return e instanceof TypeError && /Illegal constructor/.test(e.message);
      });
    });
  });
});
