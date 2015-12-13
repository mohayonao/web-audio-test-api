describe("OfflineAudioContext", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;
  var audioContext;
  var versions;

  beforeEach(function() {
    versions = WebAudioTestAPI.getTargetVersions();
    audioContext = new WebAudioTestAPI.OfflineAudioContext(2, 441, 44100);
  });
  afterEach(function() {
    WebAudioTestAPI.setTargetVersions(versions);
  });

  describe("constructor(numberOfChannels: number, length: number, sampleRate: number)", function() {
    it("works", function() {
      assert(audioContext instanceof global.OfflineAudioContext);
      assert(audioContext instanceof global.AudioContext);

      assert.throws(function() {
        audioContext = new WebAudioTestAPI.OfflineAudioContext(2.5, 441, 44100);
      }, TypeError);

      assert.throws(function() {
        audioContext = new WebAudioTestAPI.OfflineAudioContext(2, 441.5, 44100);
      }, TypeError);

      assert.throws(function() {
        audioContext = new WebAudioTestAPI.OfflineAudioContext(2, 441, 44100.5);
      }, TypeError);
    });
  });

  describe("#destination: AudioDestinationNode", function() {
    it("works", function() {
      assert(audioContext.destination instanceof WebAudioTestAPI.AudioDestinationNode);

      assert.throws(function() {
        audioContext.destination = null;
      }, TypeError);
    });
  });

  describe("#sampleRate: number", function() {
    it("works", function() {
      assert(typeof audioContext.sampleRate === "number");

      assert.throws(function() {
        audioContext.sampleRate = 0;
      }, TypeError);
    });
  });

  describe("#currentTime: number", function() {
    it("works", function() {
      assert(typeof audioContext.currentTime === "number");

      assert.throws(function() {
        audioContext.currentTime = 0;
      }, TypeError);
    });
  });

  describe("#listener: AudioListener", function() {
    it("works", function() {
      assert(audioContext.listener instanceof WebAudioTestAPI.AudioListener);

      assert.throws(function() {
        audioContext.listener = null;
      }, TypeError);
    });
  });

  describe("#suspend(): Promise<void>", function() {
    it("works", function() {
      WebAudioTestAPI.setTargetVersions(Infinity);

      return Promise.resolve().then(function() {
        return audioContext.suspend();
      }).catch(function(e) {
        assert(e instanceof TypeError);
      });
    });
    it("not work in unsupported version", function() {
      WebAudioTestAPI.setTargetVersions(0);

      return Promise.resolve().then(function() {
        return audioContext.suspend();
      }).catch(function(e) {
        assert(e instanceof TypeError);
      });
    });
  });

  describe("#resume(): Promise<void>", function() {
    it("works", function() {
      WebAudioTestAPI.setTargetVersions(Infinity);

      return Promise.resolve().then(function() {
        return audioContext.resume();
      }).catch(function(e) {
        assert(e instanceof TypeError);
      });
    });
    it("not work in unsupported version", function() {
      WebAudioTestAPI.setTargetVersions(0);

      return Promise.resolve().then(function() {
        return audioContext.resume();
      }).catch(function(e) {
        assert(e instanceof TypeError);
      });
    });
  });

  describe("#close(): Promise<void>", function() {
    it("works", function() {
      WebAudioTestAPI.setTargetVersions(Infinity);

      return Promise.resolve().then(function() {
        return audioContext.close();
      }).catch(function(e) {
        assert(e instanceof TypeError);
      });
    });
    it("not work in unsupported version", function() {
      WebAudioTestAPI.setTargetVersions(0);

      return Promise.resolve().then(function() {
        return audioContext.close();
      }).catch(function(e) {
        assert(e instanceof TypeError);
      });
    });
  });

  describe("#startRendering(): void", function() {
    it("works", function() {
      WebAudioTestAPI.setTargetVersions(0);

      audioContext.startRendering();

      assert.throws(function() {
        audioContext.startRendering();
      }, Error);
    });
  });

  describe("#startRendering(): Promise<AudioBuffer>", function() {
    it("works", function() {
      WebAudioTestAPI.setTargetVersions(Infinity);

      audioContext.oncomplete = sinon.spy();

      setTimeout(() => {
        assert(audioContext.state === "running");

        audioContext.$processTo("00:00.100");
      }, 5);

      return audioContext.startRendering().then(function(audioBuffer) {
        assert(audioContext.oncomplete.callCount === 1);
        assert(audioContext.oncomplete.args[0][0] instanceof global.Event);
        assert(audioContext.oncomplete.args[0][0].renderedBuffer === audioBuffer);

        assert(audioContext.state === "closed");
      });
    });
  });

  describe("#oncomplete: function", function() {
    it("works", function() {
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
      }, TypeError);
    });
  });

  describe("$name: string", function() {
    it("works", function() {
      assert(audioContext.$name === "OfflineAudioContext");
    });
  });

  describe("$context: AudioContext", function() {
    it("works", function() {
      assert(audioContext.$context === audioContext);
    });
  });

  describe("works", function() {
    it("oncomplete", function() {
      WebAudioTestAPI.setTargetVersions(Infinity);

      var oncomplete = sinon.spy();
      var event;

      audioContext.oncomplete = oncomplete;

      assert(audioContext.state === "suspended");

      audioContext.startRendering();

      assert(audioContext.state === "running");

      audioContext.$processTo("00:00.009");
      assert(oncomplete.callCount === 0, "00:00.009");

      audioContext.$processTo("00:00.010");
      assert(oncomplete.callCount === 1, "00:00.010");
      assert(oncomplete.calledOn(audioContext), "00:00.010");

      audioContext.$processTo("00:00.100");
      assert(oncomplete.callCount === 1, "00:00.100");

      assert(audioContext.state === "closed");

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
