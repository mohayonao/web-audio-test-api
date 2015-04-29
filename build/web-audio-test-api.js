(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _import = require("./utils");

var _import2 = _interopRequireDefault(_import);

var _Inspector = require("./utils/Inspector");

var _Inspector2 = _interopRequireDefault(_Inspector);

var _WebAudioTestAPI = require("./WebAudioTestAPI");

var _WebAudioTestAPI2 = _interopRequireDefault(_WebAudioTestAPI);

var _AudioNode = require("./AudioNode");

var _AudioNode2 = _interopRequireDefault(_AudioNode);

var FFTSize = "enum { 32, 64, 128, 256, 512, 1024, 2048 }";

var AnalyserNodeConstructor = function AnalyserNode() {
  throw new TypeError("Illegal constructor: use audioContext.createAnalyser()");
};
_import2["default"].inherits(AnalyserNodeConstructor, _AudioNode2["default"]);

function AnalyserNode(context) {
  _AudioNode2["default"].call(this, context, {
    name: "AnalyserNode",
    numberOfInputs: 1,
    numberOfOutputs: 1,
    channelCount: 1,
    channelCountMode: "explicit",
    channelInterpretation: "speakers" });

  var fftSize = 2048;
  var frequencyBinCount = function frequencyBinCount() {
    return this.fftSize >> 1;
  };
  var minDecibels = -100;
  var maxDecibels = 30;
  var smoothingTimeConstant = 0.8;

  _import2["default"].defineAttribute(this, "fftSize", FFTSize, fftSize, function (msg) {
    throw new TypeError(_import2["default"].formatter.concat(this, msg));
  });
  _import2["default"].defineAttribute(this, "frequencyBinCount", "readonly", frequencyBinCount, function (msg) {
    throw new TypeError(_import2["default"].formatter.concat(this, msg));
  });
  _import2["default"].defineAttribute(this, "minDecibels", "number", minDecibels, function (msg) {
    throw new TypeError(_import2["default"].formatter.concat(this, msg));
  });
  _import2["default"].defineAttribute(this, "maxDecibels", "number", maxDecibels, function (msg) {
    throw new TypeError(_import2["default"].formatter.concat(this, msg));
  });
  _import2["default"].defineAttribute(this, "smoothingTimeConstant", "number", smoothingTimeConstant, function (msg) {
    throw new TypeError(_import2["default"].formatter.concat(this, msg));
  });
}
_import2["default"].inherits(AnalyserNode, AnalyserNodeConstructor);

AnalyserNode.exports = AnalyserNodeConstructor;
AnalyserNode.jsonAttrs = ["fftSize", "minDecibels", "maxDecibels", "smoothingTimeConstant"];

AnalyserNodeConstructor.prototype.getFloatFrequencyData = function () {
  var inspector = new _Inspector2["default"](this, "getFloatFrequencyData", [{ name: "array", type: "Float32Array" }]);

  inspector.validateArguments(arguments, function (msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });
};

AnalyserNodeConstructor.prototype.getByteFrequencyData = function () {
  var inspector = new _Inspector2["default"](this, "getByteFrequencyData", [{ name: "array", type: "Uint8Array" }]);

  inspector.validateArguments(arguments, function (msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });
};

AnalyserNodeConstructor.prototype.getByteTimeDomainData = function () {
  var inspector = new _Inspector2["default"](this, "getByteTimeDomainData", [{ name: "array", type: "Uint8Array" }]);

  inspector.validateArguments(arguments, function (msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });
};

module.exports = _WebAudioTestAPI2["default"].AnalyserNode = AnalyserNode;
},{"./AudioNode":7,"./WebAudioTestAPI":34,"./utils":41,"./utils/Inspector":35}],2:[function(require,module,exports){
"use strict";

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _import = require("./utils");

var _import2 = _interopRequireDefault(_import);

var _Inspector = require("./utils/Inspector");

var _Inspector2 = _interopRequireDefault(_Inspector);

var _WebAudioTestAPI = require("./WebAudioTestAPI");

var _WebAudioTestAPI2 = _interopRequireDefault(_WebAudioTestAPI);

var AudioBufferConstructor = function AudioBuffer() {
  throw new TypeError("Illegal constructor: use audioContext.createBuffer(numberOfChannels: number, length: number, sampleRate: number)");
};

function AudioBuffer(context, numberOfChannels, length, sampleRate) {
  _import2["default"].defineAttribute(this, "sampleRate", "readonly", sampleRate, function (msg) {
    throw new TypeError(_import2["default"].formatter.concat(this, msg));
  });
  _import2["default"].defineAttribute(this, "length", "readonly", length, function (msg) {
    throw new TypeError(_import2["default"].formatter.concat(this, msg));
  });
  _import2["default"].defineAttribute(this, "duration", "readonly", length / sampleRate, function (msg) {
    throw new TypeError(_import2["default"].formatter.concat(this, msg));
  });
  _import2["default"].defineAttribute(this, "numberOfChannels", "readonly", numberOfChannels, function (msg) {
    throw new TypeError(_import2["default"].formatter.concat(this, msg));
  });

  Object.defineProperties(this, {
    $name: { value: "AudioBuffer" },
    $context: { value: context } });

  this._data = new Array(numberOfChannels);
  for (var i = 0; i < numberOfChannels; i++) {
    this._data[i] = new Float32Array(length);
  }
}
_import2["default"].inherits(AudioBuffer, AudioBufferConstructor);

AudioBuffer.exports = AudioBufferConstructor;

AudioBufferConstructor.prototype.getChannelData = function (channel) {
  var inspector = new _Inspector2["default"](this, "getChannelData", [{ name: "channel", type: "number" }]);
  inspector.validateArguments(arguments, function (msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });
  inspector.assert(0 <= channel && channel < this._data.length, function () {
    throw new TypeError(inspector.form + "; channel index (" + channel + ") exceeds number of channels (#{" + this._data.length + "})");
  });
  return this._data[channel];
};

AudioBuffer.prototype.toJSON = function () {
  var json = {
    name: this.$name,
    sampleRate: this.sampleRate,
    length: this.length,
    duration: this.duration,
    numberOfChannels: this.numberOfChannels };

  if (this.$context.VERBOSE_JSON) {
    json.data = this._data.map(function (data) {
      return Array.prototype.slice.call(data);
    });
  }

  return json;
};

module.exports = _WebAudioTestAPI2["default"].AudioBuffer = AudioBuffer;
},{"./WebAudioTestAPI":34,"./utils":41,"./utils/Inspector":35}],3:[function(require,module,exports){
"use strict";

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _import = require("./utils");

var _import2 = _interopRequireDefault(_import);

var _Inspector = require("./utils/Inspector");

var _Inspector2 = _interopRequireDefault(_Inspector);

var _WebAudioTestAPI = require("./WebAudioTestAPI");

var _WebAudioTestAPI2 = _interopRequireDefault(_WebAudioTestAPI);

var _AudioNode = require("./AudioNode");

var _AudioNode2 = _interopRequireDefault(_AudioNode);

var _AudioParam = require("./AudioParam");

var _AudioParam2 = _interopRequireDefault(_AudioParam);

var _Event = require("./Event");

var _Event2 = _interopRequireDefault(_Event);

var AudioBufferSourceNodeConstructor = function AudioBufferSourceNode() {
  throw new TypeError("Illegal constructor: use audioContext.createBufferSource()");
};
_import2["default"].inherits(AudioBufferSourceNodeConstructor, _AudioNode2["default"]);

function AudioBufferSourceNode(context) {
  _AudioNode2["default"].call(this, context, {
    name: "AudioBufferSourceNode",
    numberOfInputs: 0,
    numberOfOutputs: 1,
    channelCount: 2,
    channelCountMode: "max",
    channelInterpretation: "speakers" });

  var buffer = null;
  var playbackRate = new _AudioParam2["default"](this, "playbackRate", 1, 0, 1024);
  var loop = false;
  var loopStart = 0;
  var loopEnd = 0;
  var onended = null;

  _import2["default"].defineAttribute(this, "buffer", "AudioBuffer|null", buffer, function (msg) {
    throw new TypeError(_import2["default"].formatter.concat(this, msg));
  });
  _import2["default"].defineAttribute(this, "playbackRate", "readonly", playbackRate, function (msg) {
    throw new TypeError(_import2["default"].formatter.concat(this, msg));
  });
  _import2["default"].defineAttribute(this, "loop", "boolean", loop, function (msg) {
    throw new TypeError(_import2["default"].formatter.concat(this, msg));
  });
  _import2["default"].defineAttribute(this, "loopStart", "number", loopStart, function (msg) {
    throw new TypeError(_import2["default"].formatter.concat(this, msg));
  });
  _import2["default"].defineAttribute(this, "loopEnd", "number", loopEnd, function (msg) {
    throw new TypeError(_import2["default"].formatter.concat(this, msg));
  });
  _import2["default"].defineAttribute(this, "onended", "function|null", onended, function (msg) {
    throw new TypeError(_import2["default"].formatter.concat(this, msg));
  });

  Object.defineProperties(this, {
    $state: {
      get: function get() {
        return this.$stateAtTime(this.context.currentTime);
      } } });

  this._startTime = Infinity;
  this._stopTime = Infinity;
  this._firedOnEnded = false;
}
_import2["default"].inherits(AudioBufferSourceNode, AudioBufferSourceNodeConstructor);

AudioBufferSourceNode.exports = AudioBufferSourceNodeConstructor;
AudioBufferSourceNode.jsonAttrs = ["buffer", "playbackRate", "loop", "loopStart", "loopEnd"];

AudioBufferSourceNodeConstructor.prototype.start = function (when) {
  var inspector = new _Inspector2["default"](this, "start", [{ name: "when", type: "optional number" }, { name: "offset", type: "optional number" }, { name: "duration", type: "optional number" }]);

  inspector.validateArguments(arguments, function (msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });
  inspector.assert(this._startTime === Infinity, function () {
    throw new Error(inspector.form + "; cannot start more than once");
  });

  this._startTime = _import2["default"].defaults(when, 0);
};

AudioBufferSourceNodeConstructor.prototype.stop = function (when) {
  var inspector = new _Inspector2["default"](this, "stop", [{ name: "when", type: "optional number" }]);

  inspector.validateArguments(arguments, function (msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });
  inspector.assert(this._startTime !== Infinity, function () {
    throw new Error(inspector.form + "; cannot call stop without calling start first");
  });
  inspector.assert(this._stopTime === Infinity, function () {
    throw new Error(inspector.form + "; cannot stop more than once");
  });

  this._stopTime = when;
};

AudioBufferSourceNode.prototype.$stateAtTime = function (time) {
  time = _import2["default"].toSeconds(time);

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

AudioBufferSourceNode.prototype._process = function () {
  if (!this._firedOnEnded && this.$stateAtTime(this.context.currentTime) === "FINISHED") {
    this.dispatchEvent(new _Event2["default"]("ended", this));
    this._firedOnEnded = true;
  }
};

module.exports = _WebAudioTestAPI2["default"].AudioBufferSourceNode = AudioBufferSourceNode;
},{"./AudioNode":7,"./AudioParam":8,"./Event":17,"./WebAudioTestAPI":34,"./utils":41,"./utils/Inspector":35}],4:[function(require,module,exports){
"use strict";

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _import = require("./utils");

var _import2 = _interopRequireDefault(_import);

var _Inspector = require("./utils/Inspector");

var _Inspector2 = _interopRequireDefault(_Inspector);

var _WebAudioTestAPI = require("./WebAudioTestAPI");

var _WebAudioTestAPI2 = _interopRequireDefault(_WebAudioTestAPI);

var _AudioDestinationNode = require("./AudioDestinationNode");

var _AudioDestinationNode2 = _interopRequireDefault(_AudioDestinationNode);

var _AudioListener = require("./AudioListener");

var _AudioListener2 = _interopRequireDefault(_AudioListener);

var _AudioBuffer = require("./AudioBuffer");

var _AudioBuffer2 = _interopRequireDefault(_AudioBuffer);

var _AudioBufferSourceNode = require("./AudioBufferSourceNode");

var _AudioBufferSourceNode2 = _interopRequireDefault(_AudioBufferSourceNode);

var _MediaElementAudioSourceNode = require("./MediaElementAudioSourceNode");

var _MediaElementAudioSourceNode2 = _interopRequireDefault(_MediaElementAudioSourceNode);

var _MediaStreamAudioSourceNode = require("./MediaStreamAudioSourceNode");

var _MediaStreamAudioSourceNode2 = _interopRequireDefault(_MediaStreamAudioSourceNode);

var _MediaStreamAudioDestinationNode = require("./MediaStreamAudioDestinationNode");

var _MediaStreamAudioDestinationNode2 = _interopRequireDefault(_MediaStreamAudioDestinationNode);

var _ScriptProcessorNode = require("./ScriptProcessorNode");

var _ScriptProcessorNode2 = _interopRequireDefault(_ScriptProcessorNode);

var _AnalyserNode = require("./AnalyserNode");

var _AnalyserNode2 = _interopRequireDefault(_AnalyserNode);

var _GainNode = require("./GainNode");

var _GainNode2 = _interopRequireDefault(_GainNode);

var _DelayNode = require("./DelayNode");

var _DelayNode2 = _interopRequireDefault(_DelayNode);

var _BiquadFilterNode = require("./BiquadFilterNode");

var _BiquadFilterNode2 = _interopRequireDefault(_BiquadFilterNode);

var _WaveShaperNode = require("./WaveShaperNode");

var _WaveShaperNode2 = _interopRequireDefault(_WaveShaperNode);

var _PannerNode = require("./PannerNode");

var _PannerNode2 = _interopRequireDefault(_PannerNode);

var _ConvolverNode = require("./ConvolverNode");

var _ConvolverNode2 = _interopRequireDefault(_ConvolverNode);

var _ChannelSplitterNode = require("./ChannelSplitterNode");

var _ChannelSplitterNode2 = _interopRequireDefault(_ChannelSplitterNode);

var _ChannelMergerNode = require("./ChannelMergerNode");

var _ChannelMergerNode2 = _interopRequireDefault(_ChannelMergerNode);

var _DynamicsCompressorNode = require("./DynamicsCompressorNode");

var _DynamicsCompressorNode2 = _interopRequireDefault(_DynamicsCompressorNode);

var _OscillatorNode = require("./OscillatorNode");

var _OscillatorNode2 = _interopRequireDefault(_OscillatorNode);

var _PeriodicWave = require("./PeriodicWave");

var _PeriodicWave2 = _interopRequireDefault(_PeriodicWave);

var _EventTarget = require("./EventTarget");

var _EventTarget2 = _interopRequireDefault(_EventTarget);

require("./MediaStream");
require("./HTMLMediaElement");

function AudioContext() {
  if (!(this instanceof AudioContext)) {
    throw new TypeError("Failed to construct 'AudioContext': Please use the 'new' operator");
  }

  _EventTarget2["default"].call(this);

  var destination = new _AudioDestinationNode2["default"](this);
  var sampleRate = _WebAudioTestAPI2["default"].sampleRate;
  var currentTime = function currentTime() {
    return this._microCurrentTime / (1000 * 1000);
  };
  var listener = new _AudioListener2["default"](this);

  _import2["default"].defineAttribute(this, "destination", "readonly", destination, function (msg) {
    throw new TypeError(_import2["default"].formatter.concat(this, msg));
  });
  _import2["default"].defineAttribute(this, "sampleRate", "readonly", sampleRate, function (msg) {
    throw new TypeError(_import2["default"].formatter.concat(this, msg));
  });
  _import2["default"].defineAttribute(this, "currentTime", "readonly", currentTime, function (msg) {
    throw new TypeError(_import2["default"].formatter.concat(this, msg));
  });
  _import2["default"].defineAttribute(this, "listener", "readonly", listener, function (msg) {
    throw new TypeError(_import2["default"].formatter.concat(this, msg));
  });

  Object.defineProperties(this, {
    $name: { value: "AudioContext" },
    $context: { value: this } });

  this._microCurrentTime = 0;
  this._processedSamples = 0;
  this._tick = 0;
}
_import2["default"].inherits(AudioContext, _EventTarget2["default"]);

AudioContext.WEB_AUDIO_TEST_API_VERSION = _WebAudioTestAPI2["default"].VERSION;

AudioContext.prototype.createBuffer = function (numberOfChannels, length, sampleRate) {
  var inspector = new _Inspector2["default"](this, null, [{ name: "numberOfChannels", type: "number" }, { name: "length", type: "number" }, { name: "sampleRate", type: "number" }]);

  inspector.validateArguments(arguments, function (msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });

  return new _AudioBuffer2["default"](this, numberOfChannels, length, sampleRate);
};

AudioContext.prototype.decodeAudioData = function (audioData, successCallback, errorCallback) {
  var inspector = new _Inspector2["default"](this, "decodeAudioData", [{ name: "audioData", type: "ArrayBuffer" }, { name: "successCallback", type: "function" }, { name: "errorCallback", type: "optional function" }]);

  inspector.validateArguments(arguments, function (msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });

  successCallback = _import2["default"].defaults(successCallback, _import2["default"].NOP);
  errorCallback = _import2["default"].defaults(errorCallback, _import2["default"].NOP);

  var _this = this;
  setTimeout(function () {
    if (_this.DECODE_AUDIO_DATA_FAILED) {
      errorCallback();
    } else {
      successCallback(_this.DECODE_AUDIO_DATA_RESULT || new _AudioBuffer2["default"](_this, 2, 1024, _this.sampleRate));
    }
  }, 0);
};

AudioContext.prototype.createBufferSource = function () {
  return new _AudioBufferSourceNode2["default"](this);
};

AudioContext.prototype.createMediaElementSource = function (mediaElement) {
  var inspector = new _Inspector2["default"](this, "createMediaElementSource", [{ name: "mediaElement", type: "HTMLMediaElement" }]);

  inspector.validateArguments(arguments, function (msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });

  return new _MediaElementAudioSourceNode2["default"](this, mediaElement);
};

AudioContext.prototype.createMediaStreamSource = function (mediaStream) {
  var inspector = new _Inspector2["default"](this, "createMediaStreamSource", [{ name: "mediaStream", type: "MediaStream" }]);

  inspector.validateArguments(arguments, function (msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });

  return new _MediaStreamAudioSourceNode2["default"](this, mediaStream);
};

AudioContext.prototype.createMediaStreamDestination = function () {
  return new _MediaStreamAudioDestinationNode2["default"](this);
};

AudioContext.prototype.createScriptProcessor = function (bufferSize, numberOfInputChannels, numberOfOutputChannels) {
  var inspector = new _Inspector2["default"](this, "createScriptProcessor", [{ name: "bufferSize", type: /* optional */"enum { 256, 512, 1024, 2048, 4096, 8192, 16384 }" }, { name: "numberOfInputChannels", type: "optional number" }, { name: "numberOfOutputChannels", type: "optional number" }]);

  inspector.validateArguments(arguments, function (msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });

  bufferSize = _import2["default"].defaults(bufferSize, 0);
  numberOfInputChannels = _import2["default"].defaults(numberOfInputChannels, 2);
  numberOfOutputChannels = _import2["default"].defaults(numberOfOutputChannels, 2);

  return new _ScriptProcessorNode2["default"](this, bufferSize, numberOfInputChannels, numberOfOutputChannels);
};

AudioContext.prototype.createAnalyser = function () {
  return new _AnalyserNode2["default"](this);
};

AudioContext.prototype.createGain = function () {
  return new _GainNode2["default"](this);
};

AudioContext.prototype.createDelay = function (maxDelayTime) {
  var inspector = new _Inspector2["default"](this, "createDelay", [{ name: "maxDelayTime", type: "optional number" }]);

  inspector.validateArguments(arguments, function (msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });

  maxDelayTime = _import2["default"].defaults(maxDelayTime, 1);

  return new _DelayNode2["default"](this, maxDelayTime);
};

AudioContext.prototype.createBiquadFilter = function () {
  return new _BiquadFilterNode2["default"](this);
};

AudioContext.prototype.createWaveShaper = function () {
  return new _WaveShaperNode2["default"](this);
};

AudioContext.prototype.createPanner = function () {
  return new _PannerNode2["default"](this);
};

AudioContext.prototype.createConvolver = function () {
  return new _ConvolverNode2["default"](this);
};

AudioContext.prototype.createChannelSplitter = function (numberOfOutputs) {
  var inspector = new _Inspector2["default"](this, "createChannelSplitter", [{ name: "numberOfOutputs", type: "optional number" }]);

  inspector.validateArguments(arguments, function (msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });

  numberOfOutputs = _import2["default"].defaults(numberOfOutputs, 6);

  return new _ChannelSplitterNode2["default"](this, numberOfOutputs);
};

AudioContext.prototype.createChannelMerger = function (numberOfInputs) {
  var inspector = new _Inspector2["default"](this, "createChannelMerger", [{ name: "numberOfInputs", type: "optional number" }]);

  inspector.validateArguments(arguments, function (msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });

  numberOfInputs = _import2["default"].defaults(numberOfInputs, 6);

  return new _ChannelMergerNode2["default"](this, numberOfInputs);
};

AudioContext.prototype.createDynamicsCompressor = function () {
  return new _DynamicsCompressorNode2["default"](this);
};

AudioContext.prototype.createOscillator = function () {
  return new _OscillatorNode2["default"](this);
};

AudioContext.prototype.createPeriodicWave = function (real, imag) {
  function over4096(value, name) {
    if (4096 < value.length) {
      return "length of " + name + " array (" + value.length + ") exceeds allow maximum of 4096";
    }
  }

  var inspector = new _Inspector2["default"](this, "createPeriodicWave", [{ name: "real", type: "Float32Array", validate: over4096 }, { name: "imag", type: "Float32Array", validate: over4096 }]);

  inspector.validateArguments(arguments, function (msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });
  inspector.assert(real.length === imag.length, function () {
    throw new TypeError(inspector.form + "; length of real array (" + real.length + ") and length of imaginary array (" + imag.length + ") must match");
  });

  return new _PeriodicWave2["default"](real, imag);
};

AudioContext.prototype.toJSON = function () {
  return this.destination.toJSON([]);
};

AudioContext.prototype.$process = function (time) {
  this._process(_import2["default"].toMicroseconds(time));
};

AudioContext.prototype.$processTo = function (time) {
  time = _import2["default"].toMicroseconds(time);
  if (this._microCurrentTime < time) {
    this._process(time - this._microCurrentTime);
  }
};

AudioContext.prototype.$reset = function () {
  this._microCurrentTime = 0;
  this._processedSamples = 0;
  this.destination.$inputs.forEach(function (node) {
    node.disconnect();
  });
};

AudioContext.prototype._process = function (microseconds) {
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

module.exports = _WebAudioTestAPI2["default"].AudioContext = AudioContext;
},{"./AnalyserNode":1,"./AudioBuffer":2,"./AudioBufferSourceNode":3,"./AudioDestinationNode":5,"./AudioListener":6,"./BiquadFilterNode":10,"./ChannelMergerNode":11,"./ChannelSplitterNode":12,"./ConvolverNode":13,"./DelayNode":14,"./DynamicsCompressorNode":15,"./EventTarget":18,"./GainNode":19,"./HTMLMediaElement":21,"./MediaElementAudioSourceNode":22,"./MediaStream":23,"./MediaStreamAudioDestinationNode":24,"./MediaStreamAudioSourceNode":25,"./OscillatorNode":28,"./PannerNode":29,"./PeriodicWave":30,"./ScriptProcessorNode":31,"./WaveShaperNode":32,"./WebAudioTestAPI":34,"./utils":41,"./utils/Inspector":35}],5:[function(require,module,exports){
"use strict";

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _import = require("./utils");

var _import2 = _interopRequireDefault(_import);

var _AudioNode = require("./AudioNode");

var _AudioNode2 = _interopRequireDefault(_AudioNode);

var _WebAudioTestAPI = require("./WebAudioTestAPI");

var _WebAudioTestAPI2 = _interopRequireDefault(_WebAudioTestAPI);

var AudioDestinationNodeConstructor = function AudioDestinationNode() {
  throw new TypeError("Illegal constructor");
};
_import2["default"].inherits(AudioDestinationNodeConstructor, _AudioNode2["default"]);

function AudioDestinationNode(context) {
  _AudioNode2["default"].call(this, context, {
    name: "AudioDestinationNode",
    numberOfInputs: 1,
    numberOfOutputs: 0,
    channelCount: 2,
    channelCountMode: "explicit",
    channelInterpretation: "speakers" });

  var maxChannelCount = 2;

  _import2["default"].defineAttribute(this, "maxChannelCount", "readonly", maxChannelCount, function (msg) {
    throw new TypeError(_import2["default"].formatter.concat(this, msg));
  });
}
_import2["default"].inherits(AudioDestinationNode, AudioDestinationNodeConstructor);

AudioDestinationNode.exports = AudioDestinationNodeConstructor;

module.exports = _WebAudioTestAPI2["default"].AudioDestinationNode = AudioDestinationNode;
},{"./AudioNode":7,"./WebAudioTestAPI":34,"./utils":41}],6:[function(require,module,exports){
"use strict";

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _import = require("./utils");

var _import2 = _interopRequireDefault(_import);

var _Inspector = require("./utils/Inspector");

var _Inspector2 = _interopRequireDefault(_Inspector);

var _WebAudioTestAPI = require("./WebAudioTestAPI");

var _WebAudioTestAPI2 = _interopRequireDefault(_WebAudioTestAPI);

var AudioListenerConstructor = function AudioListener() {
  throw new TypeError("Illegal constructor");
};

function AudioListener(context) {
  var dopplerFactor = 1;
  var speedOfSound = 343.3;

  _import2["default"].defineAttribute(this, "dopplerFactor", "number", dopplerFactor, function (msg) {
    throw new TypeError(_import2["default"].formatter.concat(this, msg));
  });
  _import2["default"].defineAttribute(this, "speedOfSound", "number", speedOfSound, function (msg) {
    throw new TypeError(_import2["default"].formatter.concat(this, msg));
  });

  Object.defineProperties(this, {
    $name: { value: "AudioListener" },
    $context: { value: context } });
}
_import2["default"].inherits(AudioListener, AudioListenerConstructor);

AudioListener.exports = AudioListenerConstructor;

AudioListenerConstructor.prototype.setPosition = function () {
  var inspector = new _Inspector2["default"](this, "setPosition", [{ name: "x", type: "number" }, { name: "y", type: "number" }, { name: "z", type: "number" }]);

  inspector.validateArguments(arguments, function (msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });
};

AudioListenerConstructor.prototype.setOrientation = function () {
  var inspector = new _Inspector2["default"](this, "setOrientation", [{ name: "x", type: "number" }, { name: "y", type: "number" }, { name: "z", type: "number" }, { name: "xUp", type: "number" }, { name: "yUp", type: "number" }, { name: "zUp", type: "number" }]);

  inspector.validateArguments(arguments, function (msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });
};

AudioListenerConstructor.prototype.setVelocity = function () {
  var inspector = new _Inspector2["default"](this, "setVelocity", [{ name: "x", type: "number" }, { name: "y", type: "number" }, { name: "z", type: "number" }]);

  inspector.validateArguments(arguments, function (msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });
};

module.exports = _WebAudioTestAPI2["default"].AudioListener = AudioListener;
},{"./WebAudioTestAPI":34,"./utils":41,"./utils/Inspector":35}],7:[function(require,module,exports){
"use strict";

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _import = require("./utils");

var _import2 = _interopRequireDefault(_import);

var _Inspector = require("./utils/Inspector");

var _Inspector2 = _interopRequireDefault(_Inspector);

var _WebAudioTestAPI = require("./WebAudioTestAPI");

var _WebAudioTestAPI2 = _interopRequireDefault(_WebAudioTestAPI);

var _AudioParam = require("./AudioParam");

var _AudioParam2 = _interopRequireDefault(_AudioParam);

var _EventTarget = require("./EventTarget");

var _EventTarget2 = _interopRequireDefault(_EventTarget);

var ChannelCountMode = "enum { max, clamped-max, explicit }";
var ChannelInterpretation = "enum { speakers, discrete }";

var AudioNodeConstructor = function AudioNode() {
  throw new TypeError("Illegal constructor");
};
_import2["default"].inherits(AudioNodeConstructor, _EventTarget2["default"]);

function AudioNode(context, spec) {
  spec = spec || {};

  _EventTarget2["default"].call(this);

  var numberOfInputs = _import2["default"].defaults(spec.numberOfInputs, 1);
  var numberOfOutputs = _import2["default"].defaults(spec.numberOfOutputs, 1);
  var channelCount = _import2["default"].defaults(spec.channelCount, 2);
  var channelCountMode = _import2["default"].defaults(spec.channelCountMode, "max");
  var channelInterpretation = _import2["default"].defaults(spec.channelInterpretation, "speakers");

  _import2["default"].defineAttribute(this, "context", "readonly", context, function (msg) {
    throw new TypeError(_import2["default"].formatter.concat(this, msg));
  });
  _import2["default"].defineAttribute(this, "numberOfInputs", "readonly", numberOfInputs, function (msg) {
    throw new TypeError(_import2["default"].formatter.concat(this, msg));
  });
  _import2["default"].defineAttribute(this, "numberOfOutputs", "readonly", numberOfOutputs, function (msg) {
    throw new TypeError(_import2["default"].formatter.concat(this, msg));
  });
  _import2["default"].defineAttribute(this, "channelCount", "number", channelCount, function (msg) {
    throw new TypeError(_import2["default"].formatter.concat(this, msg));
  });
  _import2["default"].defineAttribute(this, "channelCountMode", ChannelCountMode, channelCountMode, function (msg) {
    throw new TypeError(_import2["default"].formatter.concat(this, msg));
  });
  _import2["default"].defineAttribute(this, "channelInterpretation", ChannelInterpretation, channelInterpretation, function (msg) {
    throw new TypeError(_import2["default"].formatter.concat(this, msg));
  });

  Object.defineProperties(this, {
    $name: { value: _import2["default"].defaults(spec.name, "AudioNode") },
    $context: { value: context },
    $inputs: { value: [] } });
  this._outputs = [];
  this._tick = -1;
}
_import2["default"].inherits(AudioNode, AudioNodeConstructor);

AudioNode.exports = AudioNodeConstructor;

AudioNodeConstructor.prototype.connect = function (destination) {
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

  var inspector = new _Inspector2["default"](this, "connect", [{ name: "destination", type: "AudioNode | AudioParam", validate: sameContext }, { name: "output", type: "optional number", validate: checkNumberOfOutput }, { name: "input", type: "optional number", validate: checkNumberOfInput }]);

  inspector.validateArguments(arguments, function (msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });

  var index = this._outputs.indexOf(destination);
  /* istanbul ignore else */
  if (index === -1) {
    this._outputs.push(destination);
    destination.$inputs.push(this);
  }
};

AudioNodeConstructor.prototype.disconnect = function () {
  function checkNumberOfOutput(value, name) {
    if (value < 0 || this.numberOfOutputs <= value) {
      return name + " index (" + value + ") exceeds number of outputs (" + this.numberOfOutputs + ")";
    }
  }

  var inspector = new _Inspector2["default"](this, "connect", [{ name: "output", type: "optional number", validate: checkNumberOfOutput }]);

  inspector.validateArguments(arguments, function (msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });

  this._outputs.splice(0).forEach(function (dst) {
    var index = dst.$inputs.indexOf(this);
    /* istanbul ignore else */
    if (index !== -1) {
      dst.$inputs.splice(index, 1);
    }
  }, this);
};

AudioNode.prototype.toJSON = function (memo) {
  return _import2["default"].toJSON(this, function (node, memo) {
    var json = {};

    json.name = _import2["default"].name(node);

    (node.constructor.jsonAttrs || []).forEach(function (key) {
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

    json.inputs = node.$inputs.map(function (node) {
      return node.toJSON(memo);
    });

    return json;
  }, memo);
};

AudioNode.prototype.$process = function (inNumSamples, tick) {
  /* istanbul ignore else */
  if (this._tick !== tick) {
    this._tick = tick;
    this.$inputs.forEach(function (src) {
      src.$process(inNumSamples, tick);
    });
    Object.keys(this).forEach(function (key) {
      if (this[key] instanceof _AudioParam2["default"]) {
        this[key].$process(inNumSamples, tick);
      }
    }, this);
    if (this._process) {
      this._process(inNumSamples);
    }
  }
};

module.exports = _WebAudioTestAPI2["default"].AudioNode = AudioNode;
},{"./AudioParam":8,"./EventTarget":18,"./WebAudioTestAPI":34,"./utils":41,"./utils/Inspector":35}],8:[function(require,module,exports){
"use strict";

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _import = require("./utils");

var _import2 = _interopRequireDefault(_import);

var _Inspector = require("./utils/Inspector");

var _Inspector2 = _interopRequireDefault(_Inspector);

var _WebAudioTestAPI = require("./WebAudioTestAPI");

var _WebAudioTestAPI2 = _interopRequireDefault(_WebAudioTestAPI);

function insertEvent(_this, event) {
  var time = event.time;
  var events = _this.$events;
  var replace = 0;
  var i,
      imax = events.length;

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
  return 0 < v0 && 0 < v1 ? v0 * Math.pow(v1 / v0, dt) : /* istanbul ignore next */v;
}

function setTarget(v0, v1, t, t0, timeConstant) {
  return v1 + (v0 - v1) * Math.exp((t0 - t) / timeConstant);
}

function setCurveValue(v, t, t0, t1, curve) {
  var dt = (t - t0) / (t1 - t0);

  if (dt <= 0) {
    return _import2["default"].defaults(curve[0], v);
  }

  if (1 <= dt) {
    return _import2["default"].defaults(curve[curve.length - 1], v);
  }

  return _import2["default"].defaults(curve[curve.length * dt | 0], v);
}

var AudioParamConstructor = function AudioParam() {
  throw new TypeError("Illegal constructor");
};

function AudioParam(node, name, defaultValue, minValue, maxValue) {
  var context = node.context;

  _import2["default"].defineAttribute(this, "name", "readonly", name, function (msg) {
    throw new TypeError(_import2["default"].formatter.concat(this, msg));
  });
  _import2["default"].defineAttribute(this, "defaultValue", "readonly", defaultValue, function (msg) {
    throw new TypeError(_import2["default"].formatter.concat(this, msg));
  });
  _import2["default"].defineAttribute(this, "minValue", "readonly", minValue, function (msg) {
    throw new TypeError(_import2["default"].formatter.concat(this, msg));
  });
  _import2["default"].defineAttribute(this, "maxValue", "readonly", maxValue, function (msg) {
    throw new TypeError(_import2["default"].formatter.concat(this, msg));
  });
  Object.defineProperty(this, "value", {
    get: function get() {
      this._value = this.$valueAtTime(context.currentTime);
      return this._value;
    },
    set: function set(newValue) {
      if (_import2["default"].typeCheck(newValue, "number")) {
        this._value = newValue;
      } else {
        var msg = "";

        msg += "type ";
        msg += _import2["default"].formatter.shouldBeButGot("number", newValue);

        throw new TypeError(_import2["default"].formatter.concat(this, msg));
      }
    },
    enumerable: true });

  Object.defineProperties(this, {
    $name: { value: "AudioParam" },
    $context: { value: context },
    $node: { value: node },
    $inputs: { value: [] },
    $events: { value: [] } });

  this._value = this.defaultValue;
  this._tick = -1;
}
_import2["default"].inherits(AudioParam, AudioParamConstructor);

AudioParam.exports = AudioParamConstructor;

AudioParamConstructor.prototype.setValueAtTime = function (value, startTime) {
  var inspector = new _Inspector2["default"](this, "setValueTime", [{ name: "value", type: "number" }, { name: "startTime", type: "number" }]);

  inspector.validateArguments(arguments, function (msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });

  insertEvent(this, {
    type: "SetValue",
    value: value,
    time: startTime });
};

AudioParamConstructor.prototype.linearRampToValueAtTime = function (value, endTime) {
  var inspector = new _Inspector2["default"](this, "linearRampToValueAtTime", [{ name: "value", type: "number" }, { name: "endTime", type: "number" }]);

  inspector.validateArguments(arguments, function (msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });

  insertEvent(this, {
    type: "LinearRampToValue",
    value: value,
    time: endTime });
};

AudioParamConstructor.prototype.exponentialRampToValueAtTime = function (value, endTime) {
  var inspector = new _Inspector2["default"](this, "exponentialRampToValueAtTime", [{ name: "value", type: "number" }, { name: "endTime", type: "number" }]);

  inspector.validateArguments(arguments, function (msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });

  insertEvent(this, {
    type: "ExponentialRampToValue",
    value: value,
    time: endTime });
};

AudioParamConstructor.prototype.setTargetAtTime = function (target, startTime, timeConstant) {
  var inspector = new _Inspector2["default"](this, "setTargetAtTime", [{ name: "target", type: "number" }, { name: "startTime", type: "number" }, { name: "timeConstant", type: "number" }]);

  inspector.validateArguments(arguments, function (msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });

  insertEvent(this, {
    type: "SetTarget",
    value: target,
    time: startTime,
    timeConstant: timeConstant });
};

AudioParamConstructor.prototype.setValueCurveAtTime = function (values, startTime, duration) {
  var inspector = new _Inspector2["default"](this, "setValueCurveAtTime", [{ name: "values", type: "Float32Array" }, { name: "startTime", type: "number" }, { name: "duration", type: "number" }]);

  inspector.validateArguments(arguments, function (msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });

  insertEvent(this, {
    type: "SetValueCurve",
    time: startTime,
    duration: duration,
    curve: values });
};

AudioParamConstructor.prototype.cancelScheduledValues = function (startTime) {
  var inspector = new _Inspector2["default"](this, "cancelScheduledValues", [{ name: "startTime", type: "number" }]);

  inspector.validateArguments(arguments, function (msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });

  var events = this.$events;

  for (var i = 0, imax = events.length; i < imax; ++i) {
    if (events[i].time >= startTime) {
      return events.splice(i);
    }
  }
};

AudioParam.prototype.toJSON = function (memo) {
  return _import2["default"].toJSON(this, function (node, memo) {
    var json = {};

    json.value = node.value;

    json.inputs = node.$inputs.map(function (node) {
      return node.toJSON(memo);
    });

    return json;
  }, memo);
};

AudioParam.prototype.$valueAtTime = function (time) {
  time = _import2["default"].toSeconds(time);

  var value = this._value;
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

AudioParam.prototype.$process = function (inNumSamples, tick) {
  /* istanbul ignore else */
  if (this._tick !== tick) {
    this._tick = tick;
    this.$inputs.forEach(function (src) {
      src.$process(inNumSamples, tick);
    });
  }
};

module.exports = _WebAudioTestAPI2["default"].AudioParam = AudioParam;
},{"./WebAudioTestAPI":34,"./utils":41,"./utils/Inspector":35}],9:[function(require,module,exports){
"use strict";

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _import = require("./utils");

var _import2 = _interopRequireDefault(_import);

var _WebAudioTestAPI = require("./WebAudioTestAPI");

var _WebAudioTestAPI2 = _interopRequireDefault(_WebAudioTestAPI);

var _Event = require("./Event");

var _Event2 = _interopRequireDefault(_Event);

var AudioProcessingEventConstructor = function AudioProcessingEvent() {
  throw new TypeError("Illegal constructor");
};
_import2["default"].inherits(AudioProcessingEventConstructor, _Event2["default"]);

function AudioProcessingEvent(node) {
  _Event2["default"].call(this, "audioprocess", node);
  Object.defineProperties(this, {
    $name: { value: "AudioProcessingEvent" },
    $node: { value: node } });
}
_import2["default"].inherits(AudioProcessingEvent, AudioProcessingEventConstructor);

AudioProcessingEvent.exports = AudioProcessingEventConstructor;

module.exports = _WebAudioTestAPI2["default"].AudioProcessingEvent = AudioProcessingEvent;
},{"./Event":17,"./WebAudioTestAPI":34,"./utils":41}],10:[function(require,module,exports){
"use strict";

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _import = require("./utils");

var _import2 = _interopRequireDefault(_import);

var _Inspector = require("./utils/Inspector");

var _Inspector2 = _interopRequireDefault(_Inspector);

var _WebAudioTestAPI = require("./WebAudioTestAPI");

var _WebAudioTestAPI2 = _interopRequireDefault(_WebAudioTestAPI);

var _AudioNode = require("./AudioNode");

var _AudioNode2 = _interopRequireDefault(_AudioNode);

var _AudioParam = require("./AudioParam");

var _AudioParam2 = _interopRequireDefault(_AudioParam);

var BiquadFilterType = "enum { lowpass, highpass, bandpass, lowshelf, highshelf, peaking, notch, allpass }";

var BiquadFilterNodeConstructor = function BiquadFilterNode() {
  throw new TypeError("Illegal constructor: use audioContext.createBiquadFilter()");
};
_import2["default"].inherits(BiquadFilterNodeConstructor, _AudioNode2["default"]);

function BiquadFilterNode(context) {
  _AudioNode2["default"].call(this, context, {
    name: "BiquadFilterNode",
    numberOfInputs: 1,
    numberOfOutputs: 1,
    channelCount: 2,
    channelCountMode: "max",
    channelInterpretation: "speakers" });

  var type = "lowpass";
  var frequency = new _AudioParam2["default"](this, "frequency", 350, 10, context.sampleRate / 2);
  var detune = new _AudioParam2["default"](this, "detune", 0, -4800, 4800);
  var Q = new _AudioParam2["default"](this, "Q", 1, 0.0001, 1000);
  var gain = new _AudioParam2["default"](this, "gain", 0, -40, 40);

  _import2["default"].defineAttribute(this, "type", BiquadFilterType, type, function (msg) {
    throw new TypeError(_import2["default"].formatter.concat(this, msg));
  });
  _import2["default"].defineAttribute(this, "frequency", "readonly", frequency, function (msg) {
    throw new TypeError(_import2["default"].formatter.concat(this, msg));
  });
  _import2["default"].defineAttribute(this, "detune", "readonly", detune, function (msg) {
    throw new TypeError(_import2["default"].formatter.concat(this, msg));
  });
  _import2["default"].defineAttribute(this, "Q", "readonly", Q, function (msg) {
    throw new TypeError(_import2["default"].formatter.concat(this, msg));
  });
  _import2["default"].defineAttribute(this, "gain", "readonly", gain, function (msg) {
    throw new TypeError(_import2["default"].formatter.concat(this, msg));
  });
}
_import2["default"].inherits(BiquadFilterNode, BiquadFilterNodeConstructor);

BiquadFilterNode.exports = BiquadFilterNodeConstructor;
BiquadFilterNode.jsonAttrs = ["type", "frequency", "detune", "Q", "gain"];

BiquadFilterNodeConstructor.prototype.getFrequencyResponse = function () {
  var inspector = new _Inspector2["default"](this, "getFrequencyResponse", [{ name: "frequencyHz", type: "Float32Array" }, { name: "magResponse", type: "Float32Array" }, { name: "phaseResponse", type: "Float32Array" }]);

  inspector.validateArguments(arguments, function (msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });
};

module.exports = _WebAudioTestAPI2["default"].BiquadFilterNode = BiquadFilterNode;
},{"./AudioNode":7,"./AudioParam":8,"./WebAudioTestAPI":34,"./utils":41,"./utils/Inspector":35}],11:[function(require,module,exports){
"use strict";

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _import = require("./utils");

var _import2 = _interopRequireDefault(_import);

var _WebAudioTestAPI = require("./WebAudioTestAPI");

var _WebAudioTestAPI2 = _interopRequireDefault(_WebAudioTestAPI);

var _AudioNode = require("./AudioNode");

var _AudioNode2 = _interopRequireDefault(_AudioNode);

var ChannelMergerNodeConstructor = function ChannelMergerNode() {
  throw new TypeError("Illegal constructor: use audioContext.createChannelMerger([numberOfInputs: number])");
};
_import2["default"].inherits(ChannelMergerNodeConstructor, _AudioNode2["default"]);

function ChannelMergerNode(context, numberOfInputs) {
  _AudioNode2["default"].call(this, context, {
    name: "ChannelMergerNode",
    numberOfInputs: numberOfInputs,
    numberOfOutputs: 1,
    channelCount: 2,
    channelCountMode: "max",
    channelInterpretation: "speakers" });
}
_import2["default"].inherits(ChannelMergerNode, ChannelMergerNodeConstructor);

ChannelMergerNode.exports = ChannelMergerNodeConstructor;

module.exports = _WebAudioTestAPI2["default"].ChannelMergerNode = ChannelMergerNode;
},{"./AudioNode":7,"./WebAudioTestAPI":34,"./utils":41}],12:[function(require,module,exports){
"use strict";

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _import = require("./utils");

var _import2 = _interopRequireDefault(_import);

var _WebAudioTestAPI = require("./WebAudioTestAPI");

var _WebAudioTestAPI2 = _interopRequireDefault(_WebAudioTestAPI);

var _AudioNode = require("./AudioNode");

var _AudioNode2 = _interopRequireDefault(_AudioNode);

var ChannelSplitterNodeConstructor = function ChannelSplitterNode() {
  throw new TypeError("Illegal constructor: use audioContext.createChannelSplitter([numberOfOutputs: number])");
};
_import2["default"].inherits(ChannelSplitterNodeConstructor, _AudioNode2["default"]);

function ChannelSplitterNode(context, numberOfOutputs) {
  _AudioNode2["default"].call(this, context, {
    name: "ChannelSplitterNode",
    numberOfInputs: 1,
    numberOfOutputs: numberOfOutputs,
    channelCount: 2,
    channelCountMode: "max",
    channelInterpretation: "speakers" });
}
_import2["default"].inherits(ChannelSplitterNode, ChannelSplitterNodeConstructor);

ChannelSplitterNode.exports = ChannelSplitterNodeConstructor;

module.exports = _WebAudioTestAPI2["default"].ChannelSplitterNode = ChannelSplitterNode;
},{"./AudioNode":7,"./WebAudioTestAPI":34,"./utils":41}],13:[function(require,module,exports){
"use strict";

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _import = require("./utils");

var _import2 = _interopRequireDefault(_import);

var _WebAudioTestAPI = require("./WebAudioTestAPI");

var _WebAudioTestAPI2 = _interopRequireDefault(_WebAudioTestAPI);

var _AudioNode = require("./AudioNode");

var _AudioNode2 = _interopRequireDefault(_AudioNode);

var ConvolverNodeConstructor = function ConvolverNode() {
  throw new TypeError("Illegal constructor: use audioContext.createConvolver()");
};
_import2["default"].inherits(ConvolverNodeConstructor, _AudioNode2["default"]);

function ConvolverNode(context) {
  _AudioNode2["default"].call(this, context, {
    name: "ConvolverNode",
    numberOfInputs: 1,
    numberOfOutputs: 1,
    channelCount: 2,
    channelCountMode: "clamped-max",
    channelInterpretation: "speakers" });

  var buffer = null;
  var normalize = true;

  _import2["default"].defineAttribute(this, "buffer", "AudioBuffer|null", buffer, function (msg) {
    throw new TypeError(_import2["default"].formatter.concat(this, msg));
  });
  _import2["default"].defineAttribute(this, "normalize", "boolean", normalize, function (msg) {
    throw new TypeError(_import2["default"].formatter.concat(this, msg));
  });
}
_import2["default"].inherits(ConvolverNode, ConvolverNodeConstructor);

ConvolverNode.exports = ConvolverNodeConstructor;
ConvolverNode.jsonAttrs = ["normalize"];

module.exports = _WebAudioTestAPI2["default"].ConvolverNode = ConvolverNode;
},{"./AudioNode":7,"./WebAudioTestAPI":34,"./utils":41}],14:[function(require,module,exports){
"use strict";

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _import = require("./utils");

var _import2 = _interopRequireDefault(_import);

var _WebAudioTestAPI = require("./WebAudioTestAPI");

var _WebAudioTestAPI2 = _interopRequireDefault(_WebAudioTestAPI);

var _AudioNode = require("./AudioNode");

var _AudioNode2 = _interopRequireDefault(_AudioNode);

var _AudioParam = require("./AudioParam");

var _AudioParam2 = _interopRequireDefault(_AudioParam);

var DelayNodeConstructor = function DelayNode() {
  throw new TypeError("Illegal constructor: use audioContext.createDelay([maxDelayTime: number])");
};
_import2["default"].inherits(DelayNodeConstructor, _AudioNode2["default"]);

function DelayNode(context, maxDelayTime) {
  _AudioNode2["default"].call(this, context, {
    name: "DelayNode",
    numberOfInputs: 1,
    numberOfOutputs: 1,
    channelCount: 2,
    channelCountMode: "max",
    channelInterpretation: "speakers" });

  var delayTime = new _AudioParam2["default"](this, "delayTime", 0, 0, maxDelayTime);

  _import2["default"].defineAttribute(this, "delayTime", "readonly", delayTime, function (msg) {
    throw new TypeError(_import2["default"].formatter.concat(this, msg));
  });

  Object.defineProperties(this, {
    $maxDelayTime: { value: maxDelayTime } });
}
_import2["default"].inherits(DelayNode, DelayNodeConstructor);

DelayNode.exports = DelayNodeConstructor;
DelayNode.jsonAttrs = ["delayTime"];

module.exports = _WebAudioTestAPI2["default"].DelayNode = DelayNode;
},{"./AudioNode":7,"./AudioParam":8,"./WebAudioTestAPI":34,"./utils":41}],15:[function(require,module,exports){
"use strict";

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _import = require("./utils");

var _import2 = _interopRequireDefault(_import);

var _WebAudioTestAPI = require("./WebAudioTestAPI");

var _WebAudioTestAPI2 = _interopRequireDefault(_WebAudioTestAPI);

var _AudioNode = require("./AudioNode");

var _AudioNode2 = _interopRequireDefault(_AudioNode);

var _AudioParam = require("./AudioParam");

var _AudioParam2 = _interopRequireDefault(_AudioParam);

var DynamicsCompressorNodeConstructor = function DynamicsCompressorNode() {
  throw new TypeError("Illegal constructor: use audioContext.createDynamicsCompressor()");
};
_import2["default"].inherits(DynamicsCompressorNodeConstructor, _AudioNode2["default"]);

function DynamicsCompressorNode(context) {
  _AudioNode2["default"].call(this, context, {
    name: "DynamicsCompressorNode",
    numberOfInputs: 1,
    numberOfOutputs: 1,
    channelCount: 2,
    channelCountMode: "explicit",
    channelInterpretation: "speakers" });

  var threshold = new _AudioParam2["default"](this, "threshold", -24, -100, 0);
  var knee = new _AudioParam2["default"](this, "knee", 30, 0, 40);
  var ratio = new _AudioParam2["default"](this, "ratio", 12, 1, 20);
  var reduction = new _AudioParam2["default"](this, "reduction", 0, -20, 0);
  var attack = new _AudioParam2["default"](this, "attack", 0.003, 0, 1);
  var release = new _AudioParam2["default"](this, "release", 0.25, 0, 1);

  _import2["default"].defineAttribute(this, "threshold", "readonly", threshold, function (msg) {
    throw new TypeError(_import2["default"].formatter.concat(this, msg));
  });
  _import2["default"].defineAttribute(this, "knee", "readonly", knee, function (msg) {
    throw new TypeError(_import2["default"].formatter.concat(this, msg));
  });
  _import2["default"].defineAttribute(this, "ratio", "readonly", ratio, function (msg) {
    throw new TypeError(_import2["default"].formatter.concat(this, msg));
  });
  _import2["default"].defineAttribute(this, "reduction", "readonly", reduction, function (msg) {
    throw new TypeError(_import2["default"].formatter.concat(this, msg));
  });
  _import2["default"].defineAttribute(this, "attack", "readonly", attack, function (msg) {
    throw new TypeError(_import2["default"].formatter.concat(this, msg));
  });
  _import2["default"].defineAttribute(this, "release", "readonly", release, function (msg) {
    throw new TypeError(_import2["default"].formatter.concat(this, msg));
  });
}
_import2["default"].inherits(DynamicsCompressorNode, DynamicsCompressorNodeConstructor);

DynamicsCompressorNode.exports = DynamicsCompressorNodeConstructor;
DynamicsCompressorNode.jsonAttrs = ["threshold", "knee", "ratio", "reduction", "attack", "release"];

module.exports = _WebAudioTestAPI2["default"].DynamicsCompressorNode = DynamicsCompressorNode;
},{"./AudioNode":7,"./AudioParam":8,"./WebAudioTestAPI":34,"./utils":41}],16:[function(require,module,exports){
(function (global){
"use strict";

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _import = require("./utils");

var _import2 = _interopRequireDefault(_import);

var _WebAudioTestAPI = require("./WebAudioTestAPI");

var _WebAudioTestAPI2 = _interopRequireDefault(_WebAudioTestAPI);

var _EventTarget2 = require("./EventTarget");

var _EventTarget3 = _interopRequireDefault(_EventTarget2);

global.Element = global.Element || (function (_EventTarget) {
  function Element() {
    _classCallCheck(this, Element);

    _get(Object.getPrototypeOf(Element.prototype), "constructor", this).call(this);
    throw new TypeError("Illegal constructor");
  }

  _inherits(Element, _EventTarget);

  return Element;
})(_EventTarget3["default"]);

var Element = (function (_$preventSuper) {
  function Element() {
    _classCallCheck(this, Element);

    if (_$preventSuper != null) {
      _$preventSuper.apply(this, arguments);
    }
  }

  _inherits(Element, _$preventSuper);

  return Element;
})(_import2["default"].preventSuper(global.Element));

exports["default"] = Element;

_WebAudioTestAPI2["default"].Element = Element;
module.exports = exports["default"];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./EventTarget":18,"./WebAudioTestAPI":34,"./utils":41}],17:[function(require,module,exports){
(function (global){
"use strict";

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _import = require("./utils");

var _import2 = _interopRequireDefault(_import);

var _WebAudioTestAPI = require("./WebAudioTestAPI");

var _WebAudioTestAPI2 = _interopRequireDefault(_WebAudioTestAPI);

global.Event = global.Event || function Event() {
  _classCallCheck(this, Event);

  throw new TypeError("Illegal constructor");
};

var Event = (function (_$preventSuper) {
  function Event(name, target) {
    _classCallCheck(this, Event);

    _get(Object.getPrototypeOf(Event.prototype), "constructor", this).call(this);

    this.type = name;
    this.target = _import2["default"].defaults(target, null);
    this.timeStamp = Date.now();
  }

  _inherits(Event, _$preventSuper);

  return Event;
})(_import2["default"].preventSuper(global.Event));

exports["default"] = Event;

// export default class Event extends _.preventSuper(global.Event) {
//   constructor(name, target) {
//     super();
//
//     this.type = name;
//     this.target = _.defaults(target, null);
//     this.timeStamp = Date.now();
//   }
// }
//
// /* istanbul ignore else */
// if (typeof global.Event === "undefined") {
//   global.Event = Event;
// }

_WebAudioTestAPI2["default"].Event = Event;
module.exports = exports["default"];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./WebAudioTestAPI":34,"./utils":41}],18:[function(require,module,exports){
(function (global){
"use strict";

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _import = require("./utils");

var _import2 = _interopRequireDefault(_import);

var _Inspector = require("./utils/Inspector");

var _Inspector2 = _interopRequireDefault(_Inspector);

var _WebAudioTestAPI = require("./WebAudioTestAPI");

var _WebAudioTestAPI2 = _interopRequireDefault(_WebAudioTestAPI);

global.EventTarget = global.EventTarget || function EventTarget() {
  _classCallCheck(this, EventTarget);

  throw new TypeError("Illegal constructor");
};

var EventTarget = (function (_$preventSuper) {
  function EventTarget() {
    _classCallCheck(this, EventTarget);

    _get(Object.getPrototypeOf(EventTarget.prototype), "constructor", this).call(this);
    this._listeners = {};
  }

  _inherits(EventTarget, _$preventSuper);

  _createClass(EventTarget, [{
    key: "addEventListener",
    value: function addEventListener(type, listener) {
      var inspector = new _Inspector2["default"](this, "addEventListener", [{ name: "type", type: "string" }, { name: "listener", type: "function" }]);

      inspector.validateArguments(arguments, function (msg) {
        throw new TypeError(inspector.form + "; " + msg);
      });

      this._listeners[type] = this._listeners[type] || /* istanbul ignore next */[];
      this._listeners[type].push(listener);
    }
  }, {
    key: "removeEventListener",
    value: function removeEventListener(type, listener) {
      var inspector = new _Inspector2["default"](this, "addEventListener", [{ name: "type", type: "string" }, { name: "listener", type: "function" }]);

      inspector.validateArguments(arguments, function (msg) {
        throw new TypeError(inspector.form + "; " + msg);
      });

      this._listeners[type] = this._listeners[type] || /* istanbul ignore next */[];
      var index = this._listeners[type].indexOf(listener);
      if (index !== -1) {
        this._listeners[type].splice(index, 1);
      }
    }
  }, {
    key: "dispatchEvent",
    value: function dispatchEvent(event) {
      var inspector = new _Inspector2["default"](this, "addEventListener", [{ name: "event", type: "Event" }]);

      inspector.validateArguments(arguments, function (msg) {
        throw new TypeError(inspector.form + "; " + msg);
      });

      var type = event.type;

      /* istanbul ignore else */
      if (typeof this["on" + type] === "function") {
        this["on" + type].call(this, event);
      }

      this.$listeners(type).forEach(function (listener) {
        listener.call(this, event);
      }, this);

      return true;
    }
  }, {
    key: "$listeners",
    value: function $listeners(type) {
      return (this._listeners[type] || /* istanbul ignore next */[]).slice();
    }
  }]);

  return EventTarget;
})(_import2["default"].preventSuper(global.EventTarget));

exports["default"] = EventTarget;

_WebAudioTestAPI2["default"].EventTarget = EventTarget;
module.exports = exports["default"];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./WebAudioTestAPI":34,"./utils":41,"./utils/Inspector":35}],19:[function(require,module,exports){
"use strict";

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _import = require("./utils");

var _import2 = _interopRequireDefault(_import);

var _WebAudioTestAPI = require("./WebAudioTestAPI");

var _WebAudioTestAPI2 = _interopRequireDefault(_WebAudioTestAPI);

var _AudioNode = require("./AudioNode");

var _AudioNode2 = _interopRequireDefault(_AudioNode);

var _AudioParam = require("./AudioParam");

var _AudioParam2 = _interopRequireDefault(_AudioParam);

var GainNodeConstructor = function GainNode() {
  throw new TypeError("Illegal constructor: use audioContext.createGain()");
};
_import2["default"].inherits(GainNodeConstructor, _AudioNode2["default"]);

function GainNode(context) {
  _AudioNode2["default"].call(this, context, {
    name: "GainNode",
    numberOfInputs: 1,
    numberOfOutputs: 1,
    channelCount: 2,
    channelCountMode: "max",
    channelInterpretation: "speakers" });

  var gain = new _AudioParam2["default"](this, "gain", 1, 0, 1);

  _import2["default"].defineAttribute(this, "gain", "readonly", gain, function (msg) {
    throw new TypeError(_import2["default"].formatter.concat(this, msg));
  });
}
_import2["default"].inherits(GainNode, GainNodeConstructor);

GainNode.exports = GainNodeConstructor;
GainNode.jsonAttrs = ["gain"];

module.exports = _WebAudioTestAPI2["default"].GainNode = GainNode;
},{"./AudioNode":7,"./AudioParam":8,"./WebAudioTestAPI":34,"./utils":41}],20:[function(require,module,exports){
(function (global){
"use strict";

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _import = require("./utils");

var _import2 = _interopRequireDefault(_import);

var _WebAudioTestAPI = require("./WebAudioTestAPI");

var _WebAudioTestAPI2 = _interopRequireDefault(_WebAudioTestAPI);

var _Element2 = require("./Element");

var _Element3 = _interopRequireDefault(_Element2);

global.HTMLElement = global.HTMLElement || (function (_Element) {
  function HTMLElement() {
    _classCallCheck(this, HTMLElement);

    _get(Object.getPrototypeOf(HTMLElement.prototype), "constructor", this).call(this);
    throw new TypeError("Illegal constructor");
  }

  _inherits(HTMLElement, _Element);

  return HTMLElement;
})(_Element3["default"]);

var HTMLElement = (function (_$preventSuper) {
  function HTMLElement() {
    _classCallCheck(this, HTMLElement);

    if (_$preventSuper != null) {
      _$preventSuper.apply(this, arguments);
    }
  }

  _inherits(HTMLElement, _$preventSuper);

  return HTMLElement;
})(_import2["default"].preventSuper(global.HTMLElement));

exports["default"] = HTMLElement;

_WebAudioTestAPI2["default"].HTMLElement = HTMLElement;
module.exports = exports["default"];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./Element":16,"./WebAudioTestAPI":34,"./utils":41}],21:[function(require,module,exports){
(function (global){
"use strict";

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _import = require("./utils");

var _import2 = _interopRequireDefault(_import);

var _WebAudioTestAPI = require("./WebAudioTestAPI");

var _WebAudioTestAPI2 = _interopRequireDefault(_WebAudioTestAPI);

var _HTMLElement2 = require("./HTMLElement");

var _HTMLElement3 = _interopRequireDefault(_HTMLElement2);

global.HTMLMediaElement = global.HTMLMediaElement || (function (_HTMLElement) {
  function HTMLMediaElement() {
    _classCallCheck(this, HTMLMediaElement);

    _get(Object.getPrototypeOf(HTMLMediaElement.prototype), "constructor", this).call(this);
    throw new TypeError("Illegal constructor");
  }

  _inherits(HTMLMediaElement, _HTMLElement);

  return HTMLMediaElement;
})(_HTMLElement3["default"]);

var HTMLMediaElement = (function (_$preventSuper) {
  function HTMLMediaElement() {
    _classCallCheck(this, HTMLMediaElement);

    if (_$preventSuper != null) {
      _$preventSuper.apply(this, arguments);
    }
  }

  _inherits(HTMLMediaElement, _$preventSuper);

  return HTMLMediaElement;
})(_import2["default"].preventSuper(global.HTMLMediaElement));

exports["default"] = HTMLMediaElement;

_WebAudioTestAPI2["default"].HTMLMediaElement = HTMLMediaElement;
module.exports = exports["default"];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./HTMLElement":20,"./WebAudioTestAPI":34,"./utils":41}],22:[function(require,module,exports){
"use strict";

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _import = require("./utils");

var _import2 = _interopRequireDefault(_import);

var _WebAudioTestAPI = require("./WebAudioTestAPI");

var _WebAudioTestAPI2 = _interopRequireDefault(_WebAudioTestAPI);

var _AudioNode = require("./AudioNode");

var _AudioNode2 = _interopRequireDefault(_AudioNode);

var MediaElementAudioSourceNodeConstructor = function MediaElementAudioSourceNode() {
  throw new TypeError("Illegal constructor: use audioContext.createMediaElementSource(mediaElement: HTMLMediaElement)");
};
_import2["default"].inherits(MediaElementAudioSourceNodeConstructor, _AudioNode2["default"]);

function MediaElementAudioSourceNode(context) {
  _AudioNode2["default"].call(this, context, {
    name: "MediaElementAudioSourceNode",
    numberOfInputs: 0,
    numberOfOutputs: 1,
    channelCount: 2,
    channelCountMode: "max",
    channelInterpretation: "speakers" });
}
_import2["default"].inherits(MediaElementAudioSourceNode, MediaElementAudioSourceNodeConstructor);

MediaElementAudioSourceNode.exports = MediaElementAudioSourceNodeConstructor;

module.exports = _WebAudioTestAPI2["default"].MediaElementAudioSourceNode = MediaElementAudioSourceNode;
},{"./AudioNode":7,"./WebAudioTestAPI":34,"./utils":41}],23:[function(require,module,exports){
(function (global){
"use strict";

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _import = require("./utils");

var _import2 = _interopRequireDefault(_import);

var _WebAudioTestAPI = require("./WebAudioTestAPI");

var _WebAudioTestAPI2 = _interopRequireDefault(_WebAudioTestAPI);

var _EventTarget2 = require("./EventTarget");

var _EventTarget3 = _interopRequireDefault(_EventTarget2);

global.MediaStream = global.MediaStream || (function (_EventTarget) {
  function MediaStream() {
    _classCallCheck(this, MediaStream);

    _get(Object.getPrototypeOf(MediaStream.prototype), "constructor", this).call(this);
    throw new TypeError("Illegal constructor");
  }

  _inherits(MediaStream, _EventTarget);

  return MediaStream;
})(_EventTarget3["default"]);

var MediaStream = (function (_$preventSuper) {
  function MediaStream() {
    _classCallCheck(this, MediaStream);

    if (_$preventSuper != null) {
      _$preventSuper.apply(this, arguments);
    }
  }

  _inherits(MediaStream, _$preventSuper);

  return MediaStream;
})(_import2["default"].preventSuper(global.MediaStream));

exports["default"] = MediaStream;

_WebAudioTestAPI2["default"].MediaStream = MediaStream;
module.exports = exports["default"];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./EventTarget":18,"./WebAudioTestAPI":34,"./utils":41}],24:[function(require,module,exports){
"use strict";

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _import = require("./utils");

var _import2 = _interopRequireDefault(_import);

var _WebAudioTestAPI = require("./WebAudioTestAPI");

var _WebAudioTestAPI2 = _interopRequireDefault(_WebAudioTestAPI);

var _AudioNode = require("./AudioNode");

var _AudioNode2 = _interopRequireDefault(_AudioNode);

var MediaStreamAudioDestinationNodeConstructor = function MediaStreamAudioDestinationNode() {
  throw new TypeError("Illegal constructor: use audioContext.createMediaStreamDestination()");
};
_import2["default"].inherits(MediaStreamAudioDestinationNodeConstructor, _AudioNode2["default"]);

function MediaStreamAudioDestinationNode(context) {
  _AudioNode2["default"].call(this, context, {
    name: "MediaStreamAudioDestinationNode",
    numberOfInputs: 1,
    numberOfOutputs: 0,
    channelCount: 2,
    channelCountMode: "explicit",
    channelInterpretation: "speakers" });
}
_import2["default"].inherits(MediaStreamAudioDestinationNode, MediaStreamAudioDestinationNodeConstructor);

MediaStreamAudioDestinationNode.exports = MediaStreamAudioDestinationNodeConstructor;

module.exports = _WebAudioTestAPI2["default"].MediaStreamAudioDestinationNode = MediaStreamAudioDestinationNode;
},{"./AudioNode":7,"./WebAudioTestAPI":34,"./utils":41}],25:[function(require,module,exports){
"use strict";

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _import = require("./utils");

var _import2 = _interopRequireDefault(_import);

var _WebAudioTestAPI = require("./WebAudioTestAPI");

var _WebAudioTestAPI2 = _interopRequireDefault(_WebAudioTestAPI);

var _AudioNode = require("./AudioNode");

var _AudioNode2 = _interopRequireDefault(_AudioNode);

var MediaStreamAudioSourceNodeConstructor = function MediaStreamAudioSourceNode() {
  throw new TypeError("Illegal constructor: use audioContext.createMediaStreamSource(mediaStream: MediaStream)");
};
_import2["default"].inherits(MediaStreamAudioSourceNodeConstructor, _AudioNode2["default"]);

function MediaStreamAudioSourceNode(context) {
  _AudioNode2["default"].call(this, context, {
    name: "MediaStreamAudioSourceNode",
    numberOfInputs: 0,
    numberOfOutputs: 1,
    channelCount: 2,
    channelCountMode: "max",
    channelInterpretation: "speakers" });
}
_import2["default"].inherits(MediaStreamAudioSourceNode, MediaStreamAudioSourceNodeConstructor);

MediaStreamAudioSourceNode.exports = MediaStreamAudioSourceNodeConstructor;

module.exports = _WebAudioTestAPI2["default"].MediaStreamAudioSourceNode = MediaStreamAudioSourceNode;
},{"./AudioNode":7,"./WebAudioTestAPI":34,"./utils":41}],26:[function(require,module,exports){
"use strict";

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _import = require("./utils");

var _import2 = _interopRequireDefault(_import);

var _WebAudioTestAPI = require("./WebAudioTestAPI");

var _WebAudioTestAPI2 = _interopRequireDefault(_WebAudioTestAPI);

var _Event = require("./Event");

var _Event2 = _interopRequireDefault(_Event);

var OfflineAudioCompletionEventConstructor = function OfflineAudioCompletionEvent() {
  throw new TypeError("Illegal constructor");
};
_import2["default"].inherits(OfflineAudioCompletionEventConstructor, _Event2["default"]);

function OfflineAudioCompletionEvent(node) {
  _Event2["default"].call(this, "complete", node);
  Object.defineProperties(this, {
    $name: { value: "OfflineAudioCompletionEvent" },
    $node: { value: node } });
}
_import2["default"].inherits(OfflineAudioCompletionEvent, OfflineAudioCompletionEventConstructor);

OfflineAudioCompletionEvent.exports = OfflineAudioCompletionEventConstructor;

module.exports = _WebAudioTestAPI2["default"].OfflineAudioCompletionEvent = OfflineAudioCompletionEvent;
},{"./Event":17,"./WebAudioTestAPI":34,"./utils":41}],27:[function(require,module,exports){
"use strict";

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _import = require("./utils");

var _import2 = _interopRequireDefault(_import);

var _Inspector = require("./utils/Inspector");

var _Inspector2 = _interopRequireDefault(_Inspector);

var _WebAudioTestAPI = require("./WebAudioTestAPI");

var _WebAudioTestAPI2 = _interopRequireDefault(_WebAudioTestAPI);

var _AudioContext = require("./AudioContext");

var _AudioContext2 = _interopRequireDefault(_AudioContext);

var _AudioBuffer = require("./AudioBuffer");

var _AudioBuffer2 = _interopRequireDefault(_AudioBuffer);

var _AudioDestinationNode = require("./AudioDestinationNode");

var _AudioDestinationNode2 = _interopRequireDefault(_AudioDestinationNode);

var _AudioListener = require("./AudioListener");

var _AudioListener2 = _interopRequireDefault(_AudioListener);

var _EventTarget = require("./EventTarget");

var _EventTarget2 = _interopRequireDefault(_EventTarget);

var _OfflineAudioCompletionEvent = require("./OfflineAudioCompletionEvent");

var _OfflineAudioCompletionEvent2 = _interopRequireDefault(_OfflineAudioCompletionEvent);

function OfflineAudioContext(numberOfChannels, length, sampleRate) {
  if (!(this instanceof OfflineAudioContext)) {
    throw new TypeError("Failed to construct 'AudioContext': Please use the 'new' operator");
  }

  _EventTarget2["default"].call(this);

  var inspector = new _Inspector2["default"](this, null, [{ name: "numberOfChannels", type: "number" }, { name: "length", type: "number" }, { name: "sampleRate", type: "number" }]);

  inspector.validateArguments(arguments, function (msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });

  var destination = new _AudioDestinationNode2["default"](this);
  var currentTime = function currentTime() {
    return this._microCurrentTime / (1000 * 1000);
  };
  var listener = new _AudioListener2["default"](this);
  var oncomplete = null;

  _import2["default"].defineAttribute(this, "destination", "readonly", destination, function (msg) {
    throw new TypeError(_import2["default"].formatter.concat(this, msg));
  });
  _import2["default"].defineAttribute(this, "sampleRate", "readonly", sampleRate, function (msg) {
    throw new TypeError(_import2["default"].formatter.concat(this, msg));
  });
  _import2["default"].defineAttribute(this, "currentTime", "readonly", currentTime, function (msg) {
    throw new TypeError(_import2["default"].formatter.concat(this, msg));
  });
  _import2["default"].defineAttribute(this, "listener", "readonly", listener, function (msg) {
    throw new TypeError(_import2["default"].formatter.concat(this, msg));
  });
  _import2["default"].defineAttribute(this, "oncomplete", "function|null", oncomplete, function (msg) {
    throw new TypeError(_import2["default"].formatter.concat(this, msg));
  });

  Object.defineProperties(this, {
    $name: { value: "OfflineAudioContext" },
    $context: { value: this } });

  this._microCurrentTime = 0;
  this._processedSamples = 0;
  this._tick = 0;

  this._numberOfChannels = numberOfChannels;
  this._length = length;
  this._rendering = false;
}
_import2["default"].inherits(OfflineAudioContext, _AudioContext2["default"]);

OfflineAudioContext.prototype.startRendering = function () {
  var inspector = new _Inspector2["default"](this, "startRendering", []);

  inspector.assert(!this._rendering, function () {
    throw Error(inspector.form + "; must only be called one time");
  });

  this._rendering = true;
};

OfflineAudioContext.prototype._process = function (microseconds) {
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
    var event = new _OfflineAudioCompletionEvent2["default"](this);

    event.renderedBuffer = new _AudioBuffer2["default"](this, this._numberOfChannels, this._length, this.sampleRate);

    this.dispatchEvent(event);
  }
};

module.exports = _WebAudioTestAPI2["default"].OfflineAudioContext = OfflineAudioContext;
},{"./AudioBuffer":2,"./AudioContext":4,"./AudioDestinationNode":5,"./AudioListener":6,"./EventTarget":18,"./OfflineAudioCompletionEvent":26,"./WebAudioTestAPI":34,"./utils":41,"./utils/Inspector":35}],28:[function(require,module,exports){
"use strict";

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _import = require("./utils");

var _import2 = _interopRequireDefault(_import);

var _Inspector = require("./utils/Inspector");

var _Inspector2 = _interopRequireDefault(_Inspector);

var _WebAudioTestAPI = require("./WebAudioTestAPI");

var _WebAudioTestAPI2 = _interopRequireDefault(_WebAudioTestAPI);

var _AudioNode = require("./AudioNode");

var _AudioNode2 = _interopRequireDefault(_AudioNode);

var _AudioParam = require("./AudioParam");

var _AudioParam2 = _interopRequireDefault(_AudioParam);

var _Event = require("./Event");

var _Event2 = _interopRequireDefault(_Event);

var OscillatorType = "enum { sine, square, sawtooth, triangle }";

var OscillatorNodeConstructor = function OscillatorNode() {
  throw new TypeError("Illegal constructor: use audioContext.createOscillator()");
};
_import2["default"].inherits(OscillatorNodeConstructor, _AudioNode2["default"]);

function OscillatorNode(context) {
  _AudioNode2["default"].call(this, context, {
    name: "OscillatorNode",
    numberOfInputs: 0,
    numberOfOutputs: 1,
    channelCount: 2,
    channelCountMode: "max",
    channelInterpretation: "speakers" });

  var type = "sine";
  var frequency = new _AudioParam2["default"](this, "frequency", 440, 0, 100000);
  var detune = new _AudioParam2["default"](this, "detune", 0, -4800, 4800);
  var onended = null;

  Object.defineProperty(this, "type", {
    get: function get() {
      return this._custom ? "custom" : this._type;
    },
    set: function set(newValue) {
      if (_import2["default"].typeCheck(newValue, OscillatorType)) {
        this._type = newValue;
      } else {
        var msg = "";

        msg += "type ";
        msg += _import2["default"].formatter.shouldBeButGot(OscillatorType, newValue);

        throw new TypeError(_import2["default"].formatter.concat(this, msg));
      }
    },
    enumerable: true });
  _import2["default"].defineAttribute(this, "frequency", "readonly", frequency, function (msg) {
    throw new TypeError(_import2["default"].formatter.concat(this, msg));
  });
  _import2["default"].defineAttribute(this, "detune", "readonly", detune, function (msg) {
    throw new TypeError(_import2["default"].formatter.concat(this, msg));
  });
  _import2["default"].defineAttribute(this, "onended", "function|null", onended, function (msg) {
    throw new TypeError(_import2["default"].formatter.concat(this, msg));
  });

  Object.defineProperties(this, {
    $state: {
      get: function get() {
        return this.$stateAtTime(this.context.currentTime);
      } },
    $custom: {
      get: function get() {
        return this._custom;
      } } });

  this._type = type;
  this._custom = null;
  this._startTime = Infinity;
  this._stopTime = Infinity;
  this._firedOnEnded = false;
}
_import2["default"].inherits(OscillatorNode, OscillatorNodeConstructor);

OscillatorNode.exports = OscillatorNodeConstructor;
OscillatorNode.jsonAttrs = ["type", "frequency", "detune"];

OscillatorNodeConstructor.prototype.start = function (when) {
  var inspector = new _Inspector2["default"](this, "start", [{ name: "when", type: "optional number" }]);

  inspector.validateArguments(arguments, function (msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });
  inspector.assert(this._startTime === Infinity, function () {
    throw new Error(inspector.form + "; cannot start more than once");
  });

  this._startTime = _import2["default"].defaults(when, 0);
};

OscillatorNodeConstructor.prototype.stop = function (when) {
  var inspector = new _Inspector2["default"](this, "stop", [{ name: "when", type: "optional number" }]);

  inspector.validateArguments(arguments, function (msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });
  inspector.assert(this._startTime !== Infinity, function () {
    throw new Error(inspector.form + "; cannot call stop without calling start first");
  });
  inspector.assert(this._stopTime === Infinity, function () {
    throw new Error(inspector.form + "; cannot stop more than once");
  });

  this._stopTime = _import2["default"].defaults(when, 0);
};

OscillatorNodeConstructor.prototype.setPeriodicWave = function (periodicWave) {
  var inspector = new _Inspector2["default"](this, "setPeriodicWave", [{ name: "periodicWave", type: "PeriodicWave" }]);

  inspector.validateArguments(arguments, function (msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });

  this._type = "custom";
  this._custom = periodicWave;
};

OscillatorNode.prototype.$stateAtTime = function (time) {
  time = _import2["default"].toSeconds(time);

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

OscillatorNode.prototype._process = function () {
  if (!this._firedOnEnded && this.$stateAtTime(this.context.currentTime) === "FINISHED") {
    this.dispatchEvent(new _Event2["default"]("ended", this));
    this._firedOnEnded = true;
  }
};

module.exports = _WebAudioTestAPI2["default"].OscillatorNode = OscillatorNode;
},{"./AudioNode":7,"./AudioParam":8,"./Event":17,"./WebAudioTestAPI":34,"./utils":41,"./utils/Inspector":35}],29:[function(require,module,exports){
"use strict";

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _import = require("./utils");

var _import2 = _interopRequireDefault(_import);

var _Inspector = require("./utils/Inspector");

var _Inspector2 = _interopRequireDefault(_Inspector);

var _WebAudioTestAPI = require("./WebAudioTestAPI");

var _WebAudioTestAPI2 = _interopRequireDefault(_WebAudioTestAPI);

var _AudioNode = require("./AudioNode");

var _AudioNode2 = _interopRequireDefault(_AudioNode);

var PanningModelType = "enum { equalpower, HRTF }";
var DistanceModelType = "enum { linear, inverse, exponential }";

var PannerNodeConstructor = function PannerNode() {
  throw new TypeError("Illegal constructor: use audioContext.createPanner()");
};
_import2["default"].inherits(PannerNodeConstructor, _AudioNode2["default"]);

function PannerNode(context) {
  _AudioNode2["default"].call(this, context, {
    name: "PannerNode",
    numberOfInputs: 1,
    numberOfOutputs: 1,
    channelCount: 2,
    channelCountMode: "clamped-max",
    channelInterpretation: "speakers" });

  var panningModel = "HRTF";
  var distanceModel = "inverse";
  var refDistance = 1;
  var maxDistance = 10000;
  var rolloffFactor = 1;
  var coneInnerAngle = 360;
  var coneOuterAngle = 360;
  var coneOuterGain = 0;

  _import2["default"].defineAttribute(this, "panningModel", PanningModelType, panningModel, function (msg) {
    throw new TypeError(_import2["default"].formatter.concat(this, msg));
  });
  _import2["default"].defineAttribute(this, "distanceModel", DistanceModelType, distanceModel, function (msg) {
    throw new TypeError(_import2["default"].formatter.concat(this, msg));
  });
  _import2["default"].defineAttribute(this, "refDistance", "number", refDistance, function (msg) {
    throw new TypeError(_import2["default"].formatter.concat(this, msg));
  });
  _import2["default"].defineAttribute(this, "maxDistance", "number", maxDistance, function (msg) {
    throw new TypeError(_import2["default"].formatter.concat(this, msg));
  });
  _import2["default"].defineAttribute(this, "rolloffFactor", "number", rolloffFactor, function (msg) {
    throw new TypeError(_import2["default"].formatter.concat(this, msg));
  });
  _import2["default"].defineAttribute(this, "coneInnerAngle", "number", coneInnerAngle, function (msg) {
    throw new TypeError(_import2["default"].formatter.concat(this, msg));
  });
  _import2["default"].defineAttribute(this, "coneOuterAngle", "number", coneOuterAngle, function (msg) {
    throw new TypeError(_import2["default"].formatter.concat(this, msg));
  });
  _import2["default"].defineAttribute(this, "coneOuterGain", "number", coneOuterGain, function (msg) {
    throw new TypeError(_import2["default"].formatter.concat(this, msg));
  });
}
_import2["default"].inherits(PannerNode, PannerNodeConstructor);

PannerNode.exports = PannerNodeConstructor;
PannerNode.jsonAttrs = ["panningModel", "distanceModel", "refDistance", "maxDistance", "rolloffFactor", "coneInnerAngle", "coneOuterAngle", "coneOuterGain"];

PannerNodeConstructor.prototype.setPosition = function () {
  var inspector = new _Inspector2["default"](this, "setPosition", [{ name: "x", type: "number" }, { name: "y", type: "number" }, { name: "z", type: "number" }]);

  inspector.validateArguments(arguments, function (msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });
};

PannerNodeConstructor.prototype.setOrientation = function () {
  var inspector = new _Inspector2["default"](this, "setOrientation", [{ name: "x", type: "number" }, { name: "y", type: "number" }, { name: "z", type: "number" }]);

  inspector.validateArguments(arguments, function (msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });
};

PannerNodeConstructor.prototype.setVelocity = function () {
  var inspector = new _Inspector2["default"](this, "setVelocity", [{ name: "x", type: "number" }, { name: "y", type: "number" }, { name: "z", type: "number" }]);

  inspector.validateArguments(arguments, function (msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });
};

module.exports = _WebAudioTestAPI2["default"].PannerNode = PannerNode;
},{"./AudioNode":7,"./WebAudioTestAPI":34,"./utils":41,"./utils/Inspector":35}],30:[function(require,module,exports){
"use strict";

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _import = require("./utils");

var _import2 = _interopRequireDefault(_import);

var _WebAudioTestAPI = require("./WebAudioTestAPI");

var _WebAudioTestAPI2 = _interopRequireDefault(_WebAudioTestAPI);

var PeriodicWaveConstructor = function PeriodicWave() {
  throw new TypeError("Illegal constructor");
};

function PeriodicWave(real, imag) {
  Object.defineProperties(this, {
    $name: { value: "PeriodicWave" },
    $real: { value: real },
    $imag: { value: imag } });
}
_import2["default"].inherits(PeriodicWave, PeriodicWaveConstructor);

PeriodicWave.exports = PeriodicWaveConstructor;

module.exports = _WebAudioTestAPI2["default"].PeriodicWave = PeriodicWave;
},{"./WebAudioTestAPI":34,"./utils":41}],31:[function(require,module,exports){
"use strict";

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _import = require("./utils");

var _import2 = _interopRequireDefault(_import);

var _WebAudioTestAPI = require("./WebAudioTestAPI");

var _WebAudioTestAPI2 = _interopRequireDefault(_WebAudioTestAPI);

var _AudioNode = require("./AudioNode");

var _AudioNode2 = _interopRequireDefault(_AudioNode);

var _AudioBuffer = require("./AudioBuffer");

var _AudioBuffer2 = _interopRequireDefault(_AudioBuffer);

var _AudioProcessingEvent = require("./AudioProcessingEvent");

var _AudioProcessingEvent2 = _interopRequireDefault(_AudioProcessingEvent);

var ScriptProcessorNodeConstructor = function ScriptProcessorNode() {
  throw new TypeError("Illegal constructor: use audioContext.createScriptProcessor(bufferSize: number, [numberOfInputChannels: number], [numberOfOutputChannels: number])");
};
_import2["default"].inherits(ScriptProcessorNodeConstructor, _AudioNode2["default"]);

function ScriptProcessorNode(context, bufferSize, numberOfInputChannels, numberOfOutputChannels) {
  _AudioNode2["default"].call(this, context, {
    name: "ScriptProcessorNode",
    numberOfInputs: 1,
    numberOfOutputs: 1,
    channelCount: numberOfInputChannels,
    channelCountMode: "max",
    channelInterpretation: "speakers" });

  var onaudioprocess = null;

  _import2["default"].defineAttribute(this, "numberOfInputChannels", "readonly", numberOfInputChannels, function (msg) {
    throw new TypeError(_import2["default"].formatter.concat(this, msg));
  });
  _import2["default"].defineAttribute(this, "numberOfOutputChannels", "readonly", numberOfOutputChannels, function (msg) {
    throw new TypeError(_import2["default"].formatter.concat(this, msg));
  });
  _import2["default"].defineAttribute(this, "bufferSize", "readonly", bufferSize, function (msg) {
    throw new TypeError(_import2["default"].formatter.concat(this, msg));
  });
  _import2["default"].defineAttribute(this, "onaudioprocess", "function|null", onaudioprocess, function (msg) {
    throw new TypeError(_import2["default"].formatter.concat(this, msg));
  });

  this._numSamples = 0;
}
_import2["default"].inherits(ScriptProcessorNode, ScriptProcessorNodeConstructor);

ScriptProcessorNode.exports = ScriptProcessorNodeConstructor;

ScriptProcessorNode.prototype._process = function (inNumSamples) {
  this._numSamples -= inNumSamples;

  if (this._numSamples <= 0) {
    this._numSamples += this.bufferSize;

    var event = new _AudioProcessingEvent2["default"](this);

    event.playbackTime = this.context.currentTime + this.bufferSize / this.context.sampleRate;
    event.inputBuffer = new _AudioBuffer2["default"](this.context, this.numberOfInputChannels, this.bufferSize, this.context.sampleRate);
    event.outputBuffer = new _AudioBuffer2["default"](this.context, this.numberOfOutputChannels, this.bufferSize, this.context.sampleRate);

    this.dispatchEvent(event);
  }
};

module.exports = _WebAudioTestAPI2["default"].ScriptProcessorNode = ScriptProcessorNode;
},{"./AudioBuffer":2,"./AudioNode":7,"./AudioProcessingEvent":9,"./WebAudioTestAPI":34,"./utils":41}],32:[function(require,module,exports){
"use strict";

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _import = require("./utils");

var _import2 = _interopRequireDefault(_import);

var _WebAudioTestAPI = require("./WebAudioTestAPI");

var _WebAudioTestAPI2 = _interopRequireDefault(_WebAudioTestAPI);

var _AudioNode = require("./AudioNode");

var _AudioNode2 = _interopRequireDefault(_AudioNode);

var OverSampleType = "enum { none, 2x, 4x }";

var WaveShaperNodeConstructor = function WaveShaperNode() {
  throw new TypeError("Illegal constructor: use audioContext.createWaveShaper()");
};
_import2["default"].inherits(WaveShaperNodeConstructor, _AudioNode2["default"]);

function WaveShaperNode(context) {
  _AudioNode2["default"].call(this, context, {
    name: "WaveShaperNode",
    numberOfInputs: 1,
    numberOfOutputs: 1,
    channelCount: 2,
    channelCountMode: "max",
    channelInterpretation: "speakers" });

  var curve = null;
  var oversample = "none";

  _import2["default"].defineAttribute(this, "curve", "Float32Array|null", curve, function (msg) {
    throw new TypeError(_import2["default"].formatter.concat(this, msg));
  });
  _import2["default"].defineAttribute(this, "oversample", OverSampleType, oversample, function (msg) {
    throw new TypeError(_import2["default"].formatter.concat(this, msg));
  });
}
_import2["default"].inherits(WaveShaperNode, WaveShaperNodeConstructor);

WaveShaperNode.exports = WaveShaperNodeConstructor;
WaveShaperNode.jsonAttrs = ["oversample"];

module.exports = _WebAudioTestAPI2["default"].WaveShaperNode = WaveShaperNode;
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

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _WebAudioAPI = require("./WebAudioAPI");

var _WebAudioAPI2 = _interopRequireDefault(_WebAudioAPI);

var WebAudioTestAPI = {};

WebAudioTestAPI.VERSION = "0.2.1";
WebAudioTestAPI.sampleRate = 44100;

WebAudioTestAPI.use = function () {
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

WebAudioTestAPI.unuse = function () {
  global.AnalyserNode = _WebAudioAPI2["default"].AnalyserNode;
  global.AudioBuffer = _WebAudioAPI2["default"].AudioBuffer;
  global.AudioBufferSourceNode = _WebAudioAPI2["default"].AudioBufferSourceNode;
  global.AudioContext = _WebAudioAPI2["default"].AudioContext;
  global.AudioDestinationNode = _WebAudioAPI2["default"].AudioDestinationNode;
  global.AudioListener = _WebAudioAPI2["default"].AudioListener;
  global.AudioNode = _WebAudioAPI2["default"].AudioNode;
  global.AudioParam = _WebAudioAPI2["default"].AudioParam;
  global.AudioProcessingEvent = _WebAudioAPI2["default"].AudioProcessingEvent;
  global.BiquadFilterNode = _WebAudioAPI2["default"].BiquadFilterNode;
  global.ChannelMergerNode = _WebAudioAPI2["default"].ChannelMergerNode;
  global.ChannelSplitterNode = _WebAudioAPI2["default"].ChannelSplitterNode;
  global.ConvolverNode = _WebAudioAPI2["default"].ConvolverNode;
  global.DelayNode = _WebAudioAPI2["default"].DelayNode;
  global.DynamicsCompressorNode = _WebAudioAPI2["default"].DynamicsCompressorNode;
  global.GainNode = _WebAudioAPI2["default"].GainNode;
  global.MediaElementAudioSourceNode = _WebAudioAPI2["default"].MediaElementAudioSourceNode;
  global.MediaStreamAudioDestinationNode = _WebAudioAPI2["default"].MediaStreamAudioDestinationNode;
  global.MediaStreamAudioSourceNode = _WebAudioAPI2["default"].MediaStreamAudioSourceNode;
  global.OfflineAudioCompletionEvent = _WebAudioAPI2["default"].OfflineAudioCompletionEvent;
  global.OfflineAudioContext = _WebAudioAPI2["default"].OfflineAudioContext;
  global.OscillatorNode = _WebAudioAPI2["default"].OscillatorNode;
  global.PannerNode = _WebAudioAPI2["default"].PannerNode;
  global.PeriodicWave = _WebAudioAPI2["default"].PeriodicWave;
  global.ScriptProcessorNode = _WebAudioAPI2["default"].ScriptProcessorNode;
  global.WaveShaperNode = _WebAudioAPI2["default"].WaveShaperNode;
};

module.exports = WebAudioTestAPI;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./WebAudioAPI":33}],35:[function(require,module,exports){
"use strict";

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _argsCheck = require("./argsCheck");

var _argsCheck2 = _interopRequireDefault(_argsCheck);

var _formatter = require("./formatter");

var _formatter2 = _interopRequireDefault(_formatter);

var _nth = require("./nth");

var _nth2 = _interopRequireDefault(_nth);

var Inspector = (function () {
  function Inspector(instance, methodName, argsInfo) {
    _classCallCheck(this, Inspector);

    this.instance = instance;
    this.argsInfo = argsInfo;
    this.form = _formatter2["default"].methodForm(instance, methodName, argsInfo);
  }

  _createClass(Inspector, [{
    key: "validateArguments",
    value: function validateArguments(args, callback) {
      var _this = this;

      var errIndex = _argsCheck2["default"](args, this.argsInfo.map(function (info) {
        return info.type;
      }));
      var msg = "";
      if (errIndex !== -1) {
        msg += "the " + _nth2["default"](errIndex) + " argument ";
        msg += _formatter2["default"].shouldBeButGot(this.argsInfo[errIndex].type, args[errIndex]);
        callback.call(this.instance, msg);
      }
      this.argsInfo.forEach(function (info, index) {
        var msg = info.validate && info.validate.call(_this.instance, args[index], _this.argsInfo[index].name);
        if (msg) {
          callback.call(_this.instance, msg);
        }
      });
    }
  }, {
    key: "assert",
    value: function assert(test, callback) {
      if (!test) {
        callback.call(this.instance);
      }
    }
  }]);

  return Inspector;
})();

exports["default"] = Inspector;
module.exports = exports["default"];
},{"./argsCheck":36,"./formatter":40,"./nth":44}],36:[function(require,module,exports){
"use strict";

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = argsCheck;

var _typeCheck = require("./typeCheck");

var _typeCheck2 = _interopRequireDefault(_typeCheck);

function argsCheck(args, types) {
  types = types.filter(function (type, index) {
    return !(/^optional/.test(type) && args.length <= index);
  });

  types = types.map(function (type) {
    return type.replace(/^optional\s*/, "");
  });

  for (var i = 0, imax = types.length; i < imax; i++) {
    if (!_typeCheck2["default"](args[i], types[i])) {
      return i;
    }
  }

  return -1;
}

module.exports = exports["default"];
},{"./typeCheck":50}],37:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = article;

function article(str) {
  return /[aeiou]/i.test(str.charAt(0)) ? "an" : "a";
}

module.exports = exports["default"];
},{}],38:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = defaults;

function defaults(value, defaultValue) {
  return typeof value !== "undefined" ? value : defaultValue;
}

module.exports = exports["default"];
},{}],39:[function(require,module,exports){
"use strict";

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = defineAttribute;

var _typeCheck = require("./typeCheck");

var _typeCheck2 = _interopRequireDefault(_typeCheck);

var _formatter = require("./formatter");

var _formatter2 = _interopRequireDefault(_formatter);

function defineAttribute(instance, name, type, value, callback) {
  var spec = { enumerable: true };

  if (typeof value === "function") {
    type = "readonly";
    spec.get = value;
  } else {
    spec.get = function () {
      return value;
    };
  }

  if (type === "readonly") {
    spec.set = function () {
      callback.call(instance, name + " is readonly");
    };
  } else {
    spec.set = function (newValue) {
      if (!_typeCheck2["default"](newValue, type)) {
        callback.call(instance, "" + name + " " + _formatter2["default"].shouldBeButGot(type, newValue));
      } else {
        value = newValue;
      }
    };
  }

  Object.defineProperty(instance, name, spec);
}

module.exports = exports["default"];
},{"./formatter":40,"./typeCheck":50}],40:[function(require,module,exports){
"use strict";

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _article = require("../utils/article");

var _article2 = _interopRequireDefault(_article);

var _pp = require("../utils/pp");

var _pp2 = _interopRequireDefault(_pp);

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
  msg += argsInfo.map(function (info) {
    return info.name + ": " + info.type;
  }).join(", ");
  msg += ")";

  return msg;
}

function shouldBeButGot(type, value) {
  var msg = "";

  type = type.replace(/^optional\s*/, "").trim();

  msg += "should be " + _article2["default"](type) + " " + type + ", ";
  msg += "but got: " + _pp2["default"](value);

  return msg;
}

function concat(instance, msg) {
  return "" + instance.constructor.name + "#" + msg;
}

exports["default"] = {
  methodForm: methodForm,
  shouldBeButGot: shouldBeButGot,
  concat: concat };
module.exports = exports["default"];
},{"../utils/article":37,"../utils/pp":45}],41:[function(require,module,exports){
"use strict";

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _inherits = require("./inherits");

var _inherits2 = _interopRequireDefault(_inherits);

var _defaults = require("./defaults");

var _defaults2 = _interopRequireDefault(_defaults);

var _article = require("./article");

var _article2 = _interopRequireDefault(_article);

var _name = require("./name");

var _name2 = _interopRequireDefault(_name);

var _preventSuper = require("./preventSuper");

var _preventSuper2 = _interopRequireDefault(_preventSuper);

var _toJSON = require("./toJSON");

var _toJSON2 = _interopRequireDefault(_toJSON);

var _toMicroseconds = require("./toMicroseconds");

var _toMicroseconds2 = _interopRequireDefault(_toMicroseconds);

var _toSeconds = require("./toSeconds");

var _toSeconds2 = _interopRequireDefault(_toSeconds);

var _typeCheck = require("./typeCheck");

var _typeCheck2 = _interopRequireDefault(_typeCheck);

var _formatter = require("./formatter");

var _formatter2 = _interopRequireDefault(_formatter);

var _defineAttribute = require("./defineAttribute");

var _defineAttribute2 = _interopRequireDefault(_defineAttribute);

exports["default"] = {
  inherits: _inherits2["default"],
  defaults: _defaults2["default"],
  article: _article2["default"],
  name: _name2["default"],
  preventSuper: _preventSuper2["default"],
  toJSON: _toJSON2["default"],
  toMicroseconds: _toMicroseconds2["default"],
  toSeconds: _toSeconds2["default"],
  typeCheck: _typeCheck2["default"],
  formatter: _formatter2["default"],
  defineAttribute: _defineAttribute2["default"] };
module.exports = exports["default"];
},{"./article":37,"./defaults":38,"./defineAttribute":39,"./formatter":40,"./inherits":42,"./name":43,"./preventSuper":46,"./toJSON":47,"./toMicroseconds":48,"./toSeconds":49,"./typeCheck":50}],42:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = inherits;

function inherits(ctor, superCtor) {
  if (superCtor) {
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: { value: ctor, enumerable: false, writable: true, configurable: true } });
  }
}

module.exports = exports["default"];
},{}],43:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = name;

function name(obj) {
  if (obj.hasOwnProperty("$id")) {
    return "" + obj.$name + "#" + obj.$id;
  }
  return obj.$name;
}

module.exports = exports["default"];
},{}],44:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = nth;

function nth(index) {
  index = index + 1;
  return ({ 1: "1st", 2: "2nd", 3: "3rd" })[index] || index + "th";
}

module.exports = exports["default"];
},{}],45:[function(require,module,exports){
"use strict";

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = pp;

var _article = require("./article");

var _article2 = _interopRequireDefault(_article);

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

  if (value.constructor === ({}).constructor) {
    return "{ " + Object.keys(value).map(function (key) {
      return key + ": " + pp(value[key]);
    }).join(", ") + "}";
  }

  var name = value.constructor.name || Object.prototype.toString.call(value).slice(8, -1);

  return "" + _article2["default"](name) + " " + name;
}

module.exports = exports["default"];
},{"./article":37}],46:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = preventSuper;

function preventSuper(superClass) {
  if (!superClass) {
    superClass = function () {};
  }
  function ctor() {}
  ctor.prototype = Object.create(superClass.prototype, {
    constructor: { value: ctor, enumerable: false, writable: true, configurable: true } });
  return ctor;
}

module.exports = exports["default"];
},{}],47:[function(require,module,exports){
"use strict";

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = toJSON;

var _name = require("./name");

var _name2 = _interopRequireDefault(_name);

function toJSON(node, func, memo) {
  var result;

  memo = memo || [];

  if (memo.indexOf(node) !== -1) {
    return "<circular:" + _name2["default"](node) + ">";
  }
  memo.push(node);

  result = func(node, memo);

  memo.pop();

  return result;
}

module.exports = exports["default"];
},{"./name":43}],48:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = toMicroseconds;
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
    value += +matches[3]; // milliseconds
    value *= 1000;
    return Math.max(MIN_VALUE, Math.min(value, MAX_VALUE));
  }

  return value;
}

