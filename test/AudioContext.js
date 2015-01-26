"use strict";

describe("AudioContext", function() {
  var ctx = null;

  beforeEach(function() {
    ctx = new global.AudioContext();
  });

  describe("()", function() {
    it("should return an instance of AudioContext", function() {
      expect(ctx).to.be.instanceOf(global.AudioContext);
    });
    it("should have been inherited from EventTarget", function() {
      expect(ctx).to.be.instanceOf(global.EventTarget);
    });
  });

  describe(".WEB_AUDIO_TEST_API_VERSION", function() {
    it("check", function() {
      if (typeof WEB_AUDIO_TEST_API_VERSION === "string") {
        expect(global.AudioContext.WEB_AUDIO_TEST_API_VERSION).to.equal(global.WEB_AUDIO_TEST_API_VERSION);
      }
    });
  });

  describe("new", function() {
    it("should return AudioContext", function() {
      expect(ctx).to.be.instanceOf(global.AudioContext);
    });
  });

  describe("#destination", function() {
    it("should be an instance of AudioDestinationNode", function() {
      expect(ctx.destination).to.be.instanceOf(global.AudioDestinationNode);
    });
    it("should be readonly", function() {
      expect(function() {
        ctx.destination = null;
      }).throw(Error, "readonly");
    });
  });

  describe("#sampleRate", function() {
    it("should be a number", function() {
      expect(ctx.sampleRate).to.be.a("number");
    });
    it("should be readonly", function() {
      expect(function() {
        ctx.sampleRate = 0;
      }).throw(Error, "readonly");
    });
  });

  describe("#currentTime", function() {
    it("should be a number", function() {
      expect(ctx.currentTime).to.be.a("number");
    });
    it("should be readonly", function() {
      expect(function() {
        ctx.currentTime = 0;
      }).throw(Error, "readonly");
    });
  });

  describe("#listener", function() {
    it("should be an instance of AudioListener", function() {
      expect(ctx.listener).to.be.instanceOf(global.AudioListener);
    });
    it("should be readonly", function() {
      expect(function() {
        ctx.listener = null;
      }).throw(Error, "readonly");
    });
  });

  describe("#$process()", function() {
    it("should work", function() {
      ctx.$process(0.5);
      ctx.$process(0.5);
      ctx.$process(0.5);
    });
  });

  describe("#$processTo()", function() {
    it("should work", function() {
      ctx.$processTo(0.5);
      ctx.$processTo("00:00.005");
      ctx.$processTo("00:00.010");
      ctx.$processTo("00:00.005");
    });
  });

  describe("#$reset()", function() {
    it("should work", function() {
      ctx.createGain().connect(ctx.destination);

      ctx.$process(0.5);
      ctx.$process(0.5);
      ctx.$process(0.5);
      ctx.$reset();

      expect(ctx.currentTime).to.equal(0);
      expect(ctx.toJSON()).to.eql({
        name: "AudioDestinationNode",
        inputs: []
      });
    });
  });

  describe("#createBuffer(numberOfChannels, length, sampleRate)", function() {
    it("should return an instance of AudioBuffer", function() {
      expect(ctx.createBuffer(2, 128, 44100)).to.be.instanceOf(global.AudioBuffer);
    });
  });

  describe("#decodeAudioData(audioData, successCallback, errorCallback)", function() {
    it("should work", function(done) {
      ctx.decodeAudioData(new Uint8Array(128).buffer, function(buffer) {
        expect(buffer).to.be.instanceOf(global.AudioBuffer);
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
        expect(buffer).to.equal(result);
        done();
      }, function() {
        throw new Error("NOT REACHED");
      });
    });
    it("throw error", function() {
      expect(function() {
        ctx.decodeAudioData("INVALID");
      }).to.throw(TypeError, "AudioContext#decodeAudioData(audioData, successCallback, errorCallback)");
    });
  });

  describe("#createBufferSource()", function() {
    it("should return an instance of AudioBufferSourceNode", function() {
      expect(ctx.createBufferSource()).to.be.instanceOf(global.AudioBufferSourceNode);
    });
  });

  describe("#createMediaElementSource()", function() {
    it("should return an instance of MediaElementAudioSourceNode", function() {
      expect(ctx.createMediaElementSource()).to.be.instanceOf(global.MediaElementAudioSourceNode);
    });
  });

  describe("#createMediaStreamSource()", function() {
    it("should return an instance of MediaStreamAudioSourceNode", function() {
      expect(ctx.createMediaStreamSource()).to.be.instanceOf(global.MediaStreamAudioSourceNode);
    });
  });

  describe("#createMediaStreamDestination()", function() {
    it("should return an instance of MediaStreamAudioDestinationNode", function() {
      expect(ctx.createMediaStreamDestination()).to.be.instanceOf(global.MediaStreamAudioDestinationNode);
    });
  });

  describe("#createScriptProcessor()", function() {
    it("should return an instance of ScriptProcessorNode", function() {
      expect(ctx.createScriptProcessor(1024, 1, 1)).to.be.instanceOf(global.ScriptProcessorNode);
    });
  });

  describe("#createAnalyser()", function() {
    it("should return an instance of AnalyserNode", function() {
      expect(ctx.createAnalyser()).to.be.instanceOf(global.AnalyserNode);
    });
  });

  describe("#createGain()", function() {
    it("should return an instance of GainNode", function() {
      expect(ctx.createGain()).to.be.instanceOf(global.GainNode);
    });
  });

  describe("#createDelay()", function() {
    it("should return an instance of DelayNode", function() {
      expect(ctx.createDelay()).to.be.instanceOf(global.DelayNode);
    });
  });

  describe("#createBiquadFilter()", function() {
    it("should return an instance of BiquadFilterNode", function() {
      expect(ctx.createBiquadFilter()).to.be.instanceOf(global.BiquadFilterNode);
    });
  });

  describe("#createWaveShaper()", function() {
    it("should return an instance of WaveShaperNode", function() {
      expect(ctx.createWaveShaper()).to.be.instanceOf(global.WaveShaperNode);
    });
  });

  describe("#createPanner()", function() {
    it("should return an instance of PannerNode", function() {
      expect(ctx.createPanner()).to.be.instanceOf(global.PannerNode);
    });
  });

  describe("#createConvolver()", function() {
    it("should return an instance of ConvolverNode", function() {
      expect(ctx.createConvolver()).to.be.instanceOf(global.ConvolverNode);
    });
  });

  describe("#createChannelSplitter()", function() {
    it("should return an instance of ChannelSplitterNode", function() {
      expect(ctx.createChannelSplitter()).to.be.instanceOf(global.ChannelSplitterNode);
    });
  });

  describe("#createChannelMerger()", function() {
    it("should return an instance of ChannelMergerNode", function() {
      expect(ctx.createChannelMerger()).to.be.instanceOf(global.ChannelMergerNode);
    });
  });

  describe("#createDynamicsCompressor()", function() {
    it("should return an instance of DynamicsCompressorNode", function() {
      expect(ctx.createDynamicsCompressor()).to.be.instanceOf(global.DynamicsCompressorNode);
    });
  });

  describe("#createOscillator()", function() {
    it("should return an instance of OscillatorNode", function() {
      expect(ctx.createOscillator()).to.be.instanceOf(global.OscillatorNode);
    });
  });

  describe("#createPeriodicWave(real, imag)", function() {
    it("should return an instance of PeriodicWave", function() {
      var real = new Float32Array(128);
      var imag = new Float32Array(128);
      expect(ctx.createPeriodicWave(real, imag)).to.be.instanceOf(global.PeriodicWave);
    });
  });

  describe("#toJSON", function() {
    it("return json", function() {
      expect(ctx.toJSON()).to.eql({
        name: "AudioDestinationNode",
        inputs: []
      });
    });
  });

});
