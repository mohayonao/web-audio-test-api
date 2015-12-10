(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _templateObject = _taggedTemplateLiteral(["\n          ", ";\n          ", "\n        "], ["\n          ", ";\n          ", "\n        "]),
    _templateObject2 = _taggedTemplateLiteral(["\n          ", ";\n          not enabled\n        "], ["\n          ", ";\n          not enabled\n        "]);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require("./utils");

var _utils2 = _interopRequireDefault(_utils);

var _Configuration = require("./utils/Configuration");

var _Configuration2 = _interopRequireDefault(_Configuration);

var _Enumerator = require("./utils/Enumerator");

var _Enumerator2 = _interopRequireDefault(_Enumerator);

var _AudioNode2 = require("./AudioNode");

var _AudioNode3 = _interopRequireDefault(_AudioNode2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var configuration = _Configuration2.default.getInstance();

var AnalyserNode = (function (_AudioNode) {
  _inherits(AnalyserNode, _AudioNode);

  function AnalyserNode(admission, context) {
    _classCallCheck(this, AnalyserNode);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AnalyserNode).call(this, admission, {
      name: "AnalyserNode",
      context: context,
      numberOfInputs: 1,
      numberOfOutputs: 1,
      channelCount: 1,
      channelCountMode: "explicit",
      channelInterpretation: "speakers"
    }));

    _this._.fftSize = 2048;
    _this._.minDecibels = -100;
    _this._.maxDecibels = 30;
    _this._.smoothingTimeConstant = 0.8;
    _this._.JSONKeys = AnalyserNode.$JSONKeys.slice();
    return _this;
  }

  _createClass(AnalyserNode, [{
    key: "getFloatFrequencyData",
    value: function getFloatFrequencyData(array) {
      this._.inspector.describe("getFloatFrequencyData", function ($assert) {
        $assert(_utils2.default.isInstanceOf(array, Float32Array), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(array, "array", "Float32Array")));
        });
      });
    }
  }, {
    key: "getByteFrequencyData",
    value: function getByteFrequencyData(array) {
      this._.inspector.describe("getByteFrequencyData", function ($assert) {
        $assert(_utils2.default.isInstanceOf(array, Uint8Array), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(array, "array", "Uint8Array")));
        });
      });
    }
  }, {
    key: "getFloatTimeDomainData",
    value: function getFloatTimeDomainData(array) {
      this._.inspector.describe("getFloatTimeDomainData", function ($assert) {
        $assert(configuration.getState("AnalyserNode#getFloatTimeDomainData") === "enabled", function (fmt) {
          throw new TypeError(fmt.plain(_templateObject2, fmt.form));
        });
        $assert(_utils2.default.isInstanceOf(array, Float32Array), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(array, "array", "Float32Array")));
        });
      });
    }
  }, {
    key: "getByteTimeDomainData",
    value: function getByteTimeDomainData(array) {
      this._.inspector.describe("getByteTimeDomainData", function ($assert) {
        $assert(_utils2.default.isInstanceOf(array, Uint8Array), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(array, "array", "Uint8Array")));
        });
      });
    }
  }, {
    key: "fftSize",
    get: function get() {
      return this._.fftSize;
    },
    set: function set(value) {
      this._.inspector.describe("fftSize", function ($assert) {
        var enumFFTSize = new _Enumerator2.default([32, 64, 128, 256, 512, 1024, 2048]);

        $assert(enumFFTSize.contains(value), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(value, "fftSize", enumFFTSize.toString())));
        });
      });

      this._.fftSize = value;
    }
  }, {
    key: "frequencyBinCount",
    get: function get() {
      return this.fftSize >> 1;
    },
    set: function set(value) {
      this._.inspector.describe("frequencyBinCount", function ($assert) {
        $assert.throwReadOnlyTypeError(value);
      });
    }
  }, {
    key: "minDecibels",
    get: function get() {
      return this._.minDecibels;
    },
    set: function set(value) {
      this._.inspector.describe("minDecibels", function ($assert) {
        $assert(_utils2.default.isNumber(value), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(value, "minDecibels", "number")));
        });
      });

      this._.minDecibels = value;
    }
  }, {
    key: "maxDecibels",
    get: function get() {
      return this._.maxDecibels;
    },
    set: function set(value) {
      this._.inspector.describe("maxDecibels", function ($assert) {
        $assert(_utils2.default.isNumber(value), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(value, "maxDecibels", "number")));
        });
      });

      this._.maxDecibels = value;
    }
  }, {
    key: "smoothingTimeConstant",
    get: function get() {
      return this._.smoothingTimeConstant;
    },
    set: function set(value) {
      this._.inspector.describe("smoothingTimeConstant", function ($assert) {
        $assert(_utils2.default.isNumber(value), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(value, "smoothingTimeConstant", "number")));
        });
      });

      this._.smoothingTimeConstant = value;
    }
  }]);

  return AnalyserNode;
})(_AudioNode3.default);

exports.default = AnalyserNode;

AnalyserNode.$JSONKeys = ["fftSize", "minDecibels", "maxDecibels", "smoothingTimeConstant"];

},{"./AudioNode":7,"./utils":44,"./utils/Configuration":37,"./utils/Enumerator":38}],2:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _templateObject = _taggedTemplateLiteral(["\n          ", ";\n          ", "\n        "], ["\n          ", ";\n          ", "\n        "]),
    _templateObject2 = _taggedTemplateLiteral(["\n          ", ";\n          channel index (", ") exceeds number of channels (", ")\n        "], ["\n          ", ";\n          channel index (", ") exceeds number of channels (", ")\n        "]),
    _templateObject3 = _taggedTemplateLiteral(["\n          ", ";\n          not enabled\n        "], ["\n          ", ";\n          not enabled\n        "]),
    _templateObject4 = _taggedTemplateLiteral(["\n          ", ";\n          The channelNumber provided (", ") is outside the range [0, ", ")\n        "], ["\n          ", ";\n          The channelNumber provided (", ") is outside the range [0, ", ")\n        "]),
    _templateObject5 = _taggedTemplateLiteral(["\n          ", ";\n          The startInChannel provided (", ") is outside the range [0, ", ").\n        "], ["\n          ", ";\n          The startInChannel provided (", ") is outside the range [0, ", ").\n        "]);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require("./utils");

var _utils2 = _interopRequireDefault(_utils);

var _Configuration = require("./utils/Configuration");

var _Configuration2 = _interopRequireDefault(_Configuration);

var _Immigration = require("./utils/Immigration");

var _Immigration2 = _interopRequireDefault(_Immigration);

var _Inspector = require("./utils/Inspector");

var _Inspector2 = _interopRequireDefault(_Inspector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var configuration = _Configuration2.default.getInstance();
var immigration = _Immigration2.default.getInstance();

var AudioBuffer = (function () {
  function AudioBuffer(admission, context, numberOfChannels, length, sampleRate) {
    _classCallCheck(this, AudioBuffer);

    immigration.check(admission, function () {
      throw new TypeError("Illegal constructor");
    });

    Object.defineProperty(this, "_", {
      value: {
        inspector: new _Inspector2.default(this)
      }
    });

    this._.inspector.describe("constructor", function ($assert) {
      $assert(_utils2.default.isPositiveInteger(numberOfChannels), function (fmt) {
        throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(numberOfChannels, "numberOfChannels", "positive integer")));
      });

      $assert(_utils2.default.isPositiveInteger(length), function (fmt) {
        throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(length, "length", "positive integer")));
      });

      $assert(_utils2.default.isPositiveInteger(sampleRate), function (fmt) {
        throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(sampleRate, "sampleRate", "positive integer")));
      });
    });

    this._.context = context;
    this._.numberOfChannels = numberOfChannels;
    this._.length = length;
    this._.sampleRate = sampleRate;
    this._.data = new Array(numberOfChannels);

    for (var i = 0; i < numberOfChannels; i++) {
      this._.data[i] = new Float32Array(length);
    }
  }

  _createClass(AudioBuffer, [{
    key: "getChannelData",
    value: function getChannelData(channel) {
      var _this = this;

      this._.inspector.describe("getChannelData", function ($assert) {
        $assert(_utils2.default.isPositiveInteger(channel), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(channel, "channel", "positive integer")));
        });

        $assert(channel < _this._.data.length, function (fmt) {
          throw new TypeError(fmt.plain(_templateObject2, fmt.form, channel, _this._.data.length));
        });
      });

      return this._.data[channel];
    }
  }, {
    key: "copyFromChannel",
    value: function copyFromChannel(destination, channelNumber, startInChannel) {
      var _this2 = this;

      if (arguments.length < 3) {
        startInChannel = 0;
      }

      this._.inspector.describe("copyFromChannel", function ($assert) {
        $assert(configuration.getState("AudioBuffer#copyFromChannel") === "enabled", function (fmt) {
          throw new TypeError(fmt.plain(_templateObject3, fmt.form));
        });

        $assert(_utils2.default.isInstanceOf(destination, Float32Array), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(destination, "destination", "Float32Array")));
        });

        $assert(_utils2.default.isPositiveInteger(channelNumber), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(channelNumber, "channelNumber", "positive integer")));
        });

        $assert(_utils2.default.isPositiveInteger(startInChannel), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(channelNumber, "startInChannel", "positive integer")));
        });

        $assert(0 <= channelNumber && channelNumber < _this2._.data.length, function (fmt) {
          throw new TypeError(fmt.plain(_templateObject4, fmt.form, channelNumber, _this2._.data.length));
        });

        $assert(0 <= startInChannel && startInChannel < _this2._.length, function (fmt) {
          throw new TypeError(fmt.plain(_templateObject5, fmt.form, startInChannel, _this2._.length));
        });
      });

      var source = this._.data[channelNumber].subarray(startInChannel);

      destination.set(source.subarray(0, Math.min(source.length, destination.length)));
    }
  }, {
    key: "copyToChannel",
    value: function copyToChannel(source, channelNumber, startInChannel) {
      var _this3 = this;

      if (arguments.length < 3) {
        startInChannel = 0;
      }

      this._.inspector.describe("copyToChannel", function ($assert) {
        $assert(configuration.getState("AudioBuffer#copyToChannel") === "enabled", function (fmt) {
          throw new TypeError(fmt.plain(_templateObject3, fmt.form));
        });

        $assert(_utils2.default.isInstanceOf(source, Float32Array), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(source, "destination", "Float32Array")));
        });

        $assert(_utils2.default.isPositiveInteger(channelNumber), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(channelNumber, "channelNumber", "positive integer")));
        });

        $assert(_utils2.default.isPositiveInteger(startInChannel), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(channelNumber, "startInChannel", "positive integer")));
        });

        $assert(0 <= channelNumber && channelNumber < _this3._.data.length, function (fmt) {
          throw new TypeError(fmt.plain(_templateObject4, fmt.form, channelNumber, _this3._.data.length));
        });

        $assert(0 <= startInChannel && startInChannel < _this3._.length, function (fmt) {
          throw new TypeError(fmt.plain(_templateObject5, fmt.form, startInChannel, _this3._.length));
        });
      });

      var clipped = source.subarray(0, Math.min(source.length, this._.length - startInChannel));

      this._.data[channelNumber].set(clipped, startInChannel);
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      var json = {
        name: this.$name,
        sampleRate: this.sampleRate,
        length: this.length,
        duration: this.duration,
        numberOfChannels: this.numberOfChannels
      };

      if (this.$context.VERBOSE_JSON) {
        json.data = this._.data.map(function (data) {
          return Array.prototype.slice.call(data);
        });
      }

      return json;
    }
  }, {
    key: "sampleRate",
    get: function get() {
      return this._.sampleRate;
    },
    set: function set(value) {
      this._.inspector.describe("sampleRate", function ($assert) {
        $assert.throwReadOnlyTypeError(value);
      });
    }
  }, {
    key: "length",
    get: function get() {
      return this._.length;
    },
    set: function set(value) {
      this._.inspector.describe("length", function ($assert) {
        $assert.throwReadOnlyTypeError(value);
      });
    }
  }, {
    key: "duration",
    get: function get() {
      return this.length / this.sampleRate;
    },
    set: function set(value) {
      this._.inspector.describe("duration", function ($assert) {
        $assert.throwReadOnlyTypeError(value);
      });
    }
  }, {
    key: "numberOfChannels",
    get: function get() {
      return this._.numberOfChannels;
    },
    set: function set(value) {
      this._.inspector.describe("numberOfChannels", function ($assert) {
        $assert.throwReadOnlyTypeError(value);
      });
    }
  }, {
    key: "$name",
    get: function get() {
      return "AudioBuffer";
    }
  }, {
    key: "$context",
    get: function get() {
      return this._.context;
    }
  }]);

  return AudioBuffer;
})();

exports.default = AudioBuffer;

},{"./utils":44,"./utils/Configuration":37,"./utils/Immigration":40,"./utils/Inspector":41}],3:[function(require,module,exports){
(function (global){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _templateObject = _taggedTemplateLiteral(["\n          ", ";\n          ", "\n        "], ["\n          ", ";\n          ", "\n        "]),
    _templateObject2 = _taggedTemplateLiteral(["\n          ", ";\n          cannot start more than once\n        "], ["\n          ", ";\n          cannot start more than once\n        "]),
    _templateObject3 = _taggedTemplateLiteral(["\n          ", ";\n          cannot call stop without calling start first\n        "], ["\n          ", ";\n          cannot call stop without calling start first\n        "]),
    _templateObject4 = _taggedTemplateLiteral(["\n          ", ";\n          cannot stop more than once\n        "], ["\n          ", ";\n          cannot stop more than once\n        "]);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require("./utils");

var _utils2 = _interopRequireDefault(_utils);

var _Immigration = require("./utils/Immigration");

var _Immigration2 = _interopRequireDefault(_Immigration);

var _AudioNode2 = require("./AudioNode");

var _AudioNode3 = _interopRequireDefault(_AudioNode2);

var _AudioParam = require("./AudioParam");

var _AudioParam2 = _interopRequireDefault(_AudioParam);

var _Event = require("./Event");

var _Event2 = _interopRequireDefault(_Event);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var immigration = _Immigration2.default.getInstance();

var AudioBufferSourceNode = (function (_AudioNode) {
  _inherits(AudioBufferSourceNode, _AudioNode);

  function AudioBufferSourceNode(admission, context) {
    _classCallCheck(this, AudioBufferSourceNode);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AudioBufferSourceNode).call(this, admission, {
      name: "AudioBufferSourceNode",
      context: context,
      numberOfInputs: 0,
      numberOfOutputs: 1,
      channelCount: 2,
      channelCountMode: "max",
      channelInterpretation: "speakers"
    }));

    _this._.buffer = null;
    _this._.playbackRate = immigration.apply(function (admission) {
      return new _AudioParam2.default(admission, _this, "playbackRate", 1, 0, 1024);
    });
    _this._.detune = immigration.apply(function (admission) {
      return new _AudioParam2.default(admission, _this, "detune", 0, -4800, 4800);
    });
    _this._.loop = false;
    _this._.loopStart = 0;
    _this._.loopEnd = 0;
    _this._.onended = null;
    _this._.startTime = Infinity;
    _this._.stopTime = Infinity;
    _this._.firedOnEnded = false;
    _this._.JSONKeys = AudioBufferSourceNode.$JSONKeys.slice();
    return _this;
  }

  _createClass(AudioBufferSourceNode, [{
    key: "start",
    value: function start(when, offset, duration) {
      var _this2 = this;

      if (arguments.length < 3) {
        duration = 0;
      }
      if (arguments.length < 2) {
        offset = 0;
      }
      if (arguments.length < 1) {
        when = 0;
      }

      this._.inspector.describe("start", ["when", "offset", "duration"], function ($assert) {
        $assert(_utils2.default.isPositiveNumber(when), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(when, "when", "positive number")));
        });

        $assert(_utils2.default.isPositiveNumber(offset), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(offset, "offset", "positive number")));
        });

        $assert(_utils2.default.isPositiveNumber(duration), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(duration, "duration", "positive number")));
        });

        $assert(_this2._.startTime === Infinity, function (fmt) {
          throw new Error(fmt.plain(_templateObject2, fmt.form));
        });
      });

      this._.startTime = when;
    }
  }, {
    key: "stop",
    value: function stop(when) {
      var _this3 = this;

      if (arguments.length < 1) {
        when = 0;
      }

      this._.inspector.describe("stop", ["when"], function ($assert) {
        $assert(_utils2.default.isPositiveNumber(when), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(when, "when", "positive number")));
        });

        $assert(_this3._.startTime !== Infinity, function (fmt) {
          throw new Error(fmt.plain(_templateObject3, fmt.form));
        });

        $assert(_this3._.stopTime === Infinity, function (fmt) {
          throw new Error(fmt.plain(_templateObject4, fmt.form));
        });
      });

      this._.stopTime = when;
    }
  }, {
    key: "$stateAtTime",
    value: function $stateAtTime(_time) {
      var time = _utils2.default.toSeconds(_time);

      if (this._.startTime === Infinity) {
        return "UNSCHEDULED";
      }
      if (time < this._.startTime) {
        return "SCHEDULED";
      }

      var stopTime = this._.stopTime;

      if (!this.loop && this.buffer) {
        stopTime = Math.min(stopTime, this._.startTime + this.buffer.duration);
      }

      if (time < stopTime) {
        return "PLAYING";
      }

      return "FINISHED";
    }
  }, {
    key: "_process",
    value: function _process() {
      if (!this._.firedOnEnded && this.$stateAtTime(this.context.currentTime) === "FINISHED") {
        this.dispatchEvent(new _Event2.default("ended", this));
        this._.firedOnEnded = true;
      }
    }
  }, {
    key: "buffer",
    get: function get() {
      return this._.buffer;
    },
    set: function set(value) {
      this._.inspector.describe("buffer", function ($assert) {
        $assert(_utils2.default.isNullOrInstanceOf(value, global.AudioBuffer), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(value, "buffer", "AudioBuffer")));
        });
      });

      this._.buffer = value;
    }
  }, {
    key: "playbackRate",
    get: function get() {
      return this._.playbackRate;
    },
    set: function set(value) {
      this._.inspector.describe("playbackRate", function ($assert) {
        $assert.throwReadOnlyTypeError(value);
      });
    }
  }, {
    key: "detune",
    get: function get() {
      return this._.detune;
    },
    set: function set(value) {
      this._.inspector.describe("detune", function ($assert) {
        $assert.throwReadOnlyTypeError(value);
      });
    }
  }, {
    key: "loop",
    get: function get() {
      return this._.loop;
    },
    set: function set(value) {
      this._.inspector.describe("loop", function ($assert) {
        $assert(_utils2.default.isBoolean(value), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(value, "loop", "boolean")));
        });
      });

      this._.loop = value;
    }
  }, {
    key: "loopStart",
    get: function get() {
      return this._.loopStart;
    },
    set: function set(value) {
      this._.inspector.describe("loopStart", function ($assert) {
        $assert(_utils2.default.isPositiveNumber(value), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(value, "loopStart", "positive number")));
        });
      });

      this._.loopStart = value;
    }
  }, {
    key: "loopEnd",
    get: function get() {
      return this._.loopEnd;
    },
    set: function set(value) {
      this._.inspector.describe("loopEnd", function ($assert) {
        $assert(_utils2.default.isPositiveNumber(value), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(value, "loopEnd", "positive number")));
        });
      });

      this._.loopEnd = value;
    }
  }, {
    key: "onended",
    get: function get() {
      return this._.onended;
    },
    set: function set(value) {
      this._.inspector.describe("onended", function ($assert) {
        $assert(_utils2.default.isNullOrFunction(value), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(value, "onended", "function")));
        });
      });

      this._.onended = value;
    }
  }, {
    key: "$state",
    get: function get() {
      return this.$stateAtTime(this.context.currentTime);
    }
  }, {
    key: "$startTime",
    get: function get() {
      return this._.startTime;
    }
  }, {
    key: "$stopTime",
    get: function get() {
      return this._.stopTime;
    }
  }]);

  return AudioBufferSourceNode;
})(_AudioNode3.default);

