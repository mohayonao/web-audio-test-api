(function(global) {
  "use strict";

  var VERSION = "0.1.9";
  var SAMPLERATE  = 44100;
  var BUFFER_SIZE = 128;
  var CURRENT_TIME_INCR = BUFFER_SIZE / SAMPLERATE;
  var NOP = /* istanbul ignore next */ function() {};

  var _    = {};
  var impl = {};

  /* istanbul ignore if */
  if (global.WEB_AUDIO_TEST_API_IGNORE) {
    return;
  }

  function ILLEGAL_CONSTRUCTOR(superCtor, shouldUse) {
    var err = "Illegal constructor";
    if (shouldUse) {
      err += ": should use ctx." + shouldUse;
    }
    function ctor() {
      throw new TypeError(err);
    }
    if (superCtor) {
      _.inherits(ctor, superCtor);
    }
    return ctor;
  }

  function $read(obj, name, value) {
    Object.defineProperty(obj, name, {
      get: typeof value === "function" ? value : function() {
        return value;
      },
      set: function() {
        throw new Error(_.format(
          "#{object}##{property} is readonly", {
            object  : _.id(obj, true),
            property: name
          }
        ));
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
        var err = false;

        if (typeof type === "string") {
          if (typeof newValue !== type) {
            err = true;
          }
        } else if (newValue !== null && !(newValue instanceof type)) {
          err = true;
          type = type.constructor.name;
        }

        if (err) {
          throw new TypeError(_.format(
            "#{object}##{property} should be #{type}, but got #{given}", {
              object  : _.id(obj, true),
              property: name,
              type    : _.article(type),
              given   : _.toS(newValue)
            }
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
    var strList = "[ " + list.join(", ") + " ]";
    Object.defineProperty(obj, name, {
      get: function() {
        return _value;
      },
      set: function(newValue) {
        if (list.indexOf(newValue) === -1) {
          throw new TypeError(_.format(
            "#{object}##{property} should be any #{list}, but got #{given}", {
              object  : _.id(obj, true),
              property: name,
              list    : strList,
              given   : _.toS(newValue)
            }
          ));
        }
        _value = newValue;
      },
      enumerable: true
    });
    obj[name] = value;
  }

  _.inherits = function(ctor, superCtor) {
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: { value: ctor, enumerable: false, writable: true, configurable: true }
    });
  };

  _.format = function(fmt, dict) {
    var msg = fmt;

    Object.keys(dict).forEach(function(key) {
      msg = msg.replace(new RegExp("#\\{" + key + "\\}", "g"), dict[key]);
    });

    return msg;
  };

  _.defaults = function(value, defaultValue) {
    return typeof value !== "undefined" ? value : defaultValue;
  };

  _.article = function(str) {
    return (/[aeiou]/i.test(str.charAt(0)) ? "an " : "a ") + str;
  };

  _.check = function(caption, spec) {
    Object.keys(spec).forEach(function(argName) {
      var type = spec[argName].type;
      var given = spec[argName].given;

      if (!_.check[type](given)) {
        throw new TypeError(_.format(
          "#{caption}: '#{name}' should be #{type}, but got #{given}", {
            caption: caption,
            name   : argName,
            type   : _.article(type),
            given  : _.toS(given)
          }
        ));
      }
    });
  };
  _.check.number = function isNumber(value) {
    return typeof value === "number" && !isNaN(value);
  };
  _.check.function = function isNumber(value) {
    return typeof value === "function";
  };
  _.check.ArrayBuffer = function(value) {
    return value instanceof ArrayBuffer;
  };
  _.check.Uint8Array = function isUint8Array(value) {
    return value instanceof Uint8Array;
  };
  _.check.Float32Array = function isFloat32Array(value) {
    return value instanceof Float32Array;
  };
  _.check.PeriodicWave = function(value) {
    return value instanceof PeriodicWave;
  };

  _.toS = function(value) {
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

  _.id = function(obj, wrapping) {
    if (obj.hasOwnProperty("$id")) {
      if (wrapping) {
        return "(" + obj.name + "#" + obj.$id + ")";
      }
      return obj.name + "#" + obj.$id;
    }
    return obj.name;
  };

  _.caption = function(obj, method) {
    return _.format(
      "#{object}##{method}", {
        object: _.id(obj, true),
        method: method
      }
    );
  };

  _.jsonCircularCheck = function(node, func, memo) {
    if (memo.indexOf(node) !== -1) {
      return "<circular:" + _.id(node) + ">";
    }
    memo.push(node);

    var result = func.call(node, memo);

    memo.pop();

    return result;
  };

  global.Event = ILLEGAL_CONSTRUCTOR();
  global.EventTarget = ILLEGAL_CONSTRUCTOR();

  global.AudioContext = (function() {
    function AudioContext() {
      $read(this, "name", "AudioContext");
      $read(this, "destination", new impl.AudioDestinationNode(this));
      $read(this, "sampleRate", SAMPLERATE);
      $read(this, "currentTime", function() {
        return this._currentTime;
      }.bind(this));
      $read(this, "listener", new impl.AudioListener(this));

      this._currentTime = 0;
      this._targetTime  = 0;
      this._remain = 0;
    }
    _.inherits(AudioContext, EventTarget);

    AudioContext.WEB_AUDIO_TEST_API_VERSION = VERSION;

    AudioContext.prototype.$process = function(duration) {
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
      return new impl.AudioBuffer(this, numberOfChannels, length, sampleRate);
    };

    AudioContext.prototype.decodeAudioData = function(audioData, successCallback, errorCallback) {
      successCallback = _.defaults(successCallback, NOP);
      errorCallback   = _.defaults(errorCallback  , NOP);
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
          successCallback(_this.DECODE_AUDIO_DATA_RESULT || new impl.AudioBuffer(_this, 2, 1024, SAMPLERATE));
        }
      }, 0);
    };

    AudioContext.prototype.createBufferSource = function() {
      return new impl.AudioBufferSourceNode(this);
    };

    AudioContext.prototype.createMediaElementSource = function() {
      return new impl.MediaElementAudioSourceNode(this);
    };

    AudioContext.prototype.createMediaStreamSource = function() {
      return new impl.MediaStreamAudioSourceNode(this);
    };

    AudioContext.prototype.createMediaStreamDestination = function() {
      return new impl.MediaStreamAudioDestinationNode(this);
    };

    AudioContext.prototype.createScriptProcessor = function(bufferSize, numberOfInputChannels, numberOfOutputChannels) {
      return new impl.ScriptProcessorNode(this, _.defaults(bufferSize, 0), _.defaults(numberOfInputChannels, 2), _.defaults(numberOfOutputChannels, 2));
    };

    AudioContext.prototype.createAnalyser = function() {
      return new impl.AnalyserNode(this);
    };

    AudioContext.prototype.createGain = function() {
      return new impl.GainNode(this);
    };

    AudioContext.prototype.createDelay = function(maxDelayTime) {
      return new impl.DelayNode(this, _.defaults(maxDelayTime, 1.0));
    };

    AudioContext.prototype.createBiquadFilter = function() {
      return new impl.BiquadFilterNode(this);
    };

    AudioContext.prototype.createWaveShaper = function() {
      return new impl.WaveShaperNode(this);
    };

    AudioContext.prototype.createPanner = function() {
      return new impl.PannerNode(this);
    };

    AudioContext.prototype.createConvolver = function() {
      return new impl.ConvolverNode(this);
    };

    AudioContext.prototype.createChannelSplitter = function(numberOfOutputs) {
      return new impl.ChannelSplitterNode(this, _.defaults(numberOfOutputs, 6));
    };

    AudioContext.prototype.createChannelMerger = function(numberOfInputs) {
      return new impl.ChannelMergerNode(this, _.defaults(numberOfInputs, 6));
    };

    AudioContext.prototype.createDynamicsCompressor = function() {
      return new impl.DynamicsCompressorNode(this);
    };

    AudioContext.prototype.createOscillator = function() {
      return new impl.OscillatorNode(this);
    };

    AudioContext.prototype.createPeriodicWave = function(real, imag) {
      return new impl.PeriodicWave(real, imag);
    };

    return AudioContext;
  })();

  global.OfflineAudioContext = (function() {
    function OfflineAudioContext(numberOfChannels, length, sampleRate) {
      _.check("OfflineAudioContext(numberOfChannels, length, sampleRate)", {
        numberOfChannels: { type: "number", given: numberOfChannels },
        length          : { type: "number", given: length           },
        sampleRate      : { type: "number", given: sampleRate       },
      });

      $read(this, "name", "OfflineAudioContext");
      $read(this, "destination", new impl.AudioDestinationNode(this));
      $read(this, "sampleRate", sampleRate);
      $read(this, "currentTime", function() {
        return this._currentTime;
      }.bind(this));
      $read(this, "listener", new impl.AudioListener(this));
      $type(this, "oncomplete", "function", NOP);

      this._currentTime = 0;
      this._targetTime  = 0;
      this._remain = 0;

      this._numberOfChannels = numberOfChannels;
      this._length = length;
      this._processed = 0;
      this._rendering = false;
    }
    _.inherits(OfflineAudioContext, AudioContext);

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
          dx = Math.min(CURRENT_TIME_INCR, this._targetTime - this._currentTime);
          this._remain = CURRENT_TIME_INCR - dx;
        }
        this.destination.$process(this._currentTime, this._currentTime + dx);
        this._currentTime = this._currentTime + dx;
        this._processed += BUFFER_SIZE * (dx / CURRENT_TIME_INCR);
      }

      if (this._length <= this._processed) {
        var e = new impl.OfflineAudioCompletionEvent();

        e.renderedBuffer = new impl.AudioBuffer(this, this._numberOfChannels, this._length, this.sampleRate);

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

    return OfflineAudioContext;
  })();

  global.OfflineAudioCompletionEvent = ILLEGAL_CONSTRUCTOR(Event);

  impl.OfflineAudioCompletionEvent = (function() {
    function OfflineAudioCompletionEvent() {
      $read(this, "name", "OfflineAudioCompletionEvent");
    }
    _.inherits(OfflineAudioCompletionEvent, global.OfflineAudioCompletionEvent);
    return OfflineAudioCompletionEvent;
  })();

  global.AudioNode = ILLEGAL_CONSTRUCTOR();

  impl.AudioNode = (function() {
    function AudioNode(spec) {
      $read(this, "context", spec.context);
      $read(this, "name", spec.name);
      $read(this, "jsonAttrs", spec.jsonAttrs);
      $read(this, "numberOfInputs", spec.numberOfInputs);
      $read(this, "numberOfOutputs", spec.numberOfOutputs);
      $type(this, "channelCount", "number", spec.channelCount);
      $enum(this, "channelCountMode", [ "max", "clamped-max", "explicit" ], spec.channelCountMode);
      $enum(this, "channelInterpretation", [ "speakers", "discrete" ], spec.channelInterpretation);

      this.$inputs  = [];
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

      if (this.context !== destination.context) {
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

    return AudioNode;
  })();

  global.AudioDestinationNode = ILLEGAL_CONSTRUCTOR(impl.AudioNode);

  impl.AudioDestinationNode = (function() {
    function AudioDestinationNode(context) {
      impl.AudioNode.call(this, {
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
    _.inherits(AudioDestinationNode, global.AudioDestinationNode);
    return AudioDestinationNode;
  })();

  global.AudioParam = ILLEGAL_CONSTRUCTOR();

  impl.AudioParam = (function() {
    function AudioParam(node, name, defaultValue, minValue, maxValue) {
      $read(this, "node", node);
      $read(this, "context", node.context);
      $read(this, "name", name);
      $read(this, "defaultValue", defaultValue);
      $read(this, "minValue", minValue);
      $read(this, "maxValue", maxValue);
      $type(this, "value", "number", defaultValue);

      this.$inputs = [];
      this._events = [];
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

    function setTarget(v, v0, v1, t, t0, t1, timeConstant) {
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

      var index = (curve.length - 1) * dt;
      var delta = index - (index|0);
      var v0 = _.defaults(curve[(index + 0)|0], v);
      var v1 = _.defaults(curve[(index + 1)|0], v);

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

    AudioParam.prototype.$process = function(currentTime, nextCurrentTime) {
      /* istanbul ignore else */
      if (currentTime !== this._currentTime) {
        this._currentTime = currentTime;

        this.$inputs.forEach(function(src) {
          src.$process(currentTime, nextCurrentTime);
        });

        this.value = calcValue(this.value, nextCurrentTime, this._events);
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
        startValue: this.value,
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
      var events = this._events;

      for (var i = 0, imax = events.length; i < imax; ++i) {
        if (events[i].time >= startTime) {
          return events.splice(i);
        }
      }
    };

    return AudioParam;
  })();

  global.GainNode = ILLEGAL_CONSTRUCTOR(
    impl.AudioNode, "createGain()"
  );

  impl.GainNode = (function() {
    function GainNode(context) {
      impl.AudioNode.call(this, {
        context: context,
        name: "GainNode",
        jsonAttrs: [ "gain"　],
        numberOfInputs  : 1,
        numberOfOutputs : 1,
        channelCount    : 2,
        channelCountMode: "max",
        channelInterpretation: "speakers"
      });
      $read(this, "gain", new impl.AudioParam(this, "gain", 1.0, 0.0, 1.0));
    }
    _.inherits(GainNode, global.GainNode);

    return GainNode;
  })();

  global.DelayNode = ILLEGAL_CONSTRUCTOR(
    impl.AudioNode, "createDelay()"
  );

  impl.DelayNode = (function() {
    function DelayNode(context, maxDelayTime) {
      impl.AudioNode.call(this, {
        context: context,
        name: "DelayNode",
        jsonAttrs: [ "delayTime"　],
        numberOfInputs  : 1,
        numberOfOutputs : 1,
        channelCount    : 2,
        channelCountMode: "max",
        channelInterpretation: "speakers"
      });
      $read(this, "delayTime", new impl.AudioParam(this, "delayTime", 0, 0, maxDelayTime));
    }
    _.inherits(DelayNode, global.DelayNode);

    return DelayNode;
  })();

  global.AudioBuffer = ILLEGAL_CONSTRUCTOR(
    null, "createBuffer(numberOfChannels, length, sampleRate)"
  );

  impl.AudioBuffer = (function() {
    function AudioBuffer(context, numberOfChannels, length, sampleRate) {
      _.check("AudioBuffer(numerOfChannels, length, sampleRate)", {
        numberOfChannels: { type: "number", given: numberOfChannels },
        length          : { type: "number", given: length           },
        sampleRate      : { type: "number", given: sampleRate       },
      });
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
      throw new Error(_.format(
        "#{caption}: channel index (#{index}) exceeds number of channels (#{length})", {
          caption: _.caption(this, "getChannelData(channel)"),
          index  : channel,
          length : this._data.length
        }
      ));
    };

    return AudioBuffer;
  })();

  global.AudioBufferSourceNode = ILLEGAL_CONSTRUCTOR(
    impl.AudioNode, "createBufferSource()"
  );

  impl.AudioBufferSourceNode = (function() {
    function AudioBufferSourceNode(context) {
      impl.AudioNode.call(this, {
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
      $read(this, "playbackRate", new impl.AudioParam(this, "playbackRate", 1, 0, 1024));
      $type(this, "loop", "boolean", false);
      $type(this, "loopStart", "number", 0);
      $type(this, "loopEnd", "number", 0);
      $type(this, "onended", "function", NOP);
      $read(this, "$state", function() {
        return this.$stateAtTime(this.context.currentTime);
      });

      this._startTime = Infinity;
      this._stopTime  = Infinity;
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

    return AudioBufferSourceNode;
  })();

  global.MediaElementAudioSourceNode = ILLEGAL_CONSTRUCTOR(
    AudioNode, "createMediaElementSource(mediaElement)"
  );

  impl.MediaElementAudioSourceNode = (function() {
    function MediaElementAudioSourceNode(context) {
      impl.AudioNode.call(this, {
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

    return MediaElementAudioSourceNode;
  })();

  global.ScriptProcessorNode = ILLEGAL_CONSTRUCTOR(
    impl.AudioNode, "createScriptProcessor(bufferSize, numberOfInputChannels, numberOfOutputChannels)"
  );

  impl.ScriptProcessorNode = (function() {
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
      impl.AudioNode.call(this, {
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
    _.inherits(ScriptProcessorNode, global.ScriptProcessorNode);

    ScriptProcessorNode.prototype._process = function(currentTime, nextCurrentTime) {
      var numSamples = ((nextCurrentTime - currentTime) / CURRENT_TIME_INCR) * BUFFER_SIZE;

      this._numSamples -= numSamples;

      if (this._numSamples <= 0) {
        this._numSamples += this.bufferSize;

        var e = new impl.AudioProcessingEvent();

        e.playbackTime = this.context.currentTime;
        e.inputBuffer = new impl.AudioBuffer(this.context, this.numberOfInputChannels, this.bufferSize, this.context.sampleRate);
        e.outputBuffer = new impl.AudioBuffer(this.context, this.numberOfOutputChannels, this.bufferSize, this.context.sampleRate);

        this.onaudioprocess(e);
      }
    };

    return ScriptProcessorNode;
  })();

  global.AudioProcessingEvent = ILLEGAL_CONSTRUCTOR(Event);

  impl.AudioProcessingEvent = (function() {
    function AudioProcessingEvent() {
      $read(this, "name", "AudioProcessingEvent");
    }
    _.inherits(AudioProcessingEvent, global.AudioProcessingEvent);
    return AudioProcessingEvent;
  })();

  global.PannerNode = ILLEGAL_CONSTRUCTOR(
    impl.AudioNode, "createPanner()"
  );

  impl.PannerNode = (function() {
    function PannerNode(context) {
      impl.AudioNode.call(this, {
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

    return PannerNode;
  })();

  global.AudioListener = ILLEGAL_CONSTRUCTOR();

  impl.AudioListener = (function() {
    function AudioListener() {
      $read(this, "name", "AudioListener");
      $type(this, "dopplerFactor", "number", 1);
      $type(this, "speedOfSound", "number", 343.3);
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

    return AudioListener;
  })();

  global.ConvolverNode = ILLEGAL_CONSTRUCTOR(
    impl.AudioNode, "createConvolver()"
  );

  impl.ConvolverNode = (function() {
    function ConvolverNode(context) {
      impl.AudioNode.call(this, {
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
    _.inherits(ConvolverNode, global.ConvolverNode);

    return ConvolverNode;
  })();

  global.AnalyserNode = ILLEGAL_CONSTRUCTOR(
    impl.AudioNode, "createAnalyser()"
  );

  impl.AnalyserNode = (function() {
    function AnalyserNode(context) {
      impl.AudioNode.call(this, {
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

    return AnalyserNode;
  })();

  global.ChannelSplitterNode = ILLEGAL_CONSTRUCTOR(
    impl.AudioNode, "createChannelSplitter(numberOfOutputs)"
  );

  impl.ChannelSplitterNode = (function() {
    function ChannelSplitterNode(context, numberOfOutputs) {
      _.check("ChannelSplitterNode(numberOfOutputs)", {
        numberOfOutputs: { type: "number", given: numberOfOutputs }
      });
      impl.AudioNode.call(this, {
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

    return ChannelSplitterNode;
  })();

  global.ChannelMergerNode = ILLEGAL_CONSTRUCTOR(
    impl.AudioNode, "createChannelMerger(numberOfInputs)"
  );

  impl.ChannelMergerNode = (function() {
    function ChannelMergerNode(context, numberOfInputs) {
      _.check("ChannelMergerNode(numberOfInputs)", {
        numberOfInputs: { type: "number", given: numberOfInputs }
      });
      impl.AudioNode.call(this, {
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

    return ChannelMergerNode;
  })();

  global.DynamicsCompressorNode = ILLEGAL_CONSTRUCTOR(
    impl.AudioNode, "createDynamicsCompressor()"
  );

  impl.DynamicsCompressorNode = (function() {
    function DynamicsCompressorNode(context) {
      impl.AudioNode.call(this, {
        context: context,
        name: "DynamicsCompressorNode",
        jsonAttrs: [ "threshold", "knee", "ratio", "reduction", "attack", "release" ],
        numberOfInputs  : 1,
        numberOfOutputs : 1,
        channelCount    : 2,
        channelCountMode: "explicit",
        channelInterpretation: "speakers"
      });
      $read(this, "threshold", new impl.AudioParam(this, "threshold", -24, -100, 0));
      $read(this, "knee", new impl.AudioParam(this, "knee", 30, 0, 40));
      $read(this, "ratio", new impl.AudioParam(this, "ratio", 12, 1, 20));
      $read(this, "reduction", new impl.AudioParam(this, "reduction", 0, -20, 0));
      $read(this, "attack", new impl.AudioParam(this, "attack", 0.003, 0, 1.0));
      $read(this, "release", new impl.AudioParam(this, "release", 0.250, 0, 1.0));
    }
    _.inherits(DynamicsCompressorNode, global.DynamicsCompressorNode);

    return DynamicsCompressorNode;
  })();

  global.BiquadFilterNode = ILLEGAL_CONSTRUCTOR(
    impl.AudioNode, "createBiquadFilter()"
  );

  impl.BiquadFilterNode = (function() {
    function BiquadFilterNode(context) {
      impl.AudioNode.call(this, {
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
      $read(this, "frequency", new impl.AudioParam(this, "frequency", 350, 10, SAMPLERATE / 2));
      $read(this, "detune", new impl.AudioParam(this, "detune", 0, -4800, 4800));
      $read(this, "Q", new impl.AudioParam(this, "Q", 1, 0.0001, 1000));
      $read(this, "gain", new impl.AudioParam(this, "gain", 0, -40, 40));
    }
    _.inherits(BiquadFilterNode, global.BiquadFilterNode);

    BiquadFilterNode.prototype.getFrequencyResponse = function(frequencyHz, magResponse, phaseResponse) {
      _.check(_.caption(this, "getFrequencyResponse(frequencyHz, magResponse, phaseResponse)"), {
        frequencyHz  : { type: "Float32Array", given: frequencyHz },
        magResponse  : { type: "Float32Array", given: magResponse },
        phaseResponse: { type: "Float32Array", given: phaseResponse },
      });
    };

    return BiquadFilterNode;
  })();

  global.WaveShaperNode = ILLEGAL_CONSTRUCTOR(
    impl.AudioNode, "createWaveShaper()"
  );

  impl.WaveShaperNode = (function() {
    function WaveShaperNode(context) {
      impl.AudioNode.call(this, {
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
    _.inherits(WaveShaperNode, global.WaveShaperNode);

    return WaveShaperNode;
  })();

  global.OscillatorNode = ILLEGAL_CONSTRUCTOR(
    impl.AudioNode, "createOscillator()"
  );

  impl.OscillatorNode = (function() {
    function OscillatorNode(context) {
      impl.AudioNode.call(this, {
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
      $read(this, "frequency", new impl.AudioParam(this, "frequency", 440, 0, 100000));
      $read(this, "detune", new impl.AudioParam(this, "detune", 0, -4800, 4800));
      $type(this, "onended", "function", NOP);
      $read(this, "$state", function() {
        return this.$stateAtTime(this.context.currentTime);
      });

      this._startTime = Infinity;
      this._stopTime  = Infinity;
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
    };

    return OscillatorNode;
  })();

  global.PeriodicWave = ILLEGAL_CONSTRUCTOR(
    null, "createPeriodicWave(real, imag)"
  );

  impl.PeriodicWave = (function() {
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
      $read(this, "name", "PeriodicWave");
    }
    _.inherits(PeriodicWave, global.PeriodicWave);
    return PeriodicWave;
  })();

  global.MediaStreamAudioSourceNode = ILLEGAL_CONSTRUCTOR(
    impl.AudioNode, "createMediaStreamSource(mediaStream)"
  );

  impl.MediaStreamAudioSourceNode = (function() {
    function　MediaStreamAudioSourceNode(context) {
      impl.AudioNode.call(this, {
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

    return MediaStreamAudioSourceNode;
  })();

  global.MediaStreamAudioDestinationNode = ILLEGAL_CONSTRUCTOR(
    impl.AudioNode, "createMediaStreamDestination()"
  );

  impl.MediaStreamAudioDestinationNode = (function() {
    function MediaStreamAudioDestinationNode(context) {
      impl.AudioNode.call(this, {
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

    return MediaStreamAudioDestinationNode;
  })();

})(this.self || global);
