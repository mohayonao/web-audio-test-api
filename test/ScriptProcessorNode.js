/* global describe, it, expect, beforeEach */
"use strict";

require("../web-audio-mock");

describe("ScriptProcessorNode", function() {
  var ctx = null;
  var node = null;

  beforeEach(function() {
    ctx = new AudioContext();
    node = ctx.createScriptProcessor(256, 2, 1);
  });

  describe("invalid arguments", function() {
    it("invalid buffer size", function() {
      expect(function() {
        ctx.createScriptProcessor(0, 0, 0);
      }).to.throw(TypeError, "ScriptProcessorNode(bufferSize, numberOfInputChannels, numberOfOutputChannels)");
    });
    it("invalid numberOfInputChannels", function() {
      expect(function() {
        ctx.createScriptProcessor(256, "INVALID", 0);
      }).to.throw(TypeError, "ScriptProcessorNode(bufferSize, numberOfInputChannels, numberOfOutputChannels)");
    });
    it("invalid numberOfOutputChannels", function() {
      expect(function() {
        ctx.createScriptProcessor(256, 0, "INVALID");
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
      expect(node).to.have.property("bufferSize", 256);
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
      node.connect(ctx.destination);
      node.onaudioprocess = function(e) {
        expect(e).to.be.instanceOf(AudioProcessingEvent);
        expect(e).to.have.property("playbackTime");
        expect(e.inputBuffer).to.be.instanceOf(AudioBuffer);
        expect(e.outputBuffer).to.be.instanceOf(AudioBuffer);
      };
      ctx.process(0.005); // process 5msec
    });
  });

});