exports.default = AudioBufferSourceNode;

AudioBufferSourceNode.$JSONKeys = ["buffer", "playbackRate", "loop", "loopStart", "loopEnd"];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./AudioNode":7,"./AudioParam":9,"./Event":18,"./utils":44,"./utils/Immigration":40}],4:[function(require,module,exports){
(function (global){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _templateObject = _taggedTemplateLiteral(["\n        ", ";\n        not enabled\n      "], ["\n        ", ";\n        not enabled\n      "]),
    _templateObject2 = _taggedTemplateLiteral(["\n          ", ";\n          Cannot ", " a context that is being closed or has already been closed\n        "], ["\n          ", ";\n          Cannot ", " a context that is being closed or has already been closed\n        "]),
    _templateObject3 = _taggedTemplateLiteral(["\n            ", ";\n            ", "\n          "], ["\n            ", ";\n            ", "\n          "]),
    _templateObject4 = _taggedTemplateLiteral(["\n          ", ";\n          not enabled\n        "], ["\n          ", ";\n          not enabled\n        "]),
    _templateObject5 = _taggedTemplateLiteral(["\n          ", ";\n          ", "\n        "], ["\n          ", ";\n          ", "\n        "]);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require("./utils");

var _utils2 = _interopRequireDefault(_utils);

var _Configuration = require("./utils/Configuration");

var _Configuration2 = _interopRequireDefault(_Configuration);

var _Immigration = require("./utils/Immigration");

var _Immigration2 = _interopRequireDefault(_Immigration);

var _Event = require("./Event");

var _Event2 = _interopRequireDefault(_Event);

var _EventTarget2 = require("./EventTarget");

var _EventTarget3 = _interopRequireDefault(_EventTarget2);

var _AnalyserNode = require("./AnalyserNode");

var _AnalyserNode2 = _interopRequireDefault(_AnalyserNode);

var _AudioBuffer = require("./AudioBuffer");

var _AudioBuffer2 = _interopRequireDefault(_AudioBuffer);

var _AudioBufferSourceNode = require("./AudioBufferSourceNode");

var _AudioBufferSourceNode2 = _interopRequireDefault(_AudioBufferSourceNode);

var _AudioDestinationNode = require("./AudioDestinationNode");

var _AudioDestinationNode2 = _interopRequireDefault(_AudioDestinationNode);

var _AudioListener = require("./AudioListener");

var _AudioListener2 = _interopRequireDefault(_AudioListener);

var _BiquadFilterNode = require("./BiquadFilterNode");

var _BiquadFilterNode2 = _interopRequireDefault(_BiquadFilterNode);

var _ChannelMergerNode = require("./ChannelMergerNode");

var _ChannelMergerNode2 = _interopRequireDefault(_ChannelMergerNode);

var _ChannelSplitterNode = require("./ChannelSplitterNode");

var _ChannelSplitterNode2 = _interopRequireDefault(_ChannelSplitterNode);

var _ConvolverNode = require("./ConvolverNode");

var _ConvolverNode2 = _interopRequireDefault(_ConvolverNode);

var _DelayNode = require("./DelayNode");

var _DelayNode2 = _interopRequireDefault(_DelayNode);

var _DynamicsCompressorNode = require("./DynamicsCompressorNode");

var _DynamicsCompressorNode2 = _interopRequireDefault(_DynamicsCompressorNode);

var _GainNode = require("./GainNode");

var _GainNode2 = _interopRequireDefault(_GainNode);

var _MediaElementAudioSourceNode = require("./MediaElementAudioSourceNode");

var _MediaElementAudioSourceNode2 = _interopRequireDefault(_MediaElementAudioSourceNode);

var _MediaStreamAudioDestinationNode = require("./MediaStreamAudioDestinationNode");

var _MediaStreamAudioDestinationNode2 = _interopRequireDefault(_MediaStreamAudioDestinationNode);

var _MediaStreamAudioSourceNode = require("./MediaStreamAudioSourceNode");

var _MediaStreamAudioSourceNode2 = _interopRequireDefault(_MediaStreamAudioSourceNode);

var _OscillatorNode = require("./OscillatorNode");

var _OscillatorNode2 = _interopRequireDefault(_OscillatorNode);

var _PannerNode = require("./PannerNode");

var _PannerNode2 = _interopRequireDefault(_PannerNode);

var _PeriodicWave = require("./PeriodicWave");

var _PeriodicWave2 = _interopRequireDefault(_PeriodicWave);

var _ScriptProcessorNode = require("./ScriptProcessorNode");

var _ScriptProcessorNode2 = _interopRequireDefault(_ScriptProcessorNode);

var _StereoPannerNode = require("./StereoPannerNode");

var _StereoPannerNode2 = _interopRequireDefault(_StereoPannerNode);

var _WaveShaperNode = require("./WaveShaperNode");

var _WaveShaperNode2 = _interopRequireDefault(_WaveShaperNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var configuration = _Configuration2.default.getInstance();
var immigration = _Immigration2.default.getInstance();

function isEnabledState() {
  return configuration.getState("AudioContext#suspend") === "enabled" || configuration.getState("AudioContext#resume") === "enabled" || configuration.getState("AudioContext#close") === "enabled";
}

function transitionToState(methodName, callback) {
  var _this = this;

  this._.inspector.describe(methodName, [], function ($assert) {
    $assert(configuration.getState("AudioContext#" + methodName) === "enabled", function (fmt) {
      throw new TypeError(fmt.plain(_templateObject, fmt.form));
    });
  });

  return new Promise(function (resolve, reject) {
    _this._.inspector.describe(methodName, [], function ($assert) {
      $assert(_this._.state !== "closed", function (fmt) {
        reject(new Error(fmt.plain(_templateObject2, fmt.form, methodName)));
      });
    });

    callback();
    resolve();
  });
}

var AudioContext = (function (_EventTarget) {
  _inherits(AudioContext, _EventTarget);

  function AudioContext() {
    _classCallCheck(this, AudioContext);

    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(AudioContext).call(this));

    _this2._.destination = immigration.apply(function (admission) {
      return new _AudioDestinationNode2.default(admission, _this2);
    });
    _this2._.sampleRate = global.WebAudioTestAPI.sampleRate;
    _this2._.listener = immigration.apply(function (admission) {
      return new _AudioListener2.default(admission, _this2);
    });
    _this2._.microCurrentTime = 0;
    _this2._.processedSamples = 0;
    _this2._.tick = 0;
    _this2._.state = "running";
    _this2._.onstatechange = null;
    return _this2;
  }

  _createClass(AudioContext, [{
    key: "suspend",
    value: function suspend() {
      var _this3 = this;

      return transitionToState.call(this, "suspend", function () {
        if (_this3._.state === "running") {
          _this3._.state = "suspended";
          _this3.dispatchEvent(new _Event2.default("statechange", _this3));
        }
      });
    }
  }, {
    key: "resume",
    value: function resume() {
      var _this4 = this;

      return transitionToState.call(this, "resume", function () {
        if (_this4._.state === "suspended") {
          _this4._.state = "running";
          _this4.dispatchEvent(new _Event2.default("statechange", _this4));
        }
      });
    }
  }, {
    key: "close",
    value: function close() {
      var _this5 = this;

      return transitionToState.call(this, "close", function () {
        if (_this5._.state !== "closed") {
          _this5._.state = "closed";
          _this5.$reset();
          _this5.dispatchEvent(new _Event2.default("statechange", _this5));
        }
      });
    }
  }, {
    key: "createBuffer",
    value: function createBuffer(numberOfChannels, length, sampleRate) {
      var _this6 = this;

      return immigration.apply(function (admission) {
        return new _AudioBuffer2.default(admission, _this6, numberOfChannels, length, sampleRate);
      });
    }
  }, {
    key: "decodeAudioData",
    value: function decodeAudioData(audioData, _successCallback, _errorCallback) {
      var _this7 = this;

      var isPromiseBased = configuration.getState("AudioContext#decodeAudioData") === "promise";
      var successCallback = undefined,
          errorCallback = undefined;

      if (isPromiseBased) {
        successCallback = _utils2.default.defaults(_successCallback, function () {});
        errorCallback = _utils2.default.defaults(_errorCallback, function () {});
      } else {
        successCallback = _successCallback;
        errorCallback = _utils2.default.defaults(_errorCallback, function () {});
      }

      function $assertion() {
        if ($assertion.done) {
          return;
        }

        this._.inspector.describe("decodeAudioData", ["audioData", "successCallback", "errorCallback"], function ($assert) {
          $assert(_utils2.default.isInstanceOf(audioData, global.ArrayBuffer), function (fmt) {
            throw new TypeError(fmt.plain(_templateObject3, fmt.form, fmt.butGot(audioData, "audioData", "ArrayBuffer")));
          });

          $assert(_utils2.default.isFunction(successCallback), function (fmt) {
            throw new TypeError(fmt.plain(_templateObject3, fmt.form, fmt.butGot(successCallback, "successCallback", "function")));
          });

          $assert(_utils2.default.isFunction(errorCallback), function (fmt) {
            throw new TypeError(fmt.plain(_templateObject3, fmt.form, fmt.butGot(errorCallback, "errorCallback", "function")));
          });
        });

        $assertion.done = true;
      }

      var promise = new Promise(function (resolve, reject) {
        $assertion.call(_this7);

        if (_this7.DECODE_AUDIO_DATA_FAILED) {
          reject();
        } else {
          resolve(_this7.DECODE_AUDIO_DATA_RESULT || immigration.apply(function (admission) {
            return new _AudioBuffer2.default(admission, _this7, 2, 1024, _this7.sampleRate);
          }));
        }
      });

      promise.then(successCallback, errorCallback);

      if (isPromiseBased) {
        return promise;
      }

      $assertion.call(this);
    }
  }, {
    key: "createBufferSource",
    value: function createBufferSource() {
      var _this8 = this;

      return immigration.apply(function (admission) {
        return new _AudioBufferSourceNode2.default(admission, _this8);
      });
    }
  }, {
    key: "createMediaElementSource",
    value: function createMediaElementSource(mediaElement) {
      var _this9 = this;

      return immigration.apply(function (admission) {
        return new _MediaElementAudioSourceNode2.default(admission, _this9, mediaElement);
      });
    }
  }, {
    key: "createMediaStreamSource",
    value: function createMediaStreamSource(mediaStream) {
      var _this10 = this;

      return immigration.apply(function (admission) {
        return new _MediaStreamAudioSourceNode2.default(admission, _this10, mediaStream);
      });
    }
  }, {
    key: "createMediaStreamDestination",
    value: function createMediaStreamDestination() {
      var _this11 = this;

      return immigration.apply(function (admission) {
        return new _MediaStreamAudioDestinationNode2.default(admission, _this11);
      });
    }
  }, {
    key: "createAudioWorker",
    value: function createAudioWorker() {
      this._.inspector.describe("createAudioWorker", function ($assert) {
        $assert(false, function (fmt) {
          throw new TypeError(fmt.plain(_templateObject4, fmt.form));
        });
      });
    }
  }, {
    key: "createScriptProcessor",
    value: function createScriptProcessor(bufferSize, numberOfInputChannels, numberOfOutputChannels) {
      var _this12 = this;

      if (arguments.length < 3) {
        numberOfOutputChannels = 2;
      }
      if (arguments.length < 2) {
        numberOfInputChannels = 2;
      }

      return immigration.apply(function (admission) {
        return new _ScriptProcessorNode2.default(admission, _this12, bufferSize, numberOfInputChannels, numberOfOutputChannels);
      });
    }
  }, {
    key: "createAnalyser",
    value: function createAnalyser() {
      var _this13 = this;

      return immigration.apply(function (admission) {
        return new _AnalyserNode2.default(admission, _this13);
      });
    }
  }, {
    key: "createGain",
    value: function createGain() {
      var _this14 = this;

      return immigration.apply(function (admission) {
        return new _GainNode2.default(admission, _this14);
      });
    }
  }, {
    key: "createDelay",
    value: function createDelay(maxDelayTime) {
      var _this15 = this;

      if (arguments.length < 1) {
        maxDelayTime = 1;
      }

      return immigration.apply(function (admission) {
        return new _DelayNode2.default(admission, _this15, maxDelayTime);
      });
    }
  }, {
    key: "createBiquadFilter",
    value: function createBiquadFilter() {
      var _this16 = this;

      return immigration.apply(function (admission) {
        return new _BiquadFilterNode2.default(admission, _this16);
      });
    }
  }, {
    key: "createWaveShaper",
    value: function createWaveShaper() {
      var _this17 = this;

      return immigration.apply(function (admission) {
        return new _WaveShaperNode2.default(admission, _this17);
      });
    }
  }, {
    key: "createPanner",
    value: function createPanner() {
      var _this18 = this;

      return immigration.apply(function (admission) {
        return new _PannerNode2.default(admission, _this18);
      });
    }
  }, {
    key: "createStereoPanner",
    value: function createStereoPanner() {
      var _this19 = this;

      this._.inspector.describe("createStereoPanner", function ($assert) {
        $assert(configuration.getState("AudioContext#createStereoPanner") === "enabled", function (fmt) {
          throw new TypeError(fmt.plain(_templateObject4, fmt.form));
        });
      });

      return immigration.apply(function (admission) {
        return new _StereoPannerNode2.default(admission, _this19);
      });
    }
  }, {
    key: "createConvolver",
    value: function createConvolver() {
      var _this20 = this;

      return immigration.apply(function (admission) {
        return new _ConvolverNode2.default(admission, _this20);
      });
    }
  }, {
    key: "createChannelSplitter",
    value: function createChannelSplitter() {
      var _this21 = this;

      var numberOfOutputs = arguments.length <= 0 || arguments[0] === undefined ? 6 : arguments[0];

      return immigration.apply(function (admission) {
        return new _ChannelSplitterNode2.default(admission, _this21, numberOfOutputs);
      });
    }
  }, {
    key: "createChannelMerger",
    value: function createChannelMerger() {
      var _this22 = this;

      var numberOfInputs = arguments.length <= 0 || arguments[0] === undefined ? 6 : arguments[0];

      return immigration.apply(function (admission) {
        return new _ChannelMergerNode2.default(admission, _this22, numberOfInputs);
      });
    }
  }, {
    key: "createDynamicsCompressor",
    value: function createDynamicsCompressor() {
      var _this23 = this;

      return immigration.apply(function (admission) {
        return new _DynamicsCompressorNode2.default(admission, _this23);
      });
    }
  }, {
    key: "createOscillator",
    value: function createOscillator() {
      var _this24 = this;

      return immigration.apply(function (admission) {
        return new _OscillatorNode2.default(admission, _this24);
      });
    }
  }, {
    key: "createPeriodicWave",
    value: function createPeriodicWave(real, imag) {
      var _this25 = this;

      return immigration.apply(function (admission) {
        return new _PeriodicWave2.default(admission, _this25, real, imag);
      });
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return this.destination.toJSON([]);
    }
  }, {
    key: "$process",
    value: function $process(time) {
      this._process(_utils2.default.toMicroseconds(time));
    }
  }, {
    key: "$processTo",
    value: function $processTo(_time) {
      var time = _utils2.default.toMicroseconds(_time);

      if (this._.microCurrentTime < time) {
        this._process(time - this._.microCurrentTime);
      }
    }
  }, {
    key: "$reset",
    value: function $reset() {
      this._.microCurrentTime = 0;
      this._.processedSamples = 0;
      this.destination.$inputs.forEach(function (junction) {
        junction.inputs.forEach(function (junction) {
          junction.disconnectAll();
        });
      });
    }
  }, {
    key: "_process",
    value: function _process(microseconds) {
      var nextMicroCurrentTime = this._.microCurrentTime + microseconds;

      while (this._.state === "running" && this._.microCurrentTime < nextMicroCurrentTime) {
        var _nextMicroCurrentTime = Math.min(this._.microCurrentTime + 1000, nextMicroCurrentTime);
        var _nextProcessedSamples = Math.floor(_nextMicroCurrentTime / (1000 * 1000) * this.sampleRate);
        var inNumSamples = _nextProcessedSamples - this._.processedSamples;

        this._.microCurrentTime = _nextMicroCurrentTime;
        this._.processedSamples = _nextProcessedSamples;

        this.destination.$process(inNumSamples, ++this._.tick);
      }
    }
  }, {
    key: "destination",
    get: function get() {
      return this._.destination;
    },
    set: function set(value) {
      this._.inspector.describe("destination", function ($assert) {
        $assert.throwReadOnlyTypeError(value);
      });
    }
  }, {
    key: "sampleRate",
    get: function get() {
      return this._.sampleRate;
    },
    set: function set(value) {
      this._.inspector.describe("sampleRate", function ($assert) {
        $assert.throwReadOnlyTypeError(value);
      });
    }
  }, {
    key: "currentTime",
    get: function get() {
      return this._.microCurrentTime / (1000 * 1000);
    },
    set: function set(value) {
      this._.inspector.describe("currentTime", function ($assert) {
        $assert.throwReadOnlyTypeError(value);
      });
    }
  }, {
    key: "listener",
    get: function get() {
      return this._.listener;
    },
    set: function set(value) {
      this._.inspector.describe("listener", function ($assert) {
        $assert.throwReadOnlyTypeError(value);
      });
    }
  }, {
    key: "state",
    get: function get() {
      if (isEnabledState()) {
        return this._.state;
      }
    },
    set: function set(value) {
      if (!isEnabledState()) {
        return;
      }

      this._.inspector.describe("state", function ($assert) {
        $assert.throwReadOnlyTypeError(value);
      });
    }
  }, {
    key: "onstatechange",
    get: function get() {
      if (isEnabledState()) {
        return this._.onstatechange;
      }
    },
    set: function set(value) {
      if (!isEnabledState()) {
        return;
      }

      this._.inspector.describe("onstatechange", function ($assert) {
        $assert(_utils2.default.isNullOrFunction(value), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject5, fmt.form, fmt.butGot(value, "onstatechange", "function")));
        });
      });

      this._.onstatechange = value;
    }
  }, {
    key: "$name",
    get: function get() {
      return "AudioContext";
    }
  }, {
    key: "$context",
    get: function get() {
      return this;
    }
  }], [{
    key: "WEB_AUDIO_TEST_API_VERSION",
    get: function get() {
      return _utils2.default.getAPIVersion();
    }
  }]);

  return AudioContext;
})(_EventTarget3.default);

exports.default = AudioContext;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./AnalyserNode":1,"./AudioBuffer":2,"./AudioBufferSourceNode":3,"./AudioDestinationNode":5,"./AudioListener":6,"./BiquadFilterNode":11,"./ChannelMergerNode":12,"./ChannelSplitterNode":13,"./ConvolverNode":14,"./DelayNode":15,"./DynamicsCompressorNode":16,"./Event":18,"./EventTarget":19,"./GainNode":20,"./MediaElementAudioSourceNode":23,"./MediaStreamAudioDestinationNode":25,"./MediaStreamAudioSourceNode":26,"./OscillatorNode":29,"./PannerNode":30,"./PeriodicWave":31,"./ScriptProcessorNode":32,"./StereoPannerNode":33,"./WaveShaperNode":34,"./utils":44,"./utils/Configuration":37,"./utils/Immigration":40}],5:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AudioNode2 = require("./AudioNode");

