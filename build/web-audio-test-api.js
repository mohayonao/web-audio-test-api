(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _ = require("./utils");
var Inspector = require("./utils/Inspector");
var WebAudioTestAPI = require("./WebAudioTestAPI");
var AudioNode = require("./AudioNode");

var FFTSize = "enum { 32, 64, 128, 256, 512, 1024, 2048 }";

var AnalyserNodeConstructor = function AnalyserNode() {
  throw new TypeError("Illegal constructor: use audioContext.createAnalyser()");
};
_.inherits(AnalyserNodeConstructor, AudioNode);

function AnalyserNode(context) {
  AudioNode.call(this, context, {
    name: "AnalyserNode",
    numberOfInputs  : 1,
    numberOfOutputs : 1,
    channelCount    : 1,
    channelCountMode: "explicit",
    channelInterpretation: "speakers"
  });

  var fftSize = 2048;
  var frequencyBinCount = function() { return this.fftSize >> 1; };
  var minDecibels = -100;
  var maxDecibels = 30;
  var smoothingTimeConstant = 0.8;

  _.defineAttribute(this, "fftSize", FFTSize, fftSize, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "frequencyBinCount", "readonly", frequencyBinCount, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "minDecibels", "number", minDecibels, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "maxDecibels", "number", maxDecibels, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "smoothingTimeConstant", "number", smoothingTimeConstant, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
}
_.inherits(AnalyserNode, AnalyserNodeConstructor);

AnalyserNode.exports = AnalyserNodeConstructor;
AnalyserNode.jsonAttrs = [ "fftSize", "minDecibels", "maxDecibels", "smoothingTimeConstant" ];

AnalyserNodeConstructor.prototype.getFloatFrequencyData = function() {
  var inspector = new Inspector(this, "getFloatFrequencyData", [
    { name: "array", type: "Float32Array" },
  ]);

  inspector.validateArguments(arguments, function(msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });
};

AnalyserNodeConstructor.prototype.getByteFrequencyData = function() {
  var inspector = new Inspector(this, "getByteFrequencyData", [
    { name: "array", type: "Uint8Array" },
  ]);

  inspector.validateArguments(arguments, function(msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });
};

AnalyserNodeConstructor.prototype.getByteTimeDomainData = function() {
  var inspector = new Inspector(this, "getByteTimeDomainData", [
    { name: "array", type: "Uint8Array" },
  ]);

  inspector.validateArguments(arguments, function(msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });
};

module.exports = WebAudioTestAPI.AnalyserNode = AnalyserNode;

},{"./AudioNode":7,"./WebAudioTestAPI":34,"./utils":41,"./utils/Inspector":35}],2:[function(require,module,exports){
"use strict";

var _ = require("./utils");
var Inspector = require("./utils/Inspector");
var WebAudioTestAPI = require("./WebAudioTestAPI");

var AudioBufferConstructor = function AudioBuffer() {
  throw new TypeError("Illegal constructor: use audioContext.createBuffer(numberOfChannels: number, length: number, sampleRate: number)");
};

function AudioBuffer(context, numberOfChannels, length, sampleRate) {
  _.defineAttribute(this, "sampleRate", "readonly", sampleRate, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "length", "readonly", length, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "duration", "readonly", length / sampleRate, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "numberOfChannels", "readonly", numberOfChannels, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });

  Object.defineProperties(this, {
    $name   : { value: "AudioBuffer" },
    $context: { value: context }
  });

  this._data = new Array(numberOfChannels);
  for (var i = 0; i < numberOfChannels; i++) {
    this._data[i] = new Float32Array(length);
  }
}
_.inherits(AudioBuffer, AudioBufferConstructor);

AudioBuffer.exports = AudioBufferConstructor;

AudioBufferConstructor.prototype.getChannelData = function(channel) {
  var inspector = new Inspector(this, "getChannelData", [
    { name: "channel", type: "number" }
  ]);
  inspector.validateArguments(arguments, function(msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });
  inspector.assert(0 <= channel && channel < this._data.length, function() {
    throw new TypeError(
      inspector.form + "; channel index (" + channel + ") exceeds number of channels (#{" + this._data.length + "})"
    );
  });
  return this._data[channel];
};

AudioBuffer.prototype.toJSON = function() {
  var json = {
    name: this.$name,
    sampleRate: this.sampleRate,
    length: this.length,
    duration: this.duration,
    numberOfChannels: this.numberOfChannels
  };

  if (this.$context.VERBOSE_JSON) {
    json.data = this._data.map(function(data) {
      return Array.prototype.slice.call(data);
    });
  }

  return json;
};

module.exports = WebAudioTestAPI.AudioBuffer = AudioBuffer;

},{"./WebAudioTestAPI":34,"./utils":41,"./utils/Inspector":35}],3:[function(require,module,exports){
"use strict";

var _ = require("./utils");
var Inspector = require("./utils/Inspector");
var WebAudioTestAPI = require("./WebAudioTestAPI");
var AudioNode = require("./AudioNode");
var AudioParam = require("./AudioParam");
var Event = require("./Event");

var AudioBufferSourceNodeConstructor = function AudioBufferSourceNode() {
  throw new TypeError("Illegal constructor: use audioContext.createBufferSource()");
};
_.inherits(AudioBufferSourceNodeConstructor, AudioNode);

function AudioBufferSourceNode(context) {
  AudioNode.call(this, context, {
    name: "AudioBufferSourceNode",
    numberOfInputs  : 0,
    numberOfOutputs : 1,
    channelCount    : 2,
    channelCountMode: "max",
    channelInterpretation: "speakers"
  });

  var buffer = null;
  var playbackRate = new AudioParam(this, "playbackRate", 1, 0, 1024);
  var loop = false;
  var loopStart = 0;
  var loopEnd = 0;
  var onended = null;

  _.defineAttribute(this, "buffer", "AudioBuffer|null", buffer, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "playbackRate", "readonly", playbackRate, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "loop", "boolean", loop, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "loopStart", "number", loopStart, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "loopEnd", "number", loopEnd, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "onended", "function|null", onended, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });

  Object.defineProperties(this, {
    $state: {
      get: function() {
        return this.$stateAtTime(this.context.currentTime);
      }
    }
  });

  this._startTime = Infinity;
  this._stopTime  = Infinity;
  this._firedOnEnded = false;
}
_.inherits(AudioBufferSourceNode, AudioBufferSourceNodeConstructor);

AudioBufferSourceNode.exports = AudioBufferSourceNodeConstructor;
AudioBufferSourceNode.jsonAttrs = [ "buffer", "playbackRate", "loop", "loopStart", "loopEnd" ];

AudioBufferSourceNodeConstructor.prototype.start = function(when) {
  var inspector = new Inspector(this, "start", [
    { name: "when", type: "optional number" },
    { name: "offset", type: "optional number" },
    { name: "duration", type: "optional number" },
  ]);

  inspector.validateArguments(arguments, function(msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });
  inspector.assert(this._startTime === Infinity, function() {
    throw new Error(inspector.form + "; cannot start more than once");
  });

  this._startTime = _.defaults(when, 0);
};

AudioBufferSourceNodeConstructor.prototype.stop = function(when) {
  var inspector = new Inspector(this, "stop", [
    { name: "when", type: "optional number" }
  ]);

  inspector.validateArguments(arguments, function(msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });
  inspector.assert(this._startTime !== Infinity, function() {
    throw new Error(inspector.form + "; cannot call stop without calling start first");
  });
  inspector.assert(this._stopTime === Infinity, function() {
    throw new Error(inspector.form + "; cannot stop more than once");
  });

  this._stopTime = when;
};

AudioBufferSourceNode.prototype.$stateAtTime = function(time) {
  time = _.toSeconds(time);

  if (this._startTime === Infinity) {
    return "UNSCHEDULED";
  }
  if (time < this._startTime) {
    return "SCHEDULED";
  }

  var stopTime = this._stopTime;
  if (!this.loop && this.buffer) {
    stopTime = Math.min(stopTime, this._startTime + this.buffer.duration);
  }

  if (time < stopTime) {
    return "PLAYING";
  }

  return "FINISHED";
};

AudioBufferSourceNode.prototype._process = function() {
  if (!this._firedOnEnded && this.$stateAtTime(this.context.currentTime) === "FINISHED") {
    this.dispatchEvent(new Event("ended", this));
    this._firedOnEnded = true;
  }
};

module.exports = WebAudioTestAPI.AudioBufferSourceNode = AudioBufferSourceNode;

},{"./AudioNode":7,"./AudioParam":8,"./Event":17,"./WebAudioTestAPI":34,"./utils":41,"./utils/Inspector":35}],4:[function(require,module,exports){
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

},{"./AnalyserNode":1,"./AudioBuffer":2,"./AudioBufferSourceNode":3,"./AudioDestinationNode":5,"./AudioListener":6,"./BiquadFilterNode":10,"./ChannelMergerNode":11,"./ChannelSplitterNode":12,"./ConvolverNode":13,"./DelayNode":14,"./DynamicsCompressorNode":15,"./EventTarget":18,"./GainNode":19,"./HTMLMediaElement":21,"./MediaElementAudioSourceNode":22,"./MediaStream":23,"./MediaStreamAudioDestinationNode":24,"./MediaStreamAudioSourceNode":25,"./OscillatorNode":28,"./PannerNode":29,"./PeriodicWave":30,"./ScriptProcessorNode":31,"./WaveShaperNode":32,"./WebAudioTestAPI":34,"./utils":41,"./utils/Inspector":35}],5:[function(require,module,exports){
"use strict";

var _ = require("./utils");
var AudioNode = require("./AudioNode");
var WebAudioTestAPI = require("./WebAudioTestAPI");

var AudioDestinationNodeConstructor = function AudioDestinationNode() {
  throw new TypeError("Illegal constructor");
};
_.inherits(AudioDestinationNodeConstructor, AudioNode);

function AudioDestinationNode(context) {
  AudioNode.call(this, context, {
    name: "AudioDestinationNode",
    numberOfInputs  : 1,
    numberOfOutputs : 0,
    channelCount    : 2,
    channelCountMode: "explicit",
    channelInterpretation: "speakers"
  });

  var maxChannelCount = 2;

  _.defineAttribute(this, "maxChannelCount", "readonly", maxChannelCount, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
}
_.inherits(AudioDestinationNode, AudioDestinationNodeConstructor);

AudioDestinationNode.exports = AudioDestinationNodeConstructor;

module.exports = WebAudioTestAPI.AudioDestinationNode = AudioDestinationNode;

},{"./AudioNode":7,"./WebAudioTestAPI":34,"./utils":41}],6:[function(require,module,exports){
"use strict";

var _ = require("./utils");
var Inspector = require("./utils/Inspector");
var WebAudioTestAPI = require("./WebAudioTestAPI");

var AudioListenerConstructor = function AudioListener() {
  throw new TypeError("Illegal constructor");
};

function AudioListener(context) {
  var dopplerFactor = 1;
  var speedOfSound = 343.3;

  _.defineAttribute(this, "dopplerFactor", "number", dopplerFactor, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "speedOfSound", "number", speedOfSound, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });

  Object.defineProperties(this, {
    $name   : { value: "AudioListener" },
    $context: { value: context }
  });
}
_.inherits(AudioListener, AudioListenerConstructor);

AudioListener.exports = AudioListenerConstructor;

AudioListenerConstructor.prototype.setPosition = function() {
  var inspector = new Inspector(this, "setPosition", [
    { name: "x", type: "number" },
    { name: "y", type: "number" },
    { name: "z", type: "number" },
  ]);

  inspector.validateArguments(arguments, function(msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });
};

AudioListenerConstructor.prototype.setOrientation = function() {
  var inspector = new Inspector(this, "setOrientation", [
    { name: "x"  , type: "number" },
    { name: "y"  , type: "number" },
    { name: "z"  , type: "number" },
    { name: "xUp", type: "number" },
    { name: "yUp", type: "number" },
    { name: "zUp", type: "number" },
  ]);

  inspector.validateArguments(arguments, function(msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });
};

AudioListenerConstructor.prototype.setVelocity = function() {
  var inspector = new Inspector(this, "setVelocity", [
    { name: "x", type: "number" },
    { name: "y", type: "number" },
    { name: "z", type: "number" },
  ]);

  inspector.validateArguments(arguments, function(msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });
};

module.exports = WebAudioTestAPI.AudioListener = AudioListener;

},{"./WebAudioTestAPI":34,"./utils":41,"./utils/Inspector":35}],7:[function(require,module,exports){
"use strict";

var _ = require("./utils");
var Inspector = require("./utils/Inspector");
var WebAudioTestAPI = require("./WebAudioTestAPI");
var AudioParam = require("./AudioParam");
var EventTarget = require("./EventTarget");

var ChannelCountMode = "enum { max, clamped-max, explicit }";
var ChannelInterpretation = "enum { speakers, discrete }";

var AudioNodeConstructor = function AudioNode() {
  throw new TypeError("Illegal constructor");
};
_.inherits(AudioNodeConstructor, EventTarget);

function AudioNode(context, spec) {
  spec = spec || {};

  EventTarget.call(this);

  var numberOfInputs = _.defaults(spec.numberOfInputs, 1);
  var numberOfOutputs = _.defaults(spec.numberOfOutputs, 1);
  var channelCount = _.defaults(spec.channelCount, 2);
  var channelCountMode = _.defaults(spec.channelCountMode, "max");
  var channelInterpretation = _.defaults(spec.channelInterpretation, "speakers");

  _.defineAttribute(this, "context", "readonly", context, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "numberOfInputs", "readonly", numberOfInputs, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "numberOfOutputs", "readonly", numberOfOutputs, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "channelCount", "number", channelCount, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "channelCountMode", ChannelCountMode, channelCountMode, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "channelInterpretation", ChannelInterpretation, channelInterpretation, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });

  Object.defineProperties(this, {
    $name   : { value: _.defaults(spec.name, "AudioNode") },
    $context: { value: context },
    $inputs : { value: [] },
  });
  this._outputs = [];
  this._tick = -1;
}
_.inherits(AudioNode, AudioNodeConstructor);

AudioNode.exports = AudioNodeConstructor;

AudioNodeConstructor.prototype.connect = function(destination) {
  var inspector = new Inspector(this, "connect", [
    { name: "destination", type: "AudioNode | AudioParam", validate: sameContext },
    { name: "output"     , type: "optional number", validate: checkNumberOfOutput },
    { name: "input"      , type: "optional number", validate: checkNumberOfInput },
  ]);

  function sameContext(value) {
    if (this.$context !== value.$context) {
      return "cannot connect to a destination belonging to a different audio context";
    }
  }

  function checkNumberOfOutput(value, name) {
    if (value < 0 || this.numberOfOutputs <= value) {
      return name + " index (" + value + ") exceeds number of outputs (" + this.numberOfOutputs + ")";
    }
  }

  function checkNumberOfInput(value, name) {
    if (value < 0 || destination.numberOfInputs <= value) {
      return name + " index (" + value + ") exceeds number of inputs (" + destination.numberOfInputs + ")";
    }
  }

  inspector.validateArguments(arguments, function(msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });

  var index = this._outputs.indexOf(destination);
  /* istanbul ignore else */
  if (index === -1) {
    this._outputs.push(destination);
    destination.$inputs.push(this);
  }
};

AudioNodeConstructor.prototype.disconnect = function() {
  var inspector = new Inspector(this, "connect", [
    { name: "output", type: "optional number", validate: checkNumberOfOutput },
  ]);

  function checkNumberOfOutput(value, name) {
    if (value < 0 || this.numberOfOutputs <= value) {
      return name + " index (" + value + ") exceeds number of outputs (" + this.numberOfOutputs + ")";
    }
  }

  inspector.validateArguments(arguments, function(msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });

  this._outputs.splice(0).forEach(function(dst) {
    var index = dst.$inputs.indexOf(this);
    /* istanbul ignore else */
    if (index !== -1) {
      dst.$inputs.splice(index, 1);
    }
  }, this);
};

AudioNode.prototype.toJSON = function(memo) {
  return _.toJSON(this, function(node, memo) {
    var json = {};

    json.name = _.name(node);

    (node.constructor.jsonAttrs || []).forEach(function(key) {
      if (node[key] && node[key].toJSON) {
        json[key] = node[key].toJSON(memo);
      } else {
        json[key] = node[key];
      }
    });

    if (node.$context.VERBOSE_JSON) {
      json.numberOfInputs = node.numberOfInputs;
      json.numberOfOutputs = node.numberOfOutputs;
      json.channelCount = node.channelCount;
      json.channelCountMode = node.channelCountMode;
      json.channelInterpretation = node.channelInterpretation;
    }

    json.inputs = node.$inputs.map(function(node) {
      return node.toJSON(memo);
    });

    return json;
  }, memo);
};

AudioNode.prototype.$process = function(inNumSamples, tick) {
  /* istanbul ignore else */
  if (this._tick !== tick) {
    this._tick = tick;
    this.$inputs.forEach(function(src) {
      src.$process(inNumSamples, tick);
    });
    Object.keys(this).forEach(function(key) {
      if (this[key] instanceof AudioParam) {
        this[key].$process(inNumSamples, tick);
      }
    }, this);
    if (this._process) {
      this._process(inNumSamples);
    }
  }
};

module.exports = WebAudioTestAPI.AudioNode = AudioNode;

},{"./AudioParam":8,"./EventTarget":18,"./WebAudioTestAPI":34,"./utils":41,"./utils/Inspector":35}],8:[function(require,module,exports){
"use strict";

var _ = require("./utils");
var Inspector = require("./utils/Inspector");
var WebAudioTestAPI = require("./WebAudioTestAPI");

var AudioParamConstructor = function AudioParam() {
  throw new TypeError("Illegal constructor");
};

function AudioParam(node, name, defaultValue, minValue, maxValue) {
  var context = node.context;

  _.defineAttribute(this, "name", "readonly", name, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "defaultValue", "readonly", defaultValue, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "minValue", "readonly", minValue, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "maxValue", "readonly", maxValue, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  Object.defineProperty(this, "value", {
    get: function() {
      this._value = this.$valueAtTime(context.currentTime);
      return this._value;
    },
    set: function(newValue) {
      if (_.typeCheck(newValue, "number")) {
        this._value = newValue;
      } else {
        var msg = "";

        msg += "type ";
        msg += _.formatter.shouldBeButGot("number", newValue);

        throw new TypeError(_.formatter.concat(this, msg));
      }
    },
    enumerable: true
  });

  Object.defineProperties(this, {
    $name   : { value: "AudioParam" },
    $context: { value: context },
    $node   : { value: node },
    $inputs : { value: [] },
    $events : { value: [] },
  });

  this._value = this.defaultValue;
  this._tick = -1;
}
_.inherits(AudioParam, AudioParamConstructor);

AudioParam.exports = AudioParamConstructor;

AudioParamConstructor.prototype.setValueAtTime = function(value, startTime) {
  var inspector = new Inspector(this, "setValueTime", [
    { name: "value"    , type: "number" },
    { name: "startTime", type: "number" },
  ]);

  inspector.validateArguments(arguments, function(msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });

  insertEvent(this, {
    type : "SetValue",
    value: value,
    time : startTime,
  });
};

AudioParamConstructor.prototype.linearRampToValueAtTime = function(value, endTime) {
  var inspector = new Inspector(this, "linearRampToValueAtTime", [
    { name: "value"  , type: "number" },
    { name: "endTime", type: "number" },
  ]);

  inspector.validateArguments(arguments, function(msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });

  insertEvent(this, {
    type : "LinearRampToValue",
    value: value,
    time : endTime,
  });
};

AudioParamConstructor.prototype.exponentialRampToValueAtTime = function(value, endTime) {
  var inspector = new Inspector(this, "exponentialRampToValueAtTime", [
    { name: "value"  , type: "number" },
    { name: "endTime", type: "number" },
  ]);

  inspector.validateArguments(arguments, function(msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });

  insertEvent(this, {
    type : "ExponentialRampToValue",
    value: value,
    time : endTime,
  });
};

AudioParamConstructor.prototype.setTargetAtTime = function(target, startTime, timeConstant) {
  var inspector = new Inspector(this, "setTargetAtTime", [
    { name: "target"      , type: "number" },
    { name: "startTime"   , type: "number" },
    { name: "timeConstant", type: "number" },
  ]);

  inspector.validateArguments(arguments, function(msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });

  insertEvent(this, {
    type : "SetTarget",
    value: target,
    time : startTime,
    timeConstant: timeConstant
  });
};

AudioParamConstructor.prototype.setValueCurveAtTime = function(values, startTime, duration) {
  var inspector = new Inspector(this, "setValueCurveAtTime", [
    { name: "values"   , type: "Float32Array" },
    { name: "startTime", type: "number" },
    { name: "duration" , type: "number" },
  ]);

  inspector.validateArguments(arguments, function(msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });

  insertEvent(this, {
    type : "SetValueCurve",
    time : startTime,
    duration: duration,
    curve: values
  });
};

AudioParamConstructor.prototype.cancelScheduledValues = function(startTime) {
  var inspector = new Inspector(this, "cancelScheduledValues", [
    { name: "startTime", type: "number" },
  ]);

  inspector.validateArguments(arguments, function(msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });

  var events = this.$events;

  for (var i = 0, imax = events.length; i < imax; ++i) {
    if (events[i].time >= startTime) {
      return events.splice(i);
    }
  }
};

AudioParam.prototype.toJSON = function(memo) {
  return _.toJSON(this, function(node, memo) {
    var json = {};

    json.value = node.value;

    json.inputs = node.$inputs.map(function(node) {
      return node.toJSON(memo);
    });

    return json;
  }, memo);
};

AudioParam.prototype.$valueAtTime = function(time) {
  time = _.toSeconds(time);

  var value  = this._value;
  var events = this.$events;
  var t0;

  for (var i = 0; i < events.length; i++) {
    var e0 = events[i];
    var e1 = events[i + 1];

    if (time < e0.time) {
      break;
    }
    t0 = Math.min(time, e1 ? e1.time : time);

    if (e1 && e1.type === "LinearRampToValue") {
      value = linTo(value, e0.value, e1.value, t0, e0.time, e1.time);
    } else if (e1 && e1.type === "ExponentialRampToValue") {
      value = expTo(value, e0.value, e1.value, t0, e0.time, e1.time);
    } else {
      switch (e0.type) {
      case "SetValue":
      case "LinearRampToValue":
      case "ExponentialRampToValue":
        value = e0.value;
        break;
      case "SetTarget":
        value = setTarget(value, e0.value, t0, e0.time, e0.timeConstant);
        break;
      case "SetValueCurve":
        value = setCurveValue(value, t0, e0.time, e0.time + e0.duration, e0.curve);
        break;
      }
    }
  }

  return value;
};

AudioParam.prototype.$process = function(inNumSamples, tick) {
  /* istanbul ignore else */
  if (this._tick !== tick) {
    this._tick = tick;
    this.$inputs.forEach(function(src) {
      src.$process(inNumSamples, tick);
    });
  }
};

function insertEvent(_this, event) {
  var time = event.time;
  var events = _this.$events;
  var replace = 0;
  var i, imax = events.length;

  for (i = 0; i < imax; ++i) {
    if (events[i].time === time && events[i].type === event.type) {
      replace = 1;
      break;
    }

    if (events[i].time > time) {
      break;
    }
  }

  events.splice(i, replace, event);
}

function linTo(v, v0, v1, t, t0, t1) {
  var dt = (t - t0) / (t1 - t0);
  return (1 - dt) * v0 + dt * v1;
}

function expTo(v, v0, v1, t, t0, t1) {
  var dt = (t - t0) / (t1 - t0);
  return 0 < v0 && 0 < v1 ? v0 * Math.pow(v1 / v0, dt) : /* istanbul ignore next */ v;
}

function setTarget(v0, v1, t, t0, timeConstant) {
  return v1 + (v0 - v1) * Math.exp((t0 - t) / timeConstant);
}

function setCurveValue(v, t, t0, t1, curve) {
  var dt = (t - t0) / (t1 - t0);

  if (dt <= 0) {
    return _.defaults(curve[0], v);
  }

  if (1 <= dt) {
    return _.defaults(curve[curve.length - 1], v);
  }

  return _.defaults(curve[(curve.length * dt)|0], v);
}

module.exports = WebAudioTestAPI.AudioParam = AudioParam;

},{"./WebAudioTestAPI":34,"./utils":41,"./utils/Inspector":35}],9:[function(require,module,exports){
"use strict";

var _ = require("./utils");
var WebAudioTestAPI = require("./WebAudioTestAPI");
var Event = require("./Event");

var AudioProcessingEventConstructor = function AudioProcessingEvent() {
  throw new TypeError("Illegal constructor");
};
_.inherits(AudioProcessingEventConstructor, Event);

function AudioProcessingEvent(node) {
  Event.call(this, "audioprocess", node);
  Object.defineProperties(this, {
    $name: { value: "AudioProcessingEvent" },
    $node: { value: node }
  });
}
_.inherits(AudioProcessingEvent, AudioProcessingEventConstructor);

AudioProcessingEvent.exports = AudioProcessingEventConstructor;

module.exports = WebAudioTestAPI.AudioProcessingEvent = AudioProcessingEvent;

},{"./Event":17,"./WebAudioTestAPI":34,"./utils":41}],10:[function(require,module,exports){
"use strict";

var _ = require("./utils");
var Inspector = require("./utils/Inspector");
var WebAudioTestAPI = require("./WebAudioTestAPI");
var AudioNode = require("./AudioNode");
var AudioParam = require("./AudioParam");

var BiquadFilterType = "enum { lowpass, highpass, bandpass, lowshelf, highshelf, peaking, notch, allpass }";

var BiquadFilterNodeConstructor = function BiquadFilterNode() {
  throw new TypeError("Illegal constructor: use audioContext.createBiquadFilter()");
};
_.inherits(BiquadFilterNodeConstructor, AudioNode);

function BiquadFilterNode(context) {
  AudioNode.call(this, context, {
    name: "BiquadFilterNode",
    numberOfInputs  : 1,
    numberOfOutputs : 1,
    channelCount    : 2,
    channelCountMode: "max",
    channelInterpretation: "speakers"
  });

  var type = "lowpass";
  var frequency = new AudioParam(this, "frequency", 350, 10, context.sampleRate / 2);
  var detune = new AudioParam(this, "detune", 0, -4800, 4800);
  var Q = new AudioParam(this, "Q", 1, 0.0001, 1000);
  var gain = new AudioParam(this, "gain", 0, -40, 40);

  _.defineAttribute(this, "type", BiquadFilterType, type, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "frequency", "readonly", frequency, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "detune", "readonly", detune, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "Q", "readonly", Q, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "gain", "readonly", gain, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
}
_.inherits(BiquadFilterNode, BiquadFilterNodeConstructor);

BiquadFilterNode.exports = BiquadFilterNodeConstructor;
BiquadFilterNode.jsonAttrs = [ "type", "frequency", "detune", "Q", "gain" ];

BiquadFilterNodeConstructor.prototype.getFrequencyResponse = function() {
  var inspector = new Inspector(this, "getFrequencyResponse", [
    { name: "frequencyHz"  , type: "Float32Array" },
    { name: "magResponse"  , type: "Float32Array" },
    { name: "phaseResponse", type: "Float32Array" },
  ]);

  inspector.validateArguments(arguments, function(msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });
};

module.exports = WebAudioTestAPI.BiquadFilterNode = BiquadFilterNode;

},{"./AudioNode":7,"./AudioParam":8,"./WebAudioTestAPI":34,"./utils":41,"./utils/Inspector":35}],11:[function(require,module,exports){
"use strict";

var _ = require("./utils");
var WebAudioTestAPI = require("./WebAudioTestAPI");
var AudioNode = require("./AudioNode");

var ChannelMergerNodeConstructor = function ChannelMergerNode() {
  throw new TypeError("Illegal constructor: use audioContext.createChannelMerger([numberOfInputs: number])");
};
_.inherits(ChannelMergerNodeConstructor, AudioNode);

function ChannelMergerNode(context, numberOfInputs) {
  AudioNode.call(this, context, {
    name: "ChannelMergerNode",
    numberOfInputs  : numberOfInputs,
    numberOfOutputs : 1,
    channelCount    : 2,
    channelCountMode: "max",
    channelInterpretation: "speakers"
  });
}
_.inherits(ChannelMergerNode, ChannelMergerNodeConstructor);

ChannelMergerNode.exports = ChannelMergerNodeConstructor;

module.exports = WebAudioTestAPI.ChannelMergerNode = ChannelMergerNode;

},{"./AudioNode":7,"./WebAudioTestAPI":34,"./utils":41}],12:[function(require,module,exports){
"use strict";

var _ = require("./utils");
var WebAudioTestAPI = require("./WebAudioTestAPI");
var AudioNode = require("./AudioNode");

var ChannelSplitterNodeConstructor = function ChannelSplitterNode() {
  throw new TypeError("Illegal constructor: use audioContext.createChannelSplitter([numberOfOutputs: number])");
};
_.inherits(ChannelSplitterNodeConstructor, AudioNode);

function ChannelSplitterNode(context, numberOfOutputs) {
  AudioNode.call(this, context, {
    name: "ChannelSplitterNode",
    numberOfInputs  : 1,
    numberOfOutputs : numberOfOutputs,
    channelCount    : 2,
    channelCountMode: "max",
    channelInterpretation: "speakers"
  });
}
_.inherits(ChannelSplitterNode, ChannelSplitterNodeConstructor);

ChannelSplitterNode.exports = ChannelSplitterNodeConstructor;

module.exports = WebAudioTestAPI.ChannelSplitterNode = ChannelSplitterNode;

},{"./AudioNode":7,"./WebAudioTestAPI":34,"./utils":41}],13:[function(require,module,exports){
"use strict";

var _ = require("./utils");
var WebAudioTestAPI = require("./WebAudioTestAPI");
var AudioNode = require("./AudioNode");

var ConvolverNodeConstructor = function ConvolverNode() {
  throw new TypeError("Illegal constructor: use audioContext.createConvolver()");
};
_.inherits(ConvolverNodeConstructor, AudioNode);

function ConvolverNode(context) {
  AudioNode.call(this, context, {
    name: "ConvolverNode",
    numberOfInputs  : 1,
    numberOfOutputs : 1,
    channelCount    : 2,
    channelCountMode: "clamped-max",
    channelInterpretation: "speakers"
  });

  var buffer = null;
  var normalize = true;

  _.defineAttribute(this, "buffer", "AudioBuffer|null", buffer, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "normalize", "boolean", normalize, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
}
_.inherits(ConvolverNode, ConvolverNodeConstructor);

ConvolverNode.exports = ConvolverNodeConstructor;
ConvolverNode.jsonAttrs = [ "normalize" ];

module.exports = WebAudioTestAPI.ConvolverNode = ConvolverNode;

},{"./AudioNode":7,"./WebAudioTestAPI":34,"./utils":41}],14:[function(require,module,exports){
"use strict";

var _ = require("./utils");
var WebAudioTestAPI = require("./WebAudioTestAPI");
var AudioNode = require("./AudioNode");
var AudioParam = require("./AudioParam");

var DelayNodeConstructor = function DelayNode() {
  throw new TypeError("Illegal constructor: use audioContext.createDelay([maxDelayTime: number])");
};
_.inherits(DelayNodeConstructor, AudioNode);

function DelayNode(context, maxDelayTime) {
  AudioNode.call(this, context, {
    name: "DelayNode",
    numberOfInputs  : 1,
    numberOfOutputs : 1,
    channelCount    : 2,
    channelCountMode: "max",
    channelInterpretation: "speakers"
  });

  var delayTime = new AudioParam(this, "delayTime", 0, 0, maxDelayTime);

  _.defineAttribute(this, "delayTime", "readonly", delayTime, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });

  Object.defineProperties(this, {
    $maxDelayTime: { value: maxDelayTime }
  });
}
_.inherits(DelayNode, DelayNodeConstructor);

DelayNode.exports = DelayNodeConstructor;
DelayNode.jsonAttrs = [ "delayTime"　];

module.exports = WebAudioTestAPI.DelayNode = DelayNode;

},{"./AudioNode":7,"./AudioParam":8,"./WebAudioTestAPI":34,"./utils":41}],15:[function(require,module,exports){
"use strict";

var _ = require("./utils");
var WebAudioTestAPI = require("./WebAudioTestAPI");
var AudioNode = require("./AudioNode");
var AudioParam = require("./AudioParam");

var DynamicsCompressorNodeConstructor = function DynamicsCompressorNode() {
  throw new TypeError("Illegal constructor: use audioContext.createDynamicsCompressor()");
};
_.inherits(DynamicsCompressorNodeConstructor, AudioNode);

function DynamicsCompressorNode(context) {
  AudioNode.call(this, context, {
    name: "DynamicsCompressorNode",
    numberOfInputs  : 1,
    numberOfOutputs : 1,
    channelCount    : 2,
    channelCountMode: "explicit",
    channelInterpretation: "speakers"
  });

  var threshold = new AudioParam(this, "threshold", -24, -100, 0);
  var knee = new AudioParam(this, "knee", 30, 0, 40);
  var ratio = new AudioParam(this, "ratio", 12, 1, 20);
  var reduction = new AudioParam(this, "reduction", 0, -20, 0);
  var attack = new AudioParam(this, "attack", 0.003, 0, 1.0);
  var release = new AudioParam(this, "release", 0.250, 0, 1.0);

  _.defineAttribute(this, "threshold", "readonly", threshold, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "knee", "readonly", knee, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "ratio", "readonly", ratio, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "reduction", "readonly", reduction, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "attack", "readonly", attack, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "release", "readonly", release, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
}
_.inherits(DynamicsCompressorNode, DynamicsCompressorNodeConstructor);

DynamicsCompressorNode.exports = DynamicsCompressorNodeConstructor;
DynamicsCompressorNode.jsonAttrs = [ "threshold", "knee", "ratio", "reduction", "attack", "release" ];

module.exports = WebAudioTestAPI.DynamicsCompressorNode = DynamicsCompressorNode;

},{"./AudioNode":7,"./AudioParam":8,"./WebAudioTestAPI":34,"./utils":41}],16:[function(require,module,exports){
(function (global){
"use strict";

var _ = require("./utils");
var WebAudioTestAPI = require("./WebAudioTestAPI");
var EventTarget = require("./EventTarget");

/* istanbul ignore else */
if (typeof global.Element === "undefined") {
  global.Element = function Element() {
    throw new TypeError("Illegal constructor");
  };
  _.inherits(global.Element, EventTarget);
}

function Element() {
}
_.inherits(Element, global.Element);

module.exports = WebAudioTestAPI.Element = Element;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./EventTarget":18,"./WebAudioTestAPI":34,"./utils":41}],17:[function(require,module,exports){
(function (global){
"use strict";

var _ = require("./utils");
var WebAudioTestAPI = require("./WebAudioTestAPI");

function Event(name, target) {
  this.type = name;
  this.target = _.defaults(target, null);
  this.timeStamp = Date.now();
}
_.inherits(Event, global.Event);

/* istanbul ignore else */
if (typeof global.Event === "undefined") {
  global.Event = Event;
}

module.exports = WebAudioTestAPI.Event = Event;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./WebAudioTestAPI":34,"./utils":41}],18:[function(require,module,exports){
(function (global){
"use strict";

var _ = require("./utils");
var Inspector = require("./utils/Inspector");
var WebAudioTestAPI = require("./WebAudioTestAPI");

/* istanbul ignore else */
if (typeof global.EventTarget === "undefined") {
  global.EventTarget = function EventTarget() {
    throw new TypeError("Illegal constructor");
  };
}

function EventTarget() {
  this._listeners = {};
}
_.inherits(EventTarget, global.EventTarget);

EventTarget.prototype.addEventListener = function(type, listener) {
  var inspector = new Inspector(this, "addEventListener", [
    { name: "type", type: "string" },
    { name: "listener", type: "function" },
  ]);

  inspector.validateArguments(arguments, function(msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });

  this._listeners[type] = this._listeners[type] || /* istanbul ignore next */ [];
  this._listeners[type].push(listener);
};

EventTarget.prototype.removeEventListener = function(type, listener) {
  var inspector = new Inspector(this, "addEventListener", [
    { name: "type", type: "string" },
    { name: "listener", type: "function" },
  ]);

  inspector.validateArguments(arguments, function(msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });

  this._listeners[type] = this._listeners[type] || /* istanbul ignore next */ [];
  var index = this._listeners[type].indexOf(listener);
  if (index !== -1) {
    this._listeners[type].splice(index, 1);
  }
};

EventTarget.prototype.dispatchEvent = function(event) {
  var inspector = new Inspector(this, "addEventListener", [
    { name: "event", type: "Event" },
  ]);

  inspector.validateArguments(arguments, function(msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });

  var type = event.type;

  /* istanbul ignore else */
  if (typeof this["on" + type] === "function") {
    this["on" + type].call(this, event);
  }

  this.$listeners(type).forEach(function(listener) {
    listener.call(this, event);
  }, this);

  return true;
};

EventTarget.prototype.$listeners = function(type) {
  return (this._listeners[type] || /* istanbul ignore next */ []).slice();
};

module.exports = WebAudioTestAPI.EventTarget = EventTarget;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./WebAudioTestAPI":34,"./utils":41,"./utils/Inspector":35}],19:[function(require,module,exports){
"use strict";

var _ = require("./utils");
var WebAudioTestAPI = require("./WebAudioTestAPI");
var AudioNode = require("./AudioNode");
var AudioParam = require("./AudioParam");

var GainNodeConstructor = function GainNode() {
  throw new TypeError("Illegal constructor: use audioContext.createGain()");
};
_.inherits(GainNodeConstructor, AudioNode);

function GainNode(context) {
  AudioNode.call(this, context, {
    name: "GainNode",
    numberOfInputs  : 1,
    numberOfOutputs : 1,
    channelCount    : 2,
    channelCountMode: "max",
    channelInterpretation: "speakers"
  });

  var gain = new AudioParam(this, "gain", 1.0, 0.0, 1.0);

  _.defineAttribute(this, "gain", "readonly", gain, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
}
_.inherits(GainNode, GainNodeConstructor);

GainNode.exports = GainNodeConstructor;
GainNode.jsonAttrs = [ "gain"　];

module.exports = WebAudioTestAPI.GainNode = GainNode;

},{"./AudioNode":7,"./AudioParam":8,"./WebAudioTestAPI":34,"./utils":41}],20:[function(require,module,exports){
(function (global){
"use strict";

var _ = require("./utils");
var WebAudioTestAPI = require("./WebAudioTestAPI");
var Element = require("./Element");

/* istanbul ignore else */
if (typeof global.HTMLElement === "undefined") {
  global.HTMLElement = function HTMLElement() {
    throw new TypeError("Illegal constructor");
  };
  _.inherits(global.HTMLElement, Element);
}

function HTMLElement() {
}
_.inherits(HTMLElement, global.HTMLElement);

module.exports = WebAudioTestAPI.HTMLElement = HTMLElement;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./Element":16,"./WebAudioTestAPI":34,"./utils":41}],21:[function(require,module,exports){
(function (global){
"use strict";

var _ = require("./utils");
var WebAudioTestAPI = require("./WebAudioTestAPI");
var HTMLElement = require("./HTMLElement");

/* istanbul ignore else */
if (typeof global.HTMLMediaElement === "undefined") {
  global.HTMLMediaElement = function HTMLMediaElement() {
    throw new TypeError("Illegal constructor");
  };
  _.inherits(global.HTMLMediaElement, HTMLElement);
}

function HTMLMediaElement() {
}
_.inherits(HTMLMediaElement, global.HTMLMediaElement);

module.exports = WebAudioTestAPI.HTMLMediaElement = HTMLMediaElement;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./HTMLElement":20,"./WebAudioTestAPI":34,"./utils":41}],22:[function(require,module,exports){
"use strict";

var _ = require("./utils");
var WebAudioTestAPI = require("./WebAudioTestAPI");
var AudioNode = require("./AudioNode");

var MediaElementAudioSourceNodeConstructor = function MediaElementAudioSourceNode() {
  throw new TypeError("Illegal constructor: use audioContext.createMediaElementSource(mediaElement: HTMLMediaElement)");
};
_.inherits(MediaElementAudioSourceNodeConstructor, AudioNode);

function MediaElementAudioSourceNode(context) {
  AudioNode.call(this, context, {
    name: "MediaElementAudioSourceNode",
    numberOfInputs  : 0,
    numberOfOutputs : 1,
    channelCount    : 2,
    channelCountMode: "max",
    channelInterpretation: "speakers"
  });
}
_.inherits(MediaElementAudioSourceNode, MediaElementAudioSourceNodeConstructor);

MediaElementAudioSourceNode.exports = MediaElementAudioSourceNodeConstructor;

module.exports = WebAudioTestAPI.MediaElementAudioSourceNode = MediaElementAudioSourceNode;

},{"./AudioNode":7,"./WebAudioTestAPI":34,"./utils":41}],23:[function(require,module,exports){
(function (global){
"use strict";

var _ = require("./utils");
var WebAudioTestAPI = require("./WebAudioTestAPI");
var EventTarget = require("./EventTarget");

/* istanbul ignore else */
if (typeof global.MediaStream === "undefined") {
  global.MediaStream = function MediaStream() {
    throw new TypeError("Illegal constructor");
  };
  _.inherits(global.MediaStream, EventTarget);
}

function MediaStream() {
}
_.inherits(MediaStream, global.MediaStream);

module.exports = WebAudioTestAPI.MediaStream = MediaStream;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./EventTarget":18,"./WebAudioTestAPI":34,"./utils":41}],24:[function(require,module,exports){
"use strict";

var _ = require("./utils");
var WebAudioTestAPI = require("./WebAudioTestAPI");
var AudioNode = require("./AudioNode");

var MediaStreamAudioDestinationNodeConstructor = function MediaStreamAudioDestinationNode() {
  throw new TypeError("Illegal constructor: use audioContext.createMediaStreamDestination()");
};
_.inherits(MediaStreamAudioDestinationNodeConstructor, AudioNode);

function MediaStreamAudioDestinationNode(context) {
  AudioNode.call(this, context, {
    name: "MediaStreamAudioDestinationNode",
    numberOfInputs  : 1,
    numberOfOutputs : 0,
    channelCount    : 2,
    channelCountMode: "explicit",
    channelInterpretation: "speakers"
  });
}
_.inherits(MediaStreamAudioDestinationNode, MediaStreamAudioDestinationNodeConstructor);

MediaStreamAudioDestinationNode.exports = MediaStreamAudioDestinationNodeConstructor;

module.exports = WebAudioTestAPI.MediaStreamAudioDestinationNode = MediaStreamAudioDestinationNode;

},{"./AudioNode":7,"./WebAudioTestAPI":34,"./utils":41}],25:[function(require,module,exports){
"use strict";

var _ = require("./utils");
var WebAudioTestAPI = require("./WebAudioTestAPI");
var AudioNode = require("./AudioNode");

var MediaStreamAudioSourceNodeConstructor = function MediaStreamAudioSourceNode() {
  throw new TypeError("Illegal constructor: use audioContext.createMediaStreamSource(mediaStream: MediaStream)");
};
_.inherits(MediaStreamAudioSourceNodeConstructor, AudioNode);

function　MediaStreamAudioSourceNode(context) {
  AudioNode.call(this, context, {
    name: "MediaStreamAudioSourceNode",
    numberOfInputs  : 0,
    numberOfOutputs : 1,
    channelCount    : 2,
    channelCountMode: "max",
    channelInterpretation: "speakers"
  });
}
_.inherits(MediaStreamAudioSourceNode, MediaStreamAudioSourceNodeConstructor);

MediaStreamAudioSourceNode.exports = MediaStreamAudioSourceNodeConstructor;

module.exports = WebAudioTestAPI.MediaStreamAudioSourceNode = MediaStreamAudioSourceNode;

},{"./AudioNode":7,"./WebAudioTestAPI":34,"./utils":41}],26:[function(require,module,exports){
"use strict";

var _ = require("./utils");
var WebAudioTestAPI = require("./WebAudioTestAPI");
var Event = require("./Event");

var OfflineAudioCompletionEventConstructor = function OfflineAudioCompletionEvent() {
  throw new TypeError("Illegal constructor");
};
_.inherits(OfflineAudioCompletionEventConstructor, Event);

function OfflineAudioCompletionEvent(node) {
  Event.call(this, "complete", node);
  Object.defineProperties(this, {
    $name: { value: "OfflineAudioCompletionEvent" },
    $node: { value: node }
  });
}
_.inherits(OfflineAudioCompletionEvent, OfflineAudioCompletionEventConstructor);

OfflineAudioCompletionEvent.exports = OfflineAudioCompletionEventConstructor;

module.exports = WebAudioTestAPI.OfflineAudioCompletionEvent = OfflineAudioCompletionEvent;

},{"./Event":17,"./WebAudioTestAPI":34,"./utils":41}],27:[function(require,module,exports){
"use strict";

var _ = require("./utils");
var Inspector = require("./utils/Inspector");
var WebAudioTestAPI = require("./WebAudioTestAPI");
var AudioContext = require("./AudioContext");
var AudioBuffer = require("./AudioBuffer");
var AudioDestinationNode = require("./AudioDestinationNode");
var AudioListener = require("./AudioListener");
var EventTarget = require("./EventTarget");
var OfflineAudioCompletionEvent = require("./OfflineAudioCompletionEvent");

function OfflineAudioContext(numberOfChannels, length, sampleRate) {
  if (!(this instanceof OfflineAudioContext)) {
    throw new TypeError("Failed to construct 'AudioContext': Please use the 'new' operator");
  }

  EventTarget.call(this);

  var inspector = new Inspector(this, null, [
    { name: "numberOfChannels", type: "number" },
    { name: "length"          , type: "number" },
    { name: "sampleRate"      , type: "number" },
  ]);

  inspector.validateArguments(arguments, function(msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });

  var destination = new AudioDestinationNode(this);
  var currentTime = function() { return this._microCurrentTime / (1000 * 1000); };
  var listener = new AudioListener(this);
  var oncomplete = null;

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
  _.defineAttribute(this, "oncomplete", "function|null", oncomplete, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });

  Object.defineProperties(this, {
    $name   : { value: "OfflineAudioContext" },
    $context: { value: this }
  });

  this._microCurrentTime = 0;
  this._processedSamples = 0;
  this._tick = 0;

  this._numberOfChannels = numberOfChannels;
  this._length = length;
  this._rendering = false;
}
_.inherits(OfflineAudioContext, AudioContext);

OfflineAudioContext.prototype.startRendering = function() {
  var inspector = new Inspector(this, "startRendering", []);

  inspector.assert(!this._rendering, function() {
    throw Error(inspector.form + "; must only be called one time");
  });

  this._rendering = true;
};

OfflineAudioContext.prototype._process = function(microseconds) {
  if (!this._rendering || this._length <= this._processedSamples) {
    return;
  }

  var nextMicroCurrentTime = this._microCurrentTime + microseconds;

  while (this._microCurrentTime < nextMicroCurrentTime) {
    var _nextMicroCurrentTime = Math.min(this._microCurrentTime + 1000, nextMicroCurrentTime);
    var _nextProcessedSamples = Math.floor(_nextMicroCurrentTime / (1000 * 1000) * this.sampleRate);
    var inNumSamples = _nextProcessedSamples - this._processedSamples;

    this.destination.$process(inNumSamples, ++this._tick);

    this._microCurrentTime = _nextMicroCurrentTime;
    this._processedSamples = _nextProcessedSamples;

    if (this._length <= this._processedSamples) {
      break;
    }
  }

  if (this._length <= this._processedSamples) {
    var event = new OfflineAudioCompletionEvent(this);

    event.renderedBuffer = new AudioBuffer(this, this._numberOfChannels, this._length, this.sampleRate);

    this.dispatchEvent(event);
  }
};

module.exports = WebAudioTestAPI.OfflineAudioContext = OfflineAudioContext;

},{"./AudioBuffer":2,"./AudioContext":4,"./AudioDestinationNode":5,"./AudioListener":6,"./EventTarget":18,"./OfflineAudioCompletionEvent":26,"./WebAudioTestAPI":34,"./utils":41,"./utils/Inspector":35}],28:[function(require,module,exports){
"use strict";

var _ = require("./utils");
var Inspector = require("./utils/Inspector");
var WebAudioTestAPI = require("./WebAudioTestAPI");
var AudioNode = require("./AudioNode");
var AudioParam = require("./AudioParam");
var Event = require("./Event");

var OscillatorType = "enum { sine, square, sawtooth, triangle }";

var OscillatorNodeConstructor = function OscillatorNode() {
  throw new TypeError("Illegal constructor: use audioContext.createOscillator()");
};
_.inherits(OscillatorNodeConstructor, AudioNode);

function OscillatorNode(context) {
  AudioNode.call(this, context, {
    name: "OscillatorNode",
    numberOfInputs  : 0,
    numberOfOutputs : 1,
    channelCount    : 2,
    channelCountMode: "max",
    channelInterpretation: "speakers"
  });

  var type = "sine";
  var frequency = new AudioParam(this, "frequency", 440, 0, 100000);
  var detune = new AudioParam(this, "detune", 0, -4800, 4800);
  var onended = null;

  Object.defineProperty(this, "type", {
    get: function() {
      return this._custom ? "custom" : this._type;
    },
    set: function(newValue) {
      if (_.typeCheck(newValue, OscillatorType )) {
        this._type = newValue;
      } else {
        var msg = "";

        msg += "type ";
        msg += _.formatter.shouldBeButGot(OscillatorType, newValue);

        throw new TypeError(_.formatter.concat(this, msg));
      }
    },
    enumerable: true
  });
  _.defineAttribute(this, "frequency", "readonly", frequency, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "detune", "readonly", detune, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "onended", "function|null", onended, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });

  Object.defineProperties(this, {
    $state: {
      get: function() {
        return this.$stateAtTime(this.context.currentTime);
      }
    },
    $custom: {
      get: function() {
        return this._custom;
      }
    }
  });

  this._type = type;
  this._custom = null;
  this._startTime = Infinity;
  this._stopTime  = Infinity;
  this._firedOnEnded = false;
}
_.inherits(OscillatorNode, OscillatorNodeConstructor);

OscillatorNode.exports = OscillatorNodeConstructor;
OscillatorNode.jsonAttrs = [ "type", "frequency", "detune" ];

OscillatorNodeConstructor.prototype.start = function(when) {
  var inspector = new Inspector(this, "start", [
    { name: "when", type: "optional number" },
  ]);

  inspector.validateArguments(arguments, function(msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });
  inspector.assert(this._startTime === Infinity, function() {
    throw new Error(inspector.form + "; cannot start more than once");
  });

  this._startTime = _.defaults(when, 0);
};

OscillatorNodeConstructor.prototype.stop = function(when) {
  var inspector = new Inspector(this, "stop", [
    { name: "when", type: "optional number" },
  ]);

  inspector.validateArguments(arguments, function(msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });
  inspector.assert(this._startTime !== Infinity, function() {
    throw new Error(inspector.form + "; cannot call stop without calling start first");
  });
  inspector.assert(this._stopTime === Infinity, function() {
    throw new Error(inspector.form + "; cannot stop more than once");
  });

  this._stopTime = _.defaults(when, 0);
};

OscillatorNodeConstructor.prototype.setPeriodicWave = function(periodicWave) {
  var inspector = new Inspector(this, "setPeriodicWave", [
    { name: "periodicWave", type: "PeriodicWave" },
  ]);

  inspector.validateArguments(arguments, function(msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });

  this._type = "custom";
  this._custom = periodicWave;
};

OscillatorNode.prototype.$stateAtTime = function(time) {
  time = _.toSeconds(time);

  if (this._startTime === Infinity) {
    return "UNSCHEDULED";
  }
  if (time < this._startTime) {
    return "SCHEDULED";
  }
  if (time < this._stopTime) {
    return "PLAYING";
  }

  return "FINISHED";
};

OscillatorNode.prototype._process = function() {
  if (!this._firedOnEnded && this.$stateAtTime(this.context.currentTime) === "FINISHED") {
    this.dispatchEvent(new Event("ended", this));
    this._firedOnEnded = true;
  }
};

module.exports = WebAudioTestAPI.OscillatorNode = OscillatorNode;

},{"./AudioNode":7,"./AudioParam":8,"./Event":17,"./WebAudioTestAPI":34,"./utils":41,"./utils/Inspector":35}],29:[function(require,module,exports){
"use strict";

var _ = require("./utils");
var Inspector = require("./utils/Inspector");
var WebAudioTestAPI = require("./WebAudioTestAPI");
var AudioNode = require("./AudioNode");

var PanningModelType = "enum { equalpower, HRTF }";
var DistanceModelType = "enum { linear, inverse, exponential }";

var PannerNodeConstructor = function PannerNode() {
  throw new TypeError("Illegal constructor: use audioContext.createPanner()");
};
_.inherits(PannerNodeConstructor, AudioNode);

function PannerNode(context) {
  AudioNode.call(this, context, {
    name: "PannerNode",
    numberOfInputs  : 1,
    numberOfOutputs : 1,
    channelCount    : 2,
    channelCountMode: "clamped-max",
    channelInterpretation: "speakers"
  });

  var panningModel = "HRTF";
  var distanceModel = "inverse";
  var refDistance = 1;
  var maxDistance = 10000;
  var rolloffFactor = 1;
  var coneInnerAngle = 360;
  var coneOuterAngle = 360;
  var coneOuterGain = 0;

  _.defineAttribute(this, "panningModel", PanningModelType, panningModel, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "distanceModel", DistanceModelType, distanceModel, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "refDistance", "number", refDistance, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "maxDistance", "number", maxDistance, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "rolloffFactor", "number", rolloffFactor, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "coneInnerAngle", "number", coneInnerAngle, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "coneOuterAngle", "number", coneOuterAngle, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "coneOuterGain", "number", coneOuterGain, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
}
_.inherits(PannerNode, PannerNodeConstructor);

PannerNode.exports = PannerNodeConstructor;
PannerNode.jsonAttrs = [
  "panningModel", "distanceModel", "refDistance", "maxDistance",
  "rolloffFactor", "coneInnerAngle", "coneOuterAngle", "coneOuterGain"
];

PannerNodeConstructor.prototype.setPosition = function() {
  var inspector = new Inspector(this, "setPosition", [
    { name: "x", type: "number" },
    { name: "y", type: "number" },
    { name: "z", type: "number" },
  ]);

  inspector.validateArguments(arguments, function(msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });
};

PannerNodeConstructor.prototype.setOrientation = function() {
  var inspector = new Inspector(this, "setOrientation", [
    { name: "x", type: "number" },
    { name: "y", type: "number" },
    { name: "z", type: "number" },
  ]);

  inspector.validateArguments(arguments, function(msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });
};

PannerNodeConstructor.prototype.setVelocity = function() {
  var inspector = new Inspector(this, "setVelocity", [
    { name: "x", type: "number" },
    { name: "y", type: "number" },
    { name: "z", type: "number" },
  ]);

  inspector.validateArguments(arguments, function(msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });
};

module.exports = WebAudioTestAPI.PannerNode = PannerNode;

},{"./AudioNode":7,"./WebAudioTestAPI":34,"./utils":41,"./utils/Inspector":35}],30:[function(require,module,exports){
"use strict";

var _ = require("./utils");
var WebAudioTestAPI = require("./WebAudioTestAPI");

var PeriodicWaveConstructor = function PeriodicWave() {
  throw new TypeError("Illegal constructor");
};

function PeriodicWave(real, imag) {
  Object.defineProperties(this, {
    $name: { value: "PeriodicWave" },
    $real: { value: real },
    $imag: { value: imag },
  });
}
_.inherits(PeriodicWave, PeriodicWaveConstructor);

PeriodicWave.exports = PeriodicWaveConstructor;

module.exports = WebAudioTestAPI.PeriodicWave = PeriodicWave;

},{"./WebAudioTestAPI":34,"./utils":41}],31:[function(require,module,exports){
"use strict";

var _ = require("./utils");
var WebAudioTestAPI = require("./WebAudioTestAPI");
var AudioNode = require("./AudioNode");
var AudioBuffer = require("./AudioBuffer");
var AudioProcessingEvent = require("./AudioProcessingEvent");

var ScriptProcessorNodeConstructor = function ScriptProcessorNode() {
  throw new TypeError("Illegal constructor: use audioContext.createScriptProcessor(bufferSize: number, [numberOfInputChannels: number], [numberOfOutputChannels: number])");
};
_.inherits(ScriptProcessorNodeConstructor, AudioNode);

function ScriptProcessorNode(context, bufferSize, numberOfInputChannels, numberOfOutputChannels) {
  AudioNode.call(this, context, {
    name: "ScriptProcessorNode",
    numberOfInputs  : 1,
    numberOfOutputs : 1,
    channelCount    : numberOfInputChannels,
    channelCountMode: "max",
    channelInterpretation: "speakers"
  });

  var onaudioprocess = null;

  _.defineAttribute(this, "numberOfInputChannels", "readonly", numberOfInputChannels, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "numberOfOutputChannels", "readonly", numberOfOutputChannels, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "bufferSize", "readonly", bufferSize, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "onaudioprocess", "function|null", onaudioprocess, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });

  this._numSamples = 0;
}
_.inherits(ScriptProcessorNode, ScriptProcessorNodeConstructor);

ScriptProcessorNode.exports = ScriptProcessorNodeConstructor;

ScriptProcessorNode.prototype._process = function(inNumSamples) {
  this._numSamples -= inNumSamples;

  if (this._numSamples <= 0) {
    this._numSamples += this.bufferSize;

    var event = new AudioProcessingEvent(this);

    event.playbackTime = this.context.currentTime + this.bufferSize / this.context.sampleRate;
    event.inputBuffer = new AudioBuffer(this.context, this.numberOfInputChannels, this.bufferSize, this.context.sampleRate);
    event.outputBuffer = new AudioBuffer(this.context, this.numberOfOutputChannels, this.bufferSize, this.context.sampleRate);

    this.dispatchEvent(event);
  }
};

module.exports = WebAudioTestAPI.ScriptProcessorNode = ScriptProcessorNode;

},{"./AudioBuffer":2,"./AudioNode":7,"./AudioProcessingEvent":9,"./WebAudioTestAPI":34,"./utils":41}],32:[function(require,module,exports){
"use strict";

var _ = require("./utils");
var WebAudioTestAPI = require("./WebAudioTestAPI");
var AudioNode = require("./AudioNode");

var OverSampleType = "enum { none, 2x, 4x }";

var WaveShaperNodeConstructor = function WaveShaperNode() {
  throw new TypeError("Illegal constructor: use audioContext.createWaveShaper()");
};
_.inherits(WaveShaperNodeConstructor, AudioNode);

function WaveShaperNode(context) {
  AudioNode.call(this, context, {
    name: "WaveShaperNode",
    numberOfInputs  : 1,
    numberOfOutputs : 1,
    channelCount    : 2,
    channelCountMode: "max",
    channelInterpretation: "speakers"
  });

  var curve = null;
  var oversample = "none";

  _.defineAttribute(this, "curve", "Float32Array|null", curve, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "oversample", OverSampleType, oversample, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
}
_.inherits(WaveShaperNode, WaveShaperNodeConstructor);

WaveShaperNode.exports = WaveShaperNodeConstructor;
WaveShaperNode.jsonAttrs = [ "oversample" ];

module.exports = WebAudioTestAPI.WaveShaperNode = WaveShaperNode;

},{"./AudioNode":7,"./WebAudioTestAPI":34,"./utils":41}],33:[function(require,module,exports){
(function (global){
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],34:[function(require,module,exports){
(function (global){
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./WebAudioAPI":33}],35:[function(require,module,exports){
"use strict";

var argsCheck = require("./argsCheck");
var formatter = require("./formatter");
var nth = require("./nth");

function Inspector(instance, methodName, argsInfo) {
  this.instance = instance;
  this.argsInfo = argsInfo;
  this.form = formatter.methodForm(instance, methodName, argsInfo);
}

Inspector.prototype.validateArguments = function(args, callback) {
  var errIndex = argsCheck(args, this.argsInfo.map(function(info) {
    return info.type;
  }));
  var msg = "";
  if (errIndex !== -1) {
    msg += "the " + nth(errIndex) + " argument ";
    msg += formatter.shouldBeButGot(this.argsInfo[errIndex].type, args[errIndex]);
    callback.call(this.instance, msg);
  }
  this.argsInfo.forEach(function(info, index) {
    var msg = info.validate && info.validate.call(this.instance, args[index], this.argsInfo[index].name);
    if (msg) {
      callback.call(this.instance, msg);
    }
  }, this);
};

Inspector.prototype.assert = function(test, callback) {
  if (!test) {
    callback.call(this.instance);
  }
};

module.exports = Inspector;

},{"./argsCheck":36,"./formatter":40,"./nth":44}],36:[function(require,module,exports){
"use strict";

var typeCheck = require("./typeCheck");

function argsCheck(args, types) {
  types = types.filter(function(type, index) {
    return !(/^optional/.test(type) && args.length <= index);
  });

  types = types.map(function(type) {
    return type.replace(/^optional\s*/, "");
  });

  for (var i = 0, imax = types.length; i < imax; i++) {
    if (!typeCheck(args[i], types[i])) {
      return i;
    }
  }

  return -1;
}

module.exports = argsCheck;

},{"./typeCheck":49}],37:[function(require,module,exports){
"use strict";

function article(str) {
  return (/[aeiou]/i.test(str.charAt(0)) ? "an" : "a");
}

module.exports = article;

},{}],38:[function(require,module,exports){
"use strict";

function defaults(value, defaultValue) {
  return typeof value !== "undefined" ? value : defaultValue;
}

module.exports = defaults;

},{}],39:[function(require,module,exports){
"use strict";

var typeCheck = require("./typeCheck");
var formatter = require("./formatter");

function defineAttribute(instance, name, type, value, callback) {
  var spec = { enumerable: true };

  if (typeof value === "function") {
    type = "readonly";
    spec.get = value;
  } else {
    spec.get = function() {
      return value;
    };
  }

  if (type === "readonly") {
    spec.set = function() {
      callback.call(instance, name + " is readonly");
    };
  } else {
    spec.set = function(newValue) {
      if (!typeCheck(newValue, type)) {
        callback.call(instance, name + " " + formatter.shouldBeButGot(type, newValue));
      } else {
        value = newValue;
      }
    };
  }

  Object.defineProperty(instance, name, spec);
}

module.exports = defineAttribute;

},{"./formatter":40,"./typeCheck":49}],40:[function(require,module,exports){
"use strict";

var article = require("../utils/article");
var pp = require("../utils/pp");

function methodForm(instance, methodName, argsInfo) {
  var msg = "";

  if (instance) {
    msg += instance.constructor.name;
    if (methodName) {
      msg += "#" + methodName;
    }
  } else {
    msg += methodName;
  }
  msg += "(";
  msg += argsInfo.map(function(info) {
    return info.name + ": " + info.type;
  }).join(", ");
  msg += ")";

  return msg;
}

function shouldBeButGot(type, value) {
  var msg = "";

  type = type.replace(/^optional\s*/, "").trim();

  msg += "should be " + article(type) + " " + type + ", ";
  msg += "but got: " + pp(value);

  return msg;
}

function concat(instance, msg) {
  return instance.constructor.name + "#" + msg;
}

module.exports = {
  methodForm: methodForm,
  shouldBeButGot: shouldBeButGot,
  concat: concat
};

},{"../utils/article":37,"../utils/pp":45}],41:[function(require,module,exports){
"use strict";

var _ = {};

_.NOP = /* istanbul ignore next */ function() {};

_.inherits = require("./inherits");

_.defaults = require("./defaults");

_.article = require("./article");

_.name = require("./name");

_.toJSON = require("./toJSON");

_.toMicroseconds = require("./toMicroseconds");

_.toSeconds = require("./toSeconds");

_.typeCheck = require("./typeCheck");

_.formatter = require("./formatter");

_.defineAttribute = require("./defineAttribute");

module.exports = _;

},{"./article":37,"./defaults":38,"./defineAttribute":39,"./formatter":40,"./inherits":42,"./name":43,"./toJSON":46,"./toMicroseconds":47,"./toSeconds":48,"./typeCheck":49}],42:[function(require,module,exports){
"use strict";

function inherits(ctor, superCtor) {
  if (superCtor) {
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: { value: ctor, enumerable: false, writable: true, configurable: true }
    });
  }
}

module.exports = inherits;

},{}],43:[function(require,module,exports){
"use strict";

function name(obj) {
  if (obj.hasOwnProperty("$id")) {
    return obj.$name + "#" + obj.$id;
  }
  return obj.$name;
}

module.exports = name;

},{}],44:[function(require,module,exports){
"use strict";

function nth(index) {
  index = index + 1;
  return { 1: "1st", 2: "2nd", 3: "3rd" }[index] || (index + "th");
}

module.exports = nth;

},{}],45:[function(require,module,exports){
"use strict";

var article = require("./article");

function pp(value) {
  if (!value) {
    return String(value);
  }
  var type = typeof value;

  if (type === "number" || type === "boolean") {
    return String(value);
  }

  if (type === "string") {
    return "'" + value + "'";
  }

  if (Array.isArray(value)) {
    return "[ " + value.map(pp).join(", ") + " ]";
  }

  if (value.constructor === {}.constructor) {
    return "{ " + Object.keys(value).map(function(key) {
      return key + ": " + pp(value[key]);
    }).join(", ") + "}";
  }

  var name = value.constructor.name || Object.prototype.toString.call(value).slice(8, -1);

  return article(name) + " " + name;
}

module.exports = pp;

},{"./article":37}],46:[function(require,module,exports){
"use strict";

var name = require("./name");

function toJSON(node, func, memo) {
  var result;

  memo = memo || [];

  if (memo.indexOf(node) !== -1) {
    return "<circular:" + name(node) + ">";
  }
  memo.push(node);

  result = func(node, memo);

  memo.pop();

  return result;
}

module.exports = toJSON;

},{"./name":43}],47:[function(require,module,exports){
"use strict";

var MIN_VALUE = 0;
var MAX_VALUE = 24 * 60 * 60 * 1000 * 1000;

function toMicroseconds(time) {
  var value = 0;

  if (typeof time === "number") {
    // seconds -> microseconds
    value = Math.floor(time * 1000 * 1000) || 0;
    return Math.max(MIN_VALUE, Math.min(value, MAX_VALUE));
  }

  var matches = /^([0-5]\d):([0-5]\d)\.(\d\d\d)$/.exec(time);
  if (matches) {
    value += +matches[1]; // minutes
    value *= 60;
    value += +matches[2]; // seconds
    value *= 1000;
    value += +matches[3];  // milliseconds
    value *= 1000;
    return Math.max(MIN_VALUE, Math.min(value, MAX_VALUE));
  }

  return value;
}

module.exports = toMicroseconds;

},{}],48:[function(require,module,exports){
"use strict";

var toMicroseconds = require("./toMicroseconds");

function toSeconds(time) {
  return toMicroseconds(time) / (1000 * 1000);
}

module.exports = toSeconds;

},{"./toMicroseconds":47}],49:[function(require,module,exports){
(function (global){
"use strict";

function typeCheck(value, type) {
  switch (type) {
  case "boolean":
    return typeof value === "boolean";
  case "function":
    return typeof value === "function";
  case "number":
    return typeof value === "number" && !isNaN(value);
  case "string":
    return typeof value === "string";
  case "null":
    return value === null;
  }

  if (/[A-Z]/.test(type.charAt(0)) && typeof global[type] === "function") {
    return value instanceof global[type];
  }

  var matches = /^enum\s*{(.*?)}$/.exec(type);
  if (matches) {
    return enumCheck(value, matches[1].split(",").map(function(item) {
      return item.trim();
    }));
  }

  return false;
}

function enumCheck(value, items) {
  return items.some(function(item) {
    if (/^\d+$/.test(item)) {
      return value === +item;
    }
    return value === item;
  });
}

module.exports = function(value, type) {
  return type.split("|").some(function(type) {
    return typeCheck(value, type.trim());
  });
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],50:[function(require,module,exports){
(function (global){
"use strict";

/* istanbul ignore else */
if (!global.WEB_AUDIO_TEST_API_IGNORE) {
  require("./AudioContext");
  require("./OfflineAudioContext");

  var WebAudioTestAPI = require("./WebAudioTestAPI");

  WebAudioTestAPI.use();

  module.exports = global.WebAudioTestAPI = WebAudioTestAPI;
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./AudioContext":4,"./OfflineAudioContext":27,"./WebAudioTestAPI":34}]},{},[50]);
