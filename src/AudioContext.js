"use strict";

var _ = require("./utils");
var Inspector = require("./utils/Inspector");
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
  var destination = new AudioDestinationNode(this);
  var sampleRate = global.WebAudioTestAPI.sampleRate;
  var currentTime = function() { return this._currentTime; };
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

  this._currentTime = 0;
  this._targetTime  = 0;
  this._remain = 0;
}
_.inherits(AudioContext, global.EventTarget);

AudioContext.WEB_AUDIO_TEST_API_VERSION = global.WebAudioTestAPI.VERSION;

AudioContext.prototype.$process = function(duration) {
  var dx;

  this._targetTime += duration;

  while (this._currentTime < this._targetTime) {
    if (this._remain) {
      dx = this._remain;
      this._remain = 0;
    } else {
      dx = Math.min(global.WebAudioTestAPI.currentTimeIncr, this._targetTime - this._currentTime);
      this._remain = global.WebAudioTestAPI.currentTimeIncr - dx;
    }
    this.destination.$process(this._currentTime, this._currentTime + dx);
    this._currentTime = this._currentTime + dx;
  }
};

AudioContext.prototype.$processTo = function(time) {
  time = String(time).match(/^(\d\d):(\d\d)\.(\d\d\d)/);
  if (time) {
    time = (+time[1]) * 60 + (+time[2]) + (+time[3]) * 0.001;
    if (this._currentTime < time) {
      this.$process(time - this._currentTime);
    }
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

module.exports = global.WebAudioTestAPI.AudioContext = AudioContext;
