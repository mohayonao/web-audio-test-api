"use strict";

describe("OfflineAudioContext", function() {
  var audioContext = null;

  beforeEach(function() {
    audioContext = new global.OfflineAudioContext(1, 44100, 44100);
  });

  describe("constructor", function() {
    it("(numberOfChannels, length, sampleRate)", function() {
      assert(audioContext instanceof global.OfflineAudioContext);
      assert(audioContext instanceof global.AudioContext);

      assert.throws(function() {
        audioContext = new global.OfflineAudioContext("INVALID", 44100, 44100);
      }, TypeError);

      assert.throws(function() {
        audioContext = new global.OfflineAudioContext(1, "INVALID", 44100);
      }, TypeError);

      assert.throws(function() {
        audioContext = new global.OfflineAudioContext(1, 44100, "INVALID");
      }, TypeError);
    });
  });

  describe("#destination", function() {
    it("get: AudioDestinationNode", function() {

      assert(audioContext.destination instanceof global.AudioDestinationNode);

      assert.throws(function() {
        audioContext.destination = null;
      }, Error);
    });
  });

  describe("#sampleRate", function() {
    it("get: number", function() {
      assert(typeof audioContext.sampleRate === "number");

      assert.throws(function() {
        audioContext.sampleRate = 0;
      }, Error);
    });
  });

  describe("#currentTime", function() {
    it("get: number", function() {
      assert(typeof audioContext.currentTime === "number");

      assert.throws(function() {
        audioContext.currentTime = 0;
      }, Error);
    });
  });

  describe("#listener", function() {
    it("get: AudioListener", function() {
      assert(audioContext.listener instanceof global.AudioListener);

      assert.throws(function() {
        audioContext.listener = null;
      }, Error);
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

  describe("oncomplete", function() {
    it("works", function(done) {
      audioContext.oncomplete = function(e) {
        assert(e instanceof global.Event);
        assert(e instanceof global.OfflineAudioCompletionEvent);
        assert(e.renderedBuffer instanceof global.AudioBuffer);
        done();
      };
      audioContext.startRendering();
      audioContext.$processTo("00:00.500");
      audioContext.$processTo("00:01.000");
      audioContext.$processTo("00:01.500");
    });
    it("not work", function() {
      audioContext.oncomplete = function() {
        throw new Error("NOT REACHED");
      };
      audioContext.$processTo("00:00.500");
      audioContext.$processTo("00:01.000");
      audioContext.$processTo("00:01.500");
    });
  });

});

describe("OfflineAudioCompletionEvent", function() {
  describe("constructor", function() {
    it("() throw TypeError", function() {
      assert.throws(function() {
        global.OfflineAudioCompletionEvent();
      }, TypeError);
    });
  });
});
