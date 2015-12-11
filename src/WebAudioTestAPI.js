import utils from "./utils";
import Configuration from "./utils/Configuration";
import WebAudioAPI from "./WebAudioAPI";
import Element from "./dom/Element";
import Event from "./dom/Event";
import EventTarget from "./dom/EventTarget";
import HTMLElement from "./dom/HTMLElement";
import HTMLMediaElement from "./dom/HTMLMediaElement";
import MediaStream from "./dom/MediaStream";
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

let sampleRate = 44100;
let configuration = Configuration.getInstance();

let WebAudioTestAPI = {
  VERSION: utils.getAPIVersion(),
  utils,
  sampleRate,
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
  Element,
  Event,
  EventTarget,
  GainNode,
  HTMLElement,
  HTMLMediaElement,
  MediaElementAudioSourceNode,
  MediaStream,
  MediaStreamAudioDestinationNode,
  MediaStreamAudioSourceNode,
  OfflineAudioCompletionEvent,
  OfflineAudioContext,
  OscillatorNode,
  PannerNode,
  PeriodicWave,
  ScriptProcessorNode,
  StereoPannerNode,
  WaveShaperNode,
  getState(name) {
    return configuration.getState(name);
  },
  setState(name, value) {
    configuration.setState(name, value);
  },
  use() {
    global.AnalyserNode = WebAudioTestAPI.AnalyserNode;
    global.AudioBuffer = WebAudioTestAPI.AudioBuffer;
    global.AudioBufferSourceNode = WebAudioTestAPI.AudioBufferSourceNode;
    global.AudioContext = WebAudioTestAPI.AudioContext;
    global.AudioDestinationNode = WebAudioTestAPI.AudioDestinationNode;
    global.AudioListener = WebAudioTestAPI.AudioListener;
    global.AudioNode = WebAudioTestAPI.AudioNode;
    global.AudioParam = WebAudioTestAPI.AudioParam;
    global.AudioProcessingEvent = WebAudioTestAPI.AudioProcessingEvent;
    global.BiquadFilterNode = WebAudioTestAPI.BiquadFilterNode;
    global.ChannelMergerNode = WebAudioTestAPI.ChannelMergerNode;
    global.ChannelSplitterNode = WebAudioTestAPI.ChannelSplitterNode;
    global.ConvolverNode = WebAudioTestAPI.ConvolverNode;
    global.DelayNode = WebAudioTestAPI.DelayNode;
    global.DynamicsCompressorNode = WebAudioTestAPI.DynamicsCompressorNode;
    global.GainNode = WebAudioTestAPI.GainNode;
    global.MediaElementAudioSourceNode = WebAudioTestAPI.MediaElementAudioSourceNode;
    global.MediaStreamAudioDestinationNode = WebAudioTestAPI.MediaStreamAudioDestinationNode;
    global.MediaStreamAudioSourceNode = WebAudioTestAPI.MediaStreamAudioSourceNode;
    global.OfflineAudioCompletionEvent = WebAudioTestAPI.OfflineAudioCompletionEvent;
    global.OfflineAudioContext = WebAudioTestAPI.OfflineAudioContext;
    global.OscillatorNode = WebAudioTestAPI.OscillatorNode;
    global.PannerNode = WebAudioTestAPI.PannerNode;
    global.PeriodicWave = WebAudioTestAPI.PeriodicWave;
    global.ScriptProcessorNode = WebAudioTestAPI.ScriptProcessorNode;
    global.StereoPannerNode = WebAudioTestAPI.StereoPannerNode;
    global.WaveShaperNode = WebAudioTestAPI.WaveShaperNode;
    global.WebAudioTestAPI = WebAudioTestAPI;
  },
  unuse() {
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
    global.StereoPannerNode = WebAudioAPI.StereoPannerNode;
    global.WaveShaperNode = WebAudioAPI.WaveShaperNode;
  }
};

export default WebAudioTestAPI;
