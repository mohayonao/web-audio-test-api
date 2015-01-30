"use strict";

/* istanbul ignore if */
if (global.WEB_AUDIO_TEST_API_IGNORE) {
  return;
}

var _ = require("./utils");

function ILLEGAL_CONSTRUCTOR(superCtor, err) {
  function ctor() {
    throw err;
  }
  if (superCtor) {
    _.inherits(ctor, superCtor);
  }
  return ctor;
}

var WebAudioTestAPI = {};

WebAudioTestAPI.VERSION = "0.1.16";
WebAudioTestAPI.sampleRate = 44100;

// TODO: DEPRECATED
WebAudioTestAPI.bufferSize = 128;
WebAudioTestAPI.currentTimeIncr = WebAudioTestAPI.bufferSize / WebAudioTestAPI.sampleRate;

global.WebAudioTestAPI = WebAudioTestAPI;

global.Event = ILLEGAL_CONSTRUCTOR(
  null, new TypeError("Illegal constructor")
);

global.EventTarget = ILLEGAL_CONSTRUCTOR(
  null, new TypeError("Illegal constructor")
);

global.OfflineAudioCompletionEvent = ILLEGAL_CONSTRUCTOR(
  global.Event, new TypeError("Illegal constructor")
);

global.AudioProcessingEvent = ILLEGAL_CONSTRUCTOR(
  global.Event, new TypeError("Illegal constructor")
);

global.AudioBuffer = ILLEGAL_CONSTRUCTOR(
  null, new TypeError("Illegal constructor: use audioContext.createBuffer(numberOfChannels, length, sampleRate)")
);

global.AudioListener = ILLEGAL_CONSTRUCTOR(
  null, new TypeError("Illegal constructor")
);

global.AudioParam = ILLEGAL_CONSTRUCTOR(
  null, new TypeError("Illegal constructor")
);

global.PeriodicWave = ILLEGAL_CONSTRUCTOR(
  null, new TypeError("Illegal constructor: use audioContext.createPeriodicWave(real, imag)")
);

global.AudioNode = ILLEGAL_CONSTRUCTOR(
  null, new TypeError("Illegal constructor")
);

var AudioNode = require("./AudioNode");

global.AudioDestinationNode = ILLEGAL_CONSTRUCTOR(
  AudioNode, new TypeError("Illegal constructor")
);

global.GainNode = ILLEGAL_CONSTRUCTOR(
  AudioNode, new TypeError("Illegal constructor: use audioContext.createGain()")
);

global.DelayNode = ILLEGAL_CONSTRUCTOR(
  AudioNode, new TypeError("Illegal constructor: use audioContext.createDelay()")
);

global.AudioBufferSourceNode = ILLEGAL_CONSTRUCTOR(
  AudioNode, new TypeError("Illegal constructor: use audioContext.createBufferSource()")
);

global.MediaElementAudioSourceNode = ILLEGAL_CONSTRUCTOR(
  AudioNode, new TypeError("Illegal constructor: use audioContext.createMediaElementSource(mediaElement)")
);

global.ScriptProcessorNode = ILLEGAL_CONSTRUCTOR(
  AudioNode, new TypeError("Illegal constructor: use audioContext.createScriptProcessor(bufferSize, numberOfInputChannels, numberOfOutputChannels)")
);

global.PannerNode = ILLEGAL_CONSTRUCTOR(
  AudioNode, new TypeError("Illegal constructor: use audioContext.createPanner()")
);

global.ConvolverNode = ILLEGAL_CONSTRUCTOR(
  AudioNode, new TypeError("Illegal constructor: use audioContext.createConvolver()")
);

global.AnalyserNode = ILLEGAL_CONSTRUCTOR(
  AudioNode, new TypeError("Illegal constructor: use audioContext.createAnalyser()")
);

global.ChannelSplitterNode = ILLEGAL_CONSTRUCTOR(
  AudioNode, new TypeError("Illegal constructor: use audioContext.createChannelSplitter(numberOfOutputs)")
);

global.ChannelMergerNode = ILLEGAL_CONSTRUCTOR(
  AudioNode, new TypeError("Illegal constructor: use audioContext.createChannelMerger(numberOfInputs)")
);

global.DynamicsCompressorNode = ILLEGAL_CONSTRUCTOR(
  AudioNode, new TypeError("Illegal constructor: use audioContext.createDynamicsCompressor()")
);

global.BiquadFilterNode = ILLEGAL_CONSTRUCTOR(
  AudioNode, new TypeError("Illegal constructor: use audioContext.createBiquadFilter()")
);

global.WaveShaperNode = ILLEGAL_CONSTRUCTOR(
  AudioNode, new TypeError("Illegal constructor: use audioContext.createWaveShaper()")
);

global.OscillatorNode = ILLEGAL_CONSTRUCTOR(
  AudioNode, new TypeError("Illegal constructor: use audioContext.createOscillator()")
);

global.MediaStreamAudioSourceNode = ILLEGAL_CONSTRUCTOR(
  AudioNode, new TypeError("Illegal constructor: use audioContext.createMediaStreamSource(mediaStream)")
);

global.MediaStreamAudioDestinationNode = ILLEGAL_CONSTRUCTOR(
  AudioNode, new TypeError("Illegal constructor: use audioContext.createMediaStreamDestination()")
);

global.AudioContext = require("./AudioContext");

global.OfflineAudioContext = require("./OfflineAudioContext");

module.exports = WebAudioTestAPI;