var _AudioNode3 = _interopRequireDefault(_AudioNode2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AudioDestinationNode = (function (_AudioNode) {
  _inherits(AudioDestinationNode, _AudioNode);

  function AudioDestinationNode(admission, context) {
    _classCallCheck(this, AudioDestinationNode);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AudioDestinationNode).call(this, admission, {
      name: "AudioDestinationNode",
      context: context,
      numberOfInputs: 1,
      numberOfOutputs: 0,
      channelCount: 2,
      channelCountMode: "explicit",
      channelInterpretation: "speakers"
    }));

    _this._.maxChannelCount = 2;
    return _this;
  }

  _createClass(AudioDestinationNode, [{
    key: "maxChannelCount",
    get: function get() {
      return this._.maxChannelCount;
    },
    set: function set(value) {
      this._.inspector.describe("maxChannelCount", function ($assert) {
        $assert.throwReadOnlyTypeError(value);
      });
    }
  }]);

  return AudioDestinationNode;
})(_AudioNode3.default);

exports.default = AudioDestinationNode;

},{"./AudioNode":7}],6:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _templateObject = _taggedTemplateLiteral(["\n          ", ";\n          ", "\n        "], ["\n          ", ";\n          ", "\n        "]);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require("./utils");

var _utils2 = _interopRequireDefault(_utils);

var _Immigration = require("./utils/Immigration");

var _Immigration2 = _interopRequireDefault(_Immigration);

var _Inspector = require("./utils/Inspector");

var _Inspector2 = _interopRequireDefault(_Inspector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var immigration = _Immigration2.default.getInstance();

var AudioListener = (function () {
  function AudioListener(admission, context) {
    _classCallCheck(this, AudioListener);

    Object.defineProperty(this, "_", {
      value: {
        inspector: new _Inspector2.default(this)
      }
    });

    this._.context = context;
    this._.dopplerFactor = 1;
    this._.speedOfSound = 343.3;

    immigration.check(admission, function () {
      throw new TypeError("Illegal constructor");
    });
  }

  _createClass(AudioListener, [{
    key: "setPosition",
    value: function setPosition(x, y, z) {
      this._.inspector.describe("setPosition", function ($assert) {
        $assert(_utils2.default.isNumber(x), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(x, "x", "number")));
        });

        $assert(_utils2.default.isNumber(y), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(y, "y", "number")));
        });

        $assert(_utils2.default.isNumber(z), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(z, "z", "number")));
        });
      });
    }
  }, {
    key: "setOrientation",
    value: function setOrientation(x, y, z, xUp, yUp, zUp) {
      this._.inspector.describe("setOrientation", function ($assert) {
        $assert(_utils2.default.isNumber(x), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(x, "x", "number")));
        });

        $assert(_utils2.default.isNumber(y), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(y, "y", "number")));
        });

        $assert(_utils2.default.isNumber(z), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(z, "z", "number")));
        });

        $assert(_utils2.default.isNumber(xUp), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(xUp, "xUp", "number")));
        });

        $assert(_utils2.default.isNumber(yUp), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(yUp, "yUp", "number")));
        });

        $assert(_utils2.default.isNumber(zUp), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(zUp, "zUp", "number")));
        });
      });
    }
  }, {
    key: "setVelocity",
    value: function setVelocity(x, y, z) {
      this._.inspector.describe("setVelocity", function ($assert) {
        $assert(_utils2.default.isNumber(x), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(x, "x", "number")));
        });

        $assert(_utils2.default.isNumber(y), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(y, "y", "number")));
        });

        $assert(_utils2.default.isNumber(z), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(z, "z", "number")));
        });
      });
    }
  }, {
    key: "dopplerFactor",
    get: function get() {
      return this._.dopplerFactor;
    },
    set: function set(value) {
      this._.inspector.describe("dopplerFactor", function ($assert) {
        $assert(_utils2.default.isNumber(value), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(value, "dopplerFactor", "number")));
        });
      });

      this._.dopplerFactor = value;
    }
  }, {
    key: "speedOfSound",
    get: function get() {
      return this._.speedOfSound;
    },
    set: function set(value) {
      this._.inspector.describe("speedOfSound", function ($assert) {
        $assert(_utils2.default.isNumber(value), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(value, "speedOfSound", "number")));
        });
      });

      this._.speedOfSound = value;
    }
  }, {
    key: "$name",
    get: function get() {
      return "AudioListener";
    }
  }, {
    key: "$context",
    get: function get() {
      return this._.context;
    }
  }]);

  return AudioListener;
})();

exports.default = AudioListener;

},{"./utils":44,"./utils/Immigration":40,"./utils/Inspector":41}],7:[function(require,module,exports){
(function (global){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _templateObject = _taggedTemplateLiteral(["\n          ", ";\n          AudioContext has been closed\n        "], ["\n          ", ";\n          AudioContext has been closed\n        "]),
    _templateObject2 = _taggedTemplateLiteral(["\n          ", ";\n          ", "\n        "], ["\n          ", ";\n          ", "\n        "]),
    _templateObject3 = _taggedTemplateLiteral(["\n          ", ";\n          cannot connect to a destination belonging to a different audio context\n        "], ["\n          ", ";\n          cannot connect to a destination belonging to a different audio context\n        "]),
    _templateObject4 = _taggedTemplateLiteral(["\n          ", ";\n          output index (", ") exceeds number of outputs (", ")\n        "], ["\n          ", ";\n          output index (", ") exceeds number of outputs (", ")\n        "]),
    _templateObject5 = _taggedTemplateLiteral(["\n          ", ";\n          input index (", ") exceeds number of inputs (", ")\n        "], ["\n          ", ";\n          input index (", ") exceeds number of inputs (", ")\n        "]);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require("./utils");

var _utils2 = _interopRequireDefault(_utils);

var _Configuration = require("./utils/Configuration");

var _Configuration2 = _interopRequireDefault(_Configuration);

var _Enumerator = require("./utils/Enumerator");

var _Enumerator2 = _interopRequireDefault(_Enumerator);

var _Immigration = require("./utils/Immigration");

var _Immigration2 = _interopRequireDefault(_Immigration);

var _Junction = require("./utils/Junction");

var _Junction2 = _interopRequireDefault(_Junction);

var _EventTarget2 = require("./EventTarget");

var _EventTarget3 = _interopRequireDefault(_EventTarget2);

var _AudioNodeDisconnectUtils = require("./AudioNodeDisconnectUtils");

var _AudioNodeDisconnectUtils2 = _interopRequireDefault(_AudioNodeDisconnectUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var configuration = _Configuration2.default.getInstance();
var immigration = _Immigration2.default.getInstance();

var AudioNode = (function (_EventTarget) {
  _inherits(AudioNode, _EventTarget);

  function AudioNode(admission, spec) {
    _classCallCheck(this, AudioNode);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AudioNode).call(this));

    immigration.check(admission, function () {
      throw new TypeError("Illegal constructor");
    });

    _this._.context = spec.context;
    _this._.name = _utils2.default.defaults(spec.name, "AudioNode");
    _this._.numberOfInputs = _utils2.default.defaults(spec.numberOfInputs, 1);
    _this._.numberOfOutputs = _utils2.default.defaults(spec.numberOfOutputs, 1);
    _this._.channelCount = _utils2.default.defaults(spec.channelCount, 2);
    _this._.channelCountMode = _utils2.default.defaults(spec.channelCountMode, "max");
    _this._.channelInterpretation = _utils2.default.defaults(spec.channelInterpretation, "speakers");
    _this._.JSONKeys = [];
    _this._.inputs = _utils2.default.fill(new Array(Math.max(0, _this._.numberOfInputs | 0)), function (i) {
      return new _Junction2.default(_this, i);
    });
    _this._.outputs = _utils2.default.fill(new Array(Math.max(0, _this._.numberOfOutputs | 0)), function (i) {
      return new _Junction2.default(_this, i);
    });
    _this._.tick = -1;

    _this._.inspector.describe("create" + _this._.name.replace(/Node$/, ""), [], function ($assert) {
      $assert(_this._.context.state !== "closed", function (fmt) {
        throw new TypeError(fmt.plain(_templateObject, fmt.form));
      });
    });
    return _this;
  }

  _createClass(AudioNode, [{
    key: "connect",
    value: function connect(destination) {
      var _this2 = this;

      var output = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
      var input = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

      this._.inspector.describe("connect", function ($assert) {
        $assert(_utils2.default.isInstanceOf(destination, global.AudioNode) || _utils2.default.isInstanceOf(destination, global.AudioParam), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject2, fmt.form, fmt.butGot(destination, "destination", "AudioNode or an AudioParam")));
        });

        $assert(_this2.$context === destination.$context, function (fmt) {
          throw new TypeError(fmt.plain(_templateObject3, fmt.form));
        });

        $assert(_utils2.default.isPositiveInteger(output), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject2, fmt.form, fmt.butGot(output, "output", "positive integer")));
        });

        $assert(_utils2.default.isPositiveInteger(input), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject2, fmt.form, fmt.butGot(input, "input", "positive integer")));
        });

        $assert(output < _this2.numberOfOutputs, function (fmt) {
          throw new TypeError(fmt.plain(_templateObject4, fmt.form, output, _this2.numberOfOutputs));
        });

        $assert(input < (destination.numberOfInputs || 1), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject5, fmt.form, input, destination.numberOfInputs));
        });
      });

      this._.outputs[output].connect(destination.$inputs[input]);
    }
  }, {
    key: "disconnect",
    value: function disconnect(_destination, _output, _input) {
      var isSelectiveDisconnect = configuration.getState("AudioNode#disconnect") === "selective";
      var argNum = _utils2.default.countArguments([_destination, _output, _input]);

      if (!isSelectiveDisconnect) {
        _AudioNodeDisconnectUtils2.default.disconnectChannel.call(this, _utils2.default.defaults(_destination, 0));
        return;
      }

      switch (argNum) {
        case 0:
          _AudioNodeDisconnectUtils2.default.disconnectAll.call(this);
          break;
        case 1:
          if (_utils2.default.isNumber(_destination)) {
            _AudioNodeDisconnectUtils2.default.disconnectChannel.call(this, _destination);
          } else {
            _AudioNodeDisconnectUtils2.default.disconnectSelective1.call(this, _destination);
          }
          break;
        case 2:
          _AudioNodeDisconnectUtils2.default.disconnectSelective2.call(this, _destination, _output);
          break;
        case 3:
          _AudioNodeDisconnectUtils2.default.disconnectSelective3.call(this, _destination, _output, _input);
          break;
        default:
        // no default
      }
    }
  }, {
    key: "toJSON",
    value: function toJSON(memo) {
      function toJSON(obj, memo) {
        if (obj && typeof obj.toJSON === "function") {
          return obj.toJSON(memo);
        }
        return obj;
      }

      return _utils2.default.toJSON(this, function (node, memo) {
        var json = {};

        json.name = _utils2.default.toNodeName(node);

        node._.JSONKeys.forEach(function (key) {
          json[key] = toJSON(node[key], memo);
        });

        if (node.$context.VERBOSE_JSON) {
          json.numberOfInputs = node.numberOfInputs;
          json.numberOfOutputs = node.numberOfOutputs;
          json.channelCount = node.channelCount;
          json.channelCountMode = node.channelCountMode;
          json.channelInterpretation = node.channelInterpretation;
        }

        if (node.$inputs.length === 1) {
          json.inputs = node.$inputs[0].toJSON(memo);
        } else {
          json.inputs = node.$inputs.map(function (junction) {
            return junction.toJSON(memo);
          });
        }

        return json;
      }, memo);
    }
  }, {
    key: "$process",
    value: function $process(inNumSamples, tick) {
      var _this3 = this;

      if (this._.tick !== tick) {
        this._.tick = tick;
        this.$inputs.forEach(function (junction) {
          junction.process(inNumSamples, tick);
        });
        Object.keys(this._).forEach(function (key) {
          if (_this3[key] instanceof global.AudioParam) {
            _this3[key].$process(inNumSamples, tick);
          }
        });
        if (this._process) {
          this._process(inNumSamples);
        }
      }
    }
  }, {
    key: "$isConnectedTo",
    value: function $isConnectedTo(destination) {
      var output = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
      var input = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

      if (!(destination instanceof global.AudioNode) && !(destination instanceof global.AudioParam)) {
        return false;
      }

      var outputJunction = this._.outputs[output];
      var inputJunction = destination._.inputs[input];

      if (!outputJunction || !inputJunction) {
        return false;
      }

      return outputJunction.outputs.some(function (junction) {
        return junction === inputJunction;
      });
    }
  }, {
    key: "$isConnectedFrom",
    value: function $isConnectedFrom(destination) {
      var output = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
      var input = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

      if (!(destination instanceof global.AudioNode)) {
        return false;
      }

      var outputJunction = destination._.outputs[output];
      var inputJunction = this._.inputs[input];

      if (!outputJunction || !inputJunction) {
        return false;
      }

      return inputJunction.inputs.some(function (junction) {
        return junction === outputJunction;
      });
    }
  }, {
    key: "context",
    get: function get() {
      return this._.context;
    },
    set: function set(value) {
      this._.inspector.describe("context", function ($assert) {
        $assert.throwReadOnlyTypeError(value);
      });
    }
  }, {
    key: "numberOfInputs",
    get: function get() {
      return this._.numberOfInputs;
    },
    set: function set(value) {
      this._.inspector.describe("numberOfInputs", function ($assert) {
        $assert.throwReadOnlyTypeError(value);
      });
    }
  }, {
    key: "numberOfOutputs",
    get: function get() {
      return this._.numberOfOutputs;
    },
    set: function set(value) {
      this._.inspector.describe("numberOfOutputs", function ($assert) {
        $assert.throwReadOnlyTypeError(value);
      });
    }
  }, {
    key: "channelCount",
    get: function get() {
      return this._.channelCount;
    },
    set: function set(value) {
      this._.inspector.describe("channelCount", function ($assert) {
        $assert(_utils2.default.isPositiveInteger(value), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject2, fmt.form, fmt.butGot(value, "channelCount", "positive integer")));
        });
      });

      this._.channelCount = value;
    }
  }, {
    key: "channelCountMode",
    get: function get() {
      return this._.channelCountMode;
    },
    set: function set(value) {
      this._.inspector.describe("channelCountMode", function ($assert) {
        var enumChannelCountMode = new _Enumerator2.default(["max", "clamped-max", "explicit"]);

        $assert(enumChannelCountMode.contains(value), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject2, fmt.form, fmt.butGot(value, "channelCountMode", enumChannelCountMode.toString())));
        });
      });

      this._.channelCountMode = value;
    }
  }, {
    key: "channelInterpretation",
    get: function get() {
      return this._.channelInterpretation;
    },
    set: function set(value) {
      this._.inspector.describe("channelInterpretation", function ($assert) {
        var enumChannelInterpretation = new _Enumerator2.default(["speakers", "discrete"]);

        $assert(enumChannelInterpretation.contains(value), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject2, fmt.form, fmt.butGot(value, "channelInterpretation", enumChannelInterpretation.toString())));
        });
      });

      this._.channelInterpretation = value;
    }
  }, {
    key: "$name",
    get: function get() {
      return this._.name;
    }
  }, {
    key: "$context",
    get: function get() {
      return this._.context;
    }
  }, {
    key: "$inputs",
    get: function get() {
      // TODO: remove v0.4.0
      if (this._.inputs.length === 0) {
        return [new _Junction2.default(this, 0)];
      }
      return this._.inputs;
    }
  }]);

  return AudioNode;
})(_EventTarget3.default);

exports.default = AudioNode;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./AudioNodeDisconnectUtils":8,"./EventTarget":19,"./utils":44,"./utils/Configuration":37,"./utils/Enumerator":38,"./utils/Immigration":40,"./utils/Junction":42}],8:[function(require,module,exports){
(function (global){
"use strict";

var _templateObject = _taggedTemplateLiteral(["\n        ", ";\n        ", "\n      "], ["\n        ", ";\n        ", "\n      "]),
    _templateObject2 = _taggedTemplateLiteral(["\n        ", ";\n        output index (", ") exceeds number of outputs (", ")\n      "], ["\n        ", ";\n        output index (", ") exceeds number of outputs (", ")\n      "]),
    _templateObject3 = _taggedTemplateLiteral(["\n        ", ";\n        the given destination is not connected\n      "], ["\n        ", ";\n        the given destination is not connected\n      "]);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isConnectable = isConnectable;
exports.disconnectAll = disconnectAll;
exports.disconnectChannel = disconnectChannel;
exports.disconnectSelective1 = disconnectSelective1;
exports.disconnectSelective2 = disconnectSelective2;
exports.disconnectSelective3 = disconnectSelective3;

var _utils = require("./utils");

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function isConnectable(destination) {
  return _utils2.default.isInstanceOf(destination, global.AudioNode) || _utils2.default.isInstanceOf(destination, global.AudioParam);
}

function disconnectAll() {
  this._.outputs.forEach(function (junction) {
    junction.disconnectAll();
  });
}

function disconnectChannel(output) {
  var _this = this;

  this._.inspector.describe("disconnect", ["output"], function ($assert) {
    $assert(_utils2.default.isPositiveInteger(output), function (fmt) {
      throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(output, "output", "positive integer")));
    });

    $assert(output < _this.numberOfOutputs, function (fmt) {
      throw new TypeError(fmt.plain(_templateObject2, fmt.form, output, _this.numberOfOutputs));
    });
  });

  this._.outputs[output].disconnectAll();
}

function disconnectSelective1(destination) {
  var _this2 = this;

  this._.inspector.describe("disconnect", ["destination"], function ($assert) {
    $assert(isConnectable(destination), function (fmt) {
      throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(destination, "destination", "AudioNode or an AudioParam")));
    });

    var isConnectedDestination = _this2._.outputs.some(function (junction) {
      return junction.isConnected(destination);
    });

    $assert(isConnectedDestination, function (fmt) {
      throw new TypeError(fmt.plain(_templateObject3, fmt.form));
    });
  });

  this._.outputs.forEach(function (junction) {
    junction.disconnectNode(destination);
  });
}

function disconnectSelective2(destination, output) {
  var _this3 = this;

  this._.inspector.describe("disconnect", ["destination", "output"], function ($assert) {
    $assert(isConnectable(destination), function (fmt) {
      throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(destination, "destination", "AudioNode or an AudioParam")));
    });

    var isConnectedDestination = _this3._.outputs.some(function (junction) {
      return junction.isConnected(destination);
    });

    $assert(isConnectedDestination, function (fmt) {
      throw new TypeError(fmt.plain(_templateObject3, fmt.form));
    });

    $assert(_utils2.default.isInteger(output), function (fmt) {
      throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(output, "output", "integer")));
    });

    $assert(0 <= output && output < _this3.numberOfOutputs, function (fmt) {
      throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.outsideTheRange(output, "output", 0, _this3.numberOfOutputs)));
    });
  });

  this._.outputs[output].disconnectNode(destination);
}

function disconnectSelective3(destination, output, input) {
  var _this4 = this;

  this._.inspector.describe("disconnect", ["destination", "output", "input"], function ($assert) {
    $assert(isConnectable(destination), function (fmt) {
      throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(destination, "destination", "AudioNode or an AudioParam")));
    });

    var isConnectedDestination = _this4._.outputs.some(function (junction) {
      return junction.isConnected(destination);
    });

    $assert(isConnectedDestination, function (fmt) {
      throw new TypeError(fmt.plain(_templateObject3, fmt.form));
    });

    $assert(_utils2.default.isInteger(output), function (fmt) {
      throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(output, "output", "integer")));
    });

    $assert(_utils2.default.isInteger(input), function (fmt) {
      throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(input, "input", "integer")));
    });

    $assert(0 <= output && output < _this4.numberOfOutputs, function (fmt) {
      throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.outsideTheRange(output, "output", 0, _this4.numberOfOutputs)));
    });

    $assert(0 <= input && input < destination.numberOfInputs, function (fmt) {
      throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.outsideTheRange(input, "input", 0, _this4.numberOfOutputs)));
    });
  });

  this._.outputs[output].disconnectChannel(destination, input);
}

