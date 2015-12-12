describe("OfflineAudioContext", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;
  var audioContext;

  function setStateForStateTransitionAPI(state) {
    WebAudioTestAPI.setState("AudioContext#suspend", state);
    WebAudioTestAPI.setState("AudioContext#resume", state);
    WebAudioTestAPI.setState("AudioContext#close", state);
  }

  beforeEach(function() {
    audioContext = new WebAudioTestAPI.OfflineAudioContext(2, 441, 44100);
  });

  describe("constructor", function() {
    it("(numberOfChannels: number, length: number, sampleRate: number)", function() {
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

  describe("#destination", function() {
    it("get: AudioDestinationNode", function() {
      assert(audioContext.destination instanceof WebAudioTestAPI.AudioDestinationNode);

      assert.throws(function() {
        audioContext.destination = null;
      }, TypeError);
    });
  });

  describe("#sampleRate", function() {
    it("get: number", function() {
      assert(typeof audioContext.sampleRate === "number");

      assert.throws(function() {
        audioContext.sampleRate = 0;
      }, TypeError);
    });
  });

  describe("#currentTime", function() {
    it("get: number", function() {
      assert(typeof audioContext.currentTime === "number");

      assert.throws(function() {
        audioContext.currentTime = 0;
      }, TypeError);
    });
  });

  describe("#listener", function() {
    it("get: AudioListener", function() {
      assert(audioContext.listener instanceof WebAudioTestAPI.AudioListener);

      assert.throws(function() {
        audioContext.listener = null;
      }, TypeError);
    });
  });

  describe("#suspend", function() {
    describe("disabled", function() {
      before(function() {
        setStateForStateTransitionAPI("disabled");
      });
      after(function() {
        setStateForStateTransitionAPI("disabled");
      });
      it("() throws TypeError", function() {
        assert.throws(function() {
          audioContext.suspend();
        }, TypeError);
      });
    });
    describe("enabled", function() {
      before(function() {
        setStateForStateTransitionAPI("enabled");
      });
      after(function() {
        setStateForStateTransitionAPI("disabled");
      });
      it("(): Promise<void>", function() {
        audioContext.onstatechange = sinon.spy();

        return Promise.resolve().then(function() {
          assert(audioContext.state === "suspended");
        }).then(function() {
          audioContext.onstatechange.reset();
          return audioContext.suspend();
        }).catch(function(e) {
          assert(e instanceof Error && /cannot suspend/i.test(e.message));
        }).then(function() {
          assert(audioContext.state === "suspended");
          assert(!audioContext.onstatechange.called);
        });
      });
    });
  });

  describe("#resume", function() {
    describe("disabled", function() {
      before(function() {
        setStateForStateTransitionAPI("disabled");
      });
      after(function() {
        setStateForStateTransitionAPI("disabled");
      });
      it("() throws TypeError", function() {
        assert.throws(function() {
          audioContext.resume();
        }, TypeError);
      });
    });
    describe("enabled", function() {
      before(function() {
        setStateForStateTransitionAPI("enabled");
      });
      after(function() {
        setStateForStateTransitionAPI("disabled");
      });
      it("(): Promise<void>", function() {
        audioContext.onstatechange = sinon.spy();

        return Promise.resolve().then(function() {
          assert(audioContext.state === "suspended");
        }).then(function() {
          audioContext.onstatechange.reset();
          return audioContext.resume();
        }).catch(function(e) {
          assert(e instanceof Error && /cannot resume/i.test(e.message));
        }).then(function() {
          assert(audioContext.state === "suspended");
          assert(!audioContext.onstatechange.called);
        });
      });
    });
  });

  describe("#close", function() {
    describe("disabled", function() {
      before(function() {
        setStateForStateTransitionAPI("disabled");
      });
      after(function() {
        setStateForStateTransitionAPI("disabled");
      });
      it("() throws TypeError", function() {
        assert.throws(function() {
          audioContext.close();
        }, TypeError);
      });
    });
    describe("enabled", function() {
      before(function() {
        setStateForStateTransitionAPI("enabled");
      });
      after(function() {
        setStateForStateTransitionAPI("disabled");
      });
      it("(): Promise<void>", function() {
        audioContext.onstatechange = sinon.spy();

        return Promise.resolve().then(function() {
          assert(audioContext.state === "suspended");
        }).then(function() {
          audioContext.onstatechange.reset();
          return audioContext.close();
        }).catch(function(e) {
          assert(e instanceof Error && /cannot close/i.test(e.message));
        }).then(function() {
          assert(audioContext.state === "suspended");
          assert(!audioContext.onstatechange.called);
        });
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
        }).catch(Error);
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
      }, TypeError);
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
    before(function() {
      setStateForStateTransitionAPI("enabled");
    });
    after(function() {
      setStateForStateTransitionAPI("disabled");
    });
    it("oncomplete", function() {
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
