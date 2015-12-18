const AnalyserNode = require("./AnalyserNode");
const AudioBuffer = require("./AudioBuffer");
const AudioBufferSourceNode = require("./AudioBufferSourceNode");
const AudioContext = require("./AudioContext");
const AudioDestinationNode = require("./AudioDestinationNode");
const AudioListener = require("./AudioListener");
const AudioNode = require("./AudioNode");
const AudioParam = require("./AudioParam");
const AudioProcessingEvent = require("./AudioProcessingEvent");
const BiquadFilterNode = require("./BiquadFilterNode");
const ChannelMergerNode = require("./ChannelMergerNode");
const ChannelSplitterNode = require("./ChannelSplitterNode");
const ConvolverNode = require("./ConvolverNode");
const DelayNode = require("./DelayNode");
const DynamicsCompressorNode = require("./DynamicsCompressorNode");
const GainNode = require("./GainNode");
const MediaElementAudioSourceNode = require("./MediaElementAudioSourceNode");
const MediaStreamAudioDestinationNode = require("./MediaStreamAudioDestinationNode");
const MediaStreamAudioSourceNode = require("./MediaStreamAudioSourceNode");
const OfflineAudioCompletionEvent = require("./OfflineAudioCompletionEvent");
const OfflineAudioContext = require("./OfflineAudioContext");
const OscillatorNode = require("./OscillatorNode");
const PannerNode = require("./PannerNode");
const PeriodicWave = require("./PeriodicWave");
const ScriptProcessorNode = require("./ScriptProcessorNode");
const StereoPannerNode = require("./StereoPannerNode");
const WaveShaperNode = require("./WaveShaperNode");

module.exports = {
  testAPI: {
    AnalyserNode,
    AudioBuffer,
    AudioBufferSourceNode,
    AudioContext,
    AudioDestinationNode,
    AudioListener,
    AudioNode,
    AudioParam,
    AudioProcessingEvent,
    BiquadFilterNode,
    ChannelMergerNode,
    ChannelSplitterNode,
    ConvolverNode,
    DelayNode,
    DynamicsCompressorNode,
    GainNode,
    MediaElementAudioSourceNode,
    MediaStreamAudioDestinationNode,
    MediaStreamAudioSourceNode,
    OfflineAudioCompletionEvent,
    OfflineAudioContext,
    OscillatorNode,
    PannerNode,
    PeriodicWave,
    ScriptProcessorNode,
    StereoPannerNode,
    WaveShaperNode
  },
  originalAPI: {
    AnalyserNode: global.AnalyserNode,
    AudioBuffer: global.AudioBuffer,
    AudioBufferSourceNode: global.AudioBufferSourceNode,
    AudioContext: global.AudioContext || global.webkitAudioContext,
    AudioDestinationNode: global.AudioDestinationNode,
    AudioListener: global.AudioListener,
    AudioNode: global.AudioNode,
    AudioParam: global.AudioParam,
    AudioProcessingEvent: global.AudioProcessingEvent,
    BiquadFilterNode: global.BiquadFilterNode,
    ChannelMergerNode: global.ChannelMergerNode,
    ChannelSplitterNode: global.ChannelSplitterNode,
    ConvolverNode: global.ConvolverNode,
    DelayNode: global.DelayNode,
    DynamicsCompressorNode: global.DynamicsCompressorNode,
    GainNode: global.GainNode,
    MediaElementAudioSourceNode: global.MediaElementAudioSourceNode,
    MediaStreamAudioDestinationNode: global.MediaStreamAudioDestinationNode,
    MediaStreamAudioSourceNode: global.MediaStreamAudioSourceNode,
    OfflineAudioCompletionEvent: global.OfflineAudioCompletionEvent,
    OfflineAudioContext: global.OfflineAudioContext || global.webkitOfflineAudioContext,
    OscillatorNode: global.OscillatorNode,
    PannerNode: global.PannerNode,
    PeriodicWave: global.PeriodicWave,
    ScriptProcessorNode: global.ScriptProcessorNode,
    StereoPannerNode: global.StereoPannerNode,
    WaveShaperNode: global.WaveShaperNode
  }
};
