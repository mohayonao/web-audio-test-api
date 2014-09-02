/* global describe, it, expect, beforeEach */
"use strict";

require("../web-audio-mock");

var BUFFER_SIZE = 256;
var PROCESS_INTERVAL = BUFFER_SIZE / 44100;

describe("ScriptProcessorNode", function() {
  var ctx = null;
  var node = null;

  beforeEach(function() {
    ctx = new AudioContext();
    node = ctx.createScriptProcessor(BUFFER_SIZE, 2, 1);
  });

  describe("()", function() {
    it("throw illegal constructor", function() {
      expect(function() {
        return new ScriptProcessorNode();
      }).to.throw(TypeError, "Illegal constructor");
    });
    it("should have been inherited from AudioNode", function() {
      expect(node).to.be.instanceOf(AudioNode);
    });
  });

  describe("invalid arguments", function() {
    it("invalid buffer size", function() {
      expect(function() {
        ctx.createScriptProcessor(0, 0, 0);
      }).to.throw(TypeError, "ScriptProcessorNode(bufferSize, numberOfInputChannels, numberOfOutputChannels)");
    });
    it("invalid numberOfInputChannels", function() {
      expect(function() {
        ctx.createScriptProcessor(BUFFER_SIZE, "INVALID", 0);
      }).to.throw(TypeError, "ScriptProcessorNode(bufferSize, numberOfInputChannels, numberOfOutputChannels)");
    });
    it("invalid numberOfOutputChannels", function() {
      expect(function() {
        ctx.createScriptProcessor(BUFFER_SIZE, 0, "INVALID");
      }).to.throw(TypeError, "ScriptProcessorNode(bufferSize, numberOfInputChannels, numberOfOutputChannels)");
    });
  });

  describe("#numberOfInputChannels", function() {
    it("should be exist", function() {
      expect(node).to.have.property("numberOfInputChannels", 2);
    });
  });

  describe("#numberOfOutputChannels", function() {
    it("should be exist", function() {
      expect(node).to.have.property("numberOfOutputChannels", 1);
    });
  });

  describe("#bufferSize", function() {
    it("should be exist", function() {
      expect(node).to.have.property("bufferSize", BUFFER_SIZE);
    });
    it("should be readonly", function() {
      expect(function() {
        node.bufferSize = 0;
      }).to.throw(Error, "readonly");
    });
  });

  describe("#onaudioprocess", function() {
    it("should be exist", function() {
      expect(node).to.have.property("onaudioprocess");
    });
    it("should work", function() {
      var passed = 0;
      var interval = PROCESS_INTERVAL * 0.25;

      node.connect(ctx.destination);
      node.onaudioprocess = function(e) {
        passed += 1;
        expect(e).to.be.instanceOf(Event);
        expect(e).to.be.instanceOf(AudioProcessingEvent);
        expect(e).to.have.property("playbackTime");
        expect(e.inputBuffer).to.be.instanceOf(AudioBuffer);
        expect(e.outputBuffer).to.be.instanceOf(AudioBuffer);
      };
      ctx.process(0);
      expect(passed, "0/4").to.equal(0);
      ctx.process(interval);
      expect(passed, "1/4").to.equal(1);
      ctx.process(interval);
      expect(passed, "2/4").to.equal(1);
      ctx.process(interval);
      expect(passed, "3/4").to.equal(1);
      ctx.process(interval);
      expect(passed, "4/4").to.equal(2);
      ctx.process(interval);
      expect(passed, "5/4").to.equal(2);
      ctx.process(interval);
      expect(passed, "6/4").to.equal(2);
      ctx.process(interval);
      expect(passed, "7/4").to.equal(2);
      ctx.process(interval);
      expect(passed, "8/4").to.equal(3);
      ctx.process(interval);
      expect(passed, "9/4").to.equal(3);
    });
  });

  describe("#toJSON()", function() {
    it("return json", function() {
      expect(node.toJSON()).to.eql({
        name: "ScriptProcessorNode",
        inputs: []
      });
    });
  });

});

describe("AudioProcessingEvent", function() {
  describe("()", function() {
    it("throw illegal constructor", function() {
      expect(function() {
        return new AudioProcessingEvent();
      }).to.throw(TypeError, "Illegal constructor");
    });
  });
});
