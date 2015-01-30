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
      }, function(e) {
        return e instanceof TypeError && /should be a number/.test(e.message);
      });

      assert.throws(function() {
        audioContext = new global.OfflineAudioContext(1, "INVALID", 44100);
      }, function(e) {
        return e instanceof TypeError && /should be a number/.test(e.message);
      });

      assert.throws(function() {
        audioContext = new global.OfflineAudioContext(1, 44100, "INVALID");
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
      }, function(e) {
        return e instanceof TypeError && /Illegal constructor/.test(e.message);
      });
    });
  });
});
