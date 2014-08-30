(function(global) {
  "use strict";

  var SAMPLERATE  = 44100;
  var BUFFER_SIZE = 128;
  var CURRENT_TIME_INCR = BUFFER_SIZE / SAMPLERATE;
  var NOP = /* istanbul ignore next */ function() {};

  function extend(ctor, superCtor) {
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: { value: ctor, enumerable: false, writable: true, configurable: true }
    });
  }

  function format(fmt) {
    var msg = fmt;
    Array.prototype.slice.call(arguments, 1).forEach(function(value, index) {
      msg = msg.replace(
        new RegExp("#\\{" + index + "\\}", "g"), String(value)
      );
    });
    return msg;
  }

  function defaults(value, defaultValue) {
    return typeof value !== "undefined" ? value : defaultValue;
  }

  function checkCircular(node, func, memo) {
    if (memo.indexOf(node) !== -1) {
      return "<circular>";
    }
    memo.push(node);

    var result = func.call(node, memo);

    memo.pop();

    return result;
  }

  function $read(obj, name, value) {
    Object.defineProperty(obj, name, {
      get: typeof value === "function" ? value : function() {
        return value;
      },
      set: function() {
        throw new Error(name + " is readonly");
      },
      enumerable: true
    });
  }

  function $type(obj, name, type, value) {
    var _value;
    Object.defineProperty(obj, name, {
      get: function() {
        return _value;
      },
      set: function(newValue) {
        if (typeof type === "string" && typeof newValue !== type) {
          throw new TypeError(format(
            "#{0} should be a #{1}, but got #{2}", name, type, typeof newValue
          ));
        } else if (typeof type === "function" && (newValue !== null && !(newValue instanceof type))) {
          throw new TypeError(format(
            "#{0} should be a #{1}, but got #{2}", name, type.constructor, String(newValue)
          ));
        }
        _value = newValue;
      },
      enumerable: true
    });
    if (typeof value === "undefined") {
      value = null;
    }
    obj[name] = value;
  }

  function $enum(obj, name, list, value) {
    var _value;
    Object.defineProperty(obj, name, {
      get: function() {
        return _value;
      },
      set: function(newValue) {
        if (list.indexOf(newValue) === -1) {
          throw new TypeError(format("#{0} cannot set #{1}", name , newValue));
        }
        _value = newValue;
      },
      enumerable: true
    });
    obj[name] = value;
  }

  global.AudioContext = (function() {
    function AudioContext() {
      this.name = "AudioContext";
      $read(this, "destination", new AudioDestinationNode(this));
      $read(this, "sampleRate", SAMPLERATE);
      $read(this, "currentTime", function() {
        return this._currentTime;
      }.bind(this));
      $read(this, "listener", new AudioListener(this));

      this._currentTime = 0;
      this._counter = 0;
      this._tick = 0;
    }

    AudioContext.prototype.process = function(duration, callback) {
      var _this = this;
      setTimeout(function() {
        _this._counter -= duration;
        while (_this._counter <= 0) {
          _this.destination.process(++_this._tick);
          _this._currentTime += CURRENT_TIME_INCR;
          _this._counter += CURRENT_TIME_INCR;
        }
        callback && callback(); // jshint ignore: line
      }, 0);
    };

    AudioContext.prototype.toJSON = function() {
      return this.destination.toJSON([]);
    };

    AudioContext.prototype.createBuffer = function(numberOfChannels, length, sampleRate) {
      return new AudioBuffer(numberOfChannels, length, sampleRate);
    };

    AudioContext.prototype.decodeAudioData = function(audioData, successCallback, errorCallback) {
      if (!(audioData instanceof ArrayBuffer)) {
        throw new TypeError(format(
          "AudioContext#decodeAudioData: 'audioData' should be an ArrayBuffer, but got #{0}", audioData
        ));
      }
      var _this = this;
      setTimeout(function() {
        if (_this.DECODE_AUDIO_DATA_FAILED) {
          errorCallback && errorCallback(); // jshint ignore:line
        } else {
          successCallback && successCallback(new AudioBuffer(2, 1024, SAMPLERATE)); // jshint ignore:line
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
      return new ScriptProcessorNode(this, defaults(bufferSize, 0), defaults(numberOfInputChannels, 2), defaults(numberOfOutputChannels, 2));
    };

    AudioContext.prototype.createAnalyser = function() {
      return new AnalyserNode(this);
    };

    AudioContext.prototype.createGain = function() {
      return new GainNode(this);
    };

    AudioContext.prototype.createDelay = function(maxDelayTime) {
      return new DelayNode(this, defaults(maxDelayTime, 1.0));
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
      return new ChannelSplitterNode(this, defaults(numberOfOutputs, 6));
    };

    AudioContext.prototype.createChannelMerger = function(numberOfInputs) {
      return new ChannelMergerNode(this, defaults(numberOfInputs, 6));
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

    return AudioContext;
  })();

  global.OfflineAudioContext = (function() {
    function OfflineAudioContext(numberOfChannels, length, sampleRate) {
      if (typeof numberOfChannels !== "number") {
        throw new TypeError(format(
          "OfflineAudioContext: 'numberOfChannels' should be a number, but got #{0}", numberOfChannels
        ));
      }
      if (typeof length !== "number") {
        throw new TypeError(format(
          "OfflineAudioContext: 'length' should be a number, but got #{0}", length
        ));
      }
      if (typeof sampleRate !== "number") {
        throw new TypeError(format(
          "OfflineAudioContext: 'sampleRate' should be a number, but got #{0}", sampleRate
        ));
      }

      this.name = "OfflineAudioContext";
      $read(this, "destination", new AudioDestinationNode(this));
      $read(this, "sampleRate", sampleRate);
      $read(this, "currentTime", function() {
        return this._currentTime;
      }.bind(this));
      $read(this, "listener", new AudioListener(this));
      $type(this, "oncomplete", "function", NOP);

      this._currentTime = 0;
      this._counter = 0;
      this._tick = 0;

      this._numberOfChannels = numberOfChannels;
      this._length = length;
      this._processed = 0;
      this._rendering = false;
    }
    extend(OfflineAudioContext, AudioContext);

    OfflineAudioContext.prototype.process = function(duration, callback) {
      var _this = this;
      setTimeout(function() {
        if (_this._processed < _this._length) {
          _this._counter -= duration;
          while (_this._counter <= 0) {
            _this.destination.process(++_this._tick);
            _this._currentTime += CURRENT_TIME_INCR;
            _this._counter += CURRENT_TIME_INCR;
            if (_this._rendering) {
              _this._processed += BUFFER_SIZE;
            }
          }

          if (_this._processed >= _this._length) {
            /* istanbul ignore else */
            if (_this.oncomplete) {
              var e = new OfflineAudioCompletionEvent();

              e.renderedBuffer = new AudioBuffer(_this._numberOfChannels, _this._length, _this.sampleRate);

              _this.oncomplete(e);
              _this._rendering = false;
            }
          }
        }
        callback && callback(); // jshint ignore: line
      }, 0);
    };

    OfflineAudioContext.prototype.startRendering = function() {
      this._rendering = true;
    };

    return OfflineAudioContext;
  })();

  global.OfflineAudioCompletionEvent = (function() {
    function OfflineAudioCompletionEvent() {
      this.name = "OfflineAudioCompletionEvent";
    }
    return OfflineAudioCompletionEvent;
  })();

  global.AudioNode = (function() {
    function AudioNode(context, numberOfInputs, numberOfOutputs, channelCount, channelCountMode, channelInterpretation) {
      this.name = "AudioNode";
      $read(this, "context", context);
      $read(this, "numberOfInputs", numberOfInputs);
      $read(this, "numberOfOutputs", numberOfOutputs);

      $type(this, "channelCount", "number", channelCount);
      $enum(this, "channelCountMode", [ "max", "clamped-max", "explicit" ], channelCountMode);
      $enum(this, "channelInterpretation", [ "speakers", "discrete" ], channelInterpretation);

      this._tick = 0;
      this._src = [];
      this._dst = [];
      this.attr = [];
    }

    AudioNode.prototype.process = function(tick) {
      /* istanbul ignore else */
      if (tick !== this._tick) {
        this._tick = tick;

        this._src.forEach(function(src) {
          src.process(tick);
        });

        Object.keys(this).forEach(function(key) {
          if (this[key] instanceof AudioParam) {
            this[key].process(tick);
          }
        }, this);

        if (this._process) {
          this._process(BUFFER_SIZE);
        }
      }
    };

    AudioNode.prototype.toJSON = function(memo) {
      return checkCircular(this, function(memo) {
        var json = {};

        json.name = this.name;

        this.attr.forEach(function(key) {
          if (this[key].toJSON) {
            json[key] = this[key].toJSON(memo);
          } else {
            json[key] = this[key];
          }
        }, this);

        json.inputs = this._src.map(function(node) {
          return node.toJSON(memo);
        });

        return json;
      }, memo || /* istanbul ignore next */ []);
    };

    AudioNode.prototype.connect = function(destination, output, input) {
      output = defaults(output, 0);
      input  = defaults(input , 0);

      if (!(destination instanceof AudioNode || destination instanceof AudioParam)) {
        throw new Error(format(
          "AudioNode#connect: 'destination' should be an instance of AudioNode or AudioParam, but got #{0}", destination
        ));
      }
      if (typeof output !== "number") {
        throw new Error(format("AudioNode#connect: 'output' should be a number, but got #{0}", output));
      }
      if (typeof input !== "number") {
        throw new Error(format("AudioNode#connect: 'input' should be a number, but got #{0}", input));
      }

      if (this.context !== destination.context) {
        throw new Error("AudioNode#connect: cannot connect to a destination belonging to a different audio context");
      }
      if (output < 0 || this.numberOfOutputs <= output) {
        throw new Error(format(
          "AudioNode#connect: output index (#{0}) exceeds number of outputs (#{1})", output, this.numberOfOutputs
        ));
      }
      if (input < 0 || destination.numberOfInputs <= input) {
        throw new Error(format(
          "AudioNode#connect: input index (#{0}) exceeds number of inputs (#{1})", input, destination.numberOfInputs
        ));
      }

      // TODO: circular check

      var index = this._dst.indexOf(destination);
      /* istanbul ignore else */
      if (index === -1) {
        this._dst.push(destination);
        destination._src.push(this);
      }
    };

    AudioNode.prototype.disconnect = function(output) {
      output = defaults(output, 0);

      if (typeof output !== "number") {
        throw new Error(format("AudioNode#disconnect: should be a number, but got #{0}", output));
      }
      if (output < 0 || this.numberOfOutputs <= output) {
        throw new Error(format(
          "AudioNode#disconnect: output index (#{0}) exceeds number of outputs (#{1})", output, this.numberOfOutputs
        ));
      }

      this._dst.splice(0).forEach(function(dst) {
        var index = dst._src.indexOf(this);
        /* istanbul ignore else */
        if (index !== -1) {
          dst._src.splice(index, 1);
        }
      }, this);
    };

    return AudioNode;
  })();

  global.AudioDestinationNode = (function() {
    function AudioDestinationNode(context) {
      AudioNode.call(this, context, 1, 0, 2, "explicit", "speakers");
      this.name = "AudioDestinationNode";
      this.maxChannelCount = 2;
    }
    extend(AudioDestinationNode, AudioNode);

    return AudioDestinationNode;
  })();

  global.AudioParam = (function() {
    function AudioParam(context, name, defaultValue, minValue, maxValue) {
      $read(this, "context", context);
      $read(this, "name", name);
      $read(this, "defaultValue", defaultValue);
      $read(this, "minValue", minValue);
      $read(this, "maxValue", maxValue);
      $type(this, "value", "number", defaultValue);

      this._tick = 0;
      this._src = [];
    }

    AudioParam.prototype.process = function(tick) {
      /* istanbul ignore else */
      if (tick !== this._tick) {
        this._tick = tick;

        this._src.forEach(function(src) {
          src.process(tick);
        });
      }
    };

    AudioParam.prototype.toJSON = function(memo) {
      return checkCircular(this, function(memo) {
        var json = {};

        json.name = this.name;
        json.value = this.value;

        json.inputs = this._src.map(function(node) {
          return node.toJSON(memo);
        });

        return json;
      }, memo || /* istanbul ignore next*/ []);
    };

    AudioParam.prototype.setValueAtTime = function(value, startTime) {
      if (typeof value !== "number") {
        throw new Error(format(
          "AudioParam#setValueAtTime: 'value' should be a number, but got #{0}", value
        ));
      }
      if (typeof startTime !== "number") {
        throw new Error(format(
          "AudioParam#setValueAtTime: 'startTime' should be a number, but got #{0}", startTime
        ));
      }
    };

    AudioParam.prototype.linearRampToValueAtTime = function(value, endTime) {
      if (typeof value !== "number") {
        throw new Error(format(
          "AudioParam#linearRampToValueAtTime: 'value' should be a number, but got #{0}", value
        ));
      }
      if (typeof endTime !== "number") {
        throw new Error(format(
          "AudioParam#linearRampToValueAtTime: 'endTime' should be a number, but got #{0}", endTime
        ));
      }
    };

    AudioParam.prototype.exponentialRampToValueAtTime = function(value, endTime) {
      if (typeof value !== "number") {
        throw new Error(format(
          "AudioParam#exponentialRampToValueAtTime: 'value' should be a number, but got #{0}", value
        ));
      }
      if (typeof endTime !== "number") {
        throw new Error(format(
          "AudioParam#exponentialRampToValueAtTime: 'endTime' should be a number, but got #{0}", endTime
        ));
      }
    };

    AudioParam.prototype.setTargetAtTime = function(target, startTime, timeConstant) {
      if (typeof target !== "number") {
        throw new Error(format(
          "AudioParam#setTargetAtTime: 'target' should be a number, but got #{0}", target
        ));
      }
      if (typeof startTime !== "number") {
        throw new Error(format(
          "AudioParam#setTargetAtTime: 'startTime' should be a number, but got #{0}", startTime
        ));
      }
      if (typeof timeConstant !== "number") {
        throw new Error(format(
          "AudioParam#setTargetAtTime: 'timeConstant' should be a number, but got #{0}", timeConstant
        ));
      }
    };

    AudioParam.prototype.setValueCurveAtTime = function(values, startTime, duration) {
      if (!(values instanceof Float32Array)) {
        throw new Error(format(
          "AudioParam#setValueCurveAtTime: 'values' should be a Float32Array, but got #{0}", values
        ));
      }
      if (typeof startTime !== "number") {
        throw new Error(format(
          "AudioParam#setValueCurveAtTime: 'startTime' should be a number, but got #{0}", startTime
        ));
      }
      if (typeof duration !== "number") {
        throw new Error(format(
          "AudioParam#setValueCurveAtTime: 'duration' should be a number, but got #{0}", duration
        ));
      }
    };

    AudioParam.prototype.cancelScheduledValues = function(startTime) {
      if (typeof startTime !== "number") {
        throw new Error(format(
          "AudioParam#cancelScheduledValues: 'startTime' should be a number, but got #{0}", startTime
        ));
      }
    };

    return AudioParam;
  })();

  global.GainNode = (function() {
    function GainNode(context) {
      AudioNode.call(this, context, 1, 1, 2, "max", "speakers");
      this.name = "GainNode";
      this.attr = [ "gain" ];
      $read(this, "gain", new AudioParam(context, "gain", 1.0, 0.0, 1.0));
    }
    extend(GainNode, AudioNode);

    return GainNode;
  })();

  global.DelayNode = (function() {
    function DelayNode(context, maxDelayTime) {
      AudioNode.call(this, context, 1, 1, 2, "max", "speakers");
      this.name = "DelayNode";
      this.attr = [ "delayTime" ];
      $read(this, "delayTime", new AudioParam(context, "delayTime", 0, 0, maxDelayTime));
    }
    extend(DelayNode, AudioNode);

    return DelayNode;
  })();

  global.AudioBuffer = (function() {
    function AudioBuffer(numberOfChannels, length, sampleRate) {
      this.name = "AudioBuffer";
      $read(this, "sampleRate", sampleRate);
      $read(this, "length", length);
      $read(this, "duration", length / sampleRate);
      $read(this, "numberOfChannels", numberOfChannels);

      this._data = new Array(numberOfChannels);
      for (var i = 0; i < numberOfChannels; i++) {
        this._data[i] = new Float32Array(length);
      }
    }

    AudioBuffer.prototype.getChannelData = function(channel) {
      if (0 <= channel && channel < this._data.length) {
        return this._data[channel];
      }
      throw new Error(format(
        "AudioBuffer#getChannelData: channel index (#{0}) exceeds number of channels (#{1})", channel, this._data.length
      ));
    };

    return AudioBuffer;
  })();

  global.AudioBufferSourceNode = (function() {
    function AudioBufferSourceNode(context) {
      AudioNode.call(this, context, 0, 1, 2, "max", "speakers");
      this.name = "AudioBufferSourceNode";
      this.attr = [ "playbackRate", "loop", "loopStart", "loopEnd" ];
      $type(this, "buffer", AudioBuffer);
      $read(this, "playbackRate", new AudioParam(context, "playbackRate", 1, 0, 1024));
      $type(this, "loop", "boolean", false);
      $type(this, "loopStart", "number", 0);
      $type(this, "loopEnd", "number", 0);
      $type(this, "onended", "function", NOP);
    }
    extend(AudioBufferSourceNode, AudioNode);

    AudioBufferSourceNode.prototype.start = function(when, offset, duration) {
      when = defaults(when, 0);
      offset = defaults(offset, 0);
      duration = defaults(duration, 0);

      if (typeof when !== "number") {
        throw new Error(format("AudioBufferSourceNode#start: 'when' should be a number, but got #{0}", when));
      }
      if (typeof offset !== "number") {
        throw new Error(format("AudioBufferSourceNode#start: 'offset' should be a number, but got #{0}", offset));
      }
      if (typeof duration !== "number") {
        throw new Error(format("AudioBufferSourceNode#start: 'duration' should be a number, but got #{0}", duration));
      }
    };

    AudioBufferSourceNode.prototype.stop = function(when) {
      when = defaults(when, 0);

      if (typeof when !== "number") {
        throw new Error(format("AudioBufferSourceNode#stop: 'when' should be a number, but got #{0}", when));
      }
    };

    return AudioBufferSourceNode;
  })();

  global.MediaElementAudioSourceNode = (function() {
    function MediaElementAudioSourceNode(context) {
      AudioNode.call(this, context, 0, 1, 2, "max", "speakers");
      this.name = "MediaElementAudioSourceNode";
    }
    extend(MediaElementAudioSourceNode, AudioNode);

    return MediaElementAudioSourceNode;
  })();

  global.ScriptProcessorNode = (function() {
    function ScriptProcessorNode(context, bufferSize, numberOfInputChannels, numberOfOutputChannels) {
      AudioNode.call(this, context, 1, 1, 1, "explicit", "speakers");
      this.name = "ScriptProcessorNode";
      if ([ 256, 512, 1024, 2048, 4096, 8192, 16384 ].indexOf(bufferSize) === -1) {
        throw new Error(format(
          "ScriptProcessorNode: invalid bufferSize: #{0}", bufferSize
        ));
      }
      if (typeof numberOfInputChannels !== "number") {
        throw new Error(format(
          "ScriptProcessorNode: 'numberOfInputChannels' should be a number, but got #{0}", numberOfInputChannels
        ));
      }
      if (typeof numberOfOutputChannels !== "number") {
        throw new Error(format(
          "ScriptProcessorNode: 'numberOfOutputChannels' should be a number, but got #{0}", numberOfOutputChannels
        ));
      }
      $read(this, "numberOfInputChannels", numberOfInputChannels);
      $read(this, "numberOfOutputChannels", numberOfOutputChannels);
      $read(this, "bufferSize", bufferSize);
      $type(this, "onaudioprocess", "function", NOP);

      this._numSamples = 0;
    }
    extend(ScriptProcessorNode, AudioNode);

    ScriptProcessorNode.prototype._process = function(numSamples) {
      this._numSamples += numSamples;
      if (this.bufferSize <= this._numSamples) {
        this._numSamples = 0;

        /* istanbul ignore else */
        if (this.onaudioprocess) {
          var e = new AudioProcessingEvent();

          e.playbackTime = this.context.currentTime;
          e.inputBuffer = new AudioBuffer(this.numberOfInputChannels, this.bufferSize, this.context.sampleRate);
          e.outputBuffer = new AudioBuffer(this.numberOfOutputChannels, this.bufferSize, this.context.sampleRate);

          this.onaudioprocess(e);
        }
      }
    };

    return ScriptProcessorNode;
  })();

  global.AudioProcessingEvent = (function() {
    function AudioProcessingEvent() {
      this.name = "AudioProcessingEvent";
    }
    return AudioProcessingEvent;
  })();

  global.PannerNode = (function() {
    function PannerNode(context) {
      AudioNode.call(this, context, 1, 1, 2, "clamped-max", "speakers");
      this.name = "PannerNode";
      this.attr = [
        "panningModel", "distanceModel", "refDistance", "maxDistance",
        "rolloffFactor", "coneInnerAngle", "coneOuterAngle", "coneOuterGain"
      ];
      $enum(this, "panningModel", [ "equalpower", "HRTF" ], "HRTF");
      $enum(this, "distanceModel", [ "linear", "inverse", "exponential" ], "inverse");
      $type(this, "refDistance", "number", 1);
      $type(this, "maxDistance", "number", 10000);
      $type(this, "rolloffFactor", "number", 1);
      $type(this, "coneInnerAngle", "number", 360);
      $type(this, "coneOuterAngle", "number", 360);
      $type(this, "coneOuterGain", "number", 0);
    }
    extend(PannerNode, AudioNode);

    PannerNode.prototype.setPosition = function(x, y, z) {
      if (typeof x !== "number") {
        throw new Error(format(
          "PannerNode#setPosition: 'x' should be a number, but got #{0}", x
        ));
      }
      if (typeof y !== "number") {
        throw new Error(format(
          "PannerNode#setPosition: 'y' should be a number, but got #{0}", y
        ));
      }
      if (typeof z !== "number") {
        throw new Error(format(
          "PannerNode#setPosition: 'z' should be a number, but got #{0}", z
        ));
      }
    };

    PannerNode.prototype.setOrientation = function(x, y, z) {
      if (typeof x !== "number") {
        throw new Error(format(
          "PannerNode#setOrientation: 'x' should be a number, but got #{0}", x
        ));
      }
      if (typeof y !== "number") {
        throw new Error(format(
          "PannerNode#setOrientation: 'y' should be a number, but got #{0}", y
        ));
      }
      if (typeof z !== "number") {
        throw new Error(format(
          "PannerNode#setOrientation: 'z' should be a number, but got #{0}", z
        ));
      }
    };

    PannerNode.prototype.setVelocity = function(x, y, z) {
      if (typeof x !== "number") {
        throw new Error(format(
          "PannerNode#setVelocity: 'x' should be a number, but got #{0}", x
        ));
      }
      if (typeof y !== "number") {
        throw new Error(format(
          "PannerNode#setVelocity: 'y' should be a number, but got #{0}", y
        ));
      }
      if (typeof z !== "number") {
        throw new Error(format(
          "PannerNode#setVelocity: 'z' should be a number, but got #{0}", z
        ));
      }
    };

    return PannerNode;
  })();

  global.AudioListener = (function() {
    function AudioListener() {
      this.name = "AudioListener";
      $type(this, "dopplerFactor", "number", 1);
      $type(this, "speedOfSound", "number", 343.3);
    }

    AudioListener.prototype.setPosition = function(x, y, z) {
      if (typeof x !== "number") {
        throw new Error(format(
          "AudioListener#setPosition: 'x' should be a number, but got #{0}", x
        ));
      }
      if (typeof y !== "number") {
        throw new Error(format(
          "AudioListener#setPosition: 'y' should be a number, but got #{0}", y
        ));
      }
      if (typeof z !== "number") {
        throw new Error(format(
          "AudioListener#setPosition: 'z' should be a number, but got #{0}", z
        ));
      }
    };

    AudioListener.prototype.setOrientation = function(x, y, z, xUp, yUp, zUp) {
      if (typeof x !== "number") {
        throw new Error(format(
          "AudioListener#setOrientation: 'x' should be a number, but got #{0}", x
        ));
      }
      if (typeof y !== "number") {
        throw new Error(format(
          "AudioListener#setOrientation: 'y' should be a number, but got #{0}", y
        ));
      }
      if (typeof z !== "number") {
        throw new Error(format(
          "AudioListener#setOrientation: 'z' should be a number, but got #{0}", z
        ));
      }
      if (typeof xUp !== "number") {
        throw new Error(format(
          "AudioListener#setOrientation: 'xUp' should be a number, but got #{0}", xUp
        ));
      }
      if (typeof yUp !== "number") {
        throw new Error(format(
          "AudioListener#setOrientation: 'yUp' should be a number, but got #{0}", yUp
        ));
      }
      if (typeof zUp !== "number") {
        throw new Error(format(
          "AudioListener#setOrientation: 'zUp' should be a number, but got #{0}", zUp
        ));
      }
    };

    AudioListener.prototype.setVelocity = function(x, y, z) {
      if (typeof x !== "number") {
        throw new Error(format(
          "AudioListener#setVelocity: 'x' should be a number, but got #{0}", x
        ));
      }
      if (typeof y !== "number") {
        throw new Error(format(
          "AudioListener#setVelocity: 'y' should be a number, but got #{0}", y
        ));
      }
      if (typeof z !== "number") {
        throw new Error(format(
          "AudioListener#setVelocity: 'z' should be a number, but got #{0}", z
        ));
      }
    };

    return AudioListener;
  })();

  global.ConvolverNode = (function() {
    function ConvolverNode(context) {
      AudioNode.call(this, context, 1, 1, 2, "clamped-max", "speakers");
      this.name = "ConvolverNode";
      this.attr = [ "normalize" ];
      $type(this, "buffer", AudioBuffer);
      $type(this, "normalize", "boolean", true);
    }

    return ConvolverNode;
  })();

  global.AnalyserNode = (function() {
    function AnalyserNode(context) {
      AudioNode.call(this, context, 1, 1, 1, "explicit", "speakers");
      this.name = "AnalyserNode";
      this.attr = [ "fftSize", "minDecibels", "maxDecibels", "smoothingTimeConstant" ];
      $enum(this, "fftSize", [ 32, 64, 128, 256, 512, 1024, 2048 ], 2048);
      $read(this, "frequencyBinCount", function() {
        return this.fftSize >> 1;
      }.bind(this));
      $type(this, "minDecibels", "number", -100);
      $type(this, "maxDecibels", "number", 30);
      $type(this, "smoothingTimeConstant", "number", 0.8);
    }
    extend(AnalyserNode, AudioNode);

    AnalyserNode.prototype.getFloatFrequencyData = function(array) {
      if (!(array instanceof Float32Array)) {
        throw new Error(format(
          "AnalyserNode#getFloatFrequencyData: 'array' should be a Float32Array, but got #{0}", array
        ));
      }
    };

    AnalyserNode.prototype.getByteFrequencyData = function(array) {
      if (!(array instanceof Uint8Array)) {
        throw new Error(format(
          "AnalyserNode#getByteFrequencyData: 'array' should be a Uint8Array, but got #{0}", array
        ));
      }
    };

    AnalyserNode.prototype.getByteTimeDomainData = function(array) {
      if (!(array instanceof Uint8Array)) {
        throw new Error(format(
          "AnalyserNode#getByteTimeDomainData: 'array' should be a Uint8Array, but got #{0}", array
        ));
      }
    };

    return AnalyserNode;
  })();

  global.ChannelSplitterNode = (function() {
    function ChannelSplitterNode(context, numberOfOutputs) {
      AudioNode.call(this, context, 1, numberOfOutputs, 2, "max", "speakers");
      this.name = "ChannelSplitterNode";
    }
    extend(ChannelSplitterNode, AudioNode);

    return ChannelSplitterNode;
  })();

  global.ChannelMergerNode = (function() {
    function ChannelMergerNode(context, numberOfInputs) {
      AudioNode.call(this, context, numberOfInputs, 1, 2, "max", "speakers");
      this.name = "ChannelMergerNode";
    }
    extend(ChannelMergerNode, AudioNode);

    return ChannelMergerNode;
  })();

  global.DynamicsCompressorNode = (function() {
    function DynamicsCompressorNode(context) {
      AudioNode.call(this, context, 1, 1, 2, "explicit", "speakers");
      this.name = "DynamicsCompressorNode";
      this.attr = [ "threshold", "knee", "ratio", "reduction", "attack", "release" ];
      $read(this, "threshold", new AudioParam(context, "threshold", -24, -100, 0));
      $read(this, "knee", new AudioParam(context, "knee", 30, 0, 40));
      $read(this, "ratio", new AudioParam(context, "ratio", 12, 1, 20));
      $read(this, "reduction", new AudioParam(context, "reduction", 0, -20, 0));
      $read(this, "attack", new AudioParam(context, "attack", 0.003, 0, 1.0));
      $read(this, "release", new AudioParam(context, "release", 0.250, 0, 1.0));
    }
    extend(DynamicsCompressorNode, AudioNode);

    return DynamicsCompressorNode;
  })();

  global.BiquadFilterNode = (function() {
    function BiquadFilterNode(context) {
      AudioNode.call(this, context, 1, 1, 2, "max", "speakers");
      this.name = "BiquadFilterNode";
      this.attr = [ "type", "frequency", "detune", "Q", "gain" ];
      $enum(this, "type", [
        "lowpass", "highpass", "bandpass", "lowshelf", "highshelf", "peaking", "notch", "allpass"
      ], "lowpass");
      $read(this, "frequency", new AudioParam(context, "frequency", 350, 10, SAMPLERATE / 2));
      $read(this, "detune", new AudioParam(context, "detune", 0, -4800, 4800));
      $read(this, "Q", new AudioParam(context, "Q", 1, 0.0001, 1000));
      $read(this, "gain", new AudioParam(context, "gain", 0, -40, 40));
    }
    extend(BiquadFilterNode, AudioNode);

    BiquadFilterNode.prototype.getFrequencyResponse = function(frequencyHz, magResponse, phaseResponse) {
      if (!(frequencyHz instanceof Float32Array)) {
        throw new Error(format(
          "BiquadFilterNode#getFrequencyResponse: 'frequencyHz' should be a Float32Array, but got #{0}", frequencyHz
        ));
      }
      if (!(magResponse instanceof Float32Array)) {
        throw new Error(format(
          "BiquadFilterNode#getFrequencyResponse: 'magResponse' should be a Float32Array, but got #{0}", magResponse
        ));
      }
      if (!(phaseResponse instanceof Float32Array)) {
        throw new Error(format(
          "BiquadFilterNode#getFrequencyResponse: 'phaseResponse' should be a Float32Array, but got #{0}", phaseResponse
        ));
      }
    };

    return BiquadFilterNode;
  })();

  global.WaveShaperNode = (function() {
    function WaveShaperNode(context) {
      AudioNode.call(this, context, 1, 1, 2, "max", "speakers");
      this.name = "WaveShaperNode";
      this.attr = [ "oversample" ];
      $type(this, "curve", Float32Array);
      $enum(this, "oversample", [ "none", "2x", "4x" ], "none");
    }
    extend(WaveShaperNode, AudioNode);

    return WaveShaperNode;
  })();

  global.OscillatorNode = (function() {
    function OscillatorNode(context) {
      AudioNode.call(this, context, 0, 1, 2, "max", "speakers");
      this.name = "OscillatorNode";
      this.attr = [ "type", "frequency", "detune" ];
      $enum(this, "type", [ "sine", "square", "sawtooth", "triangle", "custom" ], "sine");
      $read(this, "frequency", new AudioParam(context, "frequency", 440, 0, 100000));
      $read(this, "detune", new AudioParam(context, "detune", 0, -4800, 4800));
      $type(this, "onended", "function", NOP);
    }
    extend(OscillatorNode, AudioNode);

    OscillatorNode.prototype.start = function(when) {
      when = defaults(when, 0);

      if (typeof when !== "number") {
        throw new Error(format("OscillatorNode#start: 'when' should be a number, but got #{0}", when));
      }
    };

    OscillatorNode.prototype.stop = function(when) {
      when = defaults(when, 0);

      if (typeof when !== "number") {
        throw new Error(format("OscillatorNode#stop: 'when' should be a number, but got #{0}", when));
      }
    };

    OscillatorNode.prototype.setPeriodicWave = function(periodicWave) {
      if (!(periodicWave instanceof PeriodicWave)) {
        throw new Error(format("OscillatorNode#setPeriodicWave: 'periodicWave' should be a PeriodicWave, but got #{0}", periodicWave));
      }
    };

    return OscillatorNode;
  })();

  global.PeriodicWave = (function() {
    function PeriodicWave() {
      this.name = "PeriodicWave";
    }
    return PeriodicWave;
  })();

  global.MediaStreamAudioSourceNode = (function() {
    function　MediaStreamAudioSourceNode(context) {
      AudioNode.call(this, context, 0, 1, 2, "max", "speakers");
      this.name = "MediaStreamAudioSourceNode";
    }
    extend(MediaStreamAudioSourceNode, AudioNode);

    return MediaStreamAudioSourceNode;
  })();

  global.MediaStreamAudioDestinationNode = (function() {
    function MediaStreamAudioDestinationNode(context) {
      AudioNode.call(this, context, 1, 0, 2, "explicit", "speakers");
      this.name = "MediaStreamAudioDestinationNode";
    }
    extend(MediaStreamAudioDestinationNode, AudioNode);

    return MediaStreamAudioDestinationNode;
  })();

})(this.self || global);
