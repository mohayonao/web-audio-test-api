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

  describe("#createBuffer", function() {
    it("(numberOfChannels: number, length: number, sampleRate: number): AudioBuffer", function() {
      var buf = audioContext.createBuffer(2, 128, 44100);

      assert(buf instanceof global.AudioBuffer);

      assert.throws(function() {
        audioContext.createBuffer("INVALID", 128, 44100);
      }, function(e) {
        return e instanceof TypeError && /should be a number/.test(e.message);
      });

      assert.throws(function() {
        audioContext.createBuffer(2, "INVALID", 44100);
      }, function(e) {
        return e instanceof TypeError && /should be a number/.test(e.message);
      });

      assert.throws(function() {
        audioContext.createBuffer(2, 128, "INVALID");
      }, function(e) {
        return e instanceof TypeError && /should be a number/.test(e.message);
      });
    });
  });

  describe("#decodeAudioData", function() {
    it("(audioData: ArrayBuffer, successCallback: function, errorCallback: function): void", function(done) {
      var audioData = new Uint8Array(128).buffer;

      assert.throws(function() {
        audioContext.decodeAudioData("INVALID");
      }, function(e) {
        return e instanceof TypeError && /should be an ArrayBuffer/.test(e.message);
      });

      assert.throws(function() {
        audioContext.decodeAudioData(audioData, "INVALID");
      }, function(e) {
        return e instanceof TypeError && /should be a function/.test(e.message);
      });

      assert.throws(function() {
        audioContext.decodeAudioData(audioData, function() {}, "INVALID");
      }, function(e) {
        return e instanceof TypeError && /should be a function/.test(e.message);
      });

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
    it("(mediaElement: HTMLMediaElement): MediaElementAudioSourceNode", function() {
      var element = new global.WebAudioTestAPI.HTMLMediaElement();
      var node = audioContext.createMediaElementSource(element);

      assert(node instanceof global.MediaElementAudioSourceNode);

      assert.throws(function() {
        audioContext.createMediaElementSource("INVALID");
      }, function(e) {
        return e instanceof TypeError && /should be a HTMLMediaElement/.test(e.message);
      });
    });
  });

  describe("#createMediaStreamSource", function() {
    it("(mediaStream: MediaStream): MediaStreamAudioSourceNode", function() {
      var stream = new global.WebAudioTestAPI.MediaStream();
      var node = audioContext.createMediaStreamSource(stream);

      assert(node instanceof global.MediaStreamAudioSourceNode);

      assert.throws(function() {
        audioContext.createMediaStreamSource("INVALID");
      }, function(e) {
        return e instanceof TypeError && /should be a MediaStream/.test(e.message);
      });
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
      }, function(e) {
        return e instanceof TypeError && /should be an enum/.test(e.message);
      });

      assert.throws(function() {
        audioContext.createScriptProcessor(1024, "INVALID", 1);
      }, function(e) {
        return e instanceof TypeError && /should be a number/.test(e.message);
      });

      assert.throws(function() {
        audioContext.createScriptProcessor(1024, 1, "INVALID");
      }, function(e) {
        return e instanceof TypeError && /should be a number/.test(e.message);
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

      assert.throws(function() {
        audioContext.createDelay("INVALID");
      }, function(e) {
        return e instanceof TypeError && /should be a number/.test(e.message);
      });
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

      assert.throws(function() {
        audioContext.createChannelSplitter("INVALID");
      }, function(e) {
        return e instanceof TypeError && /should be a number/.test(e.message);
      });
    });
  });

  describe("#createChannelMerger", function() {
    it("(): ChannelMergerNode", function() {
      var node = audioContext.createChannelMerger();

      assert(node instanceof global.ChannelMergerNode);

      assert.throws(function() {
        audioContext.createChannelMerger("INVALID");
      }, function(e) {
        return e instanceof TypeError && /should be a number/.test(e.message);
      });
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
      var f128 = new Float32Array(128);
      var f256 = new Float32Array(256);
      var f8192 = new Float32Array(8192);
      var wave = audioContext.createPeriodicWave(real, imag);

      assert(wave instanceof global.PeriodicWave);

      assert.throws(function() {
        audioContext.createPeriodicWave("INVALID", imag);
      }, function(e) {
        return e instanceof TypeError && /should be a Float32Array/.test(e.message);
      });

      assert.throws(function() {
        audioContext.createPeriodicWave(real, "INVALID");
      }, function(e) {
        return e instanceof TypeError && /should be a Float32Array/.test(e.message);
      });

      assert.throws(function() {
        audioContext.createPeriodicWave(f128, f256);
      }, function(e) {
        return e instanceof TypeError && /must match/.test(e.message);
      });

      assert.throws(function() {
        audioContext.createPeriodicWave(f8192, f8192);
      }, function(e) {
        return e instanceof TypeError && /exceeds allow maximum of 4096/.test(e.message);
      });
    });
  });

  describe("$process", function() {
    it("(time: number|string): void", function() {
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

  describe("#$processTo", function() {
    it("(time: number|string): void", function() {
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

  describe("$reset", function() {
    it("(): void", function() {
      audioContext.createGain().connect(audioContext.destination);

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

  describe("#toJSON", function() {
    it("(): object", function() {
      assert.deepEqual(audioContext.toJSON(), {
        name: "AudioDestinationNode",
        inputs: []
      });
    });
  });

});
