"use strict";

describe("OfflineAudioContext", function() {
  var ctx = null;

  beforeEach(function() {
    ctx = new global.OfflineAudioContext(1, 44100, 44100);
  });

  describe("(numberOfChannels, length, sampleRate)", function() {
    it("should return an instance of OfflineAudioContext", function() {
      expect(ctx).to.be.instanceOf(global.OfflineAudioContext);
    });
    it("should have been inherited from AudioContext", function() {
      expect(ctx).to.be.instanceOf(global.AudioContext);
    });
    it("throw error", function() {
      expect(function() {
        ctx = new global.OfflineAudioContext("INVALID", 44100, 44100);
      }).to.throw(TypeError, "OfflineAudioContext(numberOfChannels, length, sampleRate)");
    });
    it("throw error", function() {
      expect(function() {
        ctx = new global.OfflineAudioContext(1, "INVALID", 44100);
      }).to.throw(TypeError, "OfflineAudioContext(numberOfChannels, length, sampleRate)");
    });
    it("throw error", function() {
      expect(function() {
        ctx = new global.OfflineAudioContext(1, 44100, "INVALID");
      }).to.throw(TypeError, "OfflineAudioContext(numberOfChannels, length, sampleRate)");
    });
  });

  describe("#destination", function() {
    it("should be an instance of AudioDestinationNode", function() {
      expect(ctx.destination).to.be.instanceOf(global.AudioDestinationNode);
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
      expect(ctx.listener).to.be.instanceOf(global.AudioListener);
    });
    it("should be readonly", function() {
      expect(function() {
        ctx.listener = null;
      }).throw(Error, "readonly");
    });
  });

  describe("#startRendering()", function() {
    it("throw error if called more than once", function() {
      ctx.startRendering();
      expect(function() {
        ctx.startRendering();
      }).to.throw(Error);
    });
  });

  describe("#process", function() {
    it("should work", function(done) {
      ctx.oncomplete = function(e) {
        expect(e).to.be.instanceOf(global.Event);
        expect(e).to.be.instanceOf(global.OfflineAudioCompletionEvent);
        expect(e.renderedBuffer).to.be.instanceOf(global.AudioBuffer);
        done();
      };
      ctx.startRendering();
      ctx.$processTo("00:00.500");
      ctx.$processTo("00:01.000");
      ctx.$processTo("00:01.500");
    });
    it("should not work", function() {
      ctx.oncomplete = function() {
        throw new Error("NOT REACHED");
      };
      ctx.$processTo("00:00.500");
      ctx.$processTo("00:01.000");
      ctx.$processTo("00:01.500");
    });
  });

});

describe("OfflineAudioCompletionEvent", function() {
  describe("()", function() {
    it("throw illegal constructor", function() {
      expect(function() {
        return new global.OfflineAudioCompletionEvent();
      }).to.throw(TypeError, "Illegal constructor");
    });
  });
});