module.exports = exports["default"];
},{}],49:[function(require,module,exports){
"use strict";

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = toSeconds;

var _toMicroseconds = require("./toMicroseconds");

var _toMicroseconds2 = _interopRequireDefault(_toMicroseconds);

function toSeconds(time) {
  return _toMicroseconds2["default"](time) / (1000 * 1000);
}

module.exports = exports["default"];
},{"./toMicroseconds":48}],50:[function(require,module,exports){
(function (global){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = typeCheck;
function _typeCheck(value, type) {
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
    return enumCheck(value, matches[1].split(",").map(function (item) {
      return item.trim();
    }));
  }

  return false;
}

function enumCheck(value, items) {
  return items.some(function (item) {
    if (/^\d+$/.test(item)) {
      return value === +item;
    }
    return value === item;
  });
}

function typeCheck(value, type) {
  return type.split("|").some(function (type) {
    return _typeCheck(value, type.trim());
  });
}

module.exports = exports["default"];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],51:[function(require,module,exports){
(function (global){
/* istanbul ignore else */
"use strict";

if (!global.WEB_AUDIO_TEST_API_IGNORE) {
  require("./AudioContext");
  require("./OfflineAudioContext");

  var WebAudioTestAPI = require("./WebAudioTestAPI");

  WebAudioTestAPI.use();

  module.exports = global.WebAudioTestAPI = WebAudioTestAPI;
}
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./AudioContext":4,"./OfflineAudioContext":27,"./WebAudioTestAPI":34}]},{},[51]);
