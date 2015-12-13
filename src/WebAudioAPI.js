import AnalyserNode from "./AnalyserNode";
import AudioBuffer from "./AudioBuffer";
import AudioBufferSourceNode from "./AudioBufferSourceNode";
import AudioContext from "./AudioContext";
import AudioDestinationNode from "./AudioDestinationNode";
import AudioListener from "./AudioListener";
import AudioNode from "./AudioNode";
import AudioParam from "./AudioParam";
import AudioProcessingEvent from "./AudioProcessingEvent";
import BiquadFilterNode from "./BiquadFilterNode";
import ChannelMergerNode from "./ChannelMergerNode";
import ChannelSplitterNode from "./ChannelSplitterNode";
import ConvolverNode from "./ConvolverNode";
import DelayNode from "./DelayNode";
import DynamicsCompressorNode from "./DynamicsCompressorNode";
import GainNode from "./GainNode";
import MediaElementAudioSourceNode from "./MediaElementAudioSourceNode";
import MediaStreamAudioDestinationNode from "./MediaStreamAudioDestinationNode";
import MediaStreamAudioSourceNode from "./MediaStreamAudioSourceNode";
import OfflineAudioCompletionEvent from "./OfflineAudioCompletionEvent";
import OfflineAudioContext from "./OfflineAudioContext";
import OscillatorNode from "./OscillatorNode";
import PannerNode from "./PannerNode";
import PeriodicWave from "./PeriodicWave";
import ScriptProcessorNode from "./ScriptProcessorNode";
import StereoPannerNode from "./StereoPannerNode";
import WaveShaperNode from "./WaveShaperNode";

export default {
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