exports.default = {
  disconnectAll: disconnectAll,
  disconnectChannel: disconnectChannel,
  disconnectSelective1: disconnectSelective1,
  disconnectSelective2: disconnectSelective2,
  disconnectSelective3: disconnectSelective3
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./utils":44}],9:[function(require,module,exports){
(function (global){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _templateObject = _taggedTemplateLiteral(["\n          ", ";\n          ", "\n        "], ["\n          ", ";\n          ", "\n        "]);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.linTo = linTo;
exports.expTo = expTo;
exports.setTarget = setTarget;
exports.setCurveValue = setCurveValue;

var _utils = require("./utils");

var _utils2 = _interopRequireDefault(_utils);

var _Immigration = require("./utils/Immigration");

var _Immigration2 = _interopRequireDefault(_Immigration);

var _Inspector = require("./utils/Inspector");

var _Inspector2 = _interopRequireDefault(_Inspector);

var _Junction = require("./utils/Junction");

var _Junction2 = _interopRequireDefault(_Junction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var immigration = _Immigration2.default.getInstance();

function insertEvent(that, event) {
  var time = event.time;
  var events = that.$events;
  var replace = 0;
  var i = undefined,
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
  if (t <= t0) {
    return v0;
  }
  if (t1 <= t) {
    return v1;
  }
  var dt = (t - t0) / (t1 - t0);

  return (1 - dt) * v0 + dt * v1;
}

function expTo(v, v0, v1, t, t0, t1) {
  if (t <= t0) {
    return v0;
  }
  if (t1 <= t) {
    return v1;
  }
  if (v0 === v1) {
    return v0;
  }

  var dt = (t - t0) / (t1 - t0);

  if (0 < v0 && 0 < v1 || v0 < 0 && v1 < 0) {
    return v0 * Math.pow(v1 / v0, dt);
  }

  return v;
}

function setTarget(v0, v1, t, t0, timeConstant) {
  if (t <= t0) {
    return v0;
  }
  return v1 + (v0 - v1) * Math.exp((t0 - t) / timeConstant);
}

function setCurveValue(v, t, t0, t1, curve) {
  var dt = (t - t0) / (t1 - t0);

  if (dt <= 0) {
    return _utils2.default.defaults(curve[0], v);
  }

  if (1 <= dt) {
    return _utils2.default.defaults(curve[curve.length - 1], v);
  }

  return _utils2.default.defaults(curve[curve.length * dt | 0], v);
}

var AudioParam = (function () {
  function AudioParam(admission, node, name, defaultValue, minValue, maxValue) {
    _classCallCheck(this, AudioParam);

    immigration.check(admission, function () {
      throw new TypeError("Illegal constructor");
    });

    Object.defineProperty(this, "_", {
      value: {
        inspector: new _Inspector2.default(this)
      }
    });

    this._.value = defaultValue;
    this._.name = name;
    this._.defaultValue = defaultValue;
    this._.minValue = minValue;
    this._.maxValue = maxValue;
    this._.context = node.context;
    this._.node = node;
    this._.inputs = [new _Junction2.default(this, 0)];
    this._.events = [];
    this._.tick = -1;
  }

  _createClass(AudioParam, [{
    key: "setValueAtTime",
    value: function setValueAtTime(value, startTime) {
      this._.inspector.describe("setValueAtTime", function ($assert) {
        $assert(_utils2.default.isNumber(value), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(value, "value", "number")));
        });

        $assert(_utils2.default.isNumber(startTime), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(startTime, "startTime", "number")));
        });
      });

      insertEvent(this, {
        type: "SetValue",
        value: value,
        time: startTime
      });
    }
  }, {
    key: "linearRampToValueAtTime",
    value: function linearRampToValueAtTime(value, endTime) {
      this._.inspector.describe("linearRampToValueAtTime", function ($assert) {
        $assert(_utils2.default.isNumber(value), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(value, "value", "number")));
        });

        $assert(_utils2.default.isNumber(endTime), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(endTime, "endTime", "number")));
        });
      });

      insertEvent(this, {
        type: "LinearRampToValue",
        value: value,
        time: endTime
      });
    }
  }, {
    key: "exponentialRampToValueAtTime",
    value: function exponentialRampToValueAtTime(value, endTime) {
      this._.inspector.describe("exponentialRampToValueAtTime", function ($assert) {
        $assert(_utils2.default.isNumber(value), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(value, "value", "number")));
        });

        $assert(_utils2.default.isNumber(endTime), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(endTime, "endTime", "number")));
        });
      });

      insertEvent(this, {
        type: "ExponentialRampToValue",
        value: value,
        time: endTime
      });
    }
  }, {
    key: "setTargetAtTime",
    value: function setTargetAtTime(target, startTime, timeConstant) {
      this._.inspector.describe("setTargetAtTime", function ($assert) {
        $assert(_utils2.default.isNumber(target), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(target, "target", "number")));
        });

        $assert(_utils2.default.isNumber(startTime), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(startTime, "startTime", "number")));
        });

        $assert(_utils2.default.isNumber(timeConstant), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(timeConstant, "timeConstant", "number")));
        });
      });

      insertEvent(this, {
        type: "SetTarget",
        value: target,
        time: startTime,
        timeConstant: timeConstant
      });
    }
  }, {
    key: "setValueCurveAtTime",
    value: function setValueCurveAtTime(values, startTime, duration) {
      this._.inspector.describe("setValueCurveAtTime", function ($assert) {
        $assert(_utils2.default.isInstanceOf(values, Float32Array), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(values, "values", "Float32Array")));
        });

        $assert(_utils2.default.isNumber(startTime), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(startTime, "startTime", "number")));
        });

        $assert(_utils2.default.isNumber(duration), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(duration, "duration", "number")));
        });
      });

      insertEvent(this, {
        type: "SetValueCurve",
        time: startTime,
        duration: duration,
        curve: values
      });
    }
  }, {
    key: "cancelScheduledValues",
    value: function cancelScheduledValues(startTime) {
      this._.inspector.describe("cancelScheduledValues", function ($assert) {
        $assert(_utils2.default.isNumber(startTime), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(startTime, "startTime", "number")));
        });
      });

      var events = this.$events;

      for (var i = 0, imax = events.length; i < imax; ++i) {
        if (events[i].time >= startTime) {
          return events.splice(i);
        }
      }
    }
  }, {
    key: "toJSON",
    value: function toJSON(memo) {
      return _utils2.default.toJSON(this, function (node, memo) {
        var json = {};

        json.value = node.value;
        json.inputs = node.$inputs[0].toJSON(memo);

        return json;
      }, memo);
    }
  }, {
    key: "$valueAtTime",
    value: function $valueAtTime(_time) {
      var time = _utils2.default.toSeconds(_time);

      var value = this._.value;
      var events = this.$events;
      var t0 = undefined;

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
            default:
            // no default
          }
        }
      }

      return value;
    }
  }, {
    key: "$process",
    value: function $process(inNumSamples, tick) {
      if (this._.tick !== tick) {
        this._.tick = tick;
        this.$inputs[0].process(inNumSamples, tick);
      }
    }
  }, {
    key: "$isConnectedFrom",
    value: function $isConnectedFrom(destination) {
      var output = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

      if (!(destination instanceof global.AudioNode)) {
        return false;
      }

      var outputJunction = destination._.outputs[output];
      var inputJunction = this._.inputs[0];

      if (!outputJunction || !inputJunction) {
        return false;
      }

      return inputJunction.inputs.some(function (junction) {
        return junction === outputJunction;
      });
    }
  }, {
    key: "value",
    get: function get() {
      this._.value = this.$valueAtTime(this.$context.currentTime);
      return this._.value;
    },
    set: function set(value) {
      this._.inspector.describe("value", function ($assert) {
        $assert(_utils2.default.isNumber(value), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(value, "value", "number")));
        });
      });

      this._.value = value;
    }
  }, {
    key: "name",
    get: function get() {
      return this._.name;
    },
    set: function set(value) {
      this._.inspector.describe("name", function ($assert) {
        $assert.throwReadOnlyTypeError(value);
      });
    }
  }, {
    key: "defaultValue",
    get: function get() {
      return this._.defaultValue;
    },
    set: function set(value) {
      this._.inspector.describe("defaultValue", function ($assert) {
        $assert.throwReadOnlyTypeError(value);
      });
    }
  }, {
    key: "$name",
    get: function get() {
      return "AudioParam";
    }
  }, {
    key: "$context",
    get: function get() {
      return this._.context;
    }
  }, {
    key: "$node",
    get: function get() {
      return this._.node;
    }
  }, {
    key: "$inputs",
    get: function get() {
      return this._.inputs;
    }
  }, {
    key: "$events",
    get: function get() {
      return this._.events;
    }
  }]);

  return AudioParam;
})();

exports.default = AudioParam;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./utils":44,"./utils/Immigration":40,"./utils/Inspector":41,"./utils/Junction":42}],10:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Immigration = require("./utils/Immigration");

var _Immigration2 = _interopRequireDefault(_Immigration);

var _Event2 = require("./Event");

var _Event3 = _interopRequireDefault(_Event2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var immigration = _Immigration2.default.getInstance();

var AudioProcessingEvent = (function (_Event) {
  _inherits(AudioProcessingEvent, _Event);

  function AudioProcessingEvent(admission, node) {
    _classCallCheck(this, AudioProcessingEvent);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AudioProcessingEvent).call(this, "audioprocess", node));

    immigration.check(admission, function () {
      throw new TypeError("Illegal constructor");
    });

    _this._.node = node;
    return _this;
  }

  _createClass(AudioProcessingEvent, [{
    key: "$name",
    get: function get() {
      return "AudioProcessingEvent";
    }
  }, {
    key: "$node",
    get: function get() {
      return this._.node;
    }
  }]);

  return AudioProcessingEvent;
})(_Event3.default);

exports.default = AudioProcessingEvent;

},{"./Event":18,"./utils/Immigration":40}],11:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _templateObject = _taggedTemplateLiteral(["\n          ", ";\n          ", "\n        "], ["\n          ", ";\n          ", "\n        "]);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require("./utils");

var _utils2 = _interopRequireDefault(_utils);

var _Enumerator = require("./utils/Enumerator");

var _Enumerator2 = _interopRequireDefault(_Enumerator);

var _Immigration = require("./utils/Immigration");

var _Immigration2 = _interopRequireDefault(_Immigration);

var _AudioNode2 = require("./AudioNode");

var _AudioNode3 = _interopRequireDefault(_AudioNode2);

var _AudioParam = require("./AudioParam");

var _AudioParam2 = _interopRequireDefault(_AudioParam);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var immigration = _Immigration2.default.getInstance();

var BiquadFilterNode = (function (_AudioNode) {
  _inherits(BiquadFilterNode, _AudioNode);

  function BiquadFilterNode(admission, context) {
    _classCallCheck(this, BiquadFilterNode);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(BiquadFilterNode).call(this, admission, {
      name: "BiquadFilterNode",
      context: context,
      numberOfInputs: 1,
      numberOfOutputs: 1,
      channelCount: 2,
      channelCountMode: "max",
      channelInterpretation: "speakers"
    }));

    _this._.type = "lowpass";
    _this._.frequency = immigration.apply(function (admission) {
      return new _AudioParam2.default(admission, _this, "frequency", 350, 10, context.sampleRate / 2);
    });
    _this._.detune = immigration.apply(function (admission) {
      return new _AudioParam2.default(admission, _this, "detune", 0, -4800, 4800);
    });
    _this._.Q = immigration.apply(function (admission) {
      return new _AudioParam2.default(admission, _this, "Q", 1, 0.0001, 1000);
    });
    _this._.gain = immigration.apply(function (admission) {
      return new _AudioParam2.default(admission, _this, "gain", 0, -40, 40);
    });
    _this._.JSONKeys = BiquadFilterNode.$JSONKeys.slice();
    return _this;
  }

  _createClass(BiquadFilterNode, [{
    key: "getFrequencyResponse",
    value: function getFrequencyResponse(frequencyHz, magResponse, phaseResponse) {
      this._.inspector.describe("getFrequencyResponse", function ($assert) {
        $assert(_utils2.default.isInstanceOf(frequencyHz, Float32Array), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(frequencyHz, "frequencyHz", "Float32Array")));
        });

        $assert(_utils2.default.isInstanceOf(magResponse, Float32Array), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(magResponse, "magResponse", "Float32Array")));
        });

        $assert(_utils2.default.isInstanceOf(phaseResponse, Float32Array), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(phaseResponse, "phaseResponse", "Float32Array")));
        });
      });
    }
  }, {
    key: "type",
    get: function get() {
      return this._.type;
    },
    set: function set(value) {
      this._.inspector.describe("type", function ($assert) {
        var enumBiquadFilterType = new _Enumerator2.default(["lowpass", "highpass", "bandpass", "lowshelf", "highshelf", "peaking", "notch", "allpass"]);

        $assert(enumBiquadFilterType.contains(value), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(value, "type", enumBiquadFilterType.toString())));
        });
      });

      this._.type = value;
    }
  }, {
    key: "frequency",
    get: function get() {
      return this._.frequency;
    },
    set: function set(value) {
      this._.inspector.describe("frequency", function ($assert) {
        $assert.throwReadOnlyTypeError(value);
      });
    }
  }, {
    key: "detune",
    get: function get() {
      return this._.detune;
    },
    set: function set(value) {
      this._.inspector.describe("detune", function ($assert) {
        $assert.throwReadOnlyTypeError(value);
      });
    }
  }, {
    key: "Q",
    get: function get() {
      return this._.Q;
    },
    set: function set(value) {
      this._.inspector.describe("Q", function ($assert) {
        $assert.throwReadOnlyTypeError(value);
      });
    }
  }, {
    key: "gain",
    get: function get() {
      return this._.gain;
    },
    set: function set(value) {
      this._.inspector.describe("gain", function ($assert) {
        $assert.throwReadOnlyTypeError(value);
      });
    }
  }]);

  return BiquadFilterNode;
})(_AudioNode3.default);

exports.default = BiquadFilterNode;

BiquadFilterNode.$JSONKeys = ["type", "frequency", "detune", "Q", "gain"];

},{"./AudioNode":7,"./AudioParam":9,"./utils":44,"./utils/Enumerator":38,"./utils/Immigration":40}],12:[function(require,module,exports){
"use strict";

var _templateObject = _taggedTemplateLiteral(["\n          ", ";\n          ", "\n        "], ["\n          ", ";\n          ", "\n        "]);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require("./utils");

var _utils2 = _interopRequireDefault(_utils);

var _AudioNode2 = require("./AudioNode");

var _AudioNode3 = _interopRequireDefault(_AudioNode2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChannelMergerNode = (function (_AudioNode) {
  _inherits(ChannelMergerNode, _AudioNode);

  function ChannelMergerNode(admission, context, numberOfInputs) {
    _classCallCheck(this, ChannelMergerNode);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ChannelMergerNode).call(this, admission, {
      name: "ChannelMergerNode",
      context: context,
      numberOfInputs: numberOfInputs,
      numberOfOutputs: 1,
      channelCount: 2,
      channelCountMode: "max",
      channelInterpretation: "speakers"
    }));

    _this._.inspector.describe("constructor", function ($assert) {
      $assert(_utils2.default.isPositiveInteger(numberOfInputs), function (fmt) {
        throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(numberOfInputs, "numberOfInputs", "positive integer")));
      });
    });
    return _this;
  }

  return ChannelMergerNode;
})(_AudioNode3.default);

exports.default = ChannelMergerNode;

},{"./AudioNode":7,"./utils":44}],13:[function(require,module,exports){
"use strict";

var _templateObject = _taggedTemplateLiteral(["\n          ", ";\n          ", "\n        "], ["\n          ", ";\n          ", "\n        "]);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require("./utils");

var _utils2 = _interopRequireDefault(_utils);

var _AudioNode2 = require("./AudioNode");

var _AudioNode3 = _interopRequireDefault(_AudioNode2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChannelSplitterNode = (function (_AudioNode) {
  _inherits(ChannelSplitterNode, _AudioNode);

  function ChannelSplitterNode(admission, context, numberOfOutputs) {
    _classCallCheck(this, ChannelSplitterNode);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ChannelSplitterNode).call(this, admission, {
      name: "ChannelSplitterNode",
      context: context,
      numberOfInputs: 1,
      numberOfOutputs: numberOfOutputs,
      channelCount: 2,
      channelCountMode: "max",
      channelInterpretation: "speakers"
    }));

    _this._.inspector.describe("constructor", function ($assert) {
      $assert(_utils2.default.isPositiveInteger(numberOfOutputs), function (fmt) {
        throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(numberOfOutputs, "numberOfOutputs", "positive integer")));
      });
    });
    return _this;
  }

  return ChannelSplitterNode;
})(_AudioNode3.default);

exports.default = ChannelSplitterNode;

},{"./AudioNode":7,"./utils":44}],14:[function(require,module,exports){
(function (global){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _templateObject = _taggedTemplateLiteral(["\n          ", ";\n          ", "\n        "], ["\n          ", ";\n          ", "\n        "]);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require("./utils");

var _utils2 = _interopRequireDefault(_utils);

var _AudioNode2 = require("./AudioNode");

var _AudioNode3 = _interopRequireDefault(_AudioNode2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ConvolverNode = (function (_AudioNode) {
  _inherits(ConvolverNode, _AudioNode);

  function ConvolverNode(admission, context) {
    _classCallCheck(this, ConvolverNode);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ConvolverNode).call(this, admission, {
      name: "ConvolverNode",
      context: context,
      numberOfInputs: 1,
      numberOfOutputs: 1,
      channelCount: 2,
      channelCountMode: "clamped-max",
      channelInterpretation: "speakers"
    }));

    _this._.buffer = null;
    _this._.normalize = true;
    _this._.JSONKeys = ConvolverNode.$JSONKeys.slice();
    return _this;
  }

  _createClass(ConvolverNode, [{
    key: "buffer",
    get: function get() {
      return this._.buffer;
    },
    set: function set(value) {
      this._.inspector.describe("buffer", function ($assert) {
        $assert(_utils2.default.isNullOrInstanceOf(value, global.AudioBuffer), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(value, "buffer", "AudioBuffer")));
        });
      });

      this._.buffer = value;
    }
  }, {
    key: "normalize",
    get: function get() {
      return this._.normalize;
    },
    set: function set(value) {
      this._.inspector.describe("normalize", function ($assert) {
        $assert(_utils2.default.isBoolean(value), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(value, "normalize", "boolean")));
        });
      });

      this._.normalize = value;
    }
  }]);

  return ConvolverNode;
})(_AudioNode3.default);

exports.default = ConvolverNode;

ConvolverNode.$JSONKeys = ["normalize"];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./AudioNode":7,"./utils":44}],15:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _templateObject = _taggedTemplateLiteral(["\n          ", ";\n          ", "\n        "], ["\n          ", ";\n          ", "\n        "]);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require("./utils");

var _utils2 = _interopRequireDefault(_utils);

var _Immigration = require("./utils/Immigration");

var _Immigration2 = _interopRequireDefault(_Immigration);

var _AudioNode2 = require("./AudioNode");

var _AudioNode3 = _interopRequireDefault(_AudioNode2);

var _AudioParam = require("./AudioParam");

