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

  function article(str) {
    return (/[aeiou]/i.test(str.charAt(0)) ? "an " : "a ") + str;
  }

  function checkArgs(caption, spec) {
    Object.keys(spec).forEach(function(argName) {
      var type = spec[argName].type;
      var given = spec[argName].given;

      if (!checkArgs[type](given)) {
        throw new TypeError(format(
          "#{0}: '#{1}' should be #{2}, but got #{3}", caption, argName, article(type), given
        ));
      }
    });
  }
  checkArgs.number = function isNumber(value) {
    return typeof value === "number" && !isNaN(value);
  };
  checkArgs.function = function isNumber(value) {
    return typeof value === "function";
  };
  checkArgs.ArrayBuffer = function(value) {
    return value instanceof ArrayBuffer;
  };
  checkArgs.Uint8Array = function isUint8Array(value) {
    return value instanceof Uint8Array;
  };
  checkArgs.Float32Array = function isFloat32Array(value) {
    return value instanceof Float32Array;
  };
  checkArgs.PeriodicWave = function(value) {
    return value instanceof PeriodicWave;
  };

  function id(obj) {
    if (obj.hasOwnProperty("$id")) {
      return obj.name + "#" + obj.$id;
    }
    return obj.name;
  }

  function checkCircular(node, func, memo) {
    if (memo.indexOf(node) !== -1) {
      return "<circular:" + id(node) + ">";
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
      $read(this, "name", "AudioContext");
      $read(this, "destination", new AudioDestinationNode(this));
      $read(this, "sampleRate", SAMPLERATE);
      $read(this, "currentTime", function() {
        return this._currentTime;
      }.bind(this));
      $read(this, "listener", new AudioListener(this));

      this._currentTime = 0;
      this._targetTime  = 0;
      this._remain = 0;
    }

    AudioContext.prototype.process = function(duration) {
      var dx;

      this._targetTime += duration;

      while (this._currentTime < this._targetTime) {
        if (this._remain) {
          dx = this._remain;
          this._remain = 0;
        } else {
          dx = Math.min(CURRENT_TIME_INCR, this._targetTime - this._currentTime);
          this._remain = CURRENT_TIME_INCR - dx;
        }
        this.destination.process(this._currentTime, this._currentTime + dx);
        this._currentTime = this._currentTime + dx;
      }
    };

    AudioContext.prototype.toJSON = function() {
      return this.destination.toJSON([]);
    };

    AudioContext.prototype.createBuffer = function(numberOfChannels, length, sampleRate) {
      return new AudioBuffer(this, numberOfChannels, length, sampleRate);
    };

    AudioContext.prototype.decodeAudioData = function(audioData, successCallback, errorCallback) {
      checkArgs("AudioContext#decodeAudioData(audioData, successCallback, errorCallback)", {
        audioData      : { type: "ArrayBuffer", given: audioData },
        successCallback: { type: "function"   , given: defaults(successCallback, NOP) },
        errorCallback  : { type: "function"   , given: defaults(errorCallback  , NOP) },
      });
      var _this = this;
      setTimeout(function() {
        if (_this.DECODE_AUDIO_DATA_FAILED) {
          errorCallback();
        } else {
          successCallback(_this.DECODE_AUDIO_DATA_RESULT || new AudioBuffer(_this, 2, 1024, SAMPLERATE));
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
      checkArgs("OfflineAudioContext(numberOfChannels, length, sampleRate)", {
        numberOfChannels: { type: "number", given: numberOfChannels },
        length          : { type: "number", given: length           },
        sampleRate      : { type: "number", given: sampleRate       },
      });

      $read(this, "name", "OfflineAudioContext");
      $read(this, "destination", new AudioDestinationNode(this));
      $read(this, "sampleRate", sampleRate);
      $read(this, "currentTime", function() {
        return this._currentTime;
      }.bind(this));
      $read(this, "listener", new AudioListener(this));
      $type(this, "oncomplete", "function", NOP);

      this._currentTime = 0;
      this._targetTime  = 0;
      this._remain = 0;

      this._numberOfChannels = numberOfChannels;
      this._length = length;
      this._processed = 0;
      this._rendering = false;
    }
    extend(OfflineAudioContext, AudioContext);

    OfflineAudioContext.prototype.process = function(duration) {
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
          dx = Math.min(CURRENT_TIME_INCR, this._targetTime - this._currentTime);
          this._remain = CURRENT_TIME_INCR - dx;
        }
        this.destination.process(this._currentTime, this._currentTime + dx);
        this._currentTime = this._currentTime + dx;
        this._processed += BUFFER_SIZE * (dx / CURRENT_TIME_INCR);
      }

      if (this._length <= this._processed) {
        var e = new OfflineAudioCompletionEvent();

        e.renderedBuffer = new AudioBuffer(this, this._numberOfChannels, this._length, this.sampleRate);

        this.oncomplete(e);
        this._rendering = false;
      }
    };

    OfflineAudioContext.prototype.startRendering = function() {
      this._rendering = true;
    };

    return OfflineAudioContext;
  })();

  global.OfflineAudioCompletionEvent = (function() {
    function OfflineAudioCompletionEvent() {
      $read(this, "name", "OfflineAudioCompletionEvent");
    }
    return OfflineAudioCompletionEvent;
  })();

  global.AudioNode = (function() {
    function AudioNode(spec) {
      $read(this, "context", spec.context);
      $read(this, "name", spec.name);
      $read(this, "jsonAttrs", spec.jsonAttrs);
      $read(this, "numberOfInputs", spec.numberOfInputs);
      $read(this, "numberOfOutputs", spec.numberOfOutputs);
      $type(this, "channelCount", "number", spec.channelCount);
      $enum(this, "channelCountMode", [ "max", "clamped-max", "explicit" ], spec.channelCountMode);
      $enum(this, "channelInterpretation", [ "speakers", "discrete" ], spec.channelInterpretation);

      this._currentTime = -1;
      this._inputs  = [];
      this._outputs = [];
    }

    AudioNode.prototype.process = function(currentTime, nextCurrentTime) {
      /* istanbul ignore else */
      if (currentTime !== this._currentTime) {
        this._currentTime = currentTime;

        this._inputs.forEach(function(src) {
          src.process(currentTime, nextCurrentTime);
        });

        Object.keys(this).forEach(function(key) {
          if (this[key] instanceof AudioParam) {
            this[key].process(currentTime, nextCurrentTime);
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

        json.name = id(this);

        this.jsonAttrs.forEach(function(key) {
          if (this[key] && this[key].toJSON) {
            json[key] = this[key].toJSON(memo);
          } else {
            json[key] = this[key];
          }
        }, this);

        if (this.context.VERBOSE_JSON) {
          json.numberOfInputs = this.numberOfInputs;
          json.numberOfOutputs = this.numberOfOutputs;
          json.channelCount = this.channelCount;
          json.channelCountMode = this.channelCountMode;
          json.channelInterpretation = this.channelInterpretation;
        }

        json.inputs = this._inputs.map(function(node) {
          return node.toJSON(memo);
        });

        return json;
      }, memo || /* istanbul ignore next */ []);
    };

    AudioNode.prototype.connect = function(destination, output, input) {
      output = defaults(output, 0);
      input  = defaults(input , 0);

      if (!(destination instanceof AudioNode || destination instanceof AudioParam)) {
        throw new TypeError(format(
          "AudioNode#connect(destination, output, input): 'destination' should be an instance of AudioNode or AudioParam, but got #{0}", destination
        ));
      }

      checkArgs("AudioNode#connect(destination, output, input)", {
        output: { type: "number", given: output },
        input : { type: "number", given: input  },
      });

      if (this.context !== destination.context) {
        throw new Error("AudioNode#connect(destination, output, input): cannot connect to a destination belonging to a different audio context");
      }
      if (output < 0 || this.numberOfOutputs <= output) {
        throw new Error(format(
          "AudioNode#connect(destination, output, input): output index (#{0}) exceeds number of outputs (#{1})", output, this.numberOfOutputs
        ));
      }
      if (input < 0 || destination.numberOfInputs <= input) {
        throw new Error(format(
          "AudioNode#connect(destination, output, input): input index (#{0}) exceeds number of inputs (#{1})", input, destination.numberOfInputs
        ));
      }

      // TODO: circular check

      var index = this._outputs.indexOf(destination);
      /* istanbul ignore else */
      if (index === -1) {
        this._outputs.push(destination);
        destination._inputs.push(this);
      }
    };

    AudioNode.prototype.disconnect = function(output) {
      output = defaults(output, 0);

      checkArgs("AudioNode#disconnect(output)", {
        output: { type: "number", given: output }
      });

      if (output < 0 || this.numberOfOutputs <= output) {
        throw new Error(format(
          "AudioNode#disconnect: output index (#{0}) exceeds number of outputs (#{1})", output, this.numberOfOutputs
        ));
      }

      this._outputs.splice(0).forEach(function(dst) {
        var index = dst._inputs.indexOf(this);
        /* istanbul ignore else */
        if (index !== -1) {
          dst._inputs.splice(index, 1);
        }
      }, this);
    };

    return AudioNode;
  })();

  global.AudioDestinationNode = (function() {
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
      $read(this, "maxChannelCount", 2);
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

      this._currentTime = -1;
      this._inputs = [];
      this._events = [];
    }

    function linTo(v, v0, v1, t, t0, t1) {
      var dt = (t - t0) / (t1 - t0);
      return (1 - dt) * v0 + dt * v1;
    }

    function expTo(v, v0, v1, t, t0, t1) {
      var dt = (t - t0) / (t1 - t0);
      return 0 < v0 && 0 < v1 ? v0 * Math.pow(v1 / v0, dt) : /* istanbul ignore next */ v;
    }

    function setTarget(v, v0, v1, t, t0, t1, timeConstant) {
      return v1 + (v0 - v1) * Math.exp((t0 - t) / timeConstant);
    }

    function setCurveValue(v, t, t0, t1, curve) {
      var dt = (t - t0) / (t1 - t0);

      if (dt <= 0) {
        return defaults(curve[0], v);
      }

      if (1 <= dt) {
        return defaults(curve[curve.length - 1], v);
      }

      var index = (curve.length - 1) * dt;
      var delta = index - (index|0);
      var v0 = defaults(curve[(index + 0)|0], v);
      var v1 = defaults(curve[(index + 1)|0], v);

      return (1 - delta) * v0 + delta * v1;
    }

    function calcValue(value, currentTime, events) {
      while (events.length && events[0].time <= currentTime) {
        var e0 = events[0];
        var e1 = events[1] || { type: null, time: Infinity };

        if (e1.type === "LinearRampToValue") {
          value = linTo(value, e0.value, e1.value, currentTime, e0.time, e1.time);
        } else if (e1.type === "ExponentialRampToValue") {
          value = expTo(value, e0.value, e1.value, currentTime, e0.time, e1.time);
        } else {
          switch (e0.type) {
          case "SetValue":
          case "LinearRampToValue":
          case "ExponentialRampToValue":
            value = e0.value;
            break;
          case "SetTarget":
            value = setTarget(value, e0.startValue, e0.value, currentTime, e0.time, Infinity, e0.timeConstant);
            break;
          case "SetValueCurve":
            value = setCurveValue(value, currentTime, e0.time, e0.time + e0.duration, e0.curve);
            break;
          }
        }

        if (currentTime < e1.time) {
          break;
        }

        events.shift();
        if (events.length && events[0].type === "SetTarget") {
          events[0].startValue = value;
        }
      }

      return value;
    }

    AudioParam.prototype.process = function(currentTime, nextCurrentTime) {
      /* istanbul ignore else */
      if (currentTime !== this._currentTime) {
        this._currentTime = currentTime;

        this._inputs.forEach(function(src) {
          src.process(currentTime, nextCurrentTime);
        });

        this.value = calcValue(this.value, nextCurrentTime, this._events);
      }
    };

    AudioParam.prototype.toJSON = function(memo) {
      return checkCircular(this, function(memo) {
        var json = {};

        json.value = this.value;

        json.inputs = this._inputs.map(function(node) {
          return node.toJSON(memo);
        });

        return json;
      }, memo || /* istanbul ignore next*/ []);
    };

    function insertEvent(_this, event) {
      var time = event.time;
      var events = _this._events;
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

      _this.value = calcValue(_this.value, _this.context.currentTime, events);
    }

    AudioParam.prototype.setValueAtTime = function(value, startTime) {
      checkArgs("AudioParam#setValueAtTime(value, startTime)", {
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
      checkArgs("AudioParam#linearRampToValueAtTime(value, endTime)", {
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
      checkArgs("AudioParam#exponentialRampToValueAtTime(value, endTime)", {
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
      checkArgs("AudioParam#setTargetAtTime(target, startTime, timeConstant)", {
        target      : { type: "number", given: target       },
        startTime   : { type: "number", given: startTime    },
        timeConstant: { type: "number", given: timeConstant },
      });
      insertEvent(this, {
        type : "SetTarget",
        startValue: this.value,
        value: target,
        time : startTime,
        timeConstant: timeConstant
      });
    };

    AudioParam.prototype.setValueCurveAtTime = function(values, startTime, duration) {
      checkArgs("AudioParam#setValueCurveAtTime(values, startTime, duration)", {
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
      checkArgs("AudioParam#cancelScheduledValues(startTime)", {
        startTime: { type: "number", given: startTime }
      });
      var events = this._events;

      for (var i = 0, imax = events.length; i < imax; ++i) {
        if (events[i].time >= startTime) {
          return events.splice(i);
        }
      }
    };

    return AudioParam;
  })();

  global.GainNode = (function() {
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
      $read(this, "gain", new AudioParam(context, "gain", 1.0, 0.0, 1.0));
    }
    extend(GainNode, AudioNode);

    return GainNode;
  })();

  global.DelayNode = (function() {
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
      $read(this, "delayTime", new AudioParam(context, "delayTime", 0, 0, maxDelayTime));
    }
    extend(DelayNode, AudioNode);

    return DelayNode;
  })();

  global.AudioBuffer = (function() {
    function AudioBuffer(context, numberOfChannels, length, sampleRate) {
      $read(this, "context", context);
      $read(this, "name", "AudioBuffer");
      $read(this, "sampleRate", sampleRate);
      $read(this, "length", length);
      $read(this, "duration", length / sampleRate);
      $read(this, "numberOfChannels", numberOfChannels);

      this._data = new Array(numberOfChannels);
      for (var i = 0; i < numberOfChannels; i++) {
        this._data[i] = new Float32Array(length);
      }
    }

    function f32ToArray(f32) {
      var a = new Array(f32.length);
      for (var i = 0, imax = a.length; i < imax; ++i) {
        a[i] = f32[i];
      }
      return a;
    }

    AudioBuffer.prototype.toJSON = function() {
      var json = {
        name: this.name,
        sampleRate: this.sampleRate,
        length: this.length,
        duration: this.duration,
        numberOfChannels: this.numberOfChannels
      };

      if (this.context.VERBOSE_JSON) {
        json.data = this._data.map(f32ToArray);
      }

      return json;
    };

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
      $type(this, "buffer", AudioBuffer);
      $read(this, "playbackRate", new AudioParam(context, "playbackRate", 1, 0, 1024));
      $type(this, "loop", "boolean", false);
      $type(this, "loopStart", "number", 0);
      $type(this, "loopEnd", "number", 0);
      $type(this, "onended", "function", NOP);
    }
    extend(AudioBufferSourceNode, AudioNode);

    AudioBufferSourceNode.prototype.start = function(when, offset, duration) {
      checkArgs("AudioBufferSourceNode#start(when, offset, duration)", {
        when    : { type: "number", given: defaults(when    , 0) },
        offset  : { type: "number", given: defaults(offset  , 0) },
        duration: { type: "number", given: defaults(duration, 0) },
      });
    };

    AudioBufferSourceNode.prototype.stop = function(when) {
      checkArgs("AudioBufferSourceNode#stop(when)", {
        when: { type: "number", given: defaults(when, 0) }
      });
    };

    return AudioBufferSourceNode;
  })();

  global.MediaElementAudioSourceNode = (function() {
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
    extend(MediaElementAudioSourceNode, AudioNode);

    return MediaElementAudioSourceNode;
  })();

  global.ScriptProcessorNode = (function() {
    function ScriptProcessorNode(context, bufferSize, numberOfInputChannels, numberOfOutputChannels) {
      if ([ 256, 512, 1024, 2048, 4096, 8192, 16384 ].indexOf(bufferSize) === -1) {
        throw new TypeError(format(
          "ScriptProcessorNode(bufferSize, numberOfInputChannels, numberOfOutputChannels): invalid bufferSize: #{0}", bufferSize
        ));
      }
      checkArgs("ScriptProcessorNode(bufferSize, numberOfInputChannels, numberOfOutputChannels)", {
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
          e.inputBuffer = new AudioBuffer(this.context, this.numberOfInputChannels, this.bufferSize, this.context.sampleRate);
          e.outputBuffer = new AudioBuffer(this.context, this.numberOfOutputChannels, this.bufferSize, this.context.sampleRate);

          this.onaudioprocess(e);
        }
      }
    };

    return ScriptProcessorNode;
  })();

  global.AudioProcessingEvent = (function() {
    function AudioProcessingEvent() {
      $read(this, "name", "AudioProcessingEvent");
    }
    return AudioProcessingEvent;
  })();

  global.PannerNode = (function() {
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
      checkArgs("PannerNode#setPosition(x, y, z)", {
        x: { type: "number", given: x },
        y: { type: "number", given: y },
        z: { type: "number", given: z },
      });
    };

    PannerNode.prototype.setOrientation = function(x, y, z) {
      checkArgs("PannerNode#setOrientation(x, y, z)", {
        x: { type: "number", given: x },
        y: { type: "number", given: y },
        z: { type: "number", given: z },
      });
    };

    PannerNode.prototype.setVelocity = function(x, y, z) {
      checkArgs("PannerNode#setVelocity(x, y, z)", {
        x: { type: "number", given: x },
        y: { type: "number", given: y },
        z: { type: "number", given: z },
      });
    };

    return PannerNode;
  })();

  global.AudioListener = (function() {
    function AudioListener() {
      $read(this, "name", "AudioListener");
      $type(this, "dopplerFactor", "number", 1);
      $type(this, "speedOfSound", "number", 343.3);
    }

    AudioListener.prototype.setPosition = function(x, y, z) {
      checkArgs("AudioListener#setPosition(x, y, z)", {
        x: { type: "number", given: x },
        y: { type: "number", given: y },
        z: { type: "number", given: z },
      });
    };

    AudioListener.prototype.setOrientation = function(x, y, z, xUp, yUp, zUp) {
      checkArgs("AudioListener#setOrientation(x, y, z, xUp, yUp, zUp)", {
        x  : { type: "number", given: x   },
        y  : { type: "number", given: y   },
        z  : { type: "number", given: z   },
        xUp: { type: "number", given: xUp },
        yUp: { type: "number", given: yUp },
        zUp: { type: "number", given: zUp },
      });
    };

    AudioListener.prototype.setVelocity = function(x, y, z) {
      checkArgs("AudioListener#setVelocity(x, y, z)", {
        x: { type: "number", given: x },
        y: { type: "number", given: y },
        z: { type: "number", given: z },
      });
    };

    return AudioListener;
  })();

  global.ConvolverNode = (function() {
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
      $type(this, "buffer", AudioBuffer);
      $type(this, "normalize", "boolean", true);
    }
    extend(ConvolverNode, AudioNode);

    return ConvolverNode;
  })();

  global.AnalyserNode = (function() {
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
      checkArgs("AnalyserNode#getFloatFrequencyData(array)", {
        array: { type: "Float32Array", given: array }
      });
    };

    AnalyserNode.prototype.getByteFrequencyData = function(array) {
      checkArgs("AnalyserNode#getByteFrequencyData(array)", {
        array: { type: "Uint8Array", given: array }
      });
    };

    AnalyserNode.prototype.getByteTimeDomainData = function(array) {
      checkArgs("AnalyserNode#getByteTimeDomainData(array)", {
        array: { type: "Uint8Array", given: array }
      });
    };

    return AnalyserNode;
  })();

  global.ChannelSplitterNode = (function() {
    function ChannelSplitterNode(context, numberOfOutputs) {
      checkArgs("ChannelSplitterNode(numberOfOutputs)", {
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
    extend(ChannelSplitterNode, AudioNode);

    return ChannelSplitterNode;
  })();

  global.ChannelMergerNode = (function() {
    function ChannelMergerNode(context, numberOfInputs) {
      checkArgs("ChannelMergerNode(numberOfInputs)", {
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
    extend(ChannelMergerNode, AudioNode);

    return ChannelMergerNode;
  })();

  global.DynamicsCompressorNode = (function() {
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
      checkArgs("BiquadFilterNode#getFrequencyResponse(frequencyHz, magResponse, phaseResponse)", {
        frequencyHz  : { type: "Float32Array", given: frequencyHz },
        magResponse  : { type: "Float32Array", given: magResponse },
        phaseResponse: { type: "Float32Array", given: phaseResponse },
      });
    };

    return BiquadFilterNode;
  })();

  global.WaveShaperNode = (function() {
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
      $type(this, "curve", Float32Array);
      $enum(this, "oversample", [ "none", "2x", "4x" ], "none");
    }
    extend(WaveShaperNode, AudioNode);

    return WaveShaperNode;
  })();

  global.OscillatorNode = (function() {
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
      $enum(this, "type", [ "sine", "square", "sawtooth", "triangle", "custom" ], "sine");
      $read(this, "frequency", new AudioParam(context, "frequency", 440, 0, 100000));
      $read(this, "detune", new AudioParam(context, "detune", 0, -4800, 4800));
      $type(this, "onended", "function", NOP);
    }
    extend(OscillatorNode, AudioNode);

    OscillatorNode.prototype.start = function(when) {
      checkArgs("OscillatorNode#start(when)", {
        when: { type: "number", given: defaults(when, 0) }
      });
    };

    OscillatorNode.prototype.stop = function(when) {
      checkArgs("OscillatorNode#stop(when)", {
        when: { type: "number", given: defaults(when, 0) }
      });
    };

    OscillatorNode.prototype.setPeriodicWave = function(periodicWave) {
      checkArgs("OscillatorNode#setPeriodicWave(periodicWave)", {
        periodicWave: { type: "PeriodicWave", given: periodicWave }
      });
    };

    return OscillatorNode;
  })();

  global.PeriodicWave = (function() {
    function PeriodicWave() {
      $read(this, "name", "PeriodicWave");
    }
    return PeriodicWave;
  })();

  global.MediaStreamAudioSourceNode = (function() {
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
    extend(MediaStreamAudioSourceNode, AudioNode);

    return MediaStreamAudioSourceNode;
  })();

  global.MediaStreamAudioDestinationNode = (function() {
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
    extend(MediaStreamAudioDestinationNode, AudioNode);

    return MediaStreamAudioDestinationNode;
  })();

})(this.self || global);
