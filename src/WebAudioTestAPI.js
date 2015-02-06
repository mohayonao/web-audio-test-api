"use strict";

var WebAudioAPI = require("./WebAudioAPI");

var WebAudioTestAPI = {};

WebAudioTestAPI.VERSION = "0.2.1";
WebAudioTestAPI.sampleRate = 44100;

WebAudioTestAPI.use = function() {
  global.AnalyserNode = WebAudioTestAPI.AnalyserNode.exports;
  global.AudioBuffer = WebAudioTestAPI.AudioBuffer.exports;
  global.AudioBufferSourceNode = WebAudioTestAPI.AudioBufferSourceNode.exports;
  global.AudioContext = WebAudioTestAPI.AudioContext;
  global.AudioDestinationNode = WebAudioTestAPI.AudioDestinationNode.exports;
  global.AudioListener = WebAudioTestAPI.AudioListener.exports;
  global.AudioNode = WebAudioTestAPI.AudioNode.exports;
  global.AudioParam = WebAudioTestAPI.AudioParam.exports;
  global.AudioProcessingEvent = WebAudioTestAPI.AudioProcessingEvent.exports;
  global.BiquadFilterNode = WebAudioTestAPI.BiquadFilterNode.exports;
  global.ChannelMergerNode = WebAudioTestAPI.ChannelMergerNode.exports;
  global.ChannelSplitterNode = WebAudioTestAPI.ChannelSplitterNode.exports;
  global.ConvolverNode = WebAudioTestAPI.ConvolverNode.exports;
  global.DelayNode = WebAudioTestAPI.DelayNode.exports;
  global.DynamicsCompressorNode = WebAudioTestAPI.DynamicsCompressorNode.exports;
  global.GainNode = WebAudioTestAPI.GainNode.exports;
  global.MediaElementAudioSourceNode = WebAudioTestAPI.MediaElementAudioSourceNode.exports;
  global.MediaStreamAudioDestinationNode = WebAudioTestAPI.MediaStreamAudioDestinationNode.exports;
  global.MediaStreamAudioSourceNode = WebAudioTestAPI.MediaStreamAudioSourceNode.exports;
  global.OfflineAudioCompletionEvent = WebAudioTestAPI.OfflineAudioCompletionEvent.exports;
  global.OfflineAudioContext = WebAudioTestAPI.OfflineAudioContext;
  global.OscillatorNode = WebAudioTestAPI.OscillatorNode.exports;
  global.PannerNode = WebAudioTestAPI.PannerNode.exports;
  global.PeriodicWave = WebAudioTestAPI.PeriodicWave.exports;
  global.ScriptProcessorNode = WebAudioTestAPI.ScriptProcessorNode.exports;
  global.WaveShaperNode = WebAudioTestAPI.WaveShaperNode.exports;
};

WebAudioTestAPI.unuse = function() {
  global.AnalyserNode = WebAudioAPI.AnalyserNode;
  global.AudioBuffer = WebAudioAPI.AudioBuffer;
  global.AudioBufferSourceNode = WebAudioAPI.AudioBufferSourceNode;
  global.AudioContext = WebAudioAPI.AudioContext;
  global.AudioDestinationNode = WebAudioAPI.AudioDestinationNode;
  global.AudioListener = WebAudioAPI.AudioListener;
  global.AudioNode = WebAudioAPI.AudioNode;
  global.AudioParam = WebAudioAPI.AudioParam;
  global.AudioProcessingEvent = WebAudioAPI.AudioProcessingEvent;
  global.BiquadFilterNode = WebAudioAPI.BiquadFilterNode;
  global.ChannelMergerNode = WebAudioAPI.ChannelMergerNode;
  global.ChannelSplitterNode = WebAudioAPI.ChannelSplitterNode;
  global.ConvolverNode = WebAudioAPI.ConvolverNode;
  global.DelayNode = WebAudioAPI.DelayNode;
  global.DynamicsCompressorNode = WebAudioAPI.DynamicsCompressorNode;
  global.GainNode = WebAudioAPI.GainNode;
  global.MediaElementAudioSourceNode = WebAudioAPI.MediaElementAudioSourceNode;
  global.MediaStreamAudioDestinationNode = WebAudioAPI.MediaStreamAudioDestinationNode;
  global.MediaStreamAudioSourceNode = WebAudioAPI.MediaStreamAudioSourceNode;
  global.OfflineAudioCompletionEvent = WebAudioAPI.OfflineAudioCompletionEvent;
  global.OfflineAudioContext = WebAudioAPI.OfflineAudioContext;
  global.OscillatorNode = WebAudioAPI.OscillatorNode;
  global.PannerNode = WebAudioAPI.PannerNode;
  global.PeriodicWave = WebAudioAPI.PeriodicWave;
  global.ScriptProcessorNode = WebAudioAPI.ScriptProcessorNode;
  global.WaveShaperNode = WebAudioAPI.WaveShaperNode;
};

module.exports = WebAudioTestAPI;