var _AudioParam2 = _interopRequireDefault(_AudioParam);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var immigration = _Immigration2.default.getInstance();

var DelayNode = (function (_AudioNode) {
  _inherits(DelayNode, _AudioNode);

  function DelayNode(admission, context, maxDelayTime) {
    _classCallCheck(this, DelayNode);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DelayNode).call(this, admission, {
      name: "DelayNode",
      context: context,
      numberOfInputs: 1,
      numberOfOutputs: 1,
      channelCount: 2,
      channelCountMode: "max",
      channelInterpretation: "speakers"
    }));

    _this._.inspector.describe("constructor", function ($assert) {
      $assert(_utils2.default.isPositiveNumber(maxDelayTime), function (fmt) {
        throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(maxDelayTime, "maxDelayTime", "positive number")));
      });
    });

    _this._.delayTime = immigration.apply(function (admission) {
      return new _AudioParam2.default(admission, _this, "delayTime", 0, 0, maxDelayTime);
    });
    _this._.maxDelayTime = maxDelayTime;
    _this._.JSONKeys = DelayNode.$JSONKeys.slice();
    return _this;
  }

  _createClass(DelayNode, [{
    key: "delayTime",
    get: function get() {
      return this._.delayTime;
    },
    set: function set(value) {
      this._.inspector.describe("delayTime", function ($assert) {
        $assert.throwReadOnlyTypeError(value);
      });
    }
  }, {
    key: "$maxDelayTime",
    get: function get() {
      return this._.maxDelayTime;
    }
  }]);

  return DelayNode;
})(_AudioNode3.default);

exports.default = DelayNode;

DelayNode.$JSONKeys = ["delayTime"];

},{"./AudioNode":7,"./AudioParam":9,"./utils":44,"./utils/Immigration":40}],16:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Immigration = require("./utils/Immigration");

var _Immigration2 = _interopRequireDefault(_Immigration);

var _AudioNode2 = require("./AudioNode");

var _AudioNode3 = _interopRequireDefault(_AudioNode2);

var _AudioParam = require("./AudioParam");

var _AudioParam2 = _interopRequireDefault(_AudioParam);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var immigration = _Immigration2.default.getInstance();

var DynamicsCompressorNode = (function (_AudioNode) {
  _inherits(DynamicsCompressorNode, _AudioNode);

  function DynamicsCompressorNode(admission, context) {
    _classCallCheck(this, DynamicsCompressorNode);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DynamicsCompressorNode).call(this, admission, {
      name: "DynamicsCompressorNode",
      context: context,
      numberOfInputs: 1,
      numberOfOutputs: 1,
      channelCount: 2,
      channelCountMode: "explicit",
      channelInterpretation: "speakers"
    }));

    _this._.threshold = immigration.apply(function (admission) {
      return new _AudioParam2.default(admission, _this, "threshold", -24, -100, 0);
    });
    _this._.knee = immigration.apply(function (admission) {
      return new _AudioParam2.default(admission, _this, "knee", 30, 0, 40);
    });
    _this._.ratio = immigration.apply(function (admission) {
      return new _AudioParam2.default(admission, _this, "ratio", 12, 1, 20);
    });
    _this._.reduction = immigration.apply(function (admission) {
      return new _AudioParam2.default(admission, _this, "reduction", 0, -20, 0);
    });
    _this._.attack = immigration.apply(function (admission) {
      return new _AudioParam2.default(admission, _this, "attack", 0.003, 0, 1.0);
    });
    _this._.release = immigration.apply(function (admission) {
      return new _AudioParam2.default(admission, _this, "release", 0.250, 0, 1.0);
    });
    _this._.JSONKeys = DynamicsCompressorNode.$JSONKeys.slice();
    return _this;
  }

  _createClass(DynamicsCompressorNode, [{
    key: "threshold",
    get: function get() {
      return this._.threshold;
    },
    set: function set(value) {
      this._.inspector.describe("threshold", function ($assert) {
        $assert.throwReadOnlyTypeError(value);
      });
    }
  }, {
    key: "knee",
    get: function get() {
      return this._.knee;
    },
    set: function set(value) {
      this._.inspector.describe("knee", function ($assert) {
        $assert.throwReadOnlyTypeError(value);
      });
    }
  }, {
    key: "ratio",
    get: function get() {
      return this._.ratio;
    },
    set: function set(value) {
      this._.inspector.describe("ratio", function ($assert) {
        $assert.throwReadOnlyTypeError(value);
      });
    }
  }, {
    key: "reduction",
    get: function get() {
      return this._.reduction;
    },
    set: function set(value) {
      this._.inspector.describe("reduction", function ($assert) {
        $assert.throwReadOnlyTypeError(value);
      });
    }
  }, {
    key: "attack",
    get: function get() {
      return this._.attack;
    },
    set: function set(value) {
      this._.inspector.describe("attack", function ($assert) {
        $assert.throwReadOnlyTypeError(value);
      });
    }
  }, {
    key: "release",
    get: function get() {
      return this._.release;
    },
    set: function set(value) {
      this._.inspector.describe("release", function ($assert) {
        $assert.throwReadOnlyTypeError(value);
      });
    }
  }]);

  return DynamicsCompressorNode;
})(_AudioNode3.default);

exports.default = DynamicsCompressorNode;

DynamicsCompressorNode.$JSONKeys = ["threshold", "knee", "ratio", "reduction", "attack", "release"];

},{"./AudioNode":7,"./AudioParam":9,"./utils/Immigration":40}],17:[function(require,module,exports){
(function (global){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require("./utils");

var _utils2 = _interopRequireDefault(_utils);

var _EventTarget2 = require("./EventTarget");

var _EventTarget3 = _interopRequireDefault(_EventTarget2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

global.Element = global.Element || (function (_EventTarget) {
  _inherits(Element, _EventTarget);

  function Element() {
    _classCallCheck(this, Element);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Element).call(this));

    throw new TypeError("Illegal constructor");
    return _this;
  }

  return Element;
})(_EventTarget3.default);

var Element = (function (_utils$preventSuperCa) {
  _inherits(Element, _utils$preventSuperCa);

  function Element() {
    _classCallCheck(this, Element);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Element).apply(this, arguments));
  }

  return Element;
})(_utils2.default.preventSuperCall(global.Element));

exports.default = Element;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./EventTarget":19,"./utils":44}],18:[function(require,module,exports){
(function (global){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require("./utils");

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

global.Event = global.Event || function Event() {
  _classCallCheck(this, Event);

  throw new TypeError("Illegal constructor");
};

var Event = (function (_utils$preventSuperCa) {
  _inherits(Event, _utils$preventSuperCa);

  function Event(name, target) {
    _classCallCheck(this, Event);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Event).call(this));

    Object.defineProperty(_this, "_", { value: {} });

    _this._.type = name;
    _this._.target = _utils2.default.defaults(target, null);
    _this._.timestamp = Date.now();
    return _this;
  }

  _createClass(Event, [{
    key: "type",
    get: function get() {
      return this._.type;
    }
  }, {
    key: "target",
    get: function get() {
      return this._.target;
    }
  }, {
    key: "timestamp",
    get: function get() {
      return this._.timestamp;
    }
  }]);

  return Event;
})(_utils2.default.preventSuperCall(global.Event));

exports.default = Event;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./utils":44}],19:[function(require,module,exports){
(function (global){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _templateObject = _taggedTemplateLiteral(["\n          ", ";\n          ", "\n        "], ["\n          ", ";\n          ", "\n        "]);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require("./utils");

var _utils2 = _interopRequireDefault(_utils);

var _Inspector = require("./utils/Inspector");

var _Inspector2 = _interopRequireDefault(_Inspector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

global.EventTarget = global.EventTarget || function EventTarget() {
  _classCallCheck(this, EventTarget);

  throw new TypeError("Illegal constructor");
};

var EventTarget = (function (_utils$preventSuperCa) {
  _inherits(EventTarget, _utils$preventSuperCa);

  function EventTarget() {
    _classCallCheck(this, EventTarget);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(EventTarget).call(this));

    Object.defineProperty(_this, "_", {
      value: {
        inspector: new _Inspector2.default(_this)
      }
    });

    _this._.listeners = {};
    return _this;
  }

  _createClass(EventTarget, [{
    key: "addEventListener",
    value: function addEventListener(type, listener) {
      this._.inspector.describe("addEventListener", function ($assert) {
        $assert(_utils2.default.isString(type), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(type, "type", "string")));
        });

        $assert(_utils2.default.isFunction(listener), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(listener, "listener", "function")));
        });
      });

      this._.listeners[type] = this._.listeners[type] || [];
      this._.listeners[type].push(listener);
    }
  }, {
    key: "removeEventListener",
    value: function removeEventListener(type, listener) {
      this._.inspector.describe("removeEventListener", function ($assert) {
        $assert(_utils2.default.isString(type), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(type, "type", "string")));
        });

        $assert(_utils2.default.isFunction(listener), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(listener, "listener", "function")));
        });
      });

      this._.listeners[type] = this._.listeners[type] || [];

      var index = this._.listeners[type].indexOf(listener);

      if (index !== -1) {
        this._.listeners[type].splice(index, 1);
      }
    }
  }, {
    key: "dispatchEvent",
    value: function dispatchEvent(event) {
      var _this2 = this;

      this._.inspector.describe("dispatchEvent", function ($assert) {
        $assert(_utils2.default.isInstanceOf(event, global.Event), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(event, "event", "Event")));
        });
      });

      var type = event.type;

      if (typeof this["on" + type] === "function") {
        this["on" + type].call(this, event);
      }

      this.$listeners(type).forEach(function (listener) {
        listener.call(_this2, event);
      }, this);

      return true;
    }
  }, {
    key: "$listeners",
    value: function $listeners(type) {
      return (this._.listeners[type] || []).slice();
    }
  }]);

  return EventTarget;
})(_utils2.default.preventSuperCall(global.EventTarget));

exports.default = EventTarget;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./utils":44,"./utils/Inspector":41}],20:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Immigration = require("./utils/Immigration");

var _Immigration2 = _interopRequireDefault(_Immigration);

var _AudioNode2 = require("./AudioNode");

var _AudioNode3 = _interopRequireDefault(_AudioNode2);

var _AudioParam = require("./AudioParam");

var _AudioParam2 = _interopRequireDefault(_AudioParam);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var immigration = _Immigration2.default.getInstance();

var GainNode = (function (_AudioNode) {
  _inherits(GainNode, _AudioNode);

  function GainNode(admission, context) {
    _classCallCheck(this, GainNode);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(GainNode).call(this, admission, {
      name: "GainNode",
      context: context,
      numberOfInputs: 1,
      numberOfOutputs: 1,
      channelCount: 2,
      channelCountMode: "max",
      channelInterpretation: "speakers"
    }));

    _this._.gain = immigration.apply(function (admission) {
      return new _AudioParam2.default(admission, _this, "gain", 1.0, 0.0, 1.0);
    });
    _this._.JSONKeys = GainNode.$JSONKeys.slice();
    return _this;
  }

  _createClass(GainNode, [{
    key: "gain",
    get: function get() {
      return this._.gain;
    },
    set: function set(value) {
      this._.inspector.describe("gain", function ($assert) {
        $assert.throwReadOnlyTypeError(value);
      });
    }
  }]);

  return GainNode;
})(_AudioNode3.default);

exports.default = GainNode;

GainNode.$JSONKeys = ["gain"];

},{"./AudioNode":7,"./AudioParam":9,"./utils/Immigration":40}],21:[function(require,module,exports){
(function (global){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require("./utils");

var _utils2 = _interopRequireDefault(_utils);

var _Element2 = require("./Element");

var _Element3 = _interopRequireDefault(_Element2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

global.HTMLElement = global.HTMLElement || (function (_Element) {
  _inherits(HTMLElement, _Element);

  function HTMLElement() {
    _classCallCheck(this, HTMLElement);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(HTMLElement).call(this));

    throw new TypeError("Illegal constructor");
    return _this;
  }

  return HTMLElement;
})(_Element3.default);

var HTMLElement = (function (_utils$preventSuperCa) {
  _inherits(HTMLElement, _utils$preventSuperCa);

  function HTMLElement() {
    _classCallCheck(this, HTMLElement);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(HTMLElement).apply(this, arguments));
  }

  return HTMLElement;
})(_utils2.default.preventSuperCall(global.HTMLElement));

exports.default = HTMLElement;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./Element":17,"./utils":44}],22:[function(require,module,exports){
(function (global){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require("./utils");

var _utils2 = _interopRequireDefault(_utils);

var _HTMLElement2 = require("./HTMLElement");

var _HTMLElement3 = _interopRequireDefault(_HTMLElement2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

global.HTMLMediaElement = global.HTMLMediaElement || (function (_HTMLElement) {
  _inherits(HTMLMediaElement, _HTMLElement);

  function HTMLMediaElement() {
    _classCallCheck(this, HTMLMediaElement);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(HTMLMediaElement).call(this));

    throw new TypeError("Illegal constructor");
    return _this;
  }

  return HTMLMediaElement;
})(_HTMLElement3.default);

var HTMLMediaElement = (function (_utils$preventSuperCa) {
  _inherits(HTMLMediaElement, _utils$preventSuperCa);

  function HTMLMediaElement() {
    _classCallCheck(this, HTMLMediaElement);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(HTMLMediaElement).apply(this, arguments));
  }

  return HTMLMediaElement;
})(_utils2.default.preventSuperCall(global.HTMLMediaElement));

exports.default = HTMLMediaElement;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./HTMLElement":21,"./utils":44}],23:[function(require,module,exports){
(function (global){
"use strict";

var _templateObject = _taggedTemplateLiteral(["\n          ", ";\n          ", "\n        "], ["\n          ", ";\n          ", "\n        "]);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require("./utils");

var _utils2 = _interopRequireDefault(_utils);

var _AudioNode2 = require("./AudioNode");

var _AudioNode3 = _interopRequireDefault(_AudioNode2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MediaElementAudioSourceNode = (function (_AudioNode) {
  _inherits(MediaElementAudioSourceNode, _AudioNode);

  function MediaElementAudioSourceNode(admission, context, mediaElement) {
    _classCallCheck(this, MediaElementAudioSourceNode);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MediaElementAudioSourceNode).call(this, admission, {
      name: "MediaElementAudioSourceNode",
      context: context,
      numberOfInputs: 0,
      numberOfOutputs: 1,
      channelCount: 2,
      channelCountMode: "max",
      channelInterpretation: "speakers"
    }));

    _this._.inspector.describe("constructor", function ($assert) {
      $assert(_utils2.default.isInstanceOf(mediaElement, global.HTMLMediaElement), function (fmt) {
        throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(mediaElement, "mediaElement", "HTMLMediaElement")));
      });
    });
    return _this;
  }

  return MediaElementAudioSourceNode;
})(_AudioNode3.default);

exports.default = MediaElementAudioSourceNode;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./AudioNode":7,"./utils":44}],24:[function(require,module,exports){
(function (global){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require("./utils");

var _utils2 = _interopRequireDefault(_utils);

var _EventTarget2 = require("./EventTarget");

var _EventTarget3 = _interopRequireDefault(_EventTarget2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

global.MediaStream = global.MediaStream || (function (_EventTarget) {
  _inherits(MediaStream, _EventTarget);

  function MediaStream() {
    _classCallCheck(this, MediaStream);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MediaStream).call(this));

    throw new TypeError("Illegal constructor");
    return _this;
  }

  return MediaStream;
})(_EventTarget3.default);

var MediaStream = (function (_utils$preventSuperCa) {
  _inherits(MediaStream, _utils$preventSuperCa);

  function MediaStream() {
    _classCallCheck(this, MediaStream);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(MediaStream).apply(this, arguments));
  }

  return MediaStream;
})(_utils2.default.preventSuperCall(global.MediaStream));

exports.default = MediaStream;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./EventTarget":19,"./utils":44}],25:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AudioNode2 = require("./AudioNode");

var _AudioNode3 = _interopRequireDefault(_AudioNode2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MediaStreamAudioDestinationNode = (function (_AudioNode) {
  _inherits(MediaStreamAudioDestinationNode, _AudioNode);

  function MediaStreamAudioDestinationNode(admission, context) {
    _classCallCheck(this, MediaStreamAudioDestinationNode);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(MediaStreamAudioDestinationNode).call(this, admission, {
      name: "MediaStreamAudioDestinationNode",
      context: context,
      numberOfInputs: 1,
      numberOfOutputs: 0,
      channelCount: 2,
      channelCountMode: "explicit",
      channelInterpretation: "speakers"
    }));
  }

  return MediaStreamAudioDestinationNode;
})(_AudioNode3.default);

exports.default = MediaStreamAudioDestinationNode;

},{"./AudioNode":7}],26:[function(require,module,exports){
(function (global){
"use strict";

var _templateObject = _taggedTemplateLiteral(["\n          ", ";\n          ", "\n        "], ["\n          ", ";\n          ", "\n        "]);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require("./utils");

var _utils2 = _interopRequireDefault(_utils);

var _AudioNode2 = require("./AudioNode");

var _AudioNode3 = _interopRequireDefault(_AudioNode2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MediaStreamAudioSourceNode = (function (_AudioNode) {
  _inherits(MediaStreamAudioSourceNode, _AudioNode);

  function MediaStreamAudioSourceNode(admission, context, mediaStream) {
    _classCallCheck(this, MediaStreamAudioSourceNode);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MediaStreamAudioSourceNode).call(this, admission, {
      name: "MediaStreamAudioSourceNode",
      context: context,
      numberOfInputs: 0,
      numberOfOutputs: 1,
      channelCount: 2,
      channelCountMode: "max",
      channelInterpretation: "speakers"
    }));

    _this._.inspector.describe("constructor", function ($assert) {
      $assert(_utils2.default.isInstanceOf(mediaStream, global.MediaStream), function (fmt) {
        throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(mediaStream, "mediaStream", "MediaStream")));
      });
    });
    return _this;
  }

  return MediaStreamAudioSourceNode;
})(_AudioNode3.default);

exports.default = MediaStreamAudioSourceNode;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./AudioNode":7,"./utils":44}],27:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Immigration = require("./utils/Immigration");

var _Immigration2 = _interopRequireDefault(_Immigration);

var _Event2 = require("./Event");

var _Event3 = _interopRequireDefault(_Event2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var immigration = _Immigration2.default.getInstance();

var OfflineAudioCompletionEvent = (function (_Event) {
  _inherits(OfflineAudioCompletionEvent, _Event);

  function OfflineAudioCompletionEvent(admission, node) {
    _classCallCheck(this, OfflineAudioCompletionEvent);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(OfflineAudioCompletionEvent).call(this, "complete", node));

    immigration.check(admission, function () {
      throw new TypeError("Illegal constructor");
    });

    _this._.node = node;
    return _this;
  }

  _createClass(OfflineAudioCompletionEvent, [{
    key: "$name",
    get: function get() {
      return "OfflineAudioCompletionEvent";
    }
  }, {
    key: "$node",
    get: function get() {
      return this._.node;
    }
  }]);

  return OfflineAudioCompletionEvent;
})(_Event3.default);

exports.default = OfflineAudioCompletionEvent;

},{"./Event":18,"./utils/Immigration":40}],28:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _templateObject = _taggedTemplateLiteral(["\n        ", ";\n        not enabled\n      "], ["\n        ", ";\n        not enabled\n      "]),
    _templateObject2 = _taggedTemplateLiteral(["\n          ", ";\n          Cannot ", " on an OfflineAudioContext\n        "], ["\n          ", ";\n          Cannot ", " on an OfflineAudioContext\n        "]),
    _templateObject3 = _taggedTemplateLiteral(["\n          ", ";\n          ", "\n        "], ["\n          ", ";\n          ", "\n        "]),
    _templateObject4 = _taggedTemplateLiteral(["\n            ", ";\n            cannot call startRendering more than once\n          "], ["\n            ", ";\n            cannot call startRendering more than once\n          "]);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require("./utils");

