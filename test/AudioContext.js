"use strict";

describe("AudioContext", function() {
  var audioContext;

  beforeEach(function() {
    audioContext = new global.AudioContext();
  });

  describe("constructor", function() {
    it("()", function() {
      assert(audioContext instanceof global.AudioContext);
      assert(audioContext instanceof global.EventTarget);
    });
  });

  describe(".WEB_AUDIO_TEST_API_VERSION", function() {
    it("check", function() {
      if (typeof global.WEB_AUDIO_TEST_API_VERSION === "string") {
        assert(global.AudioContext.WEB_AUDIO_TEST_API_VERSION === global.WEB_AUDIO_TEST_API_VERSION);
      }
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

  describe("#createBuffer", function() {
    it("(numberOfChannels: number, length: number, sampleRate: number): AudioBuffer", function() {
      var buf = audioContext.createBuffer(2, 128, 44100);

      assert(buf instanceof global.AudioBuffer);
    });
  });

  describe("#decodeAudioData", function() {
    it("(audioData: ArrayBuffer, successCallback: function, errorCallback: function): void", function(done) {
      var audioData = new Uint8Array(128).buffer;

      assert.throws(function() {
        audioContext.decodeAudioData("INVALID");
      }, TypeError);

      assert.throws(function() {
        audioContext.decodeAudioData(audioData, "INVALID");
      }, TypeError);

      assert.throws(function() {
        audioContext.decodeAudioData(audioData, function() {}, "INVALID");
      }, TypeError);

      audioContext.decodeAudioData(audioData, function(buffer) {
        assert(buffer instanceof global.AudioBuffer);
        done();
      }, function() {
        throw new Error("NOT REACHED");
      });
    });
    it(".DECODE_AUDIO_DATA_FAILED", function(done) {
      var audioData = new Uint8Array(128).buffer;

      audioContext.DECODE_AUDIO_DATA_FAILED = true;

      audioContext.decodeAudioData(audioData, function() {
        throw new Error("NOT REACHED");
      }, function() {
        done();
      });
    });
    it(".DECODE_AUDIO_DATA_RESULT", function(done) {
      var audioData = new Uint8Array(128).buffer;
      var result = audioContext.createBuffer(2, 256, 44100);

      audioContext.DECODE_AUDIO_DATA_RESULT = result;
      audioContext.decodeAudioData(audioData, function(buffer) {
        assert(buffer === result);
        done();
      }, function() {
        throw new Error("NOT REACHED");
      });
    });
  });

  describe("#createBufferSource", function() {
    it("(): AudioBufferSourceNode", function() {
      var node = audioContext.createBufferSource();

      assert(node instanceof global.AudioBufferSourceNode);
    });
  });

  describe("#createMediaElementSource", function() {
    it("(): MediaElementAudioSourceNode", function() {
      var node = audioContext.createMediaElementSource();

      assert(node instanceof global.MediaElementAudioSourceNode);
    });
  });

  describe("#createMediaStreamSource", function() {
    it("(): MediaStreamAudioSourceNode", function() {
      var node = audioContext.createMediaStreamSource();

      assert(node instanceof global.MediaStreamAudioSourceNode);
    });
  });

  describe("#createMediaStreamDestination", function() {
    it("(): MediaStreamAudioDestinationNode", function() {
      var node = audioContext.createMediaStreamDestination();

      assert(node instanceof global.MediaStreamAudioDestinationNode);
    });
  });

  describe("#createScriptProcessor", function() {
    it("(bufferSize: number, numberOfInputChannels: number, numberOfOutputChannels: number): ScriptProcessorNode", function() {
      var node = audioContext.createScriptProcessor(1024, 1, 1);

      assert(node instanceof global.ScriptProcessorNode);

      assert.throws(function() {
        audioContext.createScriptProcessor(0, 1, 1);
      });
    });
  });

  describe("#createAnalyser", function() {
    it("(): AnalyserNode", function() {
      var node = audioContext.createAnalyser();

      assert(node instanceof global.AnalyserNode);
    });
  });

  describe("#createGain", function() {
    it("(): GainNode", function() {
      var node = audioContext.createGain();

      assert(node instanceof global.GainNode);
    });
  });

  describe("#createDelay", function() {
    it("(): DelayNode", function() {
      var node = audioContext.createDelay();

      assert(node instanceof global.DelayNode);
    });
  });

  describe("#createBiquadFilter", function() {
    it("(): BiquadFilterNode", function() {
      var node = audioContext.createBiquadFilter();

      assert(node instanceof global.BiquadFilterNode);
    });
  });

  describe("#createWaveShaper", function() {
    it("(): WaveShaperNode", function() {
      var node = audioContext.createWaveShaper();

      assert(node instanceof global.WaveShaperNode);
    });
  });

  describe("#createPanner", function() {
    it("(): PannerNode", function() {
      var node = audioContext.createPanner();

      assert(node instanceof global.PannerNode);
    });
  });

  describe("#createConvolver", function() {
    it("(): ConvolverNode", function() {
      var node = audioContext.createConvolver();

      assert(node instanceof global.ConvolverNode);
    });
  });

  describe("#createChannelSplitter", function() {
    it("(): ChannelSplitterNode", function() {
      var node = audioContext.createChannelSplitter();

      assert(node instanceof global.ChannelSplitterNode);
    });
  });

  describe("#createChannelMerger", function() {
    it("(): ChannelMergerNode", function() {
      var node = audioContext.createChannelMerger();

      assert(node instanceof global.ChannelMergerNode);
    });
  });

  describe("#createDynamicsCompressor", function() {
    it("(): DynamicsCompressorNode", function() {
      var node = audioContext.createDynamicsCompressor();

      assert(node instanceof global.DynamicsCompressorNode);
    });
  });

  describe("#createOscillator", function() {
    it("(): OscillatorNode", function() {
      var node = audioContext.createOscillator();

      assert(node instanceof global.OscillatorNode);
    });
  });

  describe("#createPeriodicWave", function() {
    it("(real: Float32Array, imag: Float32Array): PeriodicWave", function() {
      var real = new Float32Array(128);
      var imag = new Float32Array(128);
      var wave = audioContext.createPeriodicWave(real, imag);

      assert(wave instanceof global.PeriodicWave);
    });
  });

  describe("$process", function() {
    it("(time: number): void", function() {
      assert.doesNotThrow(function() {
        audioContext.$process(0.5);
        audioContext.$process(0.5);
        audioContext.$process(0.5);
      });
    });
  });

  describe("#$processTo", function() {
    it("(time: string): void", function() {
      assert.doesNotThrow(function() {
        audioContext.$processTo(0.5);
        audioContext.$processTo("00:00.005");
        audioContext.$processTo("00:00.010");
        audioContext.$processTo("00:00.005");
      });
    });
  });

  describe("$reset", function() {
    it("(): void", function() {
      audioContext.createGain().connect(audioContext.destination);

      audioContext.$process(0.5);
      audioContext.$process(0.5);
      audioContext.$process(0.5);
      audioContext.$reset();

      assert(audioContext.currentTime === 0);
      assert.deepEqual(audioContext.toJSON(), {
        name: "AudioDestinationNode",
        inputs: []
      });
    });
  });

  describe("#toJSON", function() {
    it("(): object", function() {
      assert.deepEqual(audioContext.toJSON(), {
        name: "AudioDestinationNode",
        inputs: []
      });
    });
  });

});
