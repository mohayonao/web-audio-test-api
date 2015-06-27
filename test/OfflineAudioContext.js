describe("OfflineAudioContext", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;
  var audioContext;

  beforeEach(function() {
    audioContext = new WebAudioTestAPI.OfflineAudioContext(2, 441, 44100);
  });

  describe("constructor", function() {
    it("(numberOfChannels: number, length: number, sampleRate: number)", function() {
      assert(audioContext instanceof global.OfflineAudioContext);
      assert(audioContext instanceof global.AudioContext);

      assert.throws(function() {
        audioContext = new WebAudioTestAPI.OfflineAudioContext(2.5, 441, 44100);
      }, function(e) {
        return e instanceof TypeError && /should be a positive integer/.test(e.message);
      });

      assert.throws(function() {
        audioContext = new WebAudioTestAPI.OfflineAudioContext(2, 441.5, 44100);
      }, function(e) {
        return e instanceof TypeError && /should be a positive integer/.test(e.message);
      });

      assert.throws(function() {
        audioContext = new WebAudioTestAPI.OfflineAudioContext(2, 441, 44100.5);
      }, function(e) {
        return e instanceof TypeError && /should be a positive integer/.test(e.message);
      });
    });
  });

  describe("#destination", function() {
    it("get: AudioDestinationNode", function() {
      assert(audioContext.destination instanceof WebAudioTestAPI.AudioDestinationNode);

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
      assert(audioContext.listener instanceof WebAudioTestAPI.AudioListener);

      assert.throws(function() {
        audioContext.listener = null;
      }, function(e) {
        return e instanceof TypeError && /readonly/.test(e.message);
      });
    });
  });

  describe("#startRendering", function() {
    describe("promise-based", function() {
      before(function() {
        WebAudioTestAPI.setState("OfflineAudioContext#startRendering", "promise");
      });
      after(function() {
        WebAudioTestAPI.setState("OfflineAudioContext#startRendering", "void");
      });
      it("(): Promise<AudioBuffer>", function() {
        return Promise.resolve().then(function() {
          setTimeout(function() {
            audioContext.$processTo("00:00.100");
          }, 0);
          return audioContext.startRendering();
        }).then(function(buffer) {
          assert(buffer instanceof WebAudioTestAPI.AudioBuffer);
        }).then(function() {
          return audioContext.startRendering();
        }).catch(function(e) {
          return e instanceof Error && /cannot call startRendering more than once/.test(e.message);
        });
      });
    });
    describe("void-based", function() {
      it("(): void", function() {
        audioContext.startRendering();

        assert.throws(function() {
          audioContext.startRendering();
        }, Error);
      });
    });
  });

  describe("#oncomplete", function() {
    it("get/set: function", function() {
      function fn1() {}
      function fn2() {}

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
  });

  describe("#$name", function() {
    it("get: string", function() {
      assert(audioContext.$name === "OfflineAudioContext");
    });
  });

  describe("#$context", function() {
    it("get: AudioContext", function() {
      assert(audioContext.$context === audioContext);
    });
  });

  describe("works", function() {
    it("oncomplete", function() {
      var oncomplete = sinon.spy();
      var event;

      audioContext.oncomplete = oncomplete;

      audioContext.startRendering();

      audioContext.$processTo("00:00.009");
      assert(oncomplete.callCount === 0, "00:00.009");

      audioContext.$processTo("00:00.010");
      assert(oncomplete.callCount === 1, "00:00.010");
      assert(oncomplete.calledOn(audioContext), "00:00.010");

      audioContext.$processTo("00:00.100");
      assert(oncomplete.callCount === 1, "00:00.100");

      event = oncomplete.args[0][0];

      assert(event instanceof WebAudioTestAPI.OfflineAudioCompletionEvent);
      assert(event.renderedBuffer instanceof WebAudioTestAPI.AudioBuffer);
      assert(event.type === "complete");
      assert(event.target === audioContext);
    });
    it("oncomplete (without startRendering)", function() {
      var oncomplete = sinon.spy();

      audioContext.oncomplete = oncomplete;

      audioContext.$processTo("00:00.100");

      assert(oncomplete.callCount === 0, "00:00.100");
    });
  });
});
