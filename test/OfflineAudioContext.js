"use strict";

describe("OfflineAudioContext", function() {
  var ctx = null;

  beforeEach(function() {
    ctx = new global.OfflineAudioContext(1, 44100, 44100);
  });

  describe("(numberOfChannels, length, sampleRate)", function() {
    it("should return an instance of OfflineAudioContext", function() {
      assert(ctx instanceof global.OfflineAudioContext);
    });
    it("should have been inherited from AudioContext", function() {
      assert(ctx instanceof global.AudioContext);
    });
    it("throw error", function() {
      assert.throws(function() {
        ctx = new global.OfflineAudioContext("INVALID", 44100, 44100);
      }, TypeError, "OfflineAudioContext(numberOfChannels, length, sampleRate)");
    });
    it("throw error", function() {
      assert.throws(function() {
        ctx = new global.OfflineAudioContext(1, "INVALID", 44100);
      }, TypeError, "OfflineAudioContext(numberOfChannels, length, sampleRate)");
    });
    it("throw error", function() {
      assert.throws(function() {
        ctx = new global.OfflineAudioContext(1, 44100, "INVALID");
      }, TypeError, "OfflineAudioContext(numberOfChannels, length, sampleRate)");
    });
  });

  describe("#destination", function() {
    it("should be an instance of AudioDestinationNode", function() {
      assert(ctx.destination instanceof global.AudioDestinationNode);
    });
    it("should be readonly", function() {
      assert.throws(function() {
        ctx.destination = null;
      }, Error, "readonly");
    });
  });

  describe("#sampleRate", function() {
    it("should be a number", function() {
      assert(typeof ctx.sampleRate === "number");
    });
    it("should be readonly", function() {
      assert.throws(function() {
        ctx.sampleRate = 0;
      }, Error, "readonly");
    });
  });

  describe("#currentTime", function() {
    it("should be a number", function() {
      assert(typeof ctx.currentTime === "number");
    });
    it("should be readonly", function() {
      assert.throws(function() {
        ctx.currentTime = 0;
      }, Error, "readonly");
    });
  });

  describe("#listener", function() {
    it("should be an instance of AudioListener", function() {
      assert(ctx.listener instanceof global.AudioListener);
    });
    it("should be readonly", function() {
      assert.throws(function() {
        ctx.listener = null;
      }, Error, "readonly");
    });
  });

  describe("#startRendering()", function() {
    it("throw error if called more than once", function() {
      ctx.startRendering();
      assert.throws(function() {
        ctx.startRendering();
      }, Error);
    });
  });

  describe("#process", function() {
    it("should work", function(done) {
      ctx.oncomplete = function(e) {
        assert(e instanceof global.Event);
        assert(e instanceof global.OfflineAudioCompletionEvent);
        assert(e.renderedBuffer instanceof global.AudioBuffer);
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
      assert.throws(function() {
        return new global.OfflineAudioCompletionEvent();
      }, TypeError, "Illegal constructor");
    });
  });
});
