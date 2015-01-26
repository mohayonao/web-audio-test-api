"use strict";

describe("AudioContext", function() {
  var ctx = null;

  beforeEach(function() {
    ctx = new global.AudioContext();
  });

  describe("()", function() {
    it("should return an instance of AudioContext", function() {
      assert(ctx instanceof global.AudioContext);
    });
    it("should have been inherited from EventTarget", function() {
      assert(ctx instanceof global.EventTarget);
    });
  });

  describe(".WEB_AUDIO_TEST_API_VERSION", function() {
    it("check", function() {
      if (typeof WEB_AUDIO_TEST_API_VERSION === "string") {
        assert(global.AudioContext.WEB_AUDIO_TEST_API_VERSION === global.WEB_AUDIO_TEST_API_VERSION);
      }
    });
  });

  describe("new", function() {
    it("should return AudioContext", function() {
      assert(ctx instanceof global.AudioContext);
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

  describe("#$process()", function() {
    it("should work", function() {
      assert.doesNotThrow(function() {
        ctx.$process(0.5);
        ctx.$process(0.5);
        ctx.$process(0.5);
      });
    });
  });

  describe("#$processTo()", function() {
    it("should work", function() {
      assert.doesNotThrow(function() {
        ctx.$processTo(0.5);
        ctx.$processTo("00:00.005");
        ctx.$processTo("00:00.010");
        ctx.$processTo("00:00.005");
      });
    });
  });

  describe("#$reset()", function() {
    it("should work", function() {
      ctx.createGain().connect(ctx.destination);

      ctx.$process(0.5);
      ctx.$process(0.5);
      ctx.$process(0.5);
      ctx.$reset();

      assert(ctx.currentTime === 0);
      assert.deepEqual(ctx.toJSON(), {
        name: "AudioDestinationNode",
        inputs: []
      });
    });
  });

  describe("#createBuffer(numberOfChannels, length, sampleRate)", function() {
    it("should return an instance of AudioBuffer", function() {
      assert(ctx.createBuffer(2, 128, 44100) instanceof global.AudioBuffer);
    });
  });

  describe("#decodeAudioData(audioData, successCallback, errorCallback)", function() {
    it("should work", function(done) {
      ctx.decodeAudioData(new Uint8Array(128).buffer, function(buffer) {
        assert(buffer instanceof global.AudioBuffer);
        done();
      }, function() {
        throw new Error("NOT REACHED");
      });
    });
    it("should failed", function(done) {
      ctx.DECODE_AUDIO_DATA_FAILED = true;
      ctx.decodeAudioData(new Uint8Array(128).buffer, function() {
        throw new Error("NOT REACHED");
      }, function() {
        done();
      });
    });
    it("return custom result", function(done) {
      var result = ctx.createBuffer(2, 256, 44100);
      ctx.DECODE_AUDIO_DATA_RESULT = result;
      ctx.decodeAudioData(new Uint8Array(128).buffer, function(buffer) {
        assert(buffer === result);
        done();
      }, function() {
        throw new Error("NOT REACHED");
      });
    });
    it("throw error", function() {
      assert.throws(function() {
        ctx.decodeAudioData("INVALID");
      }, TypeError, "AudioContext#decodeAudioData(audioData, successCallback, errorCallback)");
    });
  });

  describe("#createBufferSource()", function() {
    it("should return an instance of AudioBufferSourceNode", function() {
      assert(ctx.createBufferSource() instanceof global.AudioBufferSourceNode);
    });
  });

  describe("#createMediaElementSource()", function() {
    it("should return an instance of MediaElementAudioSourceNode", function() {
      assert(ctx.createMediaElementSource() instanceof global.MediaElementAudioSourceNode);
    });
  });

  describe("#createMediaStreamSource()", function() {
    it("should return an instance of MediaStreamAudioSourceNode", function() {
      assert(ctx.createMediaStreamSource() instanceof global.MediaStreamAudioSourceNode);
    });
  });

  describe("#createMediaStreamDestination()", function() {
    it("should return an instance of MediaStreamAudioDestinationNode", function() {
      assert(ctx.createMediaStreamDestination() instanceof global.MediaStreamAudioDestinationNode);
    });
  });

  describe("#createScriptProcessor()", function() {
    it("should return an instance of ScriptProcessorNode", function() {
      assert(ctx.createScriptProcessor(1024, 1, 1) instanceof global.ScriptProcessorNode);
    });
  });

  describe("#createAnalyser()", function() {
    it("should return an instance of AnalyserNode", function() {
      assert(ctx.createAnalyser() instanceof global.AnalyserNode);
    });
  });

  describe("#createGain()", function() {
    it("should return an instance of GainNode", function() {
      assert(ctx.createGain() instanceof global.GainNode);
    });
  });

  describe("#createDelay()", function() {
    it("should return an instance of DelayNode", function() {
      assert(ctx.createDelay() instanceof global.DelayNode);
    });
  });

  describe("#createBiquadFilter()", function() {
    it("should return an instance of BiquadFilterNode", function() {
      assert(ctx.createBiquadFilter() instanceof global.BiquadFilterNode);
    });
  });

  describe("#createWaveShaper()", function() {
    it("should return an instance of WaveShaperNode", function() {
      assert(ctx.createWaveShaper() instanceof global.WaveShaperNode);
    });
  });

  describe("#createPanner()", function() {
    it("should return an instance of PannerNode", function() {
      assert(ctx.createPanner() instanceof global.PannerNode);
    });
  });

  describe("#createConvolver()", function() {
    it("should return an instance of ConvolverNode", function() {
      assert(ctx.createConvolver() instanceof global.ConvolverNode);
    });
  });

  describe("#createChannelSplitter()", function() {
    it("should return an instance of ChannelSplitterNode", function() {
      assert(ctx.createChannelSplitter() instanceof global.ChannelSplitterNode);
    });
  });

  describe("#createChannelMerger()", function() {
    it("should return an instance of ChannelMergerNode", function() {
      assert(ctx.createChannelMerger() instanceof global.ChannelMergerNode);
    });
  });

  describe("#createDynamicsCompressor()", function() {
    it("should return an instance of DynamicsCompressorNode", function() {
      assert(ctx.createDynamicsCompressor() instanceof global.DynamicsCompressorNode);
    });
  });

  describe("#createOscillator()", function() {
    it("should return an instance of OscillatorNode", function() {
      assert(ctx.createOscillator() instanceof global.OscillatorNode);
    });
  });

  describe("#createPeriodicWave(real, imag)", function() {
    it("should return an instance of PeriodicWave", function() {
      var real = new Float32Array(128);
      var imag = new Float32Array(128);
      assert(ctx.createPeriodicWave(real, imag) instanceof global.PeriodicWave);
    });
  });

  describe("#toJSON", function() {
    it("return json", function() {
      assert.deepEqual(ctx.toJSON(), {
        name: "AudioDestinationNode",
        inputs: []
      });
    });
  });

});