var _utils2 = _interopRequireDefault(_utils);

var _Configuration = require("./utils/Configuration");

var _Configuration2 = _interopRequireDefault(_Configuration);

var _Immigration = require("./utils/Immigration");

var _Immigration2 = _interopRequireDefault(_Immigration);

var _Event = require("./Event");

var _Event2 = _interopRequireDefault(_Event);

var _AudioContext2 = require("./AudioContext");

var _AudioContext3 = _interopRequireDefault(_AudioContext2);

var _AudioBuffer = require("./AudioBuffer");

var _AudioBuffer2 = _interopRequireDefault(_AudioBuffer);

var _OfflineAudioCompletionEvent = require("./OfflineAudioCompletionEvent");

var _OfflineAudioCompletionEvent2 = _interopRequireDefault(_OfflineAudioCompletionEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var configuration = _Configuration2.default.getInstance();
var immigration = _Immigration2.default.getInstance();

function transitionToState(methodName) {
  var _this = this;

  this._.inspector.describe(methodName, [], function ($assert) {
    $assert(configuration.getState("AudioContext#" + methodName) === "enabled", function (fmt) {
      throw new TypeError(fmt.plain(_templateObject, fmt.form));
    });
  });

  return new Promise(function (resolve, reject) {
    _this._.inspector.describe(methodName, [], function ($assert) {
      $assert(false, function (fmt) {
        reject(new Error(fmt.plain(_templateObject2, fmt.form, methodName)));
      });
    });
  });
}

var OfflineAudioContext = (function (_AudioContext) {
  _inherits(OfflineAudioContext, _AudioContext);

  function OfflineAudioContext(numberOfChannels, length, sampleRate) {
    _classCallCheck(this, OfflineAudioContext);

    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(OfflineAudioContext).call(this));

    _this2._.inspector.describe("constructor", function ($assert) {
      $assert(_utils2.default.isPositiveInteger(numberOfChannels), function (fmt) {
        throw new TypeError(fmt.plain(_templateObject3, fmt.form, fmt.butGot(numberOfChannels, "numberOfChannels", "positive integer")));
      });

      $assert(_utils2.default.isPositiveInteger(length), function (fmt) {
        throw new TypeError(fmt.plain(_templateObject3, fmt.form, fmt.butGot(length, "length", "positive integer")));
      });

      $assert(_utils2.default.isPositiveInteger(sampleRate), function (fmt) {
        throw new TypeError(fmt.plain(_templateObject3, fmt.form, fmt.butGot(sampleRate, "sampleRate", "positive integer")));
      });
    });

    _this2._.sampleRate = sampleRate;
    _this2._.oncomplete = null;
    _this2._.numberOfChannels = numberOfChannels;
    _this2._.length = length;
    _this2._.rendering = false;
    _this2._.resolve = null;
    _this2._.state = "suspended";
    return _this2;
  }

  _createClass(OfflineAudioContext, [{
    key: "suspend",
    value: function suspend() {
      return transitionToState.call(this, "suspend");
    }
  }, {
    key: "resume",
    value: function resume() {
      return transitionToState.call(this, "resume");
    }
  }, {
    key: "close",
    value: function close() {
      return transitionToState.call(this, "close");
    }
  }, {
    key: "startRendering",
    value: function startRendering() {
      var _this3 = this;

      var isPromiseBased = configuration.getState("OfflineAudioContext#startRendering") === "promise";
      var rendering = this._.rendering;

      function $assertion() {
        this._.inspector.describe("startRendering", function ($assert) {
          $assert(!rendering, function (fmt) {
            throw new Error(fmt.plain(_templateObject4, fmt.form));
          });
        });
      }

      this._.rendering = true;

      if (isPromiseBased) {
        return new Promise(function (resolve) {
          $assertion.call(_this3);

          _this3._.resolve = resolve;
          _this3._.state = "running";
          _this3.dispatchEvent(new _Event2.default("statechange", _this3));
        });
      }

      $assertion.call(this);

      this._.state = "running";
      this.dispatchEvent(new _Event2.default("statechange", this));
    }
  }, {
    key: "_process",
    value: function _process(microseconds) {
      var _this4 = this;

      if (!this._.rendering || this._.length <= this._.processedSamples) {
        return;
      }

      var nextMicroCurrentTime = this._.microCurrentTime + microseconds;

      while (this._.microCurrentTime < nextMicroCurrentTime) {
        var _nextMicroCurrentTime = Math.min(this._.microCurrentTime + 1000, nextMicroCurrentTime);
        var _nextProcessedSamples = Math.floor(_nextMicroCurrentTime / (1000 * 1000) * this.sampleRate);
        var inNumSamples = _nextProcessedSamples - this._.processedSamples;

        this.destination.$process(inNumSamples, ++this._.tick);

        this._.microCurrentTime = _nextMicroCurrentTime;
        this._.processedSamples = _nextProcessedSamples;

        if (this._.length <= this._.processedSamples) {
          break;
        }
      }

      if (this._.length <= this._.processedSamples) {
        var renderedBuffer = immigration.apply(function (admission) {
          return new _AudioBuffer2.default(admission, _this4, _this4._.numberOfChannels, _this4._.length, _this4.sampleRate);
        });
        var event = immigration.apply(function (admission) {
          return new _OfflineAudioCompletionEvent2.default(admission, _this4);
        });

        event.renderedBuffer = renderedBuffer;

        this._.state = "closed";

        this.dispatchEvent(event);
        if (this._.resolve !== null) {
          this._.resolve(renderedBuffer);
          this._.resolve = null;
        }

        this.dispatchEvent(new _Event2.default("statechange", this));
      }
    }
  }, {
    key: "oncomplete",
    get: function get() {
      return this._.oncomplete;
    },
    set: function set(value) {
      this._.inspector.describe("oncomplete", function ($assert) {
        $assert(_utils2.default.isNullOrFunction(value), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject3, fmt.form, fmt.butGot(value, "value", "function")));
        });
      });

      this._.oncomplete = value;
    }
  }, {
    key: "$name",
    get: function get() {
      return "OfflineAudioContext";
    }
  }]);

  return OfflineAudioContext;
})(_AudioContext3.default);

exports.default = OfflineAudioContext;

},{"./AudioBuffer":2,"./AudioContext":4,"./Event":18,"./OfflineAudioCompletionEvent":27,"./utils":44,"./utils/Configuration":37,"./utils/Immigration":40}],29:[function(require,module,exports){
(function (global){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _templateObject = _taggedTemplateLiteral(["\n          ", ";\n          ", "\n        "], ["\n          ", ";\n          ", "\n        "]),
    _templateObject2 = _taggedTemplateLiteral(["\n          ", ";\n          cannot start more than once\n        "], ["\n          ", ";\n          cannot start more than once\n        "]),
    _templateObject3 = _taggedTemplateLiteral(["\n          ", ";\n          cannot call stop without calling start first\n        "], ["\n          ", ";\n          cannot call stop without calling start first\n        "]),
    _templateObject4 = _taggedTemplateLiteral(["\n          ", ";\n          cannot stop more than once\n        "], ["\n          ", ";\n          cannot stop more than once\n        "]);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require("./utils");

var _utils2 = _interopRequireDefault(_utils);

var _Enumerator = require("./utils/Enumerator");

var _Enumerator2 = _interopRequireDefault(_Enumerator);

var _Immigration = require("./utils/Immigration");

var _Immigration2 = _interopRequireDefault(_Immigration);

var _AudioNode2 = require("./AudioNode");

var _AudioNode3 = _interopRequireDefault(_AudioNode2);

var _AudioParam = require("./AudioParam");

var _AudioParam2 = _interopRequireDefault(_AudioParam);

var _Event = require("./Event");

var _Event2 = _interopRequireDefault(_Event);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var immigration = _Immigration2.default.getInstance();

var OscillatorNode = (function (_AudioNode) {
  _inherits(OscillatorNode, _AudioNode);

  function OscillatorNode(admission, context) {
    _classCallCheck(this, OscillatorNode);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(OscillatorNode).call(this, admission, {
      name: "OscillatorNode",
      context: context,
      numberOfInputs: 0,
      numberOfOutputs: 1,
      channelCount: 2,
      channelCountMode: "max",
      channelInterpretation: "speakers"
    }));

    _this._.type = "sine";
    _this._.frequency = immigration.apply(function (admission) {
      return new _AudioParam2.default(admission, _this, "frequency", 440, 0, 100000);
    });
    _this._.detune = immigration.apply(function (admission) {
      return new _AudioParam2.default(admission, _this, "detune", 0, -4800, 4800);
    });
    _this._.onended = null;
    _this._.custom = null;
    _this._.startTime = Infinity;
    _this._.stopTime = Infinity;
    _this._.firedOnEnded = false;
    _this._.JSONKeys = OscillatorNode.$JSONKeys.slice();
    return _this;
  }

  _createClass(OscillatorNode, [{
    key: "start",
    value: function start(when) {
      var _this2 = this;

      if (arguments.length < 1) {
        when = 0;
      }

      this._.inspector.describe("start", function ($assert) {
        $assert(_utils2.default.isPositiveNumber(when), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(when, "when", "positive number")));
        });

        $assert(_this2._.startTime === Infinity, function (fmt) {
          throw new Error(fmt.plain(_templateObject2, fmt.form));
        });
      });

      this._.startTime = when;
    }
  }, {
    key: "stop",
    value: function stop(when) {
      var _this3 = this;

      if (arguments.length < 1) {
        when = 0;
      }

      this._.inspector.describe("stop", function ($assert) {
        $assert(_utils2.default.isPositiveNumber(when), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(when, "when", "positive number")));
        });

        $assert(_this3._.startTime !== Infinity, function (fmt) {
          throw new Error(fmt.plain(_templateObject3, fmt.form));
        });

        $assert(_this3._.stopTime === Infinity, function (fmt) {
          throw new Error(fmt.plain(_templateObject4, fmt.form));
        });
      });

      this._.stopTime = when;
    }
  }, {
    key: "setPeriodicWave",
    value: function setPeriodicWave(periodicWave) {
      this._.inspector.describe("setPeriodicWave", function ($assert) {
        $assert(_utils2.default.isInstanceOf(periodicWave, global.PeriodicWave), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(periodicWave, "periodicWave", "PeriodicWave")));
        });
      });

      this._.type = "custom";
      this._.custom = periodicWave;
    }
  }, {
    key: "$stateAtTime",
    value: function $stateAtTime(_time) {
      var time = _utils2.default.toSeconds(_time);

      if (this._.startTime === Infinity) {
        return "UNSCHEDULED";
      }
      if (time < this._.startTime) {
        return "SCHEDULED";
      }
      if (time < this._.stopTime) {
        return "PLAYING";
      }

      return "FINISHED";
    }
  }, {
    key: "_process",
    value: function _process() {
      if (!this._.firedOnEnded && this.$stateAtTime(this.context.currentTime) === "FINISHED") {
        this.dispatchEvent(new _Event2.default("ended", this));
        this._.firedOnEnded = true;
      }
    }
  }, {
    key: "type",
    get: function get() {
      return this._.custom ? "custom" : this._.type;
    },
    set: function set(value) {
      this._.inspector.describe("type", function ($assert) {
        var enumOscillatorType = new _Enumerator2.default(["sine", "square", "sawtooth", "triangle"]);

        $assert(enumOscillatorType.contains(value), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(value, "type", enumOscillatorType.toString())));
        });
      });

      this._.type = value;
    }
  }, {
    key: "frequency",
    get: function get() {
      return this._.frequency;
    },
    set: function set(value) {
      this._.inspector.describe("frequency", function ($assert) {
        $assert.throwReadOnlyTypeError(value);
      });
    }
  }, {
    key: "detune",
    get: function get() {
      return this._.detune;
    },
    set: function set(value) {
      this._.inspector.describe("detune", function ($assert) {
        $assert.throwReadOnlyTypeError(value);
      });
    }
  }, {
    key: "onended",
    get: function get() {
      return this._.onended;
    },
    set: function set(value) {
      this._.inspector.describe("onended", function ($assert) {
        $assert(_utils2.default.isNullOrFunction(value), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(value, "onended", "function")));
        });
      });

      this._.onended = value;
    }
  }, {
    key: "$state",
    get: function get() {
      return this.$stateAtTime(this.context.currentTime);
    }
  }, {
    key: "$custom",
    get: function get() {
      return this._.custom;
    }
  }, {
    key: "$startTime",
    get: function get() {
      return this._.startTime;
    }
  }, {
    key: "$stopTime",
    get: function get() {
      return this._.stopTime;
    }
  }]);

  return OscillatorNode;
})(_AudioNode3.default);

exports.default = OscillatorNode;

OscillatorNode.$JSONKeys = ["type", "frequency", "detune"];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./AudioNode":7,"./AudioParam":9,"./Event":18,"./utils":44,"./utils/Enumerator":38,"./utils/Immigration":40}],30:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _templateObject = _taggedTemplateLiteral(["\n          ", ";\n          ", "\n        "], ["\n          ", ";\n          ", "\n        "]);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require("./utils");

var _utils2 = _interopRequireDefault(_utils);

var _Enumerator = require("./utils/Enumerator");

var _Enumerator2 = _interopRequireDefault(_Enumerator);

var _AudioNode2 = require("./AudioNode");

var _AudioNode3 = _interopRequireDefault(_AudioNode2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PannerNode = (function (_AudioNode) {
  _inherits(PannerNode, _AudioNode);

  function PannerNode(admission, context) {
    _classCallCheck(this, PannerNode);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PannerNode).call(this, admission, {
      name: "PannerNode",
      context: context,
      numberOfInputs: 1,
      numberOfOutputs: 1,
      channelCount: 2,
      channelCountMode: "clamped-max",
      channelInterpretation: "speakers"
    }));

    _this._.panningModel = "HRTF";
    _this._.distanceModel = "inverse";
    _this._.refDistance = 1;
    _this._.maxDistance = 10000;
    _this._.rolloffFactor = 1;
    _this._.coneInnerAngle = 360;
    _this._.coneOuterAngle = 360;
    _this._.coneOuterGain = 0;
    _this._.JSONKeys = PannerNode.$JSONKeys.slice();
    return _this;
  }

  _createClass(PannerNode, [{
    key: "setPosition",
    value: function setPosition(x, y, z) {
      this._.inspector.describe("setPosition", function ($assert) {
        $assert(_utils2.default.isNumber(x), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(x, "x", "number")));
        });

        $assert(_utils2.default.isNumber(y), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(y, "y", "number")));
        });

        $assert(_utils2.default.isNumber(z), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(z, "z", "number")));
        });
      });
    }
  }, {
    key: "setOrientation",
    value: function setOrientation(x, y, z) {
      this._.inspector.describe("setOrientation", function ($assert) {
        $assert(_utils2.default.isNumber(x), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(x, "x", "number")));
        });

        $assert(_utils2.default.isNumber(y), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(y, "y", "number")));
        });

        $assert(_utils2.default.isNumber(z), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(z, "z", "number")));
        });
      });
    }
  }, {
    key: "setVelocity",
    value: function setVelocity(x, y, z) {
      this._.inspector.describe("setVelocity", function ($assert) {
        $assert(_utils2.default.isNumber(x), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(x, "x", "number")));
        });

        $assert(_utils2.default.isNumber(y), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(y, "y", "number")));
        });

        $assert(_utils2.default.isNumber(z), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(z, "z", "number")));
        });
      });
    }
  }, {
    key: "panningModel",
    get: function get() {
      return this._.panningModel;
    },
    set: function set(value) {
      this._.inspector.describe("panningModel", function ($assert) {
        var enumPanningModelType = new _Enumerator2.default(["equalpower", "HRTF"]);

        $assert(enumPanningModelType.contains(value), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(value, "panningModel", enumPanningModelType.toString())));
        });
      });

      this._.panningModel = value;
    }
  }, {
    key: "distanceModel",
    get: function get() {
      return this._.distanceModel;
    },
    set: function set(value) {
      this._.inspector.describe("distanceModel", function ($assert) {
        var enumDistanceModelType = new _Enumerator2.default(["linear", "inverse", "exponential"]);

        $assert(enumDistanceModelType.contains(value), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(value, "distanceModel", enumDistanceModelType.toString())));
        });
      });

      this._.distanceModel = value;
    }
  }, {
    key: "refDistance",
    get: function get() {
      return this._.refDistance;
    },
    set: function set(value) {
      this._.inspector.describe("refDistance", function ($assert) {
        $assert(_utils2.default.isNumber(value), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(value, "refDistance", "number")));
        });
      });

      this._.refDistance = value;
    }
  }, {
    key: "maxDistance",
    get: function get() {
      return this._.maxDistance;
    },
    set: function set(value) {
      this._.inspector.describe("maxDistance", function ($assert) {
        $assert(_utils2.default.isNumber(value), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(value, "maxDistance", "number")));
        });
      });

      this._.maxDistance = value;
    }
  }, {
    key: "rolloffFactor",
    get: function get() {
      return this._.rolloffFactor;
    },
    set: function set(value) {
      this._.inspector.describe("rolloffFactor", function ($assert) {
        $assert(_utils2.default.isNumber(value), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(value, "rolloffFactor", "number")));
        });
      });

      this._.rolloffFactor = value;
    }
  }, {
    key: "coneInnerAngle",
    get: function get() {
      return this._.coneInnerAngle;
    },
    set: function set(value) {
      this._.inspector.describe("coneInnerAngle", function ($assert) {
        $assert(_utils2.default.isNumber(value), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(value, "coneInnerAngle", "number")));
        });
      });

      this._.coneInnerAngle = value;
    }
  }, {
    key: "coneOuterAngle",
    get: function get() {
      return this._.coneOuterAngle;
    },
    set: function set(value) {
      this._.inspector.describe("coneOuterAngle", function ($assert) {
        $assert(_utils2.default.isNumber(value), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(value, "coneOuterAngle", "number")));
        });
      });

      this._.coneOuterAngle = value;
    }
  }, {
    key: "coneOuterGain",
    get: function get() {
      return this._.coneOuterGain;
    },
    set: function set(value) {
      this._.inspector.describe("coneOuterGain", function ($assert) {
        $assert(_utils2.default.isNumber(value), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(value, "coneOuterGain", "number")));
        });
      });

      this._.coneOuterGain = value;
    }
  }]);

  return PannerNode;
})(_AudioNode3.default);

exports.default = PannerNode;

PannerNode.$JSONKeys = ["panningModel", "distanceModel", "refDistance", "maxDistance", "rolloffFactor", "coneInnerAngle", "coneOuterAngle", "coneOuterGain"];

},{"./AudioNode":7,"./utils":44,"./utils/Enumerator":38}],31:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _templateObject = _taggedTemplateLiteral(["\n          ", ";\n          ", "\n        "], ["\n          ", ";\n          ", "\n        "]),
    _templateObject2 = _taggedTemplateLiteral(["\n          ", ";\n          length of \"real\" array (", ") exceeds allow maximum of 4096\n        "], ["\n          ", ";\n          length of \"real\" array (", ") exceeds allow maximum of 4096\n        "]),
    _templateObject3 = _taggedTemplateLiteral(["\n          ", ";\n          length of \"imag\" array (", ") exceeds allow maximum of 4096\n        "], ["\n          ", ";\n          length of \"imag\" array (", ") exceeds allow maximum of 4096\n        "]),
    _templateObject4 = _taggedTemplateLiteral(["\n          ", ";\n          length of real array (", ") and length of imaginary array (", ") must match\n        "], ["\n          ", ";\n          length of real array (", ") and length of imaginary array (", ") must match\n        "]);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require("./utils");

