describe("AudioContext", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;
  var audioContext;
  var versions;

  beforeEach(function() {
    versions = WebAudioTestAPI.getTargetVersions();
    audioContext = new WebAudioTestAPI.AudioContext();
  });
  afterEach(function() {
    WebAudioTestAPI.setTargetVersions(versions);
  });

  describe("constructor()", function() {
    it("works", function() {
      assert(audioContext instanceof global.AudioContext);
      assert(audioContext instanceof global.EventTarget);
    });
  });

  describe(".WEB_AUDIO_TEST_API_VERSION", function() {
    it("check", function() {
      assert(WebAudioTestAPI.AudioContext.WEB_AUDIO_TEST_API_VERSION === WebAudioTestAPI.VERSION);
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

  describe("#state: string", function() {
    it("works", function() {
      WebAudioTestAPI.setTargetVersions(Infinity);

      assert(audioContext.state === "running");
    });
    it("not work in unsupported version", function() {
      WebAudioTestAPI.setTargetVersions(0);

      assert(typeof audioContext.state === "undefined");
    });
  });

  describe("#onstatechange: function", function() {
    it("works", function() {
      function fn1() {}
      function fn2() {}

      assert(audioContext.onstatechange === null);

      audioContext.onstatechange = fn1;
      assert(audioContext.onstatechange === fn1);

      audioContext.onstatechange = fn2;
      assert(audioContext.onstatechange === fn2);

      audioContext.onstatechange = null;
      assert(audioContext.onstatechange === null);

      assert.throws(function() {
        audioContext.onstatechange = "INVALID";
      }, TypeError);
    });
  });

  describe("#suspend(): Promise<void", function() {
    it("works", function() {
      WebAudioTestAPI.setTargetVersions(Infinity);

      audioContext.onstatechange = sinon.spy();

      assert(audioContext.state === "running");

      return Promise.resolve().then(function() {
        return audioContext.suspend();
      }).then(function() {
        assert(audioContext.state === "suspended");
        assert(audioContext.onstatechange.calledOnce);
        assert(audioContext.onstatechange.args[0][0] instanceof global.Event);
        assert(audioContext.currentTime === 0);

        audioContext.$processTo("00:01.000");
        assert(audioContext.currentTime === 0);
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

      assert(audioContext.state === "running");

      return audioContext.suspend().then(function() {
        assert(audioContext.state === "suspended");

        audioContext.onstatechange = sinon.spy();

        return audioContext.resume();
      }).then(function() {
        assert(audioContext.state === "running");
        assert(audioContext.onstatechange.calledOnce);
        assert(audioContext.onstatechange.args[0][0] instanceof global.Event);

        audioContext.$processTo("00:01.000");
        assert(audioContext.currentTime === 1.000);
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

      assert(audioContext.state === "running");

      return audioContext.suspend().then(function() {
        assert(audioContext.state === "suspended");

        audioContext.onstatechange = sinon.spy();

        return audioContext.close();
      }).then(function() {
        assert(audioContext.state === "closed");

        return audioContext.close();
      }).catch(function(e) {
        assert(e instanceof TypeError);

        return audioContext.createGain();
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

  describe("#createBuffer(numberOfChannels: number, length: number, sampleRate: number): AudioBuffer", function() {
    it("works", function() {
      var buf = audioContext.createBuffer(2, 128, 44100);

      assert(buf instanceof global.AudioBuffer);
    });
  });

  describe("#decodeAudioData(audioData: ArrayBuffer, successCallback: function, [ errorCallback: function ]): void", function() {
    it("works", function() {
      WebAudioTestAPI.setTargetVersions(0);

      var audioData = new Uint8Array(128).buffer;

      return new Promise(function(resolve, reject) {
        var res = audioContext.decodeAudioData(audioData, resolve, reject);

        assert(typeof res === "undefined");
      }).then(function(buffer) {
        assert(buffer instanceof global.AudioBuffer);
      });
    });
    it("not work without successCallback", function() {
      WebAudioTestAPI.setTargetVersions(0);

      var audioData = new Uint8Array(128).buffer;

      return new Promise(function() {
        audioContext.decodeAudioData(audioData);
      }).catch(function(e) {
        assert(e instanceof TypeError);
      });
    });
  });

  describe("#decodeAudioData(audioData: ArrayBuffer, [ successCallback: function, errorCallback: function ]): Promise<AudioBuffer>", function() {
    it("works", function() {
      WebAudioTestAPI.setTargetVersions(Infinity);

      var audioData = new Uint8Array(128).buffer;

      return audioContext.decodeAudioData(audioData).then(function(buffer) {
        assert(buffer instanceof global.AudioBuffer);
      });
    });
  });

  describe("#createBufferSource(): AudioBufferSourceNode", function() {
    it("works", function() {
      var node = audioContext.createBufferSource();

      assert(node instanceof global.AudioBufferSourceNode);
    });
  });

  describe("#createMediaElementSource(mediaElement: HTMLMediaElement): MediaElementAudioSourceNode", function() {
    it("works", function() {
      var element = new WebAudioTestAPI.DOM.HTMLMediaElement();
      var node = audioContext.createMediaElementSource(element);

      assert(node instanceof global.MediaElementAudioSourceNode);
    });
  });

  describe("#createMediaStreamSource(mediaStream: MediaStream): MediaStreamAudioSourceNode", function() {
    it("works", function() {
      var stream = new WebAudioTestAPI.DOM.MediaStream();
      var node = audioContext.createMediaStreamSource(stream);

      assert(node instanceof global.MediaStreamAudioSourceNode);
    });
  });

  describe("#createMediaStreamDestination(): MediaStreamAudioDestinationNode", function() {
    it("works", function() {
      var node = audioContext.createMediaStreamDestination();

      assert(node instanceof global.MediaStreamAudioDestinationNode);
    });
  });

  describe("#createAudioWorker(): Promise<AudioWorker>", function() {
    it("not work in not unsupported version", function() {
      assert.throws(function() {
        audioContext.createAudioWorker();
      }, TypeError);
    });
  });

  describe("#createScriptProcessor(bufferSize: number, numberOfInputChannels: number, numberOfOutputChannels: number): ScriptProcessorNode", function() {
    it("works", function() {
      var node = audioContext.createScriptProcessor(1024, 1, 1);

      assert(node instanceof global.ScriptProcessorNode);
    });
  });

  describe("#createAnalyser(): AnalyserNode", function() {
    it("works", function() {
      var node = audioContext.createAnalyser();

      assert(node instanceof global.AnalyserNode);
    });
  });

  describe("#createGain(): GainNode", function() {
    it("works", function() {
      var node = audioContext.createGain();

      assert(node instanceof global.GainNode);
    });
  });

  describe("#createDelay([ maxDelayTime: number ]): DelayNode", function() {
    it("works", function() {
      var node = audioContext.createDelay();

      assert(node instanceof global.DelayNode);
    });
  });

  describe("#createBiquadFilter(): BiquadFilterNode", function() {
    it("works", function() {
      var node = audioContext.createBiquadFilter();

      assert(node instanceof global.BiquadFilterNode);
    });
  });

  describe("#createWaveShaper(): WaveShaperNode", function() {
    it("works", function() {
      var node = audioContext.createWaveShaper();

      assert(node instanceof global.WaveShaperNode);
    });
  });

  describe("#createPanner(): PannerNode", function() {
    it("works", function() {
      var node = audioContext.createPanner();

      assert(node instanceof global.PannerNode);
    });
  });

  describe("#createStereoPanner(): StereoPannerNode", function() {
    it("works", function() {
      WebAudioTestAPI.setTargetVersions(Infinity);

      var node = audioContext.createStereoPanner();

      assert(node instanceof global.StereoPannerNode);
    });
    it("not work in unsupported version", function() {
      WebAudioTestAPI.setTargetVersions(0);

      assert.throws(function() {
        audioContext.createStereoPanner();
      }, TypeError);
    });
  });

  describe("#createConvolver(): ConvolverNode", function() {
    it("works", function() {
      var node = audioContext.createConvolver();

      assert(node instanceof global.ConvolverNode);
    });
  });

  describe("#createChannelSplitter(): ChannelSplitterNode", function() {
    it("works", function() {
      var node = audioContext.createChannelSplitter();

      assert(node instanceof global.ChannelSplitterNode);
    });
  });

  describe("#createChannelMerger(): ChannelMergerNode", function() {
    it("works", function() {
      var node = audioContext.createChannelMerger();

      assert(node instanceof global.ChannelMergerNode);
    });
  });

  describe("#createDynamicsCompressor(): DynamicsCompressorNode", function() {
    it("works", function() {
      var node = audioContext.createDynamicsCompressor();

      assert(node instanceof global.DynamicsCompressorNode);
    });
  });

  describe("#createOscillator(): OscillatorNode", function() {
    it("works", function() {
      var node = audioContext.createOscillator();

      assert(node instanceof global.OscillatorNode);
    });
  });

  describe("#createPeriodicWave(real: Float32Array, imag: Float32Array): PeriodicWave", function() {
    it("works", function() {
      var real = new Float32Array(128);
      var imag = new Float32Array(128);
      var wave = audioContext.createPeriodicWave(real, imag);

      assert(wave instanceof global.PeriodicWave);
    });
  });

  describe("#toJSON(): object", function() {
    it("works", function() {
      assert.deepEqual(audioContext.toJSON(), {
        name: "AudioDestinationNode",
        inputs: []
      });
    });
  });

  describe("$name: string", function() {
    it("works", function() {
      assert(audioContext.$name === "AudioContext");
    });
  });

  describe("$context: AudioContext", function() {
    it("works", function() {
      assert(audioContext.$context === audioContext);
    });
  });

  describe("$process(time: number|string): void", function() {
    it("works", function() {
      audioContext.$process(0.125);
      assert(audioContext.currentTime === 0.125, "00:00.125");

      audioContext.$process(0.125);
      assert(audioContext.currentTime === 0.250, "00:00.250");

      audioContext.$process(0.250);
      assert(audioContext.currentTime === 0.500, "00:00.500");

      audioContext.$process("00:00.500");
      assert(audioContext.currentTime === 1.000, "00:01.000");
    });
  });

  describe("$processTo(time: number|string): void", function() {
    it("works", function() {
      audioContext.$processTo(0.125);
      assert(audioContext.currentTime === 0.125, "00:00.125");

      audioContext.$processTo(0.125);
      assert(audioContext.currentTime === 0.125, "00:00.125");

      audioContext.$processTo(0.250);
      assert(audioContext.currentTime === 0.250, "00:00.250");

      audioContext.$processTo("00:00.500");
      assert(audioContext.currentTime === 0.500, "00:00.500");
    });
  });

  describe("$reset(): void", function() {
    it("works", function() {
      var gain = audioContext.createGain();

      gain.connect(audioContext.destination);

      assert.deepEqual(audioContext.toJSON(), {
        name: "AudioDestinationNode",
        inputs: [
          {
            name: "GainNode",
            gain: {
              value: 1,
              inputs: []
            },
            inputs: []
          }
        ]
      });

      audioContext.$processTo(0.125);

      assert(audioContext.currentTime === 0.125);

      audioContext.$reset();

      assert(audioContext.currentTime === 0);
      assert.deepEqual(audioContext.toJSON(), {
        name: "AudioDestinationNode",
        inputs: []
      });
    });
  });

  describe("works", function() {
    it("$processTo", function() {
      var amp = audioContext.createGain();
      var osc = audioContext.createOscillator();
      var bufSrc = audioContext.createBufferSource();
      var buf = audioContext.createBuffer(1, (44100 * 0.025)|0, 44100);
      var onended = sinon.spy();
      var event;

      bufSrc.buffer = buf;
      bufSrc.onended = onended;

      bufSrc.connect(osc.frequency);
      osc.connect(amp);
      amp.connect(audioContext.destination);

      assert(audioContext.toJSON(), {
        name: "AudioDestinationNode",
        inputs: [
          {
            name: "GainNode",
            gain: {
              value: 1,
              inputs: []
            },
            inputs: [
              {
                name: "OscillatorNode",
                type: "sine",
                frequency: {
                  value: 440,
                  inputs: [ bufSrc.toJSON() ]
                },
                detune: {
                  value: 0,
                  inputs: []
                },
                inputs: []
              }
            ]
          }
        ]
      });

      assert(bufSrc.$state === "UNSCHEDULED");

      bufSrc.start(0.100);

      audioContext.$processTo("00:00.124");
      assert(onended.callCount === 0, "00:00.124");

      audioContext.$processTo("00:00.125");
      assert(onended.callCount === 1, "00:00.125");

      event = onended.args[0][0];

      assert(event instanceof global.Event);
      assert(event.type === "ended");
      assert(event.target === bufSrc);
    });
  });
});
