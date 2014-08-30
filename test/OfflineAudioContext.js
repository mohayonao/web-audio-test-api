/* global describe, it, expect, beforeEach */
"use strict";

require("../web-audio-mock");

describe("OfflineAudioContext", function() {
  var ctx = null;

  beforeEach(function() {
    ctx = new OfflineAudioContext(1, 44100, 44100);
  });

  describe("new", function() {
    it("should return OfflineAudioContext", function() {
      expect(ctx).to.be.instanceOf(OfflineAudioContext);
    });
    it("should be inherited from AudioContext", function() {
      expect(ctx).to.be.instanceOf(AudioContext);
    });
    it("throw error", function() {
      expect(function() {
        ctx = new OfflineAudioContext("INVALID", 44100, 44100);
      }).to.throw(TypeError, "OfflineAudioContext: 'numberOfChannels' should be a number");
    });
    it("throw error", function() {
      expect(function() {
        ctx = new OfflineAudioContext(1, "INVALID", 44100);
      }).to.throw(TypeError, "OfflineAudioContext: 'length' should be a number");
    });
    it("throw error", function() {
      expect(function() {
        ctx = new OfflineAudioContext(1, 44100, "INVALID");
      }).to.throw(TypeError, "OfflineAudioContext: 'sampleRate' should be a number");
    });
  });

  describe("#destination", function() {
    it("should be an instance of AudioDestinationNode", function() {
      expect(ctx.destination).to.be.instanceOf(AudioDestinationNode);
    });
    it("should be readonly", function() {
      expect(function() {
        ctx.destination = null;
      }).throw(Error, "readonly");
    });
  });

  describe("#sampleRate", function() {
    it("should be a number", function() {
      expect(ctx.sampleRate).to.be.a("number");
    });
    it("should be readonly", function() {
      expect(function() {
        ctx.sampleRate = 0;
      }).throw(Error, "readonly");
    });
  });

  describe("#currentTime", function() {
    it("should be a number", function() {
      expect(ctx.currentTime).to.be.a("number");
    });
    it("should be readonly", function() {
      expect(function() {
        ctx.currentTime = 0;
      }).throw(Error, "readonly");
    });
  });

  describe("#listener", function() {
    it("should be an instance of AudioListener", function() {
      expect(ctx.listener).to.be.instanceOf(AudioListener);
    });
    it("should be readonly", function() {
      expect(function() {
        ctx.listener = null;
      }).throw(Error, "readonly");
    });
  });

  describe("#process", function() {
    it("should work", function(done) {
      ctx.oncomplete = function(e) {
        expect(e).to.be.instanceOf(OfflineAudioCompletionEvent);
        expect(e.renderedBuffer).to.be.instanceOf(AudioBuffer);
        done();
      };
      ctx.startRendering();
      ctx.process(0.5);
      ctx.process(0.5);
      ctx.process(0.5);
    });
    it("should not work", function(done) {
      ctx.oncomplete = function() {
        throw new Error("NOT REACHED");
      };
      ctx.process(0.5);
      ctx.process(0.5);
      ctx.process(0.5, function() {
        done();
      });
    });
  });

});
