"use strict";

var _ = require("./utils");
var Inspector = require("./utils/Inspector");
var WebAudioTestAPI = require("./WebAudioTestAPI");
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
var EventTarget = require("./EventTarget");

require("./MediaStream");
require("./HTMLMediaElement");

function AudioContext() {
  if (!(this instanceof AudioContext)) {
    throw new TypeError("Failed to construct 'AudioContext': Please use the 'new' operator");
  }

  EventTarget.call(this);

  var destination = new AudioDestinationNode(this);
  var sampleRate = WebAudioTestAPI.sampleRate;
  var currentTime = function() { return this._microCurrentTime / (1000 * 1000); };
  var listener = new AudioListener(this);

  _.defineAttribute(this, "destination", "readonly", destination, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "sampleRate", "readonly", sampleRate, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "currentTime", "readonly", currentTime, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "listener", "readonly", listener, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });

  Object.defineProperties(this, {
    $name   : { value : "AudioContext" },
    $context: { value: this },
  });

  this._microCurrentTime = 0;
  this._processedSamples = 0;
  this._tick = 0;
}
_.inherits(AudioContext, EventTarget);

AudioContext.WEB_AUDIO_TEST_API_VERSION = WebAudioTestAPI.VERSION;

AudioContext.prototype.createBuffer = function(numberOfChannels, length, sampleRate) {
  var inspector = new Inspector(this, null, [
    { name: "numberOfChannels", type: "number" },
    { name: "length"          , type: "number" },
    { name: "sampleRate"      , type: "number" },
  ]);

  inspector.validateArguments(arguments, function(msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });

  return new AudioBuffer(this, numberOfChannels, length, sampleRate);
};

AudioContext.prototype.decodeAudioData = function(audioData, successCallback, errorCallback) {
  var inspector = new Inspector(this, "decodeAudioData", [
    { name: "audioData"      , type: "ArrayBuffer" },
    { name: "successCallback", type: "function" },
    { name: "errorCallback"  , type: "optional function" },
  ]);

  inspector.validateArguments(arguments, function(msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });

  successCallback = _.defaults(successCallback, _.NOP);
  errorCallback   = _.defaults(errorCallback  , _.NOP);

  var _this = this;
  setTimeout(function() {
    if (_this.DECODE_AUDIO_DATA_FAILED) {
      errorCallback();
    } else {
      successCallback(_this.DECODE_AUDIO_DATA_RESULT || new AudioBuffer(_this, 2, 1024, _this.sampleRate));
    }
  }, 0);
};

AudioContext.prototype.createBufferSource = function() {
  return new AudioBufferSourceNode(this);
};

AudioContext.prototype.createMediaElementSource = function(mediaElement) {
  var inspector = new Inspector(this, "createMediaElementSource", [
    { name: "mediaElement", type: "HTMLMediaElement" },
  ]);

  inspector.validateArguments(arguments, function(msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });

  return new MediaElementAudioSourceNode(this, mediaElement);
};

AudioContext.prototype.createMediaStreamSource = function(mediaStream) {
  var inspector = new Inspector(this, "createMediaStreamSource", [
    { name: "mediaStream", type: "MediaStream" },
  ]);

  inspector.validateArguments(arguments, function(msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });

  return new MediaStreamAudioSourceNode(this, mediaStream);
};

AudioContext.prototype.createMediaStreamDestination = function() {
  return new MediaStreamAudioDestinationNode(this);
};

AudioContext.prototype.createScriptProcessor = function(bufferSize, numberOfInputChannels, numberOfOutputChannels) {
  var inspector = new Inspector(this, "createScriptProcessor", [
    { name: "bufferSize"            , type: /* optional */ "enum { 256, 512, 1024, 2048, 4096, 8192, 16384 }" },
    { name: "numberOfInputChannels" , type: "optional number" },
    { name: "numberOfOutputChannels", type: "optional number" },
  ]);

  inspector.validateArguments(arguments, function(msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });

  bufferSize = _.defaults(bufferSize, 0);
  numberOfInputChannels  = _.defaults(numberOfInputChannels , 2);
  numberOfOutputChannels = _.defaults(numberOfOutputChannels, 2);

  return new ScriptProcessorNode(this, bufferSize, numberOfInputChannels, numberOfOutputChannels);
};