var _utils2 = _interopRequireDefault(_utils);

var _Immigration = require("./utils/Immigration");

var _Immigration2 = _interopRequireDefault(_Immigration);

var _Inspector = require("./utils/Inspector");

var _Inspector2 = _interopRequireDefault(_Inspector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var immigration = _Immigration2.default.getInstance();

var PeriodicWave = (function () {
  function PeriodicWave(admission, context, real, imag) {
    _classCallCheck(this, PeriodicWave);

    immigration.check(admission, function () {
      throw new TypeError("Illegal constructor");
    });

    Object.defineProperty(this, "_", {
      value: {
        inspector: new _Inspector2.default(this)
      }
    });

    this._.inspector.describe("constructor", function ($assert) {
      $assert(_utils2.default.isInstanceOf(real, Float32Array), function (fmt) {
        throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(real, "real", "Float32Array")));
      });

      $assert(real.length <= 4096, function (fmt) {
        throw new TypeError(fmt.plain(_templateObject2, fmt.form, real.length));
      });

      $assert(_utils2.default.isInstanceOf(imag, Float32Array), function (fmt) {
        throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(imag, "imag", "Float32Array")));
      });

      $assert(imag.length <= 4096, function (fmt) {
        throw new TypeError(fmt.plain(_templateObject3, fmt.form, imag.length));
      });

      $assert(real.length === imag.length, function (fmt) {
        throw new TypeError(fmt.plain(_templateObject4, fmt.form, real.length, imag.length));
      });
    });

    this._.context = context;
    this._.real = real;
    this._.imag = imag;
  }

  _createClass(PeriodicWave, [{
    key: "$name",
    get: function get() {
      return "PeriodicWave";
    }
  }, {
    key: "$context",
    get: function get() {
      return this._.context;
    }
  }, {
    key: "$real",
    get: function get() {
      return this._.real;
    }
  }, {
    key: "$imag",
    get: function get() {
      return this._.imag;
    }
  }]);

  return PeriodicWave;
})();

exports.default = PeriodicWave;

},{"./utils":44,"./utils/Immigration":40,"./utils/Inspector":41}],32:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _templateObject = _taggedTemplateLiteral(["\n          ", ";\n          ", "\n        "], ["\n          ", ";\n          ", "\n        "]);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require("./utils");

var _utils2 = _interopRequireDefault(_utils);

var _Immigration = require("./utils/Immigration");

var _Immigration2 = _interopRequireDefault(_Immigration);

var _Enumerator = require("./utils/Enumerator");

var _Enumerator2 = _interopRequireDefault(_Enumerator);

var _AudioNode2 = require("./AudioNode");

var _AudioNode3 = _interopRequireDefault(_AudioNode2);

var _AudioBuffer = require("./AudioBuffer");

var _AudioBuffer2 = _interopRequireDefault(_AudioBuffer);

var _AudioProcessingEvent = require("./AudioProcessingEvent");

var _AudioProcessingEvent2 = _interopRequireDefault(_AudioProcessingEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var immigration = _Immigration2.default.getInstance();

var ScriptProcessorNode = (function (_AudioNode) {
  _inherits(ScriptProcessorNode, _AudioNode);

  function ScriptProcessorNode(admission, context, bufferSize, numberOfInputChannels, numberOfOutputChannels) {
    _classCallCheck(this, ScriptProcessorNode);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ScriptProcessorNode).call(this, admission, {
      name: "ScriptProcessorNode",
      context: context,
      numberOfInputs: 1,
      numberOfOutputs: 1,
      channelCount: numberOfInputChannels,
      channelCountMode: "max",
      channelInterpretation: "speakers"
    }));

    _this._.inspector.describe("constructor", function ($assert) {
      var enumBufferSize = new _Enumerator2.default([256, 512, 1024, 2048, 4096, 8192, 16384]);

      $assert(enumBufferSize.contains(bufferSize), function (fmt) {
        throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(bufferSize, "bufferSize", enumBufferSize.toString())));
      });

      $assert(_utils2.default.isPositiveInteger(numberOfInputChannels), function (fmt) {
        throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(numberOfInputChannels, "numberOfInputChannels", "positive integer")));
      });

      $assert(_utils2.default.isPositiveInteger(numberOfOutputChannels), function (fmt) {
        throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(numberOfOutputChannels, "numberOfOutputChannels", "positive integer")));
      });
    });

    _this._.bufferSize = bufferSize;
    _this._.onaudioprocess = null;
    _this._.numberOfInputChannels = numberOfInputChannels;
    _this._.numberOfOutputChannels = numberOfOutputChannels;
    _this._.numSamples = 0;
    return _this;
  }

  _createClass(ScriptProcessorNode, [{
    key: "_process",
    value: function _process(inNumSamples) {
      var _this2 = this;

      this._.numSamples -= inNumSamples;

      if (this._.numSamples <= 0) {
        this._.numSamples += this.bufferSize;

        var event = immigration.apply(function (admission) {
          return new _AudioProcessingEvent2.default(admission, _this2);
        });

        event.playbackTime = this.context.currentTime + this.bufferSize / this.context.sampleRate;
        event.inputBuffer = immigration.apply(function (admission) {
          return new _AudioBuffer2.default(admission, _this2.context, _this2._.numberOfInputChannels, _this2.bufferSize, _this2.context.sampleRate);
        });
        event.outputBuffer = immigration.apply(function (admission) {
          return new _AudioBuffer2.default(admission, _this2.context, _this2._.numberOfOutputChannels, _this2.bufferSize, _this2.context.sampleRate);
        });

        this.dispatchEvent(event);
      }
    }
  }, {
    key: "bufferSize",
    get: function get() {
      return this._.bufferSize;
    },
    set: function set(value) {
      this._.inspector.describe("bufferSize", function ($assert) {
        $assert.throwReadOnlyTypeError(value, "bufferSize");
      });
    }
  }, {
    key: "onaudioprocess",
    get: function get() {
      return this._.onaudioprocess;
    },
    set: function set(value) {
      this._.inspector.describe("onaudioprocess", function ($assert) {
        $assert(_utils2.default.isNullOrFunction(value), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(value, "onaudioprocess", "function")));
        });
      });

      this._.onaudioprocess = value;
    }
  }]);

  return ScriptProcessorNode;
})(_AudioNode3.default);

exports.default = ScriptProcessorNode;

},{"./AudioBuffer":2,"./AudioNode":7,"./AudioProcessingEvent":10,"./utils":44,"./utils/Enumerator":38,"./utils/Immigration":40}],33:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Immigration = require("./utils/Immigration");

var _Immigration2 = _interopRequireDefault(_Immigration);

var _AudioNode2 = require("./AudioNode");

var _AudioNode3 = _interopRequireDefault(_AudioNode2);

var _AudioParam = require("./AudioParam");

var _AudioParam2 = _interopRequireDefault(_AudioParam);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var immigration = _Immigration2.default.getInstance();

var StereoPannerNode = (function (_AudioNode) {
  _inherits(StereoPannerNode, _AudioNode);

  function StereoPannerNode(admission, context) {
    _classCallCheck(this, StereoPannerNode);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(StereoPannerNode).call(this, admission, {
      name: "StereoPannerNode",
      context: context,
      numberOfInputs: 1,
      numberOfOutputs: 1,
      channelCount: 2,
      channelCountMode: "clamped-max",
      channelInterpretation: "speakers"
    }));

    _this._.pan = immigration.apply(function (admission) {
      return new _AudioParam2.default(admission, _this, "pan", 0.0, -1.0, +1.0);
    });
    _this._.JSONKeys = StereoPannerNode.$JSONKeys.slice();
    return _this;
  }

  _createClass(StereoPannerNode, [{
    key: "pan",
    get: function get() {
      return this._.pan;
    },
    set: function set(value) {
      this._.inspector.describe("pan", function ($assert) {
        $assert.throwReadOnlyTypeError(value);
      });
    }
  }]);

  return StereoPannerNode;
})(_AudioNode3.default);

exports.default = StereoPannerNode;

StereoPannerNode.$JSONKeys = ["pan"];

},{"./AudioNode":7,"./AudioParam":9,"./utils/Immigration":40}],34:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _templateObject = _taggedTemplateLiteral(["\n          ", ";\n          ", "\n        "], ["\n          ", ";\n          ", "\n        "]);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require("./utils");

var _utils2 = _interopRequireDefault(_utils);

var _Enumerator = require("./utils/Enumerator");

var _Enumerator2 = _interopRequireDefault(_Enumerator);

var _AudioNode2 = require("./AudioNode");

var _AudioNode3 = _interopRequireDefault(_AudioNode2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WaveShaperNode = (function (_AudioNode) {
  _inherits(WaveShaperNode, _AudioNode);

  function WaveShaperNode(admission, context) {
    _classCallCheck(this, WaveShaperNode);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(WaveShaperNode).call(this, admission, {
      name: "WaveShaperNode",
      context: context,
      numberOfInputs: 1,
      numberOfOutputs: 1,
      channelCount: 2,
      channelCountMode: "max",
      channelInterpretation: "speakers"
    }));

    _this._.curve = null;
    _this._.oversample = "none";
    _this._.JSONKeys = WaveShaperNode.$JSONKeys.slice();
    return _this;
  }

  _createClass(WaveShaperNode, [{
    key: "curve",
    get: function get() {
      return this._.curve;
    },
    set: function set(value) {
      this._.inspector.describe("curve", function ($assert) {
        $assert(_utils2.default.isNullOrInstanceOf(value, Float32Array), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(value, "curve", "Float32Array")));
        });
      });

      this._.curve = value;
    }
  }, {
    key: "oversample",
    get: function get() {
      return this._.oversample;
    },
    set: function set(value) {
      this._.inspector.describe("oversample", function ($assert) {
        var enumOverSampleType = new _Enumerator2.default(["none", "2x", "4x"]);

        $assert(enumOverSampleType.contains(value), function (fmt) {
          throw new TypeError(fmt.plain(_templateObject, fmt.form, fmt.butGot(value, "oversample", enumOverSampleType.toString())));
        });
      });

      this._.oversample = value;
    }
  }]);

  return WaveShaperNode;
})(_AudioNode3.default);

exports.default = WaveShaperNode;

WaveShaperNode.$JSONKeys = ["oversample"];

},{"./AudioNode":7,"./utils":44,"./utils/Enumerator":38}],35:[function(require,module,exports){
(function (global){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  AnalyserNode: global.AnalyserNode,
  AudioBuffer: global.AudioBuffer,
  AudioBufferSourceNode: global.AudioBufferSourceNode,
  AudioContext: global.AudioContext || global.webkitAudioContext,
  AudioDestinationNode: global.AudioDestinationNode,
  AudioListener: global.AudioListener,
  AudioNode: global.AudioNode,
  AudioParam: global.AudioParam,
  AudioProcessingEvent: global.AudioProcessingEvent,
  BiquadFilterNode: global.BiquadFilterNode,
  ChannelMergerNode: global.ChannelMergerNode,
  ChannelSplitterNode: global.ChannelSplitterNode,
  ConvolverNode: global.ConvolverNode,
  DelayNode: global.DelayNode,
  DynamicsCompressorNode: global.DynamicsCompressorNode,
  GainNode: global.GainNode,
  MediaElementAudioSourceNode: global.MediaElementAudioSourceNode,
  MediaStreamAudioDestinationNode: global.MediaStreamAudioDestinationNode,
  MediaStreamAudioSourceNode: global.MediaStreamAudioSourceNode,
  OfflineAudioCompletionEvent: global.OfflineAudioCompletionEvent,
  OfflineAudioContext: global.OfflineAudioContext || global.webkitOfflineAudioContext,
  OscillatorNode: global.OscillatorNode,
  PannerNode: global.PannerNode,
  PeriodicWave: global.PeriodicWave,
  ScriptProcessorNode: global.ScriptProcessorNode,
  StereoPannerNode: global.StereoPannerNode,
  WaveShaperNode: global.WaveShaperNode
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],36:[function(require,module,exports){
(function (global){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require("./utils");

var _utils2 = _interopRequireDefault(_utils);

var _Configuration = require("./utils/Configuration");

var _Configuration2 = _interopRequireDefault(_Configuration);

var _WebAudioAPI = require("./WebAudioAPI");

var _WebAudioAPI2 = _interopRequireDefault(_WebAudioAPI);

var _AnalyserNode = require("./AnalyserNode");

var _AnalyserNode2 = _interopRequireDefault(_AnalyserNode);

var _AudioBuffer = require("./AudioBuffer");

var _AudioBuffer2 = _interopRequireDefault(_AudioBuffer);

var _AudioBufferSourceNode = require("./AudioBufferSourceNode");

var _AudioBufferSourceNode2 = _interopRequireDefault(_AudioBufferSourceNode);

var _AudioContext = require("./AudioContext");

var _AudioContext2 = _interopRequireDefault(_AudioContext);

var _AudioDestinationNode = require("./AudioDestinationNode");

var _AudioDestinationNode2 = _interopRequireDefault(_AudioDestinationNode);

var _AudioListener = require("./AudioListener");

var _AudioListener2 = _interopRequireDefault(_AudioListener);

var _AudioNode = require("./AudioNode");

var _AudioNode2 = _interopRequireDefault(_AudioNode);

var _AudioParam = require("./AudioParam");

var _AudioParam2 = _interopRequireDefault(_AudioParam);

var _AudioProcessingEvent = require("./AudioProcessingEvent");

var _AudioProcessingEvent2 = _interopRequireDefault(_AudioProcessingEvent);

var _BiquadFilterNode = require("./BiquadFilterNode");

var _BiquadFilterNode2 = _interopRequireDefault(_BiquadFilterNode);

var _ChannelMergerNode = require("./ChannelMergerNode");

var _ChannelMergerNode2 = _interopRequireDefault(_ChannelMergerNode);

var _ChannelSplitterNode = require("./ChannelSplitterNode");

var _ChannelSplitterNode2 = _interopRequireDefault(_ChannelSplitterNode);

var _ConvolverNode = require("./ConvolverNode");

var _ConvolverNode2 = _interopRequireDefault(_ConvolverNode);

var _DelayNode = require("./DelayNode");

var _DelayNode2 = _interopRequireDefault(_DelayNode);

var _DynamicsCompressorNode = require("./DynamicsCompressorNode");

var _DynamicsCompressorNode2 = _interopRequireDefault(_DynamicsCompressorNode);

var _Element = require("./Element");

var _Element2 = _interopRequireDefault(_Element);

var _Event = require("./Event");

var _Event2 = _interopRequireDefault(_Event);

var _EventTarget = require("./EventTarget");

var _EventTarget2 = _interopRequireDefault(_EventTarget);

var _GainNode = require("./GainNode");

var _GainNode2 = _interopRequireDefault(_GainNode);

var _HTMLElement = require("./HTMLElement");

var _HTMLElement2 = _interopRequireDefault(_HTMLElement);

var _HTMLMediaElement = require("./HTMLMediaElement");

var _HTMLMediaElement2 = _interopRequireDefault(_HTMLMediaElement);

var _MediaElementAudioSourceNode = require("./MediaElementAudioSourceNode");

var _MediaElementAudioSourceNode2 = _interopRequireDefault(_MediaElementAudioSourceNode);

var _MediaStream = require("./MediaStream");

var _MediaStream2 = _interopRequireDefault(_MediaStream);

var _MediaStreamAudioDestinationNode = require("./MediaStreamAudioDestinationNode");

var _MediaStreamAudioDestinationNode2 = _interopRequireDefault(_MediaStreamAudioDestinationNode);

var _MediaStreamAudioSourceNode = require("./MediaStreamAudioSourceNode");

var _MediaStreamAudioSourceNode2 = _interopRequireDefault(_MediaStreamAudioSourceNode);

var _OfflineAudioCompletionEvent = require("./OfflineAudioCompletionEvent");

var _OfflineAudioCompletionEvent2 = _interopRequireDefault(_OfflineAudioCompletionEvent);

var _OfflineAudioContext = require("./OfflineAudioContext");

var _OfflineAudioContext2 = _interopRequireDefault(_OfflineAudioContext);

var _OscillatorNode = require("./OscillatorNode");

var _OscillatorNode2 = _interopRequireDefault(_OscillatorNode);

var _PannerNode = require("./PannerNode");

var _PannerNode2 = _interopRequireDefault(_PannerNode);

var _PeriodicWave = require("./PeriodicWave");

var _PeriodicWave2 = _interopRequireDefault(_PeriodicWave);

var _ScriptProcessorNode = require("./ScriptProcessorNode");

var _ScriptProcessorNode2 = _interopRequireDefault(_ScriptProcessorNode);

var _StereoPannerNode = require("./StereoPannerNode");

var _StereoPannerNode2 = _interopRequireDefault(_StereoPannerNode);

var _WaveShaperNode = require("./WaveShaperNode");

var _WaveShaperNode2 = _interopRequireDefault(_WaveShaperNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sampleRate = 44100;
var configuration = _Configuration2.default.getInstance();

var WebAudioTestAPI = {
  VERSION: _utils2.default.getAPIVersion(),
  utils: _utils2.default,
  sampleRate: sampleRate,
  AnalyserNode: _AnalyserNode2.default,
  AudioBuffer: _AudioBuffer2.default,
  AudioBufferSourceNode: _AudioBufferSourceNode2.default,
  AudioContext: _AudioContext2.default,
  AudioDestinationNode: _AudioDestinationNode2.default,
  AudioListener: _AudioListener2.default,
  AudioNode: _AudioNode2.default,
  AudioParam: _AudioParam2.default,
  AudioProcessingEvent: _AudioProcessingEvent2.default,
  BiquadFilterNode: _BiquadFilterNode2.default,
  ChannelMergerNode: _ChannelMergerNode2.default,
  ChannelSplitterNode: _ChannelSplitterNode2.default,
  ConvolverNode: _ConvolverNode2.default,
  DelayNode: _DelayNode2.default,
  DynamicsCompressorNode: _DynamicsCompressorNode2.default,
  Element: _Element2.default,
  Event: _Event2.default,
  EventTarget: _EventTarget2.default,
  GainNode: _GainNode2.default,
  HTMLElement: _HTMLElement2.default,
  HTMLMediaElement: _HTMLMediaElement2.default,
  MediaElementAudioSourceNode: _MediaElementAudioSourceNode2.default,
  MediaStream: _MediaStream2.default,
  MediaStreamAudioDestinationNode: _MediaStreamAudioDestinationNode2.default,
  MediaStreamAudioSourceNode: _MediaStreamAudioSourceNode2.default,
  OfflineAudioCompletionEvent: _OfflineAudioCompletionEvent2.default,
  OfflineAudioContext: _OfflineAudioContext2.default,
  OscillatorNode: _OscillatorNode2.default,
  PannerNode: _PannerNode2.default,
  PeriodicWave: _PeriodicWave2.default,
  ScriptProcessorNode: _ScriptProcessorNode2.default,
  StereoPannerNode: _StereoPannerNode2.default,
  WaveShaperNode: _WaveShaperNode2.default,
  getState: function getState(name) {
    return configuration.getState(name);
  },
  setState: function setState(name, value) {
    configuration.setState(name, value);
  },
  use: function use() {
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
  unuse: function unuse() {
    global.AnalyserNode = _WebAudioAPI2.default.AnalyserNode;
    global.AudioBuffer = _WebAudioAPI2.default.AudioBuffer;
    global.AudioBufferSourceNode = _WebAudioAPI2.default.AudioBufferSourceNode;
    global.AudioContext = _WebAudioAPI2.default.AudioContext;
    global.AudioDestinationNode = _WebAudioAPI2.default.AudioDestinationNode;
    global.AudioListener = _WebAudioAPI2.default.AudioListener;
    global.AudioNode = _WebAudioAPI2.default.AudioNode;
    global.AudioParam = _WebAudioAPI2.default.AudioParam;
    global.AudioProcessingEvent = _WebAudioAPI2.default.AudioProcessingEvent;
    global.BiquadFilterNode = _WebAudioAPI2.default.BiquadFilterNode;
    global.ChannelMergerNode = _WebAudioAPI2.default.ChannelMergerNode;
    global.ChannelSplitterNode = _WebAudioAPI2.default.ChannelSplitterNode;
    global.ConvolverNode = _WebAudioAPI2.default.ConvolverNode;
    global.DelayNode = _WebAudioAPI2.default.DelayNode;
    global.DynamicsCompressorNode = _WebAudioAPI2.default.DynamicsCompressorNode;
    global.GainNode = _WebAudioAPI2.default.GainNode;
    global.MediaElementAudioSourceNode = _WebAudioAPI2.default.MediaElementAudioSourceNode;
    global.MediaStreamAudioDestinationNode = _WebAudioAPI2.default.MediaStreamAudioDestinationNode;
    global.MediaStreamAudioSourceNode = _WebAudioAPI2.default.MediaStreamAudioSourceNode;
    global.OfflineAudioCompletionEvent = _WebAudioAPI2.default.OfflineAudioCompletionEvent;
    global.OfflineAudioContext = _WebAudioAPI2.default.OfflineAudioContext;
    global.OscillatorNode = _WebAudioAPI2.default.OscillatorNode;
    global.PannerNode = _WebAudioAPI2.default.PannerNode;
    global.PeriodicWave = _WebAudioAPI2.default.PeriodicWave;
    global.ScriptProcessorNode = _WebAudioAPI2.default.ScriptProcessorNode;
    global.StereoPannerNode = _WebAudioAPI2.default.StereoPannerNode;
    global.WaveShaperNode = _WebAudioAPI2.default.WaveShaperNode;
  }
};

exports.default = WebAudioTestAPI;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./AnalyserNode":1,"./AudioBuffer":2,"./AudioBufferSourceNode":3,"./AudioContext":4,"./AudioDestinationNode":5,"./AudioListener":6,"./AudioNode":7,"./AudioParam":9,"./AudioProcessingEvent":10,"./BiquadFilterNode":11,"./ChannelMergerNode":12,"./ChannelSplitterNode":13,"./ConvolverNode":14,"./DelayNode":15,"./DynamicsCompressorNode":16,"./Element":17,"./Event":18,"./EventTarget":19,"./GainNode":20,"./HTMLElement":21,"./HTMLMediaElement":22,"./MediaElementAudioSourceNode":23,"./MediaStream":24,"./MediaStreamAudioDestinationNode":25,"./MediaStreamAudioSourceNode":26,"./OfflineAudioCompletionEvent":27,"./OfflineAudioContext":28,"./OscillatorNode":29,"./PannerNode":30,"./PeriodicWave":31,"./ScriptProcessorNode":32,"./StereoPannerNode":33,"./WaveShaperNode":34,"./WebAudioAPI":35,"./utils":44,"./utils/Configuration":37}],37:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api = require("./api.json");

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var instance = null;

var Configuration = (function () {
  function Configuration() {
    var _this = this;

    _classCallCheck(this, Configuration);

    this._states = {};
    Object.keys(_api2.default).forEach(function (key) {
      _this._states[key] = _api2.default[key].states[0];
    });
  }

  _createClass(Configuration, [{
    key: "getState",
    value: function getState(name) {
      if (!this._states.hasOwnProperty(name)) {
        throw new TypeError("invalid state name " + name);
      }
      return this._states[name];
    }
  }, {
    key: "setState",
    value: function setState(name, value) {
      var _this2 = this;

      if (name && (typeof name === "undefined" ? "undefined" : _typeof(name)) === "object") {
        var _ret = (function () {
          var dict = name;

          Object.keys(dict).forEach(function (name) {
            _this2.setState(name, dict[name]);
          });
          return {
            v: undefined
          };
        })();

        if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
      }
      if (!this._states.hasOwnProperty(name)) {
        throw new TypeError("invalid state name " + name);
      }
      if (_api2.default[name].states.indexOf(value) === -1) {
        throw new TypeError("invalid state value " + value + " on " + name);
      }
      this._states[name] = value;
    }
  }], [{
    key: "getInstance",
    value: function getInstance() {
      if (instance === null) {
        instance = new Configuration();
      }
      return instance;
    }
  }]);

  return Configuration;
})();

exports.default = Configuration;

},{"./api.json":43}],38:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Enumerator = (function () {
  function Enumerator() {
    var list = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

    _classCallCheck(this, Enumerator);

    this.list = list;
  }

  _createClass(Enumerator, [{
    key: "contains",
    value: function contains(value) {
      return this.list.indexOf(value) !== -1;
    }
  }, {
    key: "toString",
    value: function toString() {
      return "enum { " + this.list.join(", ") + " }";
    }
  }]);

  return Enumerator;
})();

exports.default = Enumerator;

},{}],39:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ = require("./");

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function getFunctionDeclaration(fn) {
  return (/^function (\w+\([^)]*\))/.exec(fn.toString())[1]
  );
}

var Formatter = (function () {
  function Formatter(instance, methodName, args) {
    _classCallCheck(this, Formatter);

    this.instance = instance;
    this.methodName = methodName;
    this.args = args;
  }

  _createClass(Formatter, [{
    key: "plain",
    value: function plain(strings) {
      var msg = strings[0];

      for (var _len = arguments.length, values = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        values[_key - 1] = arguments[_key];
      }

      for (var i = 0; i < values.length; i++) {
        msg += values[i] + strings[i + 1];
      }

      return msg.trim().replace(/\s+/g, " ");
    }
  }, {
    key: "butGot",
    value: function butGot(value, name, type) {
      return "\"" + name + "\" should be " + _2.default.article(type) + " " + type + ", but got: " + _2.default.prettyPrint(value);
    }
  }, {
    key: "outsideTheRange",
    value: function outsideTheRange(value, name, minValue, maxValue) {
      return "\"" + name + "\" provided (" + value + ") is outside the range [" + minValue + ", " + maxValue + ")";
    }
  }, {
    key: "form",
    get: function get() {
      var result = this.instance.constructor.name;

      if (this.methodName === "constructor") {
        if (this.args) {
          result = "new " + result + "(" + this.args.join(", ") + ")";
        } else {
          result = "new " + getFunctionDeclaration(this.instance.constructor);
        }
      } else if (this.methodName) {
        if (this.args) {
          result += "#" + this.methodName + "(" + this.args.join(", ") + ")";
        } else {
          var descriptor = Object.getOwnPropertyDescriptor(this.instance, this.methodName) || Object.getOwnPropertyDescriptor(Object.getPrototypeOf(this.instance), this.methodName);

          if (descriptor && typeof descriptor.value === "function") {
            result += "#" + getFunctionDeclaration(descriptor.value);
          }
        }
      }

      return result;
    }
  }]);

  return Formatter;
})();

exports.default = Formatter;

},{"./":44}],40:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var instance = null;

var Immigration = (function () {
  function Immigration() {
    _classCallCheck(this, Immigration);

    this._admissions = [];
  }

  _createClass(Immigration, [{
    key: "apply",
    value: function apply(fn) {
      var admission1 = { token: {}, count: 0 };

      this._admissions.push(admission1);

      var result = fn(admission1.token);

      var admission2 = this._admissions.pop();

      if (admission1 !== admission2 || admission2.count !== 1) {
        throw new Error("invalid admission");
      }

      return result;
    }
  }, {
    key: "check",
    value: function check(token, errorCallback) {
      var lastAdmission = this._admissions.pop();

      if (!lastAdmission || lastAdmission.token !== token || lastAdmission.count++ !== 0) {
        errorCallback();
      }

      this._admissions.push(lastAdmission);
    }
  }], [{
    key: "getInstance",
    value: function getInstance() {
      if (instance === null) {
        instance = new Immigration();
      }
      return instance;
    }
  }]);

  return Immigration;
})();

exports.default = Immigration;

},{}],41:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _templateObject = _taggedTemplateLiteral(["\n        ", ";\n        attempt to write a readonly property: \"", "\"\n      "], ["\n        ", ";\n        attempt to write a readonly property: \"", "\"\n      "]);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Formatter = require("./Formatter");

