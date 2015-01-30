"use strict";

describe("OfflineAudioContext", function() {
  var audioContext = null;

  beforeEach(function() {
    audioContext = new global.OfflineAudioContext(2, 441, 44100);
  });

  describe("constructor", function() {
    it("(numberOfChannels: number, length: number, sampleRate: number)", function() {
      assert(audioContext instanceof global.OfflineAudioContext);
      assert(audioContext instanceof global.AudioContext);

      assert.throws(function() {
        global.OfflineAudioContext();
      }, function(e) {
        return e instanceof TypeError && /Failed to construct/.test(e.message);
      });

      assert.throws(function() {
        audioContext = new global.OfflineAudioContext("INVALID", 441, 44100);
      }, function(e) {
        return e instanceof TypeError && /should be a number/.test(e.message);
      });

      assert.throws(function() {
        audioContext = new global.OfflineAudioContext(2, "INVALID", 44100);
      }, function(e) {
        return e instanceof TypeError && /should be a number/.test(e.message);
      });

      assert.throws(function() {
        audioContext = new global.OfflineAudioContext(2, 441, "INVALID");
      }, function(e) {
        return e instanceof TypeError && /should be a number/.test(e.message);
      });
    });
  });

  describe("#destination", function() {
    it("get: AudioDestinationNode", function() {

      assert(audioContext.destination instanceof global.AudioDestinationNode);

      assert.throws(function() {
        audioContext.destination = null;
      }, function(e) {
        return e instanceof TypeError && /readonly/.test(e.message);
      });
    });
  });

  describe("#sampleRate", function() {
    it("get: number", function() {
      assert(typeof audioContext.sampleRate === "number");

      assert.throws(function() {
        audioContext.sampleRate = 0;
      }, function(e) {
        return e instanceof TypeError && /readonly/.test(e.message);
      });
    });
  });

  describe("#currentTime", function() {
    it("get: number", function() {
      assert(typeof audioContext.currentTime === "number");

      assert.throws(function() {
        audioContext.currentTime = 0;
      }, function(e) {
        return e instanceof TypeError && /readonly/.test(e.message);
      });
    });
  });

  describe("#listener", function() {
    it("get: AudioListener", function() {
      assert(audioContext.listener instanceof global.AudioListener);

      assert.throws(function() {
        audioContext.listener = null;
      }, function(e) {
        return e instanceof TypeError && /readonly/.test(e.message);
      });
    });
  });

  describe("#startRendering", function() {
    it("(): void", function() {
      audioContext.startRendering();

      assert.throws(function() {
        audioContext.startRendering();
      }, Error);
    });
  });

  describe("#oncomplete", function() {
    it("get/set: function", function() {
      var fn1 = function() {};
      var fn2 = function() {};

      assert(audioContext.oncomplete === null);

      audioContext.oncomplete = fn1;
      assert(audioContext.oncomplete === fn1);

      audioContext.oncomplete = fn2;
      assert(audioContext.oncomplete === fn2);

      audioContext.oncomplete = null;
      assert(audioContext.oncomplete === null);

      assert.throws(function() {
        audioContext.oncomplete = "INVALID";
      }, function(e) {
        return e instanceof TypeError && /should be a function/.test(e.message);
      });
    });
    it("works", function() {
      var oncomplete = sinon.spy();

      audioContext.oncomplete = oncomplete;

      audioContext.startRendering();

      audioContext.$processTo("00:00.009");
      assert(oncomplete.callCount === 0, "00:00.009");

      audioContext.$processTo("00:00.010");
      assert(oncomplete.callCount === 1, "00:00.010");
      assert(oncomplete.calledOn(audioContext), "00:00.010");

      audioContext.$processTo("00:00.100");
      assert(oncomplete.callCount === 1, "00:00.100");

      var event = oncomplete.args[0][0];

      assert(event instanceof global.OfflineAudioCompletionEvent);
      assert(event.renderedBuffer instanceof global.AudioBuffer);
      assert(event.type === "complete");
      assert(event.target = audioContext);
    });
    it("not work", function() {
      var oncomplete = sinon.spy();

      audioContext.oncomplete = oncomplete;

      audioContext.$processTo("00:00.100");

      assert(oncomplete.callCount === 0, "00:00.100");
    });
  });

});
