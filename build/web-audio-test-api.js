(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
"use strict";

/* istanbul ignore if */
if (global.WEB_AUDIO_TEST_API_IGNORE) {
  return;
}

var _ = require("./utils");

function ILLEGAL_CONSTRUCTOR(superCtor, err) {
  function ctor() {
    throw err;
  }
  if (superCtor) {
    _.inherits(ctor, superCtor);
  }
  return ctor;
}

global.Event = ILLEGAL_CONSTRUCTOR(
  null, new TypeError("Illegal constructor")
);

global.EventTarget = ILLEGAL_CONSTRUCTOR(
  null, new TypeError("Illegal constructor")
);

global.OfflineAudioCompletionEvent = ILLEGAL_CONSTRUCTOR(
  Event, new TypeError("Illegal constructor")
);

global.AudioProcessingEvent = ILLEGAL_CONSTRUCTOR(
  Event, new TypeError("Illegal constructor")
);

global.AudioBuffer = ILLEGAL_CONSTRUCTOR(
  null, new TypeError("Illegal constructor: use audioContext.createBuffer(numberOfChannels, length, sampleRate)")
);

global.AudioListener = ILLEGAL_CONSTRUCTOR(
  null, new TypeError("Illegal constructor")
);

global.AudioParam = ILLEGAL_CONSTRUCTOR(
  null, new TypeError("Illegal constructor")
);

global.PeriodicWave = ILLEGAL_CONSTRUCTOR(
  null, new TypeError("Illegal constructor: use audioContext.createPeriodicWave(real, imag)")
);

global.AudioNode = ILLEGAL_CONSTRUCTOR(
  null, new TypeError("Illegal constructor")
);

var AudioNode = require("./AudioNode");

global.AudioDestinationNode = ILLEGAL_CONSTRUCTOR(
  AudioNode, new TypeError("Illegal constructor")
);

global.GainNode = ILLEGAL_CONSTRUCTOR(
  AudioNode, new TypeError("Illegal constructor: use audioContext.createGain()")
);

global.DelayNode = ILLEGAL_CONSTRUCTOR(
  AudioNode, new TypeError("Illegal constructor: use audioContext.createDelay()")
);

global.AudioBufferSourceNode = ILLEGAL_CONSTRUCTOR(
  AudioNode, new TypeError("Illegal constructor: use audioContext.createBufferSource()")
);

global.MediaElementAudioSourceNode = ILLEGAL_CONSTRUCTOR(
  AudioNode, new TypeError("Illegal constructor: use audioContext.createMediaElementSource(mediaElement)")
);

global.ScriptProcessorNode = ILLEGAL_CONSTRUCTOR(
  AudioNode, new TypeError("Illegal constructor: use audioContext.createScriptProcessor(bufferSize, numberOfInputChannels, numberOfOutputChannels)")
);

global.PannerNode = ILLEGAL_CONSTRUCTOR(
  AudioNode, new TypeError("Illegal constructor: use audioContext.createPanner()")
);

global.ConvolverNode = ILLEGAL_CONSTRUCTOR(
  AudioNode, new TypeError("Illegal constructor: use audioContext.createConvolver()")
);

global.AnalyserNode = ILLEGAL_CONSTRUCTOR(
  AudioNode, new TypeError("Illegal constructor: use audioContext.createAnalyser()")
);

global.ChannelSplitterNode = ILLEGAL_CONSTRUCTOR(
  AudioNode, new TypeError("Illegal constructor: use audioContext.createChannelSplitter(numberOfOutputs)")
);

global.ChannelMergerNode = ILLEGAL_CONSTRUCTOR(
  AudioNode, new TypeError("Illegal constructor: use audioContext.createChannelMerger(numberOfInputs)")
);

global.DynamicsCompressorNode = ILLEGAL_CONSTRUCTOR(
  AudioNode, new TypeError("Illegal constructor: use audioContext.createDynamicsCompressor()")
);

global.BiquadFilterNode = ILLEGAL_CONSTRUCTOR(
  AudioNode, new TypeError("Illegal constructor: use audioContext.createBiquadFilter()")
);

global.WaveShaperNode = ILLEGAL_CONSTRUCTOR(
  AudioNode, new TypeError("Illegal constructor: use audioContext.createWaveShaper()")
);

global.OscillatorNode = ILLEGAL_CONSTRUCTOR(
  AudioNode, new TypeError("Illegal constructor: use audioContext.createOscillator()")
);

global.MediaStreamAudioSourceNode = ILLEGAL_CONSTRUCTOR(
  AudioNode, new TypeError("Illegal constructor: use audioContext.createMediaStreamSource(mediaStream)")
);

global.MediaStreamAudioDestinationNode = ILLEGAL_CONSTRUCTOR(
  AudioNode, new TypeError("Illegal constructor: use audioContext.createMediaStreamDestination()")
);

global.AudioContext = require("./AudioContext");

global.OfflineAudioContext = require("./OfflineAudioContext");

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./AudioContext":5,"./AudioNode":8,"./OfflineAudioContext":22,"./utils":35}],2:[function(require,module,exports){
(function (global){
"use strict";

var _ = require("./utils");
var AudioNode = require("./AudioNode");

function AnalyserNode(context) {
  AudioNode.call(this, {
    context: context,
    name: "AnalyserNode",
    jsonAttrs: [ "fftSize", "minDecibels", "maxDecibels", "smoothingTimeConstant" ],
    numberOfInputs  : 1,
    numberOfOutputs : 1,
    channelCount    : 1,
    channelCountMode: "explicit",
    channelInterpretation: "speakers"
  });
  _.$enum(this, "fftSize", [ 32, 64, 128, 256, 512, 1024, 2048 ], 2048);
  _.$read(this, "frequencyBinCount", function() { return this.fftSize >> 1; });
  _.$type(this, "minDecibels", "number", -100);
  _.$type(this, "maxDecibels", "number", 30);
  _.$type(this, "smoothingTimeConstant", "number", 0.8);
}
_.inherits(AnalyserNode, global.AnalyserNode);

AnalyserNode.prototype.getFloatFrequencyData = function(array) {
  _.check(_.caption(this, "getFloatFrequencyData(array)"), {
    array: { type: "Float32Array", given: array }
  });
};

AnalyserNode.prototype.getByteFrequencyData = function(array) {
  _.check(_.caption(this, "getByteFrequencyData(array)"), {
    array: { type: "Uint8Array", given: array }
  });
};

AnalyserNode.prototype.getByteTimeDomainData = function(array) {
  _.check(_.caption(this, "getByteTimeDomainData(array)"), {
    array: { type: "Uint8Array", given: array }
  });
};

module.exports = AnalyserNode;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./AudioNode":8,"./utils":35}],3:[function(require,module,exports){
(function (global){
"use strict";

var _ = require("./utils");

function AudioBuffer(context, numberOfChannels, length, sampleRate) {
  _.check("AudioBuffer(numerOfChannels, length, sampleRate)", {
    numberOfChannels: { type: "number", given: numberOfChannels },
    length          : { type: "number", given: length           },
    sampleRate      : { type: "number", given: sampleRate       },
  });
  _.$read(this, "sampleRate", sampleRate);
  _.$read(this, "length", length);
  _.$read(this, "duration", length / sampleRate);
  _.$read(this, "numberOfChannels", numberOfChannels);

  Object.defineProperties(this, {
    $name   : { value: "AudioBuffer" },
    $context: { value: context }
  });

  this._data = new Array(numberOfChannels);
  for (var i = 0; i < numberOfChannels; i++) {
    this._data[i] = new Float32Array(length);
  }
}
_.inherits(AudioBuffer, global.AudioBuffer);

function f32ToArray(f32) {
  var a = new Array(f32.length);
  for (var i = 0, imax = a.length; i < imax; ++i) {
    a[i] = f32[i];
  }
  return a;
}

AudioBuffer.prototype.toJSON = function() {
  var json = {
    name: this.$name,
    sampleRate: this.sampleRate,
    length: this.length,
    duration: this.duration,
    numberOfChannels: this.numberOfChannels
  };

  if (this.$context.VERBOSE_JSON) {
    json.data = this._data.map(f32ToArray);
  }

  return json;
};

AudioBuffer.prototype.getChannelData = function(channel) {
  if (0 <= channel && channel < this._data.length) {
    return this._data[channel];
  }
  throw new Error(_.format(
    "#{caption}: channel index (#{index}) exceeds number of channels (#{length})", {
      caption: _.caption(this, "getChannelData(channel)"),
      index  : channel,
      length : this._data.length
    }
  ));
};

module.exports = AudioBuffer;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./utils":35}],4:[function(require,module,exports){
(function (global){
"use strict";

var _ = require("./utils");
var AudioNode = require("./AudioNode");
var AudioParam = require("./AudioParam");
var AudioBuffer = require("./AudioBuffer");

function AudioBufferSourceNode(context) {
  AudioNode.call(this, {
    context: context,
    name: "AudioBufferSourceNode",
    jsonAttrs: [ "buffer", "playbackRate", "loop", "loopStart", "loopEnd" ],
    numberOfInputs  : 0,
    numberOfOutputs : 1,
    channelCount    : 2,
    channelCountMode: "max",
    channelInterpretation: "speakers"
  });
  _.$type(this, "buffer", AudioBuffer, null);
  _.$read(this, "playbackRate", new AudioParam(this, "playbackRate", 1, 0, 1024));
  _.$type(this, "loop", "boolean", false);
  _.$type(this, "loopStart", "number", 0);
  _.$type(this, "loopEnd", "number", 0);
  _.$type(this, "onended", "function", null);

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
_.inherits(AudioBufferSourceNode, global.AudioBufferSourceNode);

AudioBufferSourceNode.prototype.$stateAtTime = function(t) {
  if (this._startTime === Infinity) {
    return "UNSCHEDULED";
  } else if (t < this._startTime) {
    return "SCHEDULED";
  } else if (t < this._stopTime) {
    return "PLAYING";
  }
  return "FINISHED";
};

AudioBufferSourceNode.prototype._process = function(currentTime, nextCurrentTime) {
  if (!this._firedOnEnded) {
    if (!this.loop && this.buffer && this._startTime + this.buffer.duration <= nextCurrentTime) {
      this._stopTime = Math.min(this._startTime + this.buffer.duration, this._stopTime);
    }

    if (this.$stateAtTime(currentTime) === "FINISHED" && this.onended) {
      this.onended({});
      this._firedOnEnded = true;
    }
  }
};

AudioBufferSourceNode.prototype.start = function(when, offset, duration) {
  var caption = _.caption(this, "start(when, offset, duration)");
  _.check(caption, {
    when    : { type: "number", given: _.defaults(when    , 0) },
    offset  : { type: "number", given: _.defaults(offset  , 0) },
    duration: { type: "number", given: _.defaults(duration, 0) },
  });
  if (this._startTime !== Infinity) {
    throw new Error(_.format(
      "#{caption} cannot start more than once", {
        caption: caption
      }
    ));
  }
  this._startTime = when;
};

AudioBufferSourceNode.prototype.stop = function(when) {
  var caption = _.caption(this, "stop(when)");
  _.check(caption, {
    when: { type: "number", given: _.defaults(when, 0) }
  });
  if (this._startTime === Infinity) {
    throw new Error(_.format(
      "#{caption} cannot call stop without calling start first", {
      caption: caption
      }
    ));
  }
  if (this._stopTime !== Infinity) {
    throw new Error(_.format(
      "#{caption} cannot stop more than once", {
        caption: caption
      }
    ));
  }
  this._stopTime = when;
};

module.exports = AudioBufferSourceNode;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./AudioBuffer":3,"./AudioNode":8,"./AudioParam":9,"./utils":35}],5:[function(require,module,exports){
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
  _.$read(this, "currentTime", function() { return this._currentTime; });
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

},{"./AnalyserNode":2,"./AudioBuffer":3,"./AudioBufferSourceNode":4,"./AudioDestinationNode":6,"./AudioListener":7,"./BiquadFilterNode":11,"./ChannelMergerNode":12,"./ChannelSplitterNode":13,"./ConvolverNode":14,"./DelayNode":15,"./DynamicsCompressorNode":16,"./GainNode":17,"./MediaElementAudioSourceNode":18,"./MediaStreamAudioDestinationNode":19,"./MediaStreamAudioSourceNode":20,"./OscillatorNode":23,"./PannerNode":24,"./PeriodicWave":25,"./ScriptProcessorNode":26,"./WaveShaperNode":27,"./utils":35}],6:[function(require,module,exports){
(function (global){
"use strict";

var _ = require("./utils");
var AudioNode = require("./AudioNode");

function AudioDestinationNode(context) {
  AudioNode.call(this, {
    context: context,
    name: "AudioDestinationNode",
    jsonAttrs: [],
    numberOfInputs  : 1,
    numberOfOutputs : 0,
    channelCount    : 2,
    channelCountMode: "explicit",
    channelInterpretation: "speakers"
  });
  _.$read(this, "maxChannelCount", 2);
}
_.inherits(AudioDestinationNode, global.AudioDestinationNode);

module.exports = AudioDestinationNode;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./AudioNode":8,"./utils":35}],7:[function(require,module,exports){
(function (global){
"use strict";

var _ = require("./utils");

function AudioListener(context) {
  _.$type(this, "dopplerFactor", "number", 1);
  _.$type(this, "speedOfSound", "number", 343.3);

  Object.defineProperties(this, {
    $name   : { value: "AudioListener" },
    $context: { value: context }
  });
}
_.inherits(AudioListener, global.AudioListener);

AudioListener.prototype.setPosition = function(x, y, z) {
  _.check(_.caption(this, "setPosition(x, y, z)"), {
    x: { type: "number", given: x },
    y: { type: "number", given: y },
    z: { type: "number", given: z },
  });
};

AudioListener.prototype.setOrientation = function(x, y, z, xUp, yUp, zUp) {
  _.check(_.caption(this, "setOrientation(x, y, z, xUp, yUp, zUp)"), {
    x  : { type: "number", given: x   },
    y  : { type: "number", given: y   },
    z  : { type: "number", given: z   },
    xUp: { type: "number", given: xUp },
    yUp: { type: "number", given: yUp },
    zUp: { type: "number", given: zUp },
  });
};

AudioListener.prototype.setVelocity = function(x, y, z) {
  _.check(_.caption(this, "setVelocity(x, y, z)"), {
    x: { type: "number", given: x },
    y: { type: "number", given: y },
    z: { type: "number", given: z },
  });
};

module.exports = AudioListener;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./utils":35}],8:[function(require,module,exports){
(function (global){
"use strict";

var _ = require("./utils");

function AudioNode(spec) {
  _.$read(this, "context", spec.context);
  _.$read(this, "numberOfInputs", spec.numberOfInputs);
  _.$read(this, "numberOfOutputs", spec.numberOfOutputs);
  _.$type(this, "channelCount", "number", spec.channelCount);
  _.$enum(this, "channelCountMode", [ "max", "clamped-max", "explicit" ], spec.channelCountMode);
  _.$enum(this, "channelInterpretation", [ "speakers", "discrete" ], spec.channelInterpretation);

  Object.defineProperties(this, {
    $name     : { value: spec.name },
    $context  : { value: spec.context },
    $inputs   : { value: [] },
    $jsonAttrs: { value: spec.jsonAttrs },
  });
  this._outputs = [];
  this._currentTime = -1;
}
_.inherits(AudioNode, global.AudioNode);

AudioNode.prototype.$process = function(currentTime, nextCurrentTime) {
  /* istanbul ignore else */
  if (currentTime !== this._currentTime) {
    this._currentTime = currentTime;

    this.$inputs.forEach(function(src) {
      src.$process(currentTime, nextCurrentTime);
    });

    Object.keys(this).forEach(function(key) {
      if (this[key] instanceof AudioParam) {
        this[key].$process(currentTime, nextCurrentTime);
      }
    }, this);

    if (this._process) {
      this._process(currentTime, nextCurrentTime);
    }
  }
};

AudioNode.prototype.toJSON = function(memo) {
  return _.jsonCircularCheck(this, function(memo) {
    var json = {};

    json.name = _.id(this);

    this.$jsonAttrs.forEach(function(key) {
      if (this[key] && this[key].toJSON) {
        json[key] = this[key].toJSON(memo);
      } else {
        json[key] = this[key];
      }
    }, this);

    if (this.$context.VERBOSE_JSON) {
      json.numberOfInputs = this.numberOfInputs;
      json.numberOfOutputs = this.numberOfOutputs;
      json.channelCount = this.channelCount;
      json.channelCountMode = this.channelCountMode;
      json.channelInterpretation = this.channelInterpretation;
    }

    json.inputs = this.$inputs.map(function(node) {
      return node.toJSON(memo);
    });

    return json;
  }, memo || /* istanbul ignore next */ []);
};

AudioNode.prototype.connect = function(destination, output, input) {
  var caption = _.caption(this, "connect(destination, output, input)");

  output = _.defaults(output, 0);
  input  = _.defaults(input , 0);

  if (!(destination instanceof AudioNode || destination instanceof AudioParam)) {
    throw new TypeError(_.format(
      "#{caption}: '#{name}' should be #{type}, but got #{given}", {
        caption: caption,
        name   : "destination",
        type   : "an instance of AudioNode or AudioParam",
        given  : _.toS(destination)
      }
    ));
  }

  _.check(caption, {
    output: { type: "number", given: output },
    input : { type: "number", given: input  },
  });

  if (this.$context !== destination.$context) {
    throw new Error(_.format(
      "#{caption}: cannot connect to a destination belonging to a different audio context", {
        caption: caption
      }
    ));
  }
  if (output < 0 || this.numberOfOutputs <= output) {
    throw new Error(_.format(
      "#{caption}: output index (#{index}) exceeds number of outputs (#{length})", {
        caption: caption,
        index  : output,
        length : this.numberOfOutputs
      }
    ));
  }
  if (input < 0 || destination.numberOfInputs <= input) {
    throw new Error(_.format(
      "#{caption}: input index (#{index}) exceeds number of inputs (#{length})", {
        caption: caption,
        index  : input,
        length : destination.numberOfInputs
      }
    ));
  }

  var index = this._outputs.indexOf(destination);
  /* istanbul ignore else */
  if (index === -1) {
    this._outputs.push(destination);
    destination.$inputs.push(this);
  }
};

AudioNode.prototype.disconnect = function(output) {
  var caption = _.caption(this, "disconnect(output)");

  output = _.defaults(output, 0);

  _.check(caption, {
    output: { type: "number", given: output }
  });

  if (output < 0 || this.numberOfOutputs <= output) {
    throw new Error(_.format(
      "#{caption}: output index (#{index}) exceeds number of outputs (#{length})", {
        caption: caption,
        index  : output,
        length : this.numberOfOutputs
      }
    ));
  }

  this._outputs.splice(0).forEach(function(dst) {
    var index = dst.$inputs.indexOf(this);
    /* istanbul ignore else */
    if (index !== -1) {
      dst.$inputs.splice(index, 1);
    }
  }, this);
};

module.exports = AudioNode;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./utils":35}],9:[function(require,module,exports){
(function (global){
"use strict";

var _ = require("./utils");

function AudioParam(node, name, defaultValue, minValue, maxValue) {
  var context = node.context;

  _.$read(this, "name", name);
  _.$read(this, "defaultValue", defaultValue);
  _.$read(this, "minValue", minValue);
  _.$read(this, "maxValue", maxValue);
  _.$type(this, "value", {
    type: "number",
    getter: function() {
      this._value = this.$valueAtTime(context.currentTime);
      return this._value;
    }
  }, defaultValue);

  Object.defineProperties(this, {
    $name   : { value: "AudioParam" },
    $context: { value: context },
    $node   : { value: node },
    $inputs : { value: [] },
    $events : { value: [] },
  });

  this._currentTime = -1;
}
_.inherits(AudioParam, global.AudioParam);

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

AudioParam.prototype.$valueAtTime = function(t) {
  var value  = this._value;
  var events = this.$events;
  var t0;

  for (var i = 0; i < events.length; i++) {
    var e0 = events[i];
    var e1 = events[i + 1];

    if (t < e0.time) {
      break;
    }
    t0 = Math.min(t, e1 ? e1.time : t);

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

AudioParam.prototype.$process = function(currentTime, nextCurrentTime) {
  /* istanbul ignore else */
  if (currentTime !== this._currentTime) {
    this._currentTime = currentTime;

    this.$inputs.forEach(function(src) {
      src.$process(currentTime, nextCurrentTime);
    });
  }
};

AudioParam.prototype.toJSON = function(memo) {
  return _.jsonCircularCheck(this, function(memo) {
    var json = {};

    json.value = this.value;

    json.inputs = this.$inputs.map(function(node) {
      return node.toJSON(memo);
    });

    return json;
  }, memo || /* istanbul ignore next */ []);
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

AudioParam.prototype.setValueAtTime = function(value, startTime) {
  _.check("AudioParam#setValueAtTime(value, startTime)", {
    value    : { type: "number", given: value     },
    startTime: { type: "number", given: startTime },
  });
  insertEvent(this, {
    type : "SetValue",
    value: value,
    time : startTime,
  });
};

AudioParam.prototype.linearRampToValueAtTime = function(value, endTime) {
  _.check("AudioParam#linearRampToValueAtTime(value, endTime)", {
    value  : { type: "number", given: value   },
    endTime: { type: "number", given: endTime },
  });
  insertEvent(this, {
    type : "LinearRampToValue",
    value: value,
    time : endTime,
  });
};

AudioParam.prototype.exponentialRampToValueAtTime = function(value, endTime) {
  _.check("AudioParam#exponentialRampToValueAtTime(value, endTime)", {
    value  : { type: "number", given: value   },
    endTime: { type: "number", given: endTime },
  });
  insertEvent(this, {
    type : "ExponentialRampToValue",
    value: value,
    time : endTime,
  });
};

AudioParam.prototype.setTargetAtTime = function(target, startTime, timeConstant) {
  _.check("AudioParam#setTargetAtTime(target, startTime, timeConstant)", {
    target      : { type: "number", given: target       },
    startTime   : { type: "number", given: startTime    },
    timeConstant: { type: "number", given: timeConstant },
  });
  insertEvent(this, {
    type : "SetTarget",
    value: target,
    time : startTime,
    timeConstant: timeConstant
  });
};

AudioParam.prototype.setValueCurveAtTime = function(values, startTime, duration) {
  _.check("AudioParam#setValueCurveAtTime(values, startTime, duration)", {
    values   : { type: "Float32Array", given: values },
    startTime: { type: "number"      , given: startTime },
    duration : { type: "number"      , given: duration }
  });
  insertEvent(this, {
    type : "SetValueCurve",
    time : startTime,
    duration: duration,
    curve: values
  });
};

AudioParam.prototype.cancelScheduledValues = function(startTime) {
  _.check("AudioParam#cancelScheduledValues(startTime)", {
    startTime: { type: "number", given: startTime }
  });
  var events = this.$events;

  for (var i = 0, imax = events.length; i < imax; ++i) {
    if (events[i].time >= startTime) {
      return events.splice(i);
    }
  }
};

module.exports = AudioParam;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./utils":35}],10:[function(require,module,exports){
(function (global){
"use strict";

var _ = require("./utils");

function AudioProcessingEvent(node) {
  Object.defineProperties(this, {
    $name: { value: "AudioProcessingEvent" }
  });
  Object.defineProperties(this, {
    $node: { value: node }
  });
}
_.inherits(AudioProcessingEvent, global.AudioProcessingEvent);

module.exports = AudioProcessingEvent;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./utils":35}],11:[function(require,module,exports){
(function (global){
"use strict";

var _ = require("./utils");
var AudioNode = require("./AudioNode");
var AudioParam = require("./AudioParam");

function BiquadFilterNode(context) {
  AudioNode.call(this, {
    context: context,
    name: "BiquadFilterNode",
    jsonAttrs: [ "type", "frequency", "detune", "Q", "gain" ],
    numberOfInputs  : 1,
    numberOfOutputs : 1,
    channelCount    : 2,
    channelCountMode: "max",
    channelInterpretation: "speakers"
  });
  _.$enum(this, "type", [
    "lowpass", "highpass", "bandpass", "lowshelf", "highshelf", "peaking", "notch", "allpass"
  ], "lowpass");
  _.$read(this, "frequency", new AudioParam(this, "frequency", 350, 10, _.SAMPLERATE / 2));
  _.$read(this, "detune", new AudioParam(this, "detune", 0, -4800, 4800));
  _.$read(this, "Q", new AudioParam(this, "Q", 1, 0.0001, 1000));
  _.$read(this, "gain", new AudioParam(this, "gain", 0, -40, 40));
}
_.inherits(BiquadFilterNode, global.BiquadFilterNode);

BiquadFilterNode.prototype.getFrequencyResponse = function(frequencyHz, magResponse, phaseResponse) {
  _.check(_.caption(this, "getFrequencyResponse(frequencyHz, magResponse, phaseResponse)"), {
    frequencyHz  : { type: "Float32Array", given: frequencyHz },
    magResponse  : { type: "Float32Array", given: magResponse },
    phaseResponse: { type: "Float32Array", given: phaseResponse },
  });
};

module.exports = BiquadFilterNode;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./AudioNode":8,"./AudioParam":9,"./utils":35}],12:[function(require,module,exports){
(function (global){
"use strict";

var _ = require("./utils");
var AudioNode = require("./AudioNode");

function ChannelMergerNode(context, numberOfInputs) {
  _.check("ChannelMergerNode(numberOfInputs)", {
    numberOfInputs: { type: "number", given: numberOfInputs }
  });
  AudioNode.call(this, {
    context: context,
    name: "ChannelMergerNode",
    jsonAttrs: [],
    numberOfInputs  : numberOfInputs,
    numberOfOutputs : 1,
    channelCount    : 2,
    channelCountMode: "max",
    channelInterpretation: "speakers"
  });
}
_.inherits(ChannelMergerNode, global.ChannelMergerNode);

module.exports = ChannelMergerNode;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./AudioNode":8,"./utils":35}],13:[function(require,module,exports){
(function (global){
"use strict";

var _ = require("./utils");
var AudioNode = require("./AudioNode");

function ChannelSplitterNode(context, numberOfOutputs) {
  _.check("ChannelSplitterNode(numberOfOutputs)", {
    numberOfOutputs: { type: "number", given: numberOfOutputs }
  });
  AudioNode.call(this, {
    context: context,
    name: "ChannelSplitterNode",
    jsonAttrs: [],
    numberOfInputs  : 1,
    numberOfOutputs : numberOfOutputs,
    channelCount    : 2,
    channelCountMode: "max",
    channelInterpretation: "speakers"
  });
}
_.inherits(ChannelSplitterNode, global.ChannelSplitterNode);

module.exports = ChannelSplitterNode;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./AudioNode":8,"./utils":35}],14:[function(require,module,exports){
(function (global){
"use strict";

var _ = require("./utils");
var AudioNode = require("./AudioNode");

function ConvolverNode(context) {
  AudioNode.call(this, {
    context: context,
    name: "ConvolverNode",
    jsonAttrs: [ "normalize" ],
    numberOfInputs  : 1,
    numberOfOutputs : 1,
    channelCount    : 2,
    channelCountMode: "clamped-max",
    channelInterpretation: "speakers"
  });
  _.$type(this, "buffer", AudioBuffer, null);
  _.$type(this, "normalize", "boolean", true);
}
_.inherits(ConvolverNode, global.ConvolverNode);

module.exports = ConvolverNode;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./AudioNode":8,"./utils":35}],15:[function(require,module,exports){
(function (global){
"use strict";

var _ = require("./utils");
var AudioNode = require("./AudioNode");
var AudioParam = require("./AudioParam");

function DelayNode(context, maxDelayTime) {
  AudioNode.call(this, {
    context: context,
    name: "DelayNode",
    jsonAttrs: [ "delayTime"　],
    numberOfInputs  : 1,
    numberOfOutputs : 1,
    channelCount    : 2,
    channelCountMode: "max",
    channelInterpretation: "speakers"
  });
  _.$read(this, "delayTime", new AudioParam(this, "delayTime", 0, 0, maxDelayTime));

  Object.defineProperties(this, {
    $maxDelayTime: { value: maxDelayTime }
  });
}
_.inherits(DelayNode, global.DelayNode);

module.exports = DelayNode;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./AudioNode":8,"./AudioParam":9,"./utils":35}],16:[function(require,module,exports){
(function (global){
"use strict";

var _ = require("./utils");
var AudioNode = require("./AudioNode");
var AudioParam = require("./AudioParam");

function DynamicsCompressorNode(context) {
  AudioNode.call(this, {
    context: context,
    name: "DynamicsCompressorNode",
    jsonAttrs: [ "threshold", "knee", "ratio", "reduction", "attack", "release" ],
    numberOfInputs  : 1,
    numberOfOutputs : 1,
    channelCount    : 2,
    channelCountMode: "explicit",
    channelInterpretation: "speakers"
  });
  _.$read(this, "threshold", new AudioParam(this, "threshold", -24, -100, 0));
  _.$read(this, "knee", new AudioParam(this, "knee", 30, 0, 40));
  _.$read(this, "ratio", new AudioParam(this, "ratio", 12, 1, 20));
  _.$read(this, "reduction", new AudioParam(this, "reduction", 0, -20, 0));
  _.$read(this, "attack", new AudioParam(this, "attack", 0.003, 0, 1.0));
  _.$read(this, "release", new AudioParam(this, "release", 0.250, 0, 1.0));
}
_.inherits(DynamicsCompressorNode, global.DynamicsCompressorNode);

module.exports = DynamicsCompressorNode;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./AudioNode":8,"./AudioParam":9,"./utils":35}],17:[function(require,module,exports){
(function (global){
"use strict";

var _ = require("./utils");
var AudioNode = require("./AudioNode");
var AudioParam = require("./AudioParam");

function GainNode(context) {
  AudioNode.call(this, {
    context: context,
    name: "GainNode",
    jsonAttrs: [ "gain"　],
    numberOfInputs  : 1,
    numberOfOutputs : 1,
    channelCount    : 2,
    channelCountMode: "max",
    channelInterpretation: "speakers"
  });
  _.$read(this, "gain", new AudioParam(this, "gain", 1.0, 0.0, 1.0));
}
_.inherits(GainNode, global.GainNode);

module.exports = GainNode;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./AudioNode":8,"./AudioParam":9,"./utils":35}],18:[function(require,module,exports){
(function (global){
"use strict";

var _ = require("./utils");
var AudioNode = require("./AudioNode");

function MediaElementAudioSourceNode(context) {
  AudioNode.call(this, {
    context: context,
    name: "MediaElementAudioSourceNode",
    jsonAttrs: [],
    numberOfInputs  : 0,
    numberOfOutputs : 1,
    channelCount    : 2,
    channelCountMode: "max",
    channelInterpretation: "speakers"
  });
}
_.inherits(MediaElementAudioSourceNode, global.MediaElementAudioSourceNode);

module.exports = MediaElementAudioSourceNode;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./AudioNode":8,"./utils":35}],19:[function(require,module,exports){
(function (global){
"use strict";

var _ = require("./utils");
var AudioNode = require("./AudioNode");

function MediaStreamAudioDestinationNode(context) {
  AudioNode.call(this, {
    context: context,
    name: "MediaStreamAudioDestinationNode",
    jsonAttrs:  [],
    numberOfInputs  : 1,
    numberOfOutputs : 0,
    channelCount    : 2,
    channelCountMode: "explicit",
    channelInterpretation: "speakers"
  });
}
_.inherits(MediaStreamAudioDestinationNode, global.MediaStreamAudioDestinationNode);

module.exports = MediaStreamAudioDestinationNode;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./AudioNode":8,"./utils":35}],20:[function(require,module,exports){
(function (global){
"use strict";

var _ = require("./utils");
var AudioNode = require("./AudioNode");

function　MediaStreamAudioSourceNode(context) {
  AudioNode.call(this, {
    context: context,
    name: "MediaStreamAudioSourceNode",
    jsonAttrs:  [],
    numberOfInputs  : 0,
    numberOfOutputs : 1,
    channelCount    : 2,
    channelCountMode: "max",
    channelInterpretation: "speakers"
  });
}
_.inherits(MediaStreamAudioSourceNode, global.MediaStreamAudioSourceNode);

module.exports = MediaStreamAudioSourceNode;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./AudioNode":8,"./utils":35}],21:[function(require,module,exports){
(function (global){
"use strict";

var _ = require("./utils");

function OfflineAudioCompletionEvent(node) {
  Object.defineProperties(this, {
    $name: { value: "OfflineAudioCompletionEvent" },
    $node: { value: node }
  });
}
_.inherits(OfflineAudioCompletionEvent, global.OfflineAudioCompletionEvent);

module.exports = OfflineAudioCompletionEvent;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./utils":35}],22:[function(require,module,exports){
(function (global){
"use strict";

var _ = require("./utils");
var AudioBuffer = require("./AudioBuffer");
var AudioDestinationNode = require("./AudioDestinationNode");
var AudioListener = require("./AudioListener");
var OfflineAudioCompletionEvent = require("./OfflineAudioCompletionEvent");

function OfflineAudioContext(numberOfChannels, length, sampleRate) {
  _.check("OfflineAudioContext(numberOfChannels, length, sampleRate)", {
    numberOfChannels: { type: "number", given: numberOfChannels },
    length          : { type: "number", given: length           },
    sampleRate      : { type: "number", given: sampleRate       },
  });

  _.$read(this, "destination", new AudioDestinationNode(this));
  _.$read(this, "sampleRate", sampleRate);
  _.$read(this, "currentTime", function() { return this._currentTime; });
  _.$read(this, "listener", new AudioListener(this));
  _.$type(this, "oncomplete", "function", null);

  Object.defineProperties(this, {
    $name   : { value: "OfflineAudioContext" },
    $context: { value: this }
  });

  this._currentTime = 0;
  this._targetTime  = 0;
  this._remain = 0;

  this._numberOfChannels = numberOfChannels;
  this._length = length;
  this._processed = 0;
  this._rendering = false;
}
_.inherits(OfflineAudioContext, global.AudioContext);

OfflineAudioContext.prototype.$process = function(duration) {
  var dx;

  if (!this._rendering || this._length <= this._processed) {
    return;
  }

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
    this._processed += _.BUFFER_SIZE * (dx / _.CURRENT_TIME_INCR);
  }

  if (this._length <= this._processed && this.oncomplete) {
    var e = new OfflineAudioCompletionEvent(this);

    e.renderedBuffer = new AudioBuffer(this, this._numberOfChannels, this._length, this.sampleRate);

    this.oncomplete(e);
  }
};

OfflineAudioContext.prototype.startRendering = function() {
  if (this._rendering) {
    throw new Error(_.format(
      "#{caption} must only be called one time", {
        caption: _.caption(this, "startRendering()")
      }
    ));
  }
  this._rendering = true;
};

module.exports = OfflineAudioContext;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./AudioBuffer":3,"./AudioDestinationNode":6,"./AudioListener":7,"./OfflineAudioCompletionEvent":21,"./utils":35}],23:[function(require,module,exports){
(function (global){
"use strict";

var _ = require("./utils");
var AudioNode = require("./AudioNode");
var AudioParam = require("./AudioParam");

function OscillatorNode(context) {
  AudioNode.call(this, {
    context: context,
    name: "OscillatorNode",
    jsonAttrs:  [ "type", "frequency", "detune" ],
    numberOfInputs  : 0,
    numberOfOutputs : 1,
    channelCount    : 2,
    channelCountMode: "max",
    channelInterpretation: "speakers"
  });

  _.$enum(this, "type", [ "sine", "square", "sawtooth", "triangle" ], "sine");
  _.$read(this, "frequency", new AudioParam(this, "frequency", 440, 0, 100000));
  _.$read(this, "detune", new AudioParam(this, "detune", 0, -4800, 4800));
  _.$type(this, "onended", "function", null);

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

  this._custom = null;
  this._startTime = Infinity;
  this._stopTime  = Infinity;
  this._firedOnEnded = false;
}
_.inherits(OscillatorNode, global.OscillatorNode);

OscillatorNode.prototype.$stateAtTime = function(t) {
  if (this._startTime === Infinity) {
    return "UNSCHEDULED";
  } else if (t < this._startTime) {
    return "SCHEDULED";
  } else if (t < this._stopTime) {
    return "PLAYING";
  }
  return "FINISHED";
};

OscillatorNode.prototype._process = function(currentTime) {
  if (!this._firedOnEnded && this.$stateAtTime(currentTime) === "FINISHED" && this.onended) {
    this.onended({});
    this._firedOnEnded = true;
  }
};

OscillatorNode.prototype.start = function(when) {
  var caption = _.caption(this, "start(when)");
  _.check(caption, {
    when: { type: "number", given: _.defaults(when, 0) }
  });
  if (this._startTime !== Infinity) {
    throw new Error(_.format(
      "#{caption} cannot start more than once", {
        caption: caption
      }
    ));
  }
  this._startTime = when;
};

OscillatorNode.prototype.stop = function(when) {
  var caption = _.caption(this, "stop(when)");
  _.check(caption, {
    when: { type: "number", given: _.defaults(when, 0) }
  });
  if (this._startTime === Infinity) {
    throw new Error(_.format(
      "#{caption} cannot call stop without calling start first", {
        caption: caption
      }
    ));
  }
  if (this._stopTime !== Infinity) {
    throw new Error(_.format(
      "#{caption} cannot stop more than once", {
        caption: caption
      }
    ));
  }
  this._stopTime = when;
};

OscillatorNode.prototype.setPeriodicWave = function(periodicWave) {
  _.check(_.caption(this, "setPeriodicWave(periodicWave)"), {
    periodicWave: { type: "PeriodicWave", given: periodicWave }
  });
  this._type = "custom";
  this._custom = periodicWave;
};

module.exports = OscillatorNode;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./AudioNode":8,"./AudioParam":9,"./utils":35}],24:[function(require,module,exports){
(function (global){
"use strict";

var _ = require("./utils");
var AudioNode = require("./AudioNode");

function PannerNode(context) {
  AudioNode.call(this, {
    context: context,
    name: "PannerNode",
    jsonAttrs: [
      "panningModel", "distanceModel", "refDistance", "maxDistance",
      "rolloffFactor", "coneInnerAngle", "coneOuterAngle", "coneOuterGain"
    ],
    numberOfInputs  : 1,
    numberOfOutputs : 1,
    channelCount    : 2,
    channelCountMode: "clamped-max",
    channelInterpretation: "speakers"
  });
  _.$enum(this, "panningModel", [ "equalpower", "HRTF" ], "HRTF");
  _.$enum(this, "distanceModel", [ "linear", "inverse", "exponential" ], "inverse");
  _.$type(this, "refDistance", "number", 1);
  _.$type(this, "maxDistance", "number", 10000);
  _.$type(this, "rolloffFactor", "number", 1);
  _.$type(this, "coneInnerAngle", "number", 360);
  _.$type(this, "coneOuterAngle", "number", 360);
  _.$type(this, "coneOuterGain", "number", 0);
}
_.inherits(PannerNode, global.PannerNode);

PannerNode.prototype.setPosition = function(x, y, z) {
  _.check(_.caption(this, "setPosition(x, y, z)"), {
    x: { type: "number", given: x },
    y: { type: "number", given: y },
    z: { type: "number", given: z },
  });
};

PannerNode.prototype.setOrientation = function(x, y, z) {
  _.check(_.caption(this, "setOrientation(x, y, z)"), {
    x: { type: "number", given: x },
    y: { type: "number", given: y },
    z: { type: "number", given: z },
  });
};

PannerNode.prototype.setVelocity = function(x, y, z) {
  _.check(_.caption(this, "setVelocity(x, y, z)"), {
    x: { type: "number", given: x },
    y: { type: "number", given: y },
    z: { type: "number", given: z },
  });
};

module.exports = PannerNode;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./AudioNode":8,"./utils":35}],25:[function(require,module,exports){
(function (global){
"use strict";

var _ = require("./utils");

function PeriodicWave(real, imag) {
  var caption = "PeriodicWave(real, imag)";
  _.check(caption, {
    real: { type: "Float32Array", given: real },
    imag: { type: "Float32Array", given: imag },
  });
  if (real.length !== imag.length) {
    throw new Error(_.format(
      "#{caption}: length of real array (#{real}) and length of imaginary array (#{imag}) must match", {
        caption: caption,
        real: real.length,
        imag: imag.length
      }
    ));
  }
  if (4096 < real.length || 4096 < imag.length) {
    throw new Error(_.format(
      "#{caption}: length of array (#{length}) exceeds allow maximum of 4096", {
        caption: caption,
        length : Math.max(real.length, imag.length)
      }
    ));
  }
  Object.defineProperties(this, {
    $name: { value: "PeriodicWave" },
    $real: { value: real },
    $imag: { value: imag },
  });
}
_.inherits(PeriodicWave, global.PeriodicWave);

module.exports = PeriodicWave;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./utils":35}],26:[function(require,module,exports){
(function (global){
"use strict";

var _ = require("./utils");
var AudioNode = require("./AudioNode");
var AudioBuffer = require("./AudioBuffer");
var AudioProcessingEvent = require("./AudioProcessingEvent");

function ScriptProcessorNode(context, bufferSize, numberOfInputChannels, numberOfOutputChannels) {
  if ([ 256, 512, 1024, 2048, 4096, 8192, 16384 ].indexOf(bufferSize) === -1) {
    throw new TypeError(_.format(
      "#{caption}: invalid bufferSize: #{0}", {
        caption   : "ScriptProcessorNode(bufferSize, numberOfInputChannels, numberOfOutputChannels)",
        bufferSize: _.toS(bufferSize)
      }
    ));
  }
  _.check("ScriptProcessorNode(bufferSize, numberOfInputChannels, numberOfOutputChannels)", {
    numberOfInputChannels : { type: "number", given: numberOfInputChannels  },
    numberOfOutputChannels: { type: "number", given: numberOfOutputChannels },
  });
  AudioNode.call(this, {
    context: context,
    name: "ScriptProcessorNode",
    jsonAttrs: [],
    numberOfInputs  : 1,
    numberOfOutputs : 1,
    channelCount    : numberOfInputChannels,
    channelCountMode: "max",
    channelInterpretation: "speakers"
  });
  _.$read(this, "numberOfInputChannels", numberOfInputChannels);
  _.$read(this, "numberOfOutputChannels", numberOfOutputChannels);
  _.$read(this, "bufferSize", bufferSize);
  _.$type(this, "onaudioprocess", "function", null);

  this._numSamples = 0;
}
_.inherits(ScriptProcessorNode, global.ScriptProcessorNode);

ScriptProcessorNode.prototype._process = function(currentTime, nextCurrentTime) {
  var numSamples = ((nextCurrentTime - currentTime) / _.CURRENT_TIME_INCR) * _.BUFFER_SIZE;

  this._numSamples -= numSamples;

  if (this._numSamples <= 0 && this.onaudioprocess) {
    this._numSamples += this.bufferSize;

    var e = new AudioProcessingEvent(this);

    e.playbackTime = this.context.currentTime;
    e.inputBuffer = new AudioBuffer(this.context, this.numberOfInputChannels, this.bufferSize, this.context.sampleRate);
    e.outputBuffer = new AudioBuffer(this.context, this.numberOfOutputChannels, this.bufferSize, this.context.sampleRate);

    this.onaudioprocess(e);
  }
};

module.exports = ScriptProcessorNode;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./AudioBuffer":3,"./AudioNode":8,"./AudioProcessingEvent":10,"./utils":35}],27:[function(require,module,exports){
(function (global){
"use strict";

var _ = require("./utils");
var AudioNode = require("./AudioNode");

function WaveShaperNode(context) {
  AudioNode.call(this, {
    context: context,
    name: "WaveShaperNode",
    jsonAttrs: [ "oversample" ],
    numberOfInputs  : 1,
    numberOfOutputs : 1,
    channelCount    : 2,
    channelCountMode: "max",
    channelInterpretation: "speakers"
  });
  _.$type(this, "curve", Float32Array, null);
  _.$enum(this, "oversample", [ "none", "2x", "4x" ], "none");
}
_.inherits(WaveShaperNode, global.WaveShaperNode);

module.exports = WaveShaperNode;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./AudioNode":8,"./utils":35}],28:[function(require,module,exports){
"use strict";

module.exports = function(str) {
  return (/[aeiou]/i.test(str.charAt(0)) ? "an" : "a");
};

},{}],29:[function(require,module,exports){
"use strict";

var id = require("./id");

module.exports = function(obj, method) {
  return id(obj, true) + "#" + method;
};

},{"./id":34}],30:[function(require,module,exports){
"use strict";

var format = require("./format");
var article = require("./article");
var toS = require("./toS");

var check = function(caption, spec) {
  Object.keys(spec).forEach(function(argName) {
    var type = spec[argName].type;
    var given = spec[argName].given;

    if (!check[type](given)) {
      throw new TypeError(format(
        "#{caption}: '#{name}' should be #{type}, but got #{given}", {
          caption: caption,
          name   : argName,
          type   : article(type) + " " + type,
          given  : toS(given)
        }
      ));
    }
  });
};

check.number = function isNumber(value) {
  return typeof value === "number" && !isNaN(value);
};
check.function = function isNumber(value) {
  return typeof value === "function";
};
check.ArrayBuffer = function(value) {
  return value instanceof ArrayBuffer;
};
check.Uint8Array = function isUint8Array(value) {
  return value instanceof Uint8Array;
};
check.Float32Array = function isFloat32Array(value) {
  return value instanceof Float32Array;
};
check.PeriodicWave = function(value) {
  return value instanceof PeriodicWave;
};

module.exports = check;

},{"./article":28,"./format":33,"./toS":39}],31:[function(require,module,exports){
"use strict";

module.exports = function(value, defaultValue) {
  return typeof value !== "undefined" ? value : defaultValue;
};

},{}],32:[function(require,module,exports){
"use strict";

var format = require("./format");
var id = require("./id");
var toS = require("./toS");

module.exports = function(obj, name, list, value) {
  var strList = "[ " + list.join(", ") + " ]";
  Object.defineProperty(obj, name, {
    get: function() {
      return obj["_" + name];
    },
    set: function(newValue) {
      if (list.indexOf(newValue) === -1) {
        throw new TypeError(format(
          "#{object}##{property} should be any #{list}, but got #{given}", {
            object  : id(obj, true),
            property: name,
            list    : strList,
            given   : toS(newValue)
          }
        ));
      }
      obj["_" + name] = newValue;
    },
    enumerable: true
  });
  obj["_" + name] = value;
};

},{"./format":33,"./id":34,"./toS":39}],33:[function(require,module,exports){
"use strict";

module.exports = function(fmt, dict) {
  var msg = fmt;

  Object.keys(dict).forEach(function(key) {
    msg = msg.replace(new RegExp("#\\{" + key + "\\}", "g"), dict[key]);
  });

  return msg;
};

},{}],34:[function(require,module,exports){
"use strict";

module.exports = function(obj, wrapping) {
  if (obj.hasOwnProperty("$id")) {
    if (wrapping) {
      return "(" + obj.$name + "#" + obj.$id + ")";
    }
    return obj.$name + "#" + obj.$id;
  }
  return obj.$name;
};

},{}],35:[function(require,module,exports){
"use strict";

var _ = {};

_.VERSION = "0.1.16";
_.SAMPLERATE  = 44100;
_.BUFFER_SIZE = 128;
_.CURRENT_TIME_INCR = _.BUFFER_SIZE / _.SAMPLERATE;
_.NOP = /* istanbul ignore next */ function() {};

_.inherits = require("./inherits");

_.format = require("./format");

_.defaults = require("./defaults");

_.article = require("./article");

_.check = require("./check");

_.toS = require("./toS");

_.id = require("./id");

_.caption = require("./caption");

_.jsonCircularCheck = require("./jsonCircularCheck");

_.$read = require("./read");

_.$type = require("./type");

_.$enum = require("./enum");

module.exports = _;

},{"./article":28,"./caption":29,"./check":30,"./defaults":31,"./enum":32,"./format":33,"./id":34,"./inherits":36,"./jsonCircularCheck":37,"./read":38,"./toS":39,"./type":40}],36:[function(require,module,exports){
"use strict";

module.exports = function(ctor, superCtor) {
  ctor.prototype = Object.create(superCtor.prototype, {
    constructor: { value: ctor, enumerable: false, writable: true, configurable: true }
  });
};

},{}],37:[function(require,module,exports){
"use strict";

var id = require("./id");

module.exports = function(node, func, memo) {
  if (memo.indexOf(node) !== -1) {
    return "<circular:" + id(node) + ">";
  }
  memo.push(node);

  var result = func.call(node, memo);

  memo.pop();

  return result;
};

},{"./id":34}],38:[function(require,module,exports){
"use strict";

var format = require("./format");
var id = require("./id");

module.exports = function(obj, name, value) {
  Object.defineProperty(obj, name, {
    get: typeof value === "function" ? value : function() {
      return value;
    },
    set: function() {
      throw new Error(format(
        "#{object}##{property} is readonly", {
          object  : id(obj, true),
          property: name
        }
      ));
    },
    enumerable: true
  });
};

},{"./format":33,"./id":34}],39:[function(require,module,exports){
"use strict";

module.exports = function(value) {
  var type = typeof value;

  if (type === "string") {
    return "'" + value + "'";
  }
  if (type === "function") {
    return "function";
  }
  if (Array.isArray(value)) {
    return "array";
  }
  if (!value || type === "number" || type === "boolean") {
    return String(value);
  }
  if (value.constructor && value.constructor.name) {
    return value.constructor.name;
  }

  return Object.prototype.toString.call(value).slice(8, -1);
};

},{}],40:[function(require,module,exports){
"use strict";

var format = require("./format");
var id = require("./id");
var article = require("./article");
var toS = require("./toS");

module.exports = function(obj, name, type, value) {
  var getter, setter;

  getter = function() {
    return obj["_" + name];
  };
  setter = function(newValue) {
    var err = false;

    if (type === "function") {
      if (newValue !== null && typeof newValue !== "function") {
        err = true;
      }
    } else if (typeof type === "string") {
      if (typeof newValue !== type) {
        err = true;
      }
    } else if (!(newValue instanceof type)) {
      err = true;
      type = type.constructor.name;
    }

    if (err) {
      throw new TypeError(format(
        "#{object}##{property} should be #{type}, but got #{given}", {
          object  : id(obj, true),
          property: name,
          type    : article(type) + " " + type,
          given   : toS(newValue)
        }
      ));
    }

    obj["_" + name] = newValue;
  };

  if (typeof type === "object") {
    getter = type.getter || /* istanbul ignore next */ getter;
    setter = type.setter || /* istanbul ignore next */ setter;
    type   = type.type;
  }

  Object.defineProperty(obj, name, {
    get: getter,
    set: setter,
    enumerable: true
  });
  obj["_" + name] = value;
};

},{"./article":28,"./format":33,"./id":34,"./toS":39}]},{},[1]);
