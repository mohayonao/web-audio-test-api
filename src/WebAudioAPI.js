"use strict";

var WebAudioAPI = {};

WebAudioAPI.AnalyserNode = global.AnalyserNode;
WebAudioAPI.AudioBuffer = global.AudioBuffer;
WebAudioAPI.AudioBufferSourceNode = global.AudioBufferSourceNode;
WebAudioAPI.AudioContext = global.AudioContext || global.webkitAudioContext;
WebAudioAPI.AudioDestinationNode = global.AudioDestinationNode;
WebAudioAPI.AudioListener = global.AudioListener;
WebAudioAPI.AudioNode = global.AudioNode;
WebAudioAPI.AudioParam = global.AudioParam;
WebAudioAPI.AudioProcessingEvent = global.AudioProcessingEvent;
WebAudioAPI.BiquadFilterNode = global.BiquadFilterNode;
WebAudioAPI.ChannelMergerNode = global.ChannelMergerNode;
WebAudioAPI.ChannelSplitterNode = global.ChannelSplitterNode;
WebAudioAPI.ConvolverNode = global.ConvolverNode;
WebAudioAPI.DelayNode = global.DelayNode;
WebAudioAPI.DynamicsCompressorNode = global.DynamicsCompressorNode;
WebAudioAPI.GainNode = global.GainNode;
WebAudioAPI.MediaElementAudioSourceNode = global.MediaElementAudioSourceNode;
WebAudioAPI.MediaStreamAudioDestinationNode = global.MediaStreamAudioDestinationNode;
WebAudioAPI.MediaStreamAudioSourceNode = global.MediaStreamAudioSourceNode;
WebAudioAPI.OfflineAudioCompletionEvent = global.OfflineAudioCompletionEvent;
WebAudioAPI.OfflineAudioContext = global.OfflineAudioContext || global.webkitOfflineAudioContext;
WebAudioAPI.OscillatorNode = global.OscillatorNode;
WebAudioAPI.PannerNode = global.PannerNode;
WebAudioAPI.PeriodicWave = global.PeriodicWave;
WebAudioAPI.ScriptProcessorNode = global.ScriptProcessorNode;
WebAudioAPI.WaveShaperNode = global.WaveShaperNode;

module.exports = WebAudioAPI;