AudioContext.prototype.createAnalyser = function() {
  return new AnalyserNode(this);
};

AudioContext.prototype.createGain = function() {
  return new GainNode(this);
};

AudioContext.prototype.createDelay = function(maxDelayTime) {
  var inspector = new Inspector(this, "createDelay", [
    { name: "maxDelayTime", type: "optional number" },
  ]);

  inspector.validateArguments(arguments, function(msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });

  maxDelayTime = _.defaults(maxDelayTime, 1.0);

  return new DelayNode(this, maxDelayTime);
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
  var inspector = new Inspector(this, "createChannelSplitter", [
    { name: "numberOfOutputs", type: "optional number" },
  ]);

  inspector.validateArguments(arguments, function(msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });

  numberOfOutputs = _.defaults(numberOfOutputs, 6);

  return new ChannelSplitterNode(this, numberOfOutputs);
};

AudioContext.prototype.createChannelMerger = function(numberOfInputs) {
  var inspector = new Inspector(this, "createChannelMerger", [
    { name: "numberOfInputs", type: "optional number" },
  ]);

  inspector.validateArguments(arguments, function(msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });

  numberOfInputs = _.defaults(numberOfInputs, 6);

  return new ChannelMergerNode(this, numberOfInputs);
};

AudioContext.prototype.createDynamicsCompressor = function() {
  return new DynamicsCompressorNode(this);
};

AudioContext.prototype.createOscillator = function() {
  return new OscillatorNode(this);
};

AudioContext.prototype.createPeriodicWave = function(real, imag) {
  var inspector = new Inspector(this, "createPeriodicWave", [
    { name: "real", type: "Float32Array", validate: over4096 },
    { name: "imag", type: "Float32Array", validate: over4096 },
  ]);

  function over4096(value, name) {
    if (4096 < value.length) {
      return "length of " + name + " array (" + value.length + ") exceeds allow maximum of 4096";
    }
  }

  inspector.validateArguments(arguments, function(msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });
  inspector.assert(real.length === imag.length, function() {
    throw new TypeError(
      inspector.form + "; length of real array (" + real.length + ") and length of imaginary array (" + imag.length + ") must match"
    );
  });

  return new PeriodicWave(real, imag);
};

AudioContext.prototype.toJSON = function() {
  return this.destination.toJSON([]);
};

AudioContext.prototype.$process = function(time) {
  this._process(_.toMicroseconds(time));
};

AudioContext.prototype.$processTo = function(time) {
  time = _.toMicroseconds(time);
  if (this._microCurrentTime < time) {
    this._process(time - this._microCurrentTime);
  }
};

AudioContext.prototype.$reset = function() {
  this._microCurrentTime = 0;
  this._processedSamples = 0;
  this.destination.$inputs.forEach(function(node) {
    node.disconnect();
  });
};

AudioContext.prototype._process = function(microseconds) {
  var nextMicroCurrentTime = this._microCurrentTime + microseconds;

  while (this._microCurrentTime < nextMicroCurrentTime) {
    var _nextMicroCurrentTime = Math.min(this._microCurrentTime + 1000, nextMicroCurrentTime);
    var _nextProcessedSamples = Math.floor(_nextMicroCurrentTime / (1000 * 1000) * this.sampleRate);
    var inNumSamples = _nextProcessedSamples - this._processedSamples;

    this._microCurrentTime = _nextMicroCurrentTime;
    this._processedSamples = _nextProcessedSamples;

    this.destination.$process(inNumSamples, ++this._tick);
  }
};

module.exports = WebAudioTestAPI.AudioContext = AudioContext;
