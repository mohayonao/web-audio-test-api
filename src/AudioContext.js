"use strict";

var _ = require("./utils");
var AudioDestinationNode = require("./AudioDestinationNode");
var AudioListener = require("./AudioListener");
var AudioBuffer = require("./AudioBuffer");
var AudioBufferSourceNode = require("./AudioBufferSourceNode");
var MediaElementAudioSourceNode = require("./MediaElementAudioSourceNode");
var MediaStreamAudioSourceNode = require("./MediaStreamAudioSourceNode");
var MediaStreamAudioDestinationNode = require("./MediaStreamAudioDestinationNode");
var ScriptProcessorNode = require("./ScriptProcessorNode");
var AnalyserNode = require("./AnalyserNode");
var GainNode = require("./GainNode");
var DelayNode = require("./DelayNode");
var BiquadFilterNode = require("./BiquadFilterNode");
var WaveShaperNode = require("./WaveShaperNode");
var PannerNode = require("./PannerNode");
var ConvolverNode = require("./ConvolverNode");
var ChannelSplitterNode = require("./ChannelSplitterNode");
var ChannelMergerNode = require("./ChannelMergerNode");
var DynamicsCompressorNode = require("./DynamicsCompressorNode");
var OscillatorNode = require("./OscillatorNode");
var PeriodicWave = require("./PeriodicWave");

function AudioContext() {
  _.$read(this, "destination", new AudioDestinationNode(this));
  _.$read(this, "sampleRate", _.SAMPLERATE);
  _.$read(this, "currentTime", function() { return this._currentTime; }.bind(this));
  _.$read(this, "listener", new AudioListener(this));

  Object.defineProperties(this, {
    $name   : { value : "AudioContext" },
    $context: { value: this },
  });

  this._currentTime = 0;
  this._targetTime  = 0;
  this._remain = 0;
}
_.inherits(AudioContext, EventTarget);

AudioContext.WEB_AUDIO_TEST_API_VERSION = _.VERSION;

AudioContext.prototype.$process = function(duration) {
  var dx;

  this._targetTime += duration;

  while (this._currentTime < this._targetTime) {
    if (this._remain) {
      dx = this._remain;
      this._remain = 0;
    } else {
      dx = Math.min(_.CURRENT_TIME_INCR, this._targetTime - this._currentTime);
      this._remain = _.CURRENT_TIME_INCR - dx;
    }
    this.destination.$process(this._currentTime, this._currentTime + dx);
    this._currentTime = this._currentTime + dx;
  }
};

AudioContext.prototype.$reset = function() {
  this._currentTime = 0;
  this._targetTime  = 0;
  this._remain = 0;
  this.destination.$inputs.forEach(function(node) {
    node.disconnect();
  });
};

AudioContext.prototype.toJSON = function() {
  return this.destination.toJSON([]);
};

AudioContext.prototype.createBuffer = function(numberOfChannels, length, sampleRate) {
  return new AudioBuffer(this, numberOfChannels, length, sampleRate);
};

AudioContext.prototype.decodeAudioData = function(audioData, successCallback, errorCallback) {
  successCallback = _.defaults(successCallback, _.NOP);
  errorCallback   = _.defaults(errorCallback  , _.NOP);
  _.check("AudioContext#decodeAudioData(audioData, successCallback, errorCallback)", {
    audioData      : { type: "ArrayBuffer", given: audioData       },
    successCallback: { type: "function"   , given: successCallback },
    errorCallback  : { type: "function"   , given: errorCallback   },
  });
  var _this = this;
  setTimeout(function() {
    if (_this.DECODE_AUDIO_DATA_FAILED) {
      errorCallback();
    } else {
      successCallback(_this.DECODE_AUDIO_DATA_RESULT || new AudioBuffer(_this, 2, 1024, _.SAMPLERATE));
    }
  }, 0);
};

AudioContext.prototype.createBufferSource = function() {
  return new AudioBufferSourceNode(this);
};

AudioContext.prototype.createMediaElementSource = function() {
  return new MediaElementAudioSourceNode(this);
};

AudioContext.prototype.createMediaStreamSource = function() {
  return new MediaStreamAudioSourceNode(this);
};

AudioContext.prototype.createMediaStreamDestination = function() {
  return new MediaStreamAudioDestinationNode(this);
};

AudioContext.prototype.createScriptProcessor = function(bufferSize, numberOfInputChannels, numberOfOutputChannels) {
  return new ScriptProcessorNode(this, _.defaults(bufferSize, 0), _.defaults(numberOfInputChannels, 2), _.defaults(numberOfOutputChannels, 2));
};

AudioContext.prototype.createAnalyser = function() {
  return new AnalyserNode(this);
};

AudioContext.prototype.createGain = function() {
  return new GainNode(this);
};

AudioContext.prototype.createDelay = function(maxDelayTime) {
  return new DelayNode(this, _.defaults(maxDelayTime, 1.0));
};

AudioContext.prototype.createBiquadFilter = function() {
  return new BiquadFilterNode(this);
};

AudioContext.prototype.createWaveShaper = function() {
  return new WaveShaperNode(this);
};

AudioContext.prototype.createPanner = function() {
  return new PannerNode(this);
};

AudioContext.prototype.createConvolver = function() {
  return new ConvolverNode(this);
};

AudioContext.prototype.createChannelSplitter = function(numberOfOutputs) {
  return new ChannelSplitterNode(this, _.defaults(numberOfOutputs, 6));
};

AudioContext.prototype.createChannelMerger = function(numberOfInputs) {
  return new ChannelMergerNode(this, _.defaults(numberOfInputs, 6));
};

AudioContext.prototype.createDynamicsCompressor = function() {
  return new DynamicsCompressorNode(this);
};

AudioContext.prototype.createOscillator = function() {
  return new OscillatorNode(this);
};

AudioContext.prototype.createPeriodicWave = function(real, imag) {
  return new PeriodicWave(real, imag);
};

module.exports = AudioContext;