var _Formatter2 = _interopRequireDefault(_Formatter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Inspector = (function () {
  function Inspector(instance) {
    _classCallCheck(this, Inspector);

    this.instance = instance;
  }

  _createClass(Inspector, [{
    key: "describe",
    value: function describe(methodName, args, callback) {
      if (typeof args === "function") {
        var _ref = [null, args];
        args = _ref[0];
        callback = _ref[1];
      }

      var formatter = new _Formatter2.default(this.instance, methodName, args);
      var _this = this;

      function assert(test, callback) {
        if (test) {
          return;
        }

        callback.call(_this.instance, formatter);
      }

      assert.throwReadOnlyTypeError = function () {
        throw new TypeError(formatter.plain(_templateObject, formatter.form, methodName));
      };

      callback.call(this.instance, assert);
    }
  }]);

  return Inspector;
})();

exports.default = Inspector;

},{"./Formatter":39}],42:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ = require("./");

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Junction = (function () {
  function Junction(node, index) {
    _classCallCheck(this, Junction);

    this.node = node;
    this.index = index;
    this.inputs = [];
    this.outputs = [];
  }

  _createClass(Junction, [{
    key: "connect",
    value: function connect(destination) {
      _2.default.appendIfNotExists(this.outputs, destination);
      _2.default.appendIfNotExists(destination.inputs, this);
    }
  }, {
    key: "disconnectAll",
    value: function disconnectAll() {
      var _this = this;

      this.outputs.splice(0).forEach(function (destination) {
        _2.default.removeIfExists(destination.inputs, _this);
      });
    }
  }, {
    key: "disconnectNode",
    value: function disconnectNode(node) {
      for (var i = this.outputs.length - 1; i >= 0; i--) {
        var destination = this.outputs[i];

        if (destination.node === node) {
          this.outputs.splice(i, 1);
          _2.default.removeIfExists(destination.inputs, this);
        }
      }
    }
  }, {
    key: "disconnectChannel",
    value: function disconnectChannel(node, input) {
      for (var i = this.outputs.length - 1; i >= 0; i--) {
        var destination = this.outputs[i];

        if (destination.node === node && destination.index === input) {
          this.outputs.splice(i, 1);
          _2.default.removeIfExists(destination.inputs, this);
        }
      }
    }
  }, {
    key: "isConnected",
    value: function isConnected(destination) {
      return this.outputs.some(function (junction) {
        return junction.node === destination;
      });
    }
  }, {
    key: "process",
    value: function process(inNumSamples, tick) {
      this.inputs.forEach(function (junction) {
        junction.node.$process(inNumSamples, tick);
      });
    }
  }, {
    key: "toJSON",
    value: function toJSON(memo) {
      return this.inputs.map(function (junction) {
        return junction.node.toJSON(memo);
      });
    }
  }]);

  return Junction;
})();

exports.default = Junction;

},{"./":44}],43:[function(require,module,exports){
module.exports={
  "AnalyserNode#getFloatTimeDomainData": {
    "states": [ "disabled", "enabled" ]
  },
  "AudioBuffer#copyToChannel": {
    "states": [ "disabled", "enabled" ]
  },
  "AudioBuffer#copyFromChannel": {
    "states": [ "disabled", "enabled" ]
  },
  "AudioContext#createAudioWorker": {
    "states": [ "disabled", "enabled" ]
  },
  "AudioContext#createStereoPanner": {
    "states": [ "disabled", "enabled" ]
  },
  "AudioContext#decodeAudioData": {
    "states": [ "void", "promise" ]
  },
  "AudioContext#close": {
    "states": [ "disabled", "enabled" ]
  },
  "AudioContext#suspend": {
    "states": [ "disabled", "enabled" ]
  },
  "AudioContext#resume": {
    "states": [ "disabled", "enabled" ]
  },
  "OfflineAudioContext#startRendering": {
    "states": [ "void", "promise" ]
  },
  "AudioNode#disconnect": {
    "states": [ "channel", "selective" ]
  }
}

},{}],44:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.appendIfNotExists = appendIfNotExists;
exports.article = article;
exports.defaults = defaults;
exports.countArguments = countArguments;
exports.fill = fill;
exports.getAPIVersion = getAPIVersion;
exports.isBoolean = isBoolean;
exports.isFunction = isFunction;
exports.isInstanceOf = isInstanceOf;
exports.isNullOrFunction = isNullOrFunction;
exports.isNullOrInstanceOf = isNullOrInstanceOf;
exports.isNumber = isNumber;
exports.isInteger = isInteger;
exports.isPositiveNumber = isPositiveNumber;
exports.isPositiveInteger = isPositiveInteger;
exports.isString = isString;
exports.isUndefined = isUndefined;
exports.removeIfExists = removeIfExists;
exports.toNodeName = toNodeName;
exports.prettyPrint = prettyPrint;
exports.preventSuperCall = preventSuperCall;
exports.toJSON = toJSON;
exports.toMicroseconds = toMicroseconds;
exports.toSeconds = toSeconds;

var _Configuration = require("./Configuration");

var _Configuration2 = _interopRequireDefault(_Configuration);

var _Enumerator = require("./Enumerator");

var _Enumerator2 = _interopRequireDefault(_Enumerator);

var _Formatter = require("./Formatter");

var _Formatter2 = _interopRequireDefault(_Formatter);

var _Immigration = require("./Immigration");

var _Immigration2 = _interopRequireDefault(_Immigration);

var _Inspector = require("./Inspector");

var _Inspector2 = _interopRequireDefault(_Inspector);

var _version = require("../version");

var _version2 = _interopRequireDefault(_version);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

var MIN_MICRO_SECONDS = 0;
var MAX_MICRO_SECONDS = 24 * 60 * 60 * 1000 * 1000;

function appendIfNotExists(list, value) {
  var index = list.indexOf(value);

  if (index === -1) {
    list.push(value);
  }
}

function article(str) {
  return (/[aeiou]/i.test(str.charAt(0)) ? "an" : "a"
  );
}

function defaults(value, defaultValue) {
  return typeof value !== "undefined" ? value : defaultValue;
}

function countArguments(args) {
  for (var i = args.length - 1; i >= 0; i--) {
    if (typeof args[i] !== "undefined") {
      return i + 1;
    }
  }
  return 0;
}

function fill(list, value) {
  for (var i = 0; i < list.length; i++) {
    list[i] = typeof value === "function" ? value(i) : value;
  }
  return list;
}

function getAPIVersion() {
  return _version2.default;
}

function isBoolean(value) {
  return typeof value === "boolean";
}

function isFunction(value) {
  return typeof value === "function";
}

function isInstanceOf(value, klass) {
  return value instanceof klass;
}

function isNullOrFunction(value) {
  return value === null || isFunction(value);
}

function isNullOrInstanceOf(value, klass) {
  return value === null || isInstanceOf(value, klass);
}

function isNumber(value) {
  return !isNaN(value) && typeof value === "number";
}

function isInteger(value) {
  return isNumber(value) && value === (value | 0);
}

function isPositiveNumber(value) {
  return isNumber(value) && 0 <= value;
}

function isPositiveInteger(value) {
  return isPositiveNumber(value) && isInteger(value);
}

function isString(value) {
  return typeof value === "string";
}

function isUndefined(value) {
  return typeof value === "undefined";
}

function removeIfExists(list, value) {
  var index = list.indexOf(value);

  if (index !== -1) {
    return list.splice(index, 1)[0];
  }

  return null;
}

function toNodeName(obj) {
  if (obj.hasOwnProperty("$id")) {
    return obj.$name + "#" + obj.$id;
  }
  return obj.$name;
}

function prettyPrint(value) {
  if (value === null || typeof value === "undefined") {
    return String(value);
  }
  var type = typeof value === "undefined" ? "undefined" : _typeof(value);

  if (type === "number" || type === "boolean") {
    return String(value);
  }

  if (type === "string") {
    return "'" + value + "'";
  }

  if (Array.isArray(value)) {
    return "[ " + value.map(prettyPrint).join(", ") + " ]";
  }

  if (value.constructor === ({}).constructor) {
    return "{ " + Object.keys(value).map(function (key) {
      return key + ": " + prettyPrint(value[key]);
    }).join(", ") + "}";
  }

  var name = value.constructor.name || Object.prototype.toString.call(value).slice(8, -1);

  return article(name) + " " + name;
}

function preventSuperCall(superClass) {
  function ctor() {}

  ctor.prototype = Object.create(superClass.prototype, {
    constructor: { value: ctor, enumerable: false, writable: true, configurable: true }
  });

  return ctor;
}

function toJSON(node, func) {
  var memo = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

  var result = undefined;

  if (memo.indexOf(node) !== -1) {
    return "<circular:" + toNodeName(node) + ">";
  }
  memo.push(node);

  result = func(node, memo);

  memo.pop();

  return result;
}

function toMicroseconds(time) {
  var value = 0;

  if (typeof time === "number") {
    // seconds -> microseconds
    value = Math.floor(time * 1000 * 1000) || 0;
    return Math.max(MIN_MICRO_SECONDS, Math.min(value, MAX_MICRO_SECONDS));
  }

  var matches = /^([0-5]\d):([0-5]\d)\.(\d\d\d)$/.exec(time);

  if (matches) {
    // minutes
    value += +matches[1];
    value *= 60;
    // seconds
    value += +matches[2];
    value *= 1000;
    // milliseconds
    value += +matches[3];
    value *= 1000;
    return Math.max(MIN_MICRO_SECONDS, Math.min(value, MAX_MICRO_SECONDS));
  }

  return value;
}

function toSeconds(time) {
  return toMicroseconds(time) / (1000 * 1000);
}

exports.default = {
  Configuration: _Configuration2.default,
  Enumerator: _Enumerator2.default,
  Formatter: _Formatter2.default,
  Immigration: _Immigration2.default,
  Inspector: _Inspector2.default,
  appendIfNotExists: appendIfNotExists,
  article: article,
  countArguments: countArguments,
  defaults: defaults,
  fill: fill,
  getAPIVersion: getAPIVersion,
  isBoolean: isBoolean,
  isFunction: isFunction,
  isInstanceOf: isInstanceOf,
  isNullOrFunction: isNullOrFunction,
  isNullOrInstanceOf: isNullOrInstanceOf,
  isNumber: isNumber,
  isInteger: isInteger,
  isPositiveNumber: isPositiveNumber,
  isPositiveInteger: isPositiveInteger,
  isString: isString,
  isUndefined: isUndefined,
  removeIfExists: removeIfExists,
  toNodeName: toNodeName,
  prettyPrint: prettyPrint,
  preventSuperCall: preventSuperCall,
  toJSON: toJSON,
  toMicroseconds: toMicroseconds,
  toSeconds: toSeconds
};

},{"../version":45,"./Configuration":37,"./Enumerator":38,"./Formatter":39,"./Immigration":40,"./Inspector":41}],45:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = "0.4.0";

},{}],46:[function(require,module,exports){
(function (global){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _WebAudioTestAPI = require("./WebAudioTestAPI");

var _WebAudioTestAPI2 = _interopRequireDefault(_WebAudioTestAPI);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (!global.WEB_AUDIO_TEST_API_IGNORE) {
  _WebAudioTestAPI2.default.use();
}

exports.default = _WebAudioTestAPI2.default;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./WebAudioTestAPI":36}]},{},[46]);
