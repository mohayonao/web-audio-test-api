"use strict";

describe("ScriptProcessorNode", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;
  var audioContext;

  beforeEach(function() {
    audioContext = new WebAudioTestAPI.AudioContext();
  });

  describe("constructor", function() {
    it("()", function() {
      var node = new WebAudioTestAPI.ScriptProcessorNode(audioContext);

      assert(node instanceof global.ScriptProcessorNode);
      assert(node instanceof global.AudioNode);

      assert.throws(function() {
        return new global.ScriptProcessorNode();
      }, function(e) {
        return e instanceof TypeError && /Illegal constructor/.test(e.message);
      });
    });
  });

  describe("#numberOfInputChannels", function() {
    it("get: number", function() {
      var node1 = new WebAudioTestAPI.ScriptProcessorNode(audioContext, 1024, 1, 0);
      var node2 = new WebAudioTestAPI.ScriptProcessorNode(audioContext, 2048, 2, 0);

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
      var node1 = new WebAudioTestAPI.ScriptProcessorNode(audioContext, 1024, 0, 1);
      var node2 = new WebAudioTestAPI.ScriptProcessorNode(audioContext, 2048, 0, 2);

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
      var node1 = new WebAudioTestAPI.ScriptProcessorNode(audioContext, 1024, 0, 1);
      var node2 = new WebAudioTestAPI.ScriptProcessorNode(audioContext, 2048, 0, 2);

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
      var node = new WebAudioTestAPI.ScriptProcessorNode(audioContext, 1024, 0, 1);
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
  });

  describe("#toJSON", function() {
    it("(): object", function() {
      var node = new WebAudioTestAPI.ScriptProcessorNode(audioContext, 1024, 0, 1);

      assert.deepEqual(node.toJSON(), {
        name: "ScriptProcessorNode",
        inputs: []
      });
    });
  });

  describe("works", function() {
    it("onaudioprocess", function() {
      // 256 / 44100 = 5.805msec -> 11.610msec -> 17.415msec
      var node = new WebAudioTestAPI.ScriptProcessorNode(audioContext, 256, 1, 1);
      var onaudioprocess = sinon.spy();
      var event;

      node.onaudioprocess = onaudioprocess;

      node.connect(audioContext.destination);

      audioContext.$processTo("00:00.000");
      assert(onaudioprocess.callCount === 0, "00:00.000");

      audioContext.$processTo("00:00.001");
      assert(onaudioprocess.callCount === 1, "00:00.001");
      assert(onaudioprocess.calledOn(node), "00:00.001");
      event = onaudioprocess.args[0][0];
      assert(audioContext.currentTime < event.playbackTime);

      audioContext.$processTo("00:00.005");
      assert(onaudioprocess.callCount === 1, "00:00.005");

      audioContext.$processTo("00:00.006");
      assert(onaudioprocess.callCount === 2, "00:00.006");
      assert(onaudioprocess.calledOn(node), "00:00.006");
      event = onaudioprocess.args[1][0];
      assert(audioContext.currentTime < event.playbackTime);

      audioContext.$processTo("00:00.011");
      assert(onaudioprocess.callCount === 2, "00:00.011");

      audioContext.$processTo("00:00.012");
      assert(onaudioprocess.callCount === 3, "00:00.012");
      assert(onaudioprocess.calledOn(node), "00:00.012");
      event = onaudioprocess.args[2][0];
      assert(audioContext.currentTime < event.playbackTime);

      audioContext.$processTo("00:00.017");
      assert(onaudioprocess.callCount === 3, "00:00.017");

      audioContext.$processTo("00:00.018");
      assert(onaudioprocess.callCount === 4, "00:00.018");
      assert(onaudioprocess.calledOn(node), "00:00.018");
      event = onaudioprocess.args[3][0];
      assert(audioContext.currentTime < event.playbackTime);

      event = onaudioprocess.args[0][0];

      assert(event instanceof WebAudioTestAPI.AudioProcessingEvent);
      assert(event.inputBuffer instanceof WebAudioTestAPI.AudioBuffer);
      assert(event.outputBuffer instanceof WebAudioTestAPI.AudioBuffer);
      assert(event.type === "audioprocess");
      assert(event.target === node);
      assert(typeof event.playbackTime === "number");

      assert(onaudioprocess.args[0][0] !== onaudioprocess.args[1][0]);
    });
  });

});
