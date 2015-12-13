(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.WebAudioTestAPI = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = require("./lib").default;

},{"./lib":40}],2:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _desc, _value, _class, _class2, _temp;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _Configuration = require("./utils/Configuration");

var _Configuration2 = _interopRequireDefault(_Configuration);

var _AudioNode2 = require("./AudioNode");

var _AudioNode3 = _interopRequireDefault(_AudioNode2);

var _props = require("./decorators/props");

var props = _interopRequireWildcard(_props);

var _methods = require("./decorators/methods");

var methods = _interopRequireWildcard(_methods);

var _validators = require("./validators");

var validators = _interopRequireWildcard(_validators);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var configuration = _Configuration2.default.getInstance();

var AnalyserNode = (_dec = props.enums([32, 64, 128, 256, 512, 1024, 2048]), _dec2 = props.readonly(), _dec3 = props.typed(validators.isNumber, -100), _dec4 = props.typed(validators.isNumber, 30), _dec5 = props.typed(validators.isNumber, 0.8), _dec6 = methods.param("array", validators.isInstanceOf(Float32Array)), _dec7 = methods.param("array", validators.isInstanceOf(Uint8Array)), _dec8 = methods.param("array", validators.isInstanceOf(Float32Array)), _dec9 = methods.contract({
  precondition: function precondition() {
    if (configuration.getState("AnalyserNode#getFloatTimeDomainData") !== "enabled") {
      throw new TypeError("not enabled");
    }
  }
}), _dec10 = methods.param("array", validators.isInstanceOf(Uint8Array)), (_class = (_temp = _class2 = (function (_AudioNode) {
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
    return _this;
  }

  _createClass(AnalyserNode, [{
    key: "fftSize",
    value: function fftSize() {}
  }, {
    key: "frequencyBinCount",
    value: function frequencyBinCount() {
      return this.fftSize >> 1;
    }
  }, {
    key: "minDecibels",
    value: function minDecibels() {}
  }, {
    key: "maxDecibels",
    value: function maxDecibels() {}
  }, {
    key: "smoothingTimeConstant",
    value: function smoothingTimeConstant() {}
  }, {
    key: "getFloatFrequencyData",
    value: function getFloatFrequencyData() {}
  }, {
    key: "getByteFrequencyData",
    value: function getByteFrequencyData() {}
  }, {
    key: "getFloatTimeDomainData",
    value: function getFloatTimeDomainData() {}
  }, {
    key: "getByteTimeDomainData",
    value: function getByteTimeDomainData() {}
  }]);

  return AnalyserNode;
})(_AudioNode3.default), _class2.$JSONKeys = ["fftSize", "minDecibels", "maxDecibels", "smoothingTimeConstant"], _temp), (_desc = _dec(_class.prototype, "fftSize", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "fftSize")) || _desc, _desc ? Object.defineProperty(_class.prototype, "fftSize", _desc) : void 0, _desc = _dec2(_class.prototype, "frequencyBinCount", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "frequencyBinCount")) || _desc, _desc ? Object.defineProperty(_class.prototype, "frequencyBinCount", _desc) : void 0, _desc = _dec3(_class.prototype, "minDecibels", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "minDecibels")) || _desc, _desc ? Object.defineProperty(_class.prototype, "minDecibels", _desc) : void 0, _desc = _dec4(_class.prototype, "maxDecibels", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "maxDecibels")) || _desc, _desc ? Object.defineProperty(_class.prototype, "maxDecibels", _desc) : void 0, _desc = _dec5(_class.prototype, "smoothingTimeConstant", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "smoothingTimeConstant")) || _desc, _desc ? Object.defineProperty(_class.prototype, "smoothingTimeConstant", _desc) : void 0, _desc = _dec6(_class.prototype, "getFloatFrequencyData", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "getFloatFrequencyData")) || _desc, _desc ? Object.defineProperty(_class.prototype, "getFloatFrequencyData", _desc) : void 0, _desc = _dec7(_class.prototype, "getByteFrequencyData", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "getByteFrequencyData")) || _desc, _desc ? Object.defineProperty(_class.prototype, "getByteFrequencyData", _desc) : void 0, _desc = _dec8(_class.prototype, "getFloatTimeDomainData", _desc = _dec9(_class.prototype, "getFloatTimeDomainData", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "getFloatTimeDomainData")) || _desc) || _desc, _desc ? Object.defineProperty(_class.prototype, "getFloatTimeDomainData", _desc) : void 0, _desc = _dec10(_class.prototype, "getByteTimeDomainData", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "getByteTimeDomainData")) || _desc, _desc ? Object.defineProperty(_class.prototype, "getByteTimeDomainData", _desc) : void 0), _class));
exports.default = AnalyserNode;
},{"./AudioNode":8,"./decorators/methods":32,"./decorators/props":33,"./utils/Configuration":41,"./validators":56}],3:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _desc, _value, _class;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _Configuration = require("./utils/Configuration");

var _Configuration2 = _interopRequireDefault(_Configuration);

var _Immigration = require("./utils/Immigration");

var _Immigration2 = _interopRequireDefault(_Immigration);

var _props = require("./decorators/props");

var props = _interopRequireWildcard(_props);

var _methods = require("./decorators/methods");

var methods = _interopRequireWildcard(_methods);

var _validators = require("./validators");

var validators = _interopRequireWildcard(_validators);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var configuration = _Configuration2.default.getInstance();
var immigration = _Immigration2.default.getInstance();

var AudioBuffer = (_dec = methods.param("numberOfChannels", validators.isPositiveInteger), _dec2 = methods.param("length", validators.isPositiveInteger), _dec3 = methods.param("sampleRate", validators.isPositiveInteger), _dec4 = props.readonly(), _dec5 = props.readonly(), _dec6 = props.readonly(), _dec7 = props.readonly(), _dec8 = methods.param("channel", validators.isPositiveInteger), _dec9 = methods.contract({
  precondition: function precondition(channel) {
    if (this._.data.length <= channel) {
      throw new TypeError("The {{channel}} index (" + channel + ") exceeds number of channels (" + this._.data.length + ").");
    }
  }
}), _dec10 = methods.returns(validators.isInstanceOf(Float32Array)), _dec11 = methods.param("destination", validators.isInstanceOf(Float32Array)), _dec12 = methods.param("channelNumber", validators.isPositiveInteger), _dec13 = methods.param("[ startInChannel ]", validators.isPositiveInteger), _dec14 = methods.contract({
  precondition: function precondition(destination, channelNumber) {
    var startInChannel = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

    if (this._.data.length <= channelNumber) {
      throw new TypeError("The {{channelNumber}} provided (" + channelNumber + ") is outside the range [0, " + this._.data.length + ").");
    }
    if (this._.length <= startInChannel) {
      throw new TypeError("The {{startInChannel}} provided (" + startInChannel + ") is outside the range [0, " + this._.length + ").");
    }
    if (configuration.getState("AudioBuffer#copyFromChannel") !== "enabled") {
      throw new TypeError("not enabled");
    }
  }
}), _dec15 = methods.param("source", validators.isInstanceOf(Float32Array)), _dec16 = methods.param("channelNumber", validators.isPositiveInteger), _dec17 = methods.param("[ startInChannel ]", validators.isPositiveInteger), _dec18 = methods.contract({
  precondition: function precondition(source, channelNumber) {
    var startInChannel = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

    if (this._.data.length <= channelNumber) {
      throw new TypeError("The {{channelNumber}} provided (" + channelNumber + ") is outside the range [0, " + this._.data.length + ").");
    }
    if (this._.length <= startInChannel) {
      throw new TypeError("The {{startInChannel}} provided (" + startInChannel + ") is outside the range [0, " + this._.length + ").");
    }
    if (configuration.getState("AudioBuffer#copyToChannel") !== "enabled") {
      throw new TypeError("not enabled");
    }
  }
}), (_class = (function () {
  function AudioBuffer(admission, context, numberOfChannels, length, sampleRate) {
    _classCallCheck(this, AudioBuffer);

    immigration.check(admission, function () {
      throw new TypeError("Illegal constructor");
    });
    Object.defineProperty(this, "_", { value: {} });

    this._.context = context;
    this.__createAudioBuffer(numberOfChannels, length, sampleRate);
  }

  _createClass(AudioBuffer, [{
    key: "__createAudioBuffer",
    value: function __createAudioBuffer(numberOfChannels, length, sampleRate) {
      this._.numberOfChannels = numberOfChannels;
      this._.length = length;
      this._.sampleRate = sampleRate;
      this._.data = new Array(numberOfChannels);

      for (var i = 0; i < numberOfChannels; i++) {
        this._.data[i] = new Float32Array(length);
      }
    }
  }, {
    key: "sampleRate",
    value: function sampleRate() {
      return this._.sampleRate;
    }
  }, {
    key: "length",
    value: function length() {
      return this._.length;
    }
  }, {
    key: "duration",
    value: function duration() {
      return this.length / this.sampleRate;
    }
  }, {
    key: "numberOfChannels",
    value: function numberOfChannels() {
      return this._.numberOfChannels;
    }
  }, {
    key: "getChannelData",
    value: function getChannelData(channel) {
      return this._.data[channel];
    }
  }, {
    key: "copyFromChannel",
    value: function copyFromChannel(destination, channelNumber) {
      var startInChannel = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

      var source = this._.data[channelNumber].subarray(startInChannel);

      destination.set(source.subarray(0, Math.min(source.length, destination.length)));
    }
  }, {
    key: "copyToChannel",
    value: function copyToChannel(source, channelNumber) {
      var startInChannel = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

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
})(), (_desc = _dec(_class.prototype, "__createAudioBuffer", _desc = _dec2(_class.prototype, "__createAudioBuffer", _desc = _dec3(_class.prototype, "__createAudioBuffer", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "__createAudioBuffer")) || _desc) || _desc) || _desc, _desc ? Object.defineProperty(_class.prototype, "__createAudioBuffer", _desc) : void 0, _desc = _dec4(_class.prototype, "sampleRate", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "sampleRate")) || _desc, _desc ? Object.defineProperty(_class.prototype, "sampleRate", _desc) : void 0, _desc = _dec5(_class.prototype, "length", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "length")) || _desc, _desc ? Object.defineProperty(_class.prototype, "length", _desc) : void 0, _desc = _dec6(_class.prototype, "duration", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "duration")) || _desc, _desc ? Object.defineProperty(_class.prototype, "duration", _desc) : void 0, _desc = _dec7(_class.prototype, "numberOfChannels", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "numberOfChannels")) || _desc, _desc ? Object.defineProperty(_class.prototype, "numberOfChannels", _desc) : void 0, _desc = _dec8(_class.prototype, "getChannelData", _desc = _dec9(_class.prototype, "getChannelData", _desc = _dec10(_class.prototype, "getChannelData", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "getChannelData")) || _desc) || _desc) || _desc, _desc ? Object.defineProperty(_class.prototype, "getChannelData", _desc) : void 0, _desc = _dec11(_class.prototype, "copyFromChannel", _desc = _dec12(_class.prototype, "copyFromChannel", _desc = _dec13(_class.prototype, "copyFromChannel", _desc = _dec14(_class.prototype, "copyFromChannel", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "copyFromChannel")) || _desc) || _desc) || _desc) || _desc, _desc ? Object.defineProperty(_class.prototype, "copyFromChannel", _desc) : void 0, _desc = _dec15(_class.prototype, "copyToChannel", _desc = _dec16(_class.prototype, "copyToChannel", _desc = _dec17(_class.prototype, "copyToChannel", _desc = _dec18(_class.prototype, "copyToChannel", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "copyToChannel")) || _desc) || _desc) || _desc) || _desc, _desc ? Object.defineProperty(_class.prototype, "copyToChannel", _desc) : void 0), _class));
exports.default = AudioBuffer;
},{"./decorators/methods":32,"./decorators/props":33,"./utils/Configuration":41,"./utils/Immigration":42,"./validators":56}],4:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _desc, _value, _class, _class2, _temp;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _AudioNode2 = require("./AudioNode");

var _AudioNode3 = _interopRequireDefault(_AudioNode2);

var _AudioBuffer = require("./AudioBuffer");

var _AudioBuffer2 = _interopRequireDefault(_AudioBuffer);

var _Event = require("./dom/Event");

var _Event2 = _interopRequireDefault(_Event);

var _toSeconds = require("./utils/toSeconds");

var _toSeconds2 = _interopRequireDefault(_toSeconds);

var _props = require("./decorators/props");

var props = _interopRequireWildcard(_props);

var _methods = require("./decorators/methods");

var methods = _interopRequireWildcard(_methods);

var _validators = require("./validators");

var validators = _interopRequireWildcard(_validators);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AudioBufferSourceNode = (_dec = props.typed(validators.isNullOrInstanceOf(_AudioBuffer2.default), null), _dec2 = props.audioparam(1), _dec3 = props.audioparam(0), _dec4 = props.typed(validators.isBoolean, false), _dec5 = props.typed(validators.isPositiveNumber, 0), _dec6 = props.typed(validators.isPositiveNumber, 0), _dec7 = props.on("ended"), _dec8 = methods.param("[ when ]", validators.isPositiveNumber), _dec9 = methods.param("[ offset ]", validators.isPositiveNumber), _dec10 = methods.param("[ duration ]", validators.isPositiveNumber), _dec11 = methods.contract({
  precondition: function precondition() {
    if (this._.startTime !== Infinity) {
      throw new TypeError("Cannot start more than once.");
    }
  }
}), _dec12 = methods.param("[ when ]", validators.isPositiveNumber), _dec13 = methods.contract({
  precondition: function precondition() {
    if (this._.startTime === Infinity) {
      throw new TypeError("Cannot call stop without calling start first.");
    }
    if (this._.stopTime !== Infinity) {
      throw new TypeError("Cannot stop more than once.");
    }
  }
}), (_class = (_temp = _class2 = (function (_AudioNode) {
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

    _this._.startTime = Infinity;
    _this._.stopTime = Infinity;
    _this._.firedOnEnded = false;
    return _this;
  }

  _createClass(AudioBufferSourceNode, [{
    key: "buffer",
    value: function buffer() {}
  }, {
    key: "playbackRate",
    value: function playbackRate() {}
  }, {
    key: "detune",
    value: function detune() {}
  }, {
    key: "loop",
    value: function loop() {}
  }, {
    key: "loopStart",
    value: function loopStart() {}
  }, {
    key: "loopEnd",
    value: function loopEnd() {}
  }, {
    key: "onended",
    value: function onended() {}
  }, {
    key: "start",
    value: function start() {
      var when = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
      var offset = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
      var duration = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

      this._.startTime = when;
      this._.offset = offset;
      this._.duration = duration;
    }
  }, {
    key: "stop",
    value: function stop() {
      var when = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

      this._.stopTime = when;
    }
  }, {
    key: "$stateAtTime",
    value: function $stateAtTime(when) {
      var playbackTime = (0, _toSeconds2.default)(when);

      if (this._.startTime === Infinity) {
        return "UNSCHEDULED";
      }
      if (playbackTime < this._.startTime) {
        return "SCHEDULED";
      }

      var stopTime = this._.stopTime;

      if (!this.loop && this.buffer) {
        stopTime = Math.min(stopTime, this._.startTime + this.buffer.duration);
      }

      if (playbackTime < stopTime) {
        return "PLAYING";
      }

      return "FINISHED";
    }
  }, {
    key: "__process",
    value: function __process() {
      if (!this._.firedOnEnded && this.$stateAtTime(this.context.currentTime) === "FINISHED") {
        this.dispatchEvent(new _Event2.default("ended", this));
        this._.firedOnEnded = true;
      }
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
})(_AudioNode3.default), _class2.$JSONKeys = ["buffer", "playbackRate", "loop", "loopStart", "loopEnd"], _temp), (_desc = _dec(_class.prototype, "buffer", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "buffer")) || _desc, _desc ? Object.defineProperty(_class.prototype, "buffer", _desc) : void 0, _desc = _dec2(_class.prototype, "playbackRate", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "playbackRate")) || _desc, _desc ? Object.defineProperty(_class.prototype, "playbackRate", _desc) : void 0, _desc = _dec3(_class.prototype, "detune", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "detune")) || _desc, _desc ? Object.defineProperty(_class.prototype, "detune", _desc) : void 0, _desc = _dec4(_class.prototype, "loop", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "loop")) || _desc, _desc ? Object.defineProperty(_class.prototype, "loop", _desc) : void 0, _desc = _dec5(_class.prototype, "loopStart", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "loopStart")) || _desc, _desc ? Object.defineProperty(_class.prototype, "loopStart", _desc) : void 0, _desc = _dec6(_class.prototype, "loopEnd", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "loopEnd")) || _desc, _desc ? Object.defineProperty(_class.prototype, "loopEnd", _desc) : void 0, _desc = _dec7(_class.prototype, "onended", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "onended")) || _desc, _desc ? Object.defineProperty(_class.prototype, "onended", _desc) : void 0, _desc = _dec8(_class.prototype, "start", _desc = _dec9(_class.prototype, "start", _desc = _dec10(_class.prototype, "start", _desc = _dec11(_class.prototype, "start", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "start")) || _desc) || _desc) || _desc) || _desc, _desc ? Object.defineProperty(_class.prototype, "start", _desc) : void 0, _desc = _dec12(_class.prototype, "stop", _desc = _dec13(_class.prototype, "stop", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "stop")) || _desc) || _desc, _desc ? Object.defineProperty(_class.prototype, "stop", _desc) : void 0), _class));
exports.default = AudioBufferSourceNode;
},{"./AudioBuffer":3,"./AudioNode":8,"./decorators/methods":32,"./decorators/props":33,"./dom/Event":35,"./utils/toSeconds":55,"./validators":56}],5:[function(require,module,exports){
(function (global){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _dec37, _dec38, _dec39, _dec40, _dec41, _dec42, _dec43, _dec44, _dec45, _dec46, _desc, _value, _class;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _Configuration = require("./utils/Configuration");

var _Configuration2 = _interopRequireDefault(_Configuration);

var _Immigration = require("./utils/Immigration");

var _Immigration2 = _interopRequireDefault(_Immigration);

var _Event = require("./dom/Event");

var _Event2 = _interopRequireDefault(_Event);

var _EventTarget2 = require("./dom/EventTarget");

var _EventTarget3 = _interopRequireDefault(_EventTarget2);

var _HTMLMediaElement = require("./dom/HTMLMediaElement");

var _HTMLMediaElement2 = _interopRequireDefault(_HTMLMediaElement);

var _MediaStream = require("./dom/MediaStream");

var _MediaStream2 = _interopRequireDefault(_MediaStream);

var _AudioBuffer = require("./AudioBuffer");

var _AudioBuffer2 = _interopRequireDefault(_AudioBuffer);

var _AnalyserNode = require("./AnalyserNode");

var _AnalyserNode2 = _interopRequireDefault(_AnalyserNode);

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

var _getAPIVersion = require("./utils/getAPIVersion");

var _getAPIVersion2 = _interopRequireDefault(_getAPIVersion);

var _defaults = require("./utils/defaults");

var _defaults2 = _interopRequireDefault(_defaults);

var _toMicroseconds = require("./utils/toMicroseconds");

var _toMicroseconds2 = _interopRequireDefault(_toMicroseconds);

var _props = require("./decorators/props");

var props = _interopRequireWildcard(_props);

var _methods = require("./decorators/methods");

var methods = _interopRequireWildcard(_methods);

var _validators = require("./validators");

var validators = _interopRequireWildcard(_validators);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var configuration = _Configuration2.default.getInstance();
var immigration = _Immigration2.default.getInstance();

function isEnabledState() {
  return configuration.getState("AudioContext#suspend") === "enabled" || configuration.getState("AudioContext#resume") === "enabled" || configuration.getState("AudioContext#close") === "enabled";
}

var AudioContext = (_dec = props.readonly(), _dec2 = props.readonly(), _dec3 = props.readonly(), _dec4 = props.readonly(), _dec5 = props.on("statechange"), _dec6 = methods.returns(validators.isInstanceOf(Promise)), _dec7 = methods.returns(validators.isInstanceOf(Promise)), _dec8 = methods.returns(validators.isInstanceOf(Promise)), _dec9 = methods.param("numberOfChannels", validators.isPositiveInteger), _dec10 = methods.param("length", validators.isPositiveInteger), _dec11 = methods.param("sampleRate", validators.isPositiveInteger), _dec12 = methods.returns(validators.isInstanceOf(_AudioBuffer2.default)), _dec13 = methods.param("audioData", validators.isInstanceOf(ArrayBuffer)), _dec14 = methods.param("[ successCallback ]", validators.isFunction), _dec15 = methods.param("[ errorCallback ]", validators.isFunction), _dec16 = methods.returns(validators.isInstanceOf(_AudioBufferSourceNode2.default)), _dec17 = methods.param("mediaElement", validators.isInstanceOf(_HTMLMediaElement2.default)), _dec18 = methods.returns(validators.isInstanceOf(_MediaElementAudioSourceNode2.default)), _dec19 = methods.param("mediaStream", validators.isInstanceOf(_MediaStream2.default)), _dec20 = methods.returns(validators.isInstanceOf(_MediaStreamAudioSourceNode2.default)), _dec21 = methods.returns(validators.isInstanceOf(_MediaStreamAudioDestinationNode2.default)), _dec22 = methods.contract({
  precondition: function precondition() {
    throw new TypeError("not enabled");
  }
}), _dec23 = methods.param("bufferSize", validators.isPositiveInteger), _dec24 = methods.param("[ numberOfInputChannels ]", validators.isPositiveInteger), _dec25 = methods.param("[ numberOfOutputChannels ]", validators.isPositiveInteger), _dec26 = methods.returns(validators.isInstanceOf(_ScriptProcessorNode2.default)), _dec27 = methods.returns(validators.isInstanceOf(_AnalyserNode2.default)), _dec28 = methods.returns(validators.isInstanceOf(_GainNode2.default)), _dec29 = methods.param("[ maxDelayTime ]", validators.isPositiveNumber), _dec30 = methods.returns(validators.isInstanceOf(_DelayNode2.default)), _dec31 = methods.returns(validators.isInstanceOf(_BiquadFilterNode2.default)), _dec32 = methods.returns(validators.isInstanceOf(_WaveShaperNode2.default)), _dec33 = methods.returns(validators.isInstanceOf(_PannerNode2.default)), _dec34 = methods.contract({
  precondition: function precondition() {
    if (configuration.getState("AudioContext#createStereoPanner") !== "enabled") {
      throw new TypeError("not enabled");
    }
  }
}), _dec35 = methods.returns(validators.isInstanceOf(_StereoPannerNode2.default)), _dec36 = methods.returns(validators.isInstanceOf(_ConvolverNode2.default)), _dec37 = methods.param("[ numberOfOutputs ]", validators.isPositiveInteger), _dec38 = methods.returns(validators.isInstanceOf(_ChannelSplitterNode2.default)), _dec39 = methods.param("[ numberOfInputs ]", validators.isPositiveInteger), _dec40 = methods.returns(validators.isInstanceOf(_ChannelMergerNode2.default)), _dec41 = methods.returns(validators.isInstanceOf(_DynamicsCompressorNode2.default)), _dec42 = methods.returns(validators.isInstanceOf(_OscillatorNode2.default)), _dec43 = methods.param("real", validators.isInstanceOf(Float32Array)), _dec44 = methods.param("imag", validators.isInstanceOf(Float32Array)), _dec45 = methods.returns(validators.isInstanceOf(_PeriodicWave2.default)), _dec46 = methods.contract({
  precondition: function precondition(methodName) {
    if (configuration.getState("AudioContext#" + methodName) !== "enabled") {
      throw new TypeError("not enabled");
    }
  }
}), (_class = (function (_EventTarget) {
  _inherits(AudioContext, _EventTarget);

  function AudioContext() {
    _classCallCheck(this, AudioContext);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AudioContext).call(this));

    Object.defineProperty(_this, "_", { value: {} });

    _this._.destination = immigration.apply(function (admission) {
      return new _AudioDestinationNode2.default(admission, _this);
    });
    _this._.sampleRate = global.WebAudioTestAPI.sampleRate;
    _this._.listener = immigration.apply(function (admission) {
      return new _AudioListener2.default(admission, _this);
    });
    _this._.microCurrentTime = 0;
    _this._.processedSamples = 0;
    _this._.tick = 0;
    _this._.state = "running";
    return _this;
  }

  _createClass(AudioContext, [{
    key: "destination",
    value: function destination() {
      return this._.destination;
    }
  }, {
    key: "sampleRate",
    value: function sampleRate() {
      return this._.sampleRate;
    }
  }, {
    key: "currentTime",
    value: function currentTime() {
      return this._.microCurrentTime / (1000 * 1000);
    }
  }, {
    key: "listener",
    value: function listener() {
      return this._.listener;
    }
  }, {
    key: "onstatechange",
    value: function onstatechange() {}
  }, {
    key: "suspend",
    value: function suspend() {
      var _this2 = this;

      return this.__transitionToState("suspend", function () {
        if (_this2._.state === "running") {
          _this2._.state = "suspended";
          _this2.dispatchEvent(new _Event2.default("statechange", _this2));
        }
      });
    }
  }, {
    key: "resume",
    value: function resume() {
      var _this3 = this;

      return this.__transitionToState("resume", function () {
        if (_this3._.state === "suspended") {
          _this3._.state = "running";
          _this3.dispatchEvent(new _Event2.default("statechange", _this3));
        }
      });
    }
  }, {
    key: "close",
    value: function close() {
      var _this4 = this;

      return this.__transitionToState("close", function () {
        if (_this4._.state !== "closed") {
          _this4._.state = "closed";
          _this4.$reset();
          _this4.dispatchEvent(new _Event2.default("statechange", _this4));
        }
      });
    }
  }, {
    key: "createBuffer",
    value: function createBuffer(numberOfChannels, length, sampleRate) {
      var _this5 = this;

      return immigration.apply(function (admission) {
        return new _AudioBuffer2.default(admission, _this5, numberOfChannels, length, sampleRate);
      });
    }
  }, {
    key: "decodeAudioData",
    value: function decodeAudioData(audioData, successCallback, errorCallback) {
      var _this6 = this;

      var isPromiseBased = configuration.getState("AudioContext#decodeAudioData") === "promise";

      if (isPromiseBased) {
        successCallback = (0, _defaults2.default)(successCallback, function () {});
        errorCallback = (0, _defaults2.default)(errorCallback, function () {});
      } else {
        errorCallback = (0, _defaults2.default)(errorCallback, function () {});
      }

      var promise = new Promise(function (resolve, reject) {
        if (_this6.DECODE_AUDIO_DATA_FAILED) {
          reject();
        } else {
          resolve(_this6.DECODE_AUDIO_DATA_RESULT || immigration.apply(function (admission) {
            return new _AudioBuffer2.default(admission, _this6, 2, 1024, _this6.sampleRate);
          }));
        }
      });

      promise.then(successCallback, errorCallback);

      if (isPromiseBased) {
        return promise;
      }
    }
  }, {
    key: "createBufferSource",
    value: function createBufferSource() {
      var _this7 = this;

      return immigration.apply(function (admission) {
        return new _AudioBufferSourceNode2.default(admission, _this7);
      });
    }
  }, {
    key: "createMediaElementSource",
    value: function createMediaElementSource(mediaElement) {
      var _this8 = this;

      return immigration.apply(function (admission) {
        return new _MediaElementAudioSourceNode2.default(admission, _this8, mediaElement);
      });
    }
  }, {
    key: "createMediaStreamSource",
    value: function createMediaStreamSource(mediaStream) {
      var _this9 = this;

      return immigration.apply(function (admission) {
        return new _MediaStreamAudioSourceNode2.default(admission, _this9, mediaStream);
      });
    }
  }, {
    key: "createMediaStreamDestination",
    value: function createMediaStreamDestination() {
      var _this10 = this;

      return immigration.apply(function (admission) {
        return new _MediaStreamAudioDestinationNode2.default(admission, _this10);
      });
    }
  }, {
    key: "createAudioWorker",
    value: function createAudioWorker() {}
  }, {
    key: "createScriptProcessor",
    value: function createScriptProcessor(bufferSize) {
      var _this11 = this;

      var numberOfInputChannels = arguments.length <= 1 || arguments[1] === undefined ? 2 : arguments[1];
      var numberOfOutputChannels = arguments.length <= 2 || arguments[2] === undefined ? 2 : arguments[2];

      return immigration.apply(function (admission) {
        return new _ScriptProcessorNode2.default(admission, _this11, bufferSize, numberOfInputChannels, numberOfOutputChannels);
      });
    }
  }, {
    key: "createAnalyser",
    value: function createAnalyser() {
      var _this12 = this;

      return immigration.apply(function (admission) {
        return new _AnalyserNode2.default(admission, _this12);
      });
    }
  }, {
    key: "createGain",
    value: function createGain() {
      var _this13 = this;

      return immigration.apply(function (admission) {
        return new _GainNode2.default(admission, _this13);
      });
    }
  }, {
    key: "createDelay",
    value: function createDelay() {
      var _this14 = this;

      var maxDelayTime = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

      return immigration.apply(function (admission) {
        return new _DelayNode2.default(admission, _this14, maxDelayTime);
      });
    }
  }, {
    key: "createBiquadFilter",
    value: function createBiquadFilter() {
      var _this15 = this;

      return immigration.apply(function (admission) {
        return new _BiquadFilterNode2.default(admission, _this15);
      });
    }
  }, {
    key: "createWaveShaper",
    value: function createWaveShaper() {
      var _this16 = this;

      return immigration.apply(function (admission) {
        return new _WaveShaperNode2.default(admission, _this16);
      });
    }
  }, {
    key: "createPanner",
    value: function createPanner() {
      var _this17 = this;

      return immigration.apply(function (admission) {
        return new _PannerNode2.default(admission, _this17);
      });
    }
  }, {
    key: "createStereoPanner",
    value: function createStereoPanner() {
      var _this18 = this;

      return immigration.apply(function (admission) {
        return new _StereoPannerNode2.default(admission, _this18);
      });
    }
  }, {
    key: "createConvolver",
    value: function createConvolver() {
      var _this19 = this;

      return immigration.apply(function (admission) {
        return new _ConvolverNode2.default(admission, _this19);
      });
    }
  }, {
    key: "createChannelSplitter",
    value: function createChannelSplitter() {
      var _this20 = this;

      var numberOfOutputs = arguments.length <= 0 || arguments[0] === undefined ? 6 : arguments[0];

      return immigration.apply(function (admission) {
        return new _ChannelSplitterNode2.default(admission, _this20, numberOfOutputs);
      });
    }
  }, {
    key: "createChannelMerger",
    value: function createChannelMerger() {
      var _this21 = this;

      var numberOfInputs = arguments.length <= 0 || arguments[0] === undefined ? 6 : arguments[0];

      return immigration.apply(function (admission) {
        return new _ChannelMergerNode2.default(admission, _this21, numberOfInputs);
      });
    }
  }, {
    key: "createDynamicsCompressor",
    value: function createDynamicsCompressor() {
      var _this22 = this;

      return immigration.apply(function (admission) {
        return new _DynamicsCompressorNode2.default(admission, _this22);
      });
    }
  }, {
    key: "createOscillator",
    value: function createOscillator() {
      var _this23 = this;

      return immigration.apply(function (admission) {
        return new _OscillatorNode2.default(admission, _this23);
      });
    }
  }, {
    key: "createPeriodicWave",
    value: function createPeriodicWave(real, imag) {
      var _this24 = this;

      return immigration.apply(function (admission) {
        return new _PeriodicWave2.default(admission, _this24, real, imag);
      });
    }
  }, {
    key: "__transitionToState",
    value: function __transitionToState(methodName, callback) {
      var _this25 = this;

      return new Promise(function (resolve) {
        if (_this25._.state === "close") {
          throw new TypeError("Cannot " + methodName + " a context that is being closed or has already been closed.");
        }
        callback();
        resolve();
      });
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return this.destination.toJSON([]);
    }
  }, {
    key: "$process",
    value: function $process(when) {
      this.__process((0, _toMicroseconds2.default)(when));
    }
  }, {
    key: "$processTo",
    value: function $processTo(when) {
      var time = (0, _toMicroseconds2.default)(when);

      if (this._.microCurrentTime < time) {
        this.__process(time - this._.microCurrentTime);
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
    key: "__process",
    value: function __process(microseconds) {
      var nextMicroCurrentTime = this._.microCurrentTime + microseconds;

      while (this._.state === "running" && this._.microCurrentTime < nextMicroCurrentTime) {
        var microCurrentTime = Math.min(this._.microCurrentTime + 1000, nextMicroCurrentTime);
        var processedSamples = Math.floor(microCurrentTime / (1000 * 1000) * this.sampleRate);
        var inNumSamples = processedSamples - this._.processedSamples;

        this._.microCurrentTime = microCurrentTime;
        this._.processedSamples = processedSamples;

        this.destination.$process(inNumSamples, ++this._.tick);
      }
    }
  }, {
    key: "state",
    get: function get() {
      if (isEnabledState()) {
        return this._.state;
      }
    },
    set: function set(value) {
      if (!isEnabledState(value)) {
        return;
      }
      throw new TypeError(this.constructor.name + "; Attempt to assign to readonly property: \"state\"");
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
      return (0, _getAPIVersion2.default)();
    }
  }]);

  return AudioContext;
})(_EventTarget3.default), (_desc = _dec(_class.prototype, "destination", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "destination")) || _desc, _desc ? Object.defineProperty(_class.prototype, "destination", _desc) : void 0, _desc = _dec2(_class.prototype, "sampleRate", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "sampleRate")) || _desc, _desc ? Object.defineProperty(_class.prototype, "sampleRate", _desc) : void 0, _desc = _dec3(_class.prototype, "currentTime", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "currentTime")) || _desc, _desc ? Object.defineProperty(_class.prototype, "currentTime", _desc) : void 0, _desc = _dec4(_class.prototype, "listener", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "listener")) || _desc, _desc ? Object.defineProperty(_class.prototype, "listener", _desc) : void 0, _desc = _dec5(_class.prototype, "onstatechange", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "onstatechange")) || _desc, _desc ? Object.defineProperty(_class.prototype, "onstatechange", _desc) : void 0, _desc = _dec6(_class.prototype, "suspend", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "suspend")) || _desc, _desc ? Object.defineProperty(_class.prototype, "suspend", _desc) : void 0, _desc = _dec7(_class.prototype, "resume", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "resume")) || _desc, _desc ? Object.defineProperty(_class.prototype, "resume", _desc) : void 0, _desc = _dec8(_class.prototype, "close", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "close")) || _desc, _desc ? Object.defineProperty(_class.prototype, "close", _desc) : void 0, _desc = _dec9(_class.prototype, "createBuffer", _desc = _dec10(_class.prototype, "createBuffer", _desc = _dec11(_class.prototype, "createBuffer", _desc = _dec12(_class.prototype, "createBuffer", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "createBuffer")) || _desc) || _desc) || _desc) || _desc, _desc ? Object.defineProperty(_class.prototype, "createBuffer", _desc) : void 0, _desc = _dec13(_class.prototype, "decodeAudioData", _desc = _dec14(_class.prototype, "decodeAudioData", _desc = _dec15(_class.prototype, "decodeAudioData", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "decodeAudioData")) || _desc) || _desc) || _desc, _desc ? Object.defineProperty(_class.prototype, "decodeAudioData", _desc) : void 0, _desc = _dec16(_class.prototype, "createBufferSource", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "createBufferSource")) || _desc, _desc ? Object.defineProperty(_class.prototype, "createBufferSource", _desc) : void 0, _desc = _dec17(_class.prototype, "createMediaElementSource", _desc = _dec18(_class.prototype, "createMediaElementSource", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "createMediaElementSource")) || _desc) || _desc, _desc ? Object.defineProperty(_class.prototype, "createMediaElementSource", _desc) : void 0, _desc = _dec19(_class.prototype, "createMediaStreamSource", _desc = _dec20(_class.prototype, "createMediaStreamSource", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "createMediaStreamSource")) || _desc) || _desc, _desc ? Object.defineProperty(_class.prototype, "createMediaStreamSource", _desc) : void 0, _desc = _dec21(_class.prototype, "createMediaStreamDestination", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "createMediaStreamDestination")) || _desc, _desc ? Object.defineProperty(_class.prototype, "createMediaStreamDestination", _desc) : void 0, _desc = _dec22(_class.prototype, "createAudioWorker", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "createAudioWorker")) || _desc, _desc ? Object.defineProperty(_class.prototype, "createAudioWorker", _desc) : void 0, _desc = _dec23(_class.prototype, "createScriptProcessor", _desc = _dec24(_class.prototype, "createScriptProcessor", _desc = _dec25(_class.prototype, "createScriptProcessor", _desc = _dec26(_class.prototype, "createScriptProcessor", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "createScriptProcessor")) || _desc) || _desc) || _desc) || _desc, _desc ? Object.defineProperty(_class.prototype, "createScriptProcessor", _desc) : void 0, _desc = _dec27(_class.prototype, "createAnalyser", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "createAnalyser")) || _desc, _desc ? Object.defineProperty(_class.prototype, "createAnalyser", _desc) : void 0, _desc = _dec28(_class.prototype, "createGain", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "createGain")) || _desc, _desc ? Object.defineProperty(_class.prototype, "createGain", _desc) : void 0, _desc = _dec29(_class.prototype, "createDelay", _desc = _dec30(_class.prototype, "createDelay", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "createDelay")) || _desc) || _desc, _desc ? Object.defineProperty(_class.prototype, "createDelay", _desc) : void 0, _desc = _dec31(_class.prototype, "createBiquadFilter", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "createBiquadFilter")) || _desc, _desc ? Object.defineProperty(_class.prototype, "createBiquadFilter", _desc) : void 0, _desc = _dec32(_class.prototype, "createWaveShaper", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "createWaveShaper")) || _desc, _desc ? Object.defineProperty(_class.prototype, "createWaveShaper", _desc) : void 0, _desc = _dec33(_class.prototype, "createPanner", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "createPanner")) || _desc, _desc ? Object.defineProperty(_class.prototype, "createPanner", _desc) : void 0, _desc = _dec34(_class.prototype, "createStereoPanner", _desc = _dec35(_class.prototype, "createStereoPanner", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "createStereoPanner")) || _desc) || _desc, _desc ? Object.defineProperty(_class.prototype, "createStereoPanner", _desc) : void 0, _desc = _dec36(_class.prototype, "createConvolver", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "createConvolver")) || _desc, _desc ? Object.defineProperty(_class.prototype, "createConvolver", _desc) : void 0, _desc = _dec37(_class.prototype, "createChannelSplitter", _desc = _dec38(_class.prototype, "createChannelSplitter", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "createChannelSplitter")) || _desc) || _desc, _desc ? Object.defineProperty(_class.prototype, "createChannelSplitter", _desc) : void 0, _desc = _dec39(_class.prototype, "createChannelMerger", _desc = _dec40(_class.prototype, "createChannelMerger", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "createChannelMerger")) || _desc) || _desc, _desc ? Object.defineProperty(_class.prototype, "createChannelMerger", _desc) : void 0, _desc = _dec41(_class.prototype, "createDynamicsCompressor", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "createDynamicsCompressor")) || _desc, _desc ? Object.defineProperty(_class.prototype, "createDynamicsCompressor", _desc) : void 0, _desc = _dec42(_class.prototype, "createOscillator", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "createOscillator")) || _desc, _desc ? Object.defineProperty(_class.prototype, "createOscillator", _desc) : void 0, _desc = _dec43(_class.prototype, "createPeriodicWave", _desc = _dec44(_class.prototype, "createPeriodicWave", _desc = _dec45(_class.prototype, "createPeriodicWave", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "createPeriodicWave")) || _desc) || _desc) || _desc, _desc ? Object.defineProperty(_class.prototype, "createPeriodicWave", _desc) : void 0, _desc = _dec46(_class.prototype, "__transitionToState", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "__transitionToState")) || _desc, _desc ? Object.defineProperty(_class.prototype, "__transitionToState", _desc) : void 0), _class));
exports.default = AudioContext;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./AnalyserNode":2,"./AudioBuffer":3,"./AudioBufferSourceNode":4,"./AudioDestinationNode":6,"./AudioListener":7,"./BiquadFilterNode":11,"./ChannelMergerNode":12,"./ChannelSplitterNode":13,"./ConvolverNode":14,"./DelayNode":15,"./DynamicsCompressorNode":16,"./GainNode":17,"./MediaElementAudioSourceNode":18,"./MediaStreamAudioDestinationNode":19,"./MediaStreamAudioSourceNode":20,"./OscillatorNode":23,"./PannerNode":24,"./PeriodicWave":25,"./ScriptProcessorNode":26,"./StereoPannerNode":27,"./WaveShaperNode":28,"./decorators/methods":32,"./decorators/props":33,"./dom/Event":35,"./dom/EventTarget":36,"./dom/HTMLMediaElement":38,"./dom/MediaStream":39,"./utils/Configuration":41,"./utils/Immigration":42,"./utils/defaults":46,"./utils/getAPIVersion":48,"./utils/toMicroseconds":52,"./validators":56}],6:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _dec, _desc, _value, _class, _class2, _temp;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _AudioNode2 = require("./AudioNode");

var _AudioNode3 = _interopRequireDefault(_AudioNode2);

var _props = require("./decorators/props");

var props = _interopRequireWildcard(_props);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AudioDestinationNode = (_dec = props.readonly(2), (_class = (_temp = _class2 = (function (_AudioNode) {
  _inherits(AudioDestinationNode, _AudioNode);

  function AudioDestinationNode(admission, context) {
    _classCallCheck(this, AudioDestinationNode);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(AudioDestinationNode).call(this, admission, {
      name: "AudioDestinationNode",
      context: context,
      numberOfInputs: 1,
      numberOfOutputs: 0,
      channelCount: 2,
      channelCountMode: "explicit",
      channelInterpretation: "speakers"
    }));
  }

  _createClass(AudioDestinationNode, [{
    key: "maxChannelCount",
    value: function maxChannelCount() {}
  }]);

  return AudioDestinationNode;
})(_AudioNode3.default), _class2.$JSONKeys = [], _temp), (_desc = _dec(_class.prototype, "maxChannelCount", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "maxChannelCount")) || _desc, _desc ? Object.defineProperty(_class.prototype, "maxChannelCount", _desc) : void 0), _class));
exports.default = AudioDestinationNode;
},{"./AudioNode":8,"./decorators/props":33}],7:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _desc, _value, _class;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _Immigration = require("./utils/Immigration");

var _Immigration2 = _interopRequireDefault(_Immigration);

var _props = require("./decorators/props");

var props = _interopRequireWildcard(_props);

var _methods = require("./decorators/methods");

var methods = _interopRequireWildcard(_methods);

var _validators = require("./validators");

var validators = _interopRequireWildcard(_validators);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var immigration = _Immigration2.default.getInstance();

var AudioListener = (_dec = props.typed(validators.isNumber, 1), _dec2 = props.typed(validators.isNumber, 343.3), _dec3 = methods.param("x", validators.isNumber), _dec4 = methods.param("y", validators.isNumber), _dec5 = methods.param("z", validators.isNumber), _dec6 = methods.param("x", validators.isNumber), _dec7 = methods.param("y", validators.isNumber), _dec8 = methods.param("z", validators.isNumber), _dec9 = methods.param("xUp", validators.isNumber), _dec10 = methods.param("yUp", validators.isNumber), _dec11 = methods.param("zUp", validators.isNumber), _dec12 = methods.param("x", validators.isNumber), _dec13 = methods.param("y", validators.isNumber), _dec14 = methods.param("z", validators.isNumber), (_class = (function () {
  function AudioListener(admission, context) {
    _classCallCheck(this, AudioListener);

    immigration.check(admission, function () {
      throw new TypeError("Illegal constructor");
    });
    Object.defineProperty(this, "_", { value: {} });

    this._.context = context;
  }

  _createClass(AudioListener, [{
    key: "dopplerFactor",
    value: function dopplerFactor() {}
  }, {
    key: "speedOfSound",
    value: function speedOfSound() {}
  }, {
    key: "setPosition",
    value: function setPosition() {}
  }, {
    key: "setOrientation",
    value: function setOrientation() {}
  }, {
    key: "setVelocity",
    value: function setVelocity() {}
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
})(), (_desc = _dec(_class.prototype, "dopplerFactor", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "dopplerFactor")) || _desc, _desc ? Object.defineProperty(_class.prototype, "dopplerFactor", _desc) : void 0, _desc = _dec2(_class.prototype, "speedOfSound", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "speedOfSound")) || _desc, _desc ? Object.defineProperty(_class.prototype, "speedOfSound", _desc) : void 0, _desc = _dec3(_class.prototype, "setPosition", _desc = _dec4(_class.prototype, "setPosition", _desc = _dec5(_class.prototype, "setPosition", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "setPosition")) || _desc) || _desc) || _desc, _desc ? Object.defineProperty(_class.prototype, "setPosition", _desc) : void 0, _desc = _dec6(_class.prototype, "setOrientation", _desc = _dec7(_class.prototype, "setOrientation", _desc = _dec8(_class.prototype, "setOrientation", _desc = _dec9(_class.prototype, "setOrientation", _desc = _dec10(_class.prototype, "setOrientation", _desc = _dec11(_class.prototype, "setOrientation", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "setOrientation")) || _desc) || _desc) || _desc) || _desc) || _desc) || _desc, _desc ? Object.defineProperty(_class.prototype, "setOrientation", _desc) : void 0, _desc = _dec12(_class.prototype, "setVelocity", _desc = _dec13(_class.prototype, "setVelocity", _desc = _dec14(_class.prototype, "setVelocity", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "setVelocity")) || _desc) || _desc) || _desc, _desc ? Object.defineProperty(_class.prototype, "setVelocity", _desc) : void 0), _class));
exports.default = AudioListener;
},{"./decorators/methods":32,"./decorators/props":33,"./utils/Immigration":42,"./validators":56}],8:[function(require,module,exports){
(function (global){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _desc, _value, _class, _class2, _temp;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _Configuration = require("./utils/Configuration");

var _Configuration2 = _interopRequireDefault(_Configuration);

var _Immigration = require("./utils/Immigration");

var _Immigration2 = _interopRequireDefault(_Immigration);

var _Junction = require("./utils/Junction");

var _Junction2 = _interopRequireDefault(_Junction);

var _EventTarget2 = require("./dom/EventTarget");

var _EventTarget3 = _interopRequireDefault(_EventTarget2);

var _defaults = require("./utils/defaults");

var _defaults2 = _interopRequireDefault(_defaults);

var _toJSON2 = require("./utils/toJSON");

var _toJSON3 = _interopRequireDefault(_toJSON2);

var _toNodeName = require("./utils/toNodeName");

var _toNodeName2 = _interopRequireDefault(_toNodeName);

var _props = require("./decorators/props");

var props = _interopRequireWildcard(_props);

var _methods = require("./decorators/methods");

var methods = _interopRequireWildcard(_methods);

var _validators = require("./validators");

var validators = _interopRequireWildcard(_validators);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var configuration = _Configuration2.default.getInstance();
var immigration = _Immigration2.default.getInstance();

var AudioNode = (_dec = methods.contract({
  precondition: function precondition() {
    if (this._.context.state === "closed") {
      throw new TypeError("AudioContext has been closed");
    }
  }
}), _dec2 = props.readonly(), _dec3 = props.readonly(), _dec4 = props.readonly(), _dec5 = props.typed(validators.isPositiveInteger, 2), _dec6 = props.enums(["max", "clamped-max", "explicit"]), _dec7 = props.enums(["speakers", "discrete"]), _dec8 = methods.param("destination", validators.isAudioSource), _dec9 = methods.param("[ output ]", validators.isPositiveInteger), _dec10 = methods.param("[ input ]", validators.isPositiveInteger), _dec11 = methods.contract({
  precondition: function precondition(destination) {
    var output = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
    var input = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

    if (this.$context !== destination.$context) {
      throw new TypeError("Cannot connect to a destination belonging to a different AudioContext.");
    }
    if (this.numberOfOutputs <= output) {
      throw new TypeError("The {{output}} index (" + output + ") exceeds number of outputs (" + this.numberOfOutputs + ").");
    }
    if ((destination.numberOfInputs || 1) <= input) {
      throw new TypeError("The {{input}} index (" + input + ") exceeds number of inputs (" + destination.numberOfInputs + ").");
    }
  }
}), _dec12 = methods.param("output", validators.isPositiveInteger), _dec13 = methods.contract({
  precondition: function precondition(output) {
    if (this.numberOfOutputs <= output) {
      throw new TypeError("The {{output}} index (" + output + ") exceeds number of outputs (" + this.numberOfOutputs + ").");
    }
  }
}), _dec14 = methods.param("destination", validators.isAudioSource), _dec15 = methods.contract({
  precondition: function precondition(destination) {
    if (!this._.outputs.some(function (junction) {
      return junction.isConnected(destination);
    })) {
      throw new TypeError("The given {{destination}} is not connected.");
    }
  }
}), _dec16 = methods.param("destination", validators.isAudioSource), _dec17 = methods.param("output", validators.isPositiveInteger), _dec18 = methods.contract({
  precondition: function precondition(destination, output) {
    if (!this._.outputs.some(function (junction) {
      return junction.isConnected(destination);
    })) {
      throw new TypeError("The given {{destination}} is not connected.");
    }
    if (this.numberOfOutputs <= output) {
      throw new TypeError("The {{output}} provided (" + output + ") is outside the range [0, " + this.numberOfOutputs + ").");
    }
  }
}), _dec19 = methods.param("destination", validators.isAudioSource), _dec20 = methods.param("output", validators.isPositiveInteger), _dec21 = methods.param("input", validators.isPositiveInteger), _dec22 = methods.contract({
  precondition: function precondition(destination, output, input) {
    if (!this._.outputs.some(function (junction) {
      return junction.isConnected(destination);
    })) {
      throw new TypeError("The given {{destination}} is not connected.");
    }
    if (output < 0 || this.numberOfOutputs <= output) {
      throw new TypeError("The {{output}} provided (" + output + ") is outside the range [0, " + this.numberOfOutputs + ").");
    }
    if (input < 0 || destination.numberOfInputs <= input) {
      throw new TypeError("The {{input}} provided (" + input + ") is outside the range [0, " + this.numberOfInputs + ").");
    }
  }
}), (_class = (_temp = _class2 = (function (_EventTarget) {
  _inherits(AudioNode, _EventTarget);

  function AudioNode(admission, spec) {
    _classCallCheck(this, AudioNode);

    immigration.check(admission, function () {
      throw new TypeError("Illegal constructor");
    });

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AudioNode).call(this));

    Object.defineProperty(_this, "_", { value: {} });

    _this._.context = spec.context;
    _this.__createAudioNode(spec);
    return _this;
  }

  _createClass(AudioNode, [{
    key: "__createAudioNode",
    value: function __createAudioNode(spec) {
      var _this2 = this;

      this._.name = (0, _defaults2.default)(spec.name, "AudioNode");
      this._.numberOfInputs = (0, _defaults2.default)(spec.numberOfInputs, 1);
      this._.numberOfOutputs = (0, _defaults2.default)(spec.numberOfOutputs, 1);
      this._.channelCount = (0, _defaults2.default)(spec.channelCount, 2);
      this._.channelCountMode = (0, _defaults2.default)(spec.channelCountMode, "max");
      this._.channelInterpretation = (0, _defaults2.default)(spec.channelInterpretation, "speakers");
      this._.inputs = new Array(this._.numberOfInputs).fill().map(function (i) {
        return new _Junction2.default(_this2, i);
      });
      this._.outputs = new Array(this._.numberOfOutputs).fill().map(function (i) {
        return new _Junction2.default(_this2, i);
      });
      this._.tick = -1;
    }
  }, {
    key: "context",
    value: function context() {
      return this._.context;
    }
  }, {
    key: "numberOfInputs",
    value: function numberOfInputs() {
      return this._.numberOfInputs;
    }
  }, {
    key: "numberOfOutputs",
    value: function numberOfOutputs() {
      return this._.numberOfOutputs;
    }
  }, {
    key: "channelCount",
    value: function channelCount() {}
  }, {
    key: "channelCountMode",
    value: function channelCountMode() {}
  }, {
    key: "channelInterpretation",
    value: function channelInterpretation() {}
  }, {
    key: "connect",
    value: function connect(destination) {
      var output = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
      var input = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

      this._.outputs[output].connect(destination.$inputs[input]);
    }
  }, {
    key: "disconnect",
    value: function disconnect(destination, output, input) {
      if (configuration.getState("AudioNode#disconnect") !== "selective") {
        return this.__disconnect$$Channel((0, _defaults2.default)(destination, 0));
      }

      switch (arguments.length) {
        case 0:
          return this.__disconnect$$All();
        case 1:
          if (typeof destination === "number") {
            return this.__disconnect$$Channel(destination);
          }
          return this.__disconnect$$Selective1(destination);
        case 2:
          return this.__disconnect$$Selective2(destination, output);
        case 3:
          return this.__disconnect$$Selective3(destination, output, input);
        default:
        // no default
      }
    }
  }, {
    key: "__disconnect$$All",
    value: function __disconnect$$All() {
      this._.outputs.forEach(function (junction) {
        junction.disconnectAll();
      });
    }
  }, {
    key: "__disconnect$$Channel",
    value: function __disconnect$$Channel(output) {
      this._.outputs[output].disconnectAll();
    }
  }, {
    key: "__disconnect$$Selective1",
    value: function __disconnect$$Selective1(destination) {
      this._.outputs.forEach(function (junction) {
        junction.disconnectNode(destination);
      });
    }
  }, {
    key: "__disconnect$$Selective2",
    value: function __disconnect$$Selective2(destination, output) {
      this._.outputs[output].disconnectNode(destination);
    }
  }, {
    key: "__disconnect$$Selective3",
    value: function __disconnect$$Selective3(destination, output, input) {
      this._.outputs[output].disconnectChannel(destination, input);
    }
  }, {
    key: "toJSON",
    value: function toJSON(memo) {
      function __toJSON(obj, memo) {
        if (obj && typeof obj.toJSON === "function") {
          return obj.toJSON(memo);
        }
        return obj;
      }

      return (0, _toJSON3.default)(this, function (node, memo) {
        var json = {};

        json.name = (0, _toNodeName2.default)(node);

        node.constructor.$JSONKeys.forEach(function (key) {
          json[key] = __toJSON(node[key], memo);
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
        if (this.__process) {
          this.__process(inNumSamples);
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
})(_EventTarget3.default), _class2.$JSONKeys = [], _temp), (_desc = _dec(_class.prototype, "__createAudioNode", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "__createAudioNode")) || _desc, _desc ? Object.defineProperty(_class.prototype, "__createAudioNode", _desc) : void 0, _desc = _dec2(_class.prototype, "context", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "context")) || _desc, _desc ? Object.defineProperty(_class.prototype, "context", _desc) : void 0, _desc = _dec3(_class.prototype, "numberOfInputs", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "numberOfInputs")) || _desc, _desc ? Object.defineProperty(_class.prototype, "numberOfInputs", _desc) : void 0, _desc = _dec4(_class.prototype, "numberOfOutputs", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "numberOfOutputs")) || _desc, _desc ? Object.defineProperty(_class.prototype, "numberOfOutputs", _desc) : void 0, _desc = _dec5(_class.prototype, "channelCount", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "channelCount")) || _desc, _desc ? Object.defineProperty(_class.prototype, "channelCount", _desc) : void 0, _desc = _dec6(_class.prototype, "channelCountMode", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "channelCountMode")) || _desc, _desc ? Object.defineProperty(_class.prototype, "channelCountMode", _desc) : void 0, _desc = _dec7(_class.prototype, "channelInterpretation", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "channelInterpretation")) || _desc, _desc ? Object.defineProperty(_class.prototype, "channelInterpretation", _desc) : void 0, _desc = _dec8(_class.prototype, "connect", _desc = _dec9(_class.prototype, "connect", _desc = _dec10(_class.prototype, "connect", _desc = _dec11(_class.prototype, "connect", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "connect")) || _desc) || _desc) || _desc) || _desc, _desc ? Object.defineProperty(_class.prototype, "connect", _desc) : void 0, _desc = _dec12(_class.prototype, "__disconnect$$Channel", _desc = _dec13(_class.prototype, "__disconnect$$Channel", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "__disconnect$$Channel")) || _desc) || _desc, _desc ? Object.defineProperty(_class.prototype, "__disconnect$$Channel", _desc) : void 0, _desc = _dec14(_class.prototype, "__disconnect$$Selective1", _desc = _dec15(_class.prototype, "__disconnect$$Selective1", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "__disconnect$$Selective1")) || _desc) || _desc, _desc ? Object.defineProperty(_class.prototype, "__disconnect$$Selective1", _desc) : void 0, _desc = _dec16(_class.prototype, "__disconnect$$Selective2", _desc = _dec17(_class.prototype, "__disconnect$$Selective2", _desc = _dec18(_class.prototype, "__disconnect$$Selective2", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "__disconnect$$Selective2")) || _desc) || _desc) || _desc, _desc ? Object.defineProperty(_class.prototype, "__disconnect$$Selective2", _desc) : void 0, _desc = _dec19(_class.prototype, "__disconnect$$Selective3", _desc = _dec20(_class.prototype, "__disconnect$$Selective3", _desc = _dec21(_class.prototype, "__disconnect$$Selective3", _desc = _dec22(_class.prototype, "__disconnect$$Selective3", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "__disconnect$$Selective3")) || _desc) || _desc) || _desc) || _desc, _desc ? Object.defineProperty(_class.prototype, "__disconnect$$Selective3", _desc) : void 0), _class));
exports.default = AudioNode;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./decorators/methods":32,"./decorators/props":33,"./dom/EventTarget":36,"./utils/Configuration":41,"./utils/Immigration":42,"./utils/Junction":43,"./utils/defaults":46,"./utils/toJSON":51,"./utils/toNodeName":53,"./validators":56}],9:[function(require,module,exports){
(function (global){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _desc, _value, _class;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _Immigration = require("./utils/Immigration");

var _Immigration2 = _interopRequireDefault(_Immigration);

var _Junction = require("./utils/Junction");

var _Junction2 = _interopRequireDefault(_Junction);

var _defaults = require("./utils/defaults");

var _defaults2 = _interopRequireDefault(_defaults);

var _toJSON2 = require("./utils/toJSON");

var _toJSON3 = _interopRequireDefault(_toJSON2);

var _toSeconds = require("./utils/toSeconds");

var _toSeconds2 = _interopRequireDefault(_toSeconds);

var _props = require("./decorators/props");

var props = _interopRequireWildcard(_props);

var _methods = require("./decorators/methods");

var methods = _interopRequireWildcard(_methods);

var _validators = require("./validators");

var validators = _interopRequireWildcard(_validators);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var immigration = _Immigration2.default.getInstance();

var AudioParam = (_dec = props.typed(validators.isNumber, 0), _dec2 = props.readonly(), _dec3 = props.readonly(), _dec4 = methods.param("value", validators.isNumber), _dec5 = methods.param("startTime", validators.isNumber), _dec6 = methods.param("value", validators.isNumber), _dec7 = methods.param("endTime", validators.isNumber), _dec8 = methods.param("value", validators.isNumber), _dec9 = methods.param("endTime", validators.isNumber), _dec10 = methods.param("value", validators.isNumber), _dec11 = methods.param("endTime", validators.isNumber), _dec12 = methods.param("timeConstant", validators.isNumber), _dec13 = methods.param("values", validators.isInstanceOf(Float32Array)), _dec14 = methods.param("startTime", validators.isNumber), _dec15 = methods.param("duration", validators.isNumber), _dec16 = methods.param("startTime", validators.isNumber), (_class = (function () {
  function AudioParam(admission, node, name, defaultValue) {
    _classCallCheck(this, AudioParam);

    immigration.check(admission, function () {
      throw new TypeError("Illegal constructor");
    });
    Object.defineProperty(this, "_", { value: {} });

    this._.value = defaultValue;
    this._.name = name;
    this._.defaultValue = defaultValue;
    this._.context = node.context;
    this._.node = node;
    this._.inputs = [new _Junction2.default(this, 0)];
    this._.events = [];
    this._.tick = -1;
  }

  _createClass(AudioParam, [{
    key: "name",
    value: function name() {
      return this._.name;
    }
  }, {
    key: "defaultValue",
    value: function defaultValue() {
      return this._.defaultValue;
    }
  }, {
    key: "setValueAtTime",
    value: function setValueAtTime(value, startTime) {
      this.__insertEvent({ type: "SetValue", value: value, time: startTime });
    }
  }, {
    key: "linearRampToValueAtTime",
    value: function linearRampToValueAtTime(value, endTime) {
      this.__insertEvent({ type: "LinearRampToValue", value: value, time: endTime });
    }
  }, {
    key: "exponentialRampToValueAtTime",
    value: function exponentialRampToValueAtTime(value, endTime) {
      this.__insertEvent({ type: "ExponentialRampToValue", value: value, time: endTime });
    }
  }, {
    key: "setTargetAtTime",
    value: function setTargetAtTime(target, startTime, timeConstant) {
      this.__insertEvent({ type: "SetTarget", value: target, time: startTime, timeConstant: timeConstant });
    }
  }, {
    key: "setValueCurveAtTime",
    value: function setValueCurveAtTime(values, startTime, duration) {
      this.__insertEvent({ type: "SetValueCurve", time: startTime, duration: duration, curve: values });
    }
  }, {
    key: "cancelScheduledValues",
    value: function cancelScheduledValues(startTime) {
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
      return (0, _toJSON3.default)(this, function (node, memo) {
        var json = {};

        json.value = node.value;
        json.inputs = node.$inputs[0].toJSON(memo);

        return json;
      }, memo);
    }
  }, {
    key: "$valueAtTime",
    value: function $valueAtTime(when) {
      var time = (0, _toSeconds2.default)(when);
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
          value = AudioParam.$linearRampToValueAtTime(value, e0.value, e1.value, t0, e0.time, e1.time);
        } else if (e1 && e1.type === "ExponentialRampToValue") {
          value = AudioParam.$exponentialRampToValueAtTime(value, e0.value, e1.value, t0, e0.time, e1.time);
        } else {
          switch (e0.type) {
            case "SetValue":
            case "LinearRampToValue":
            case "ExponentialRampToValue":
              value = e0.value;
              break;
            case "SetTarget":
              value = AudioParam.$setTargetAtTime(value, e0.value, t0, e0.time, e0.timeConstant);
              break;
            case "SetValueCurve":
              value = AudioParam.$setValueCurveAtTime(value, t0, e0.time, e0.time + e0.duration, e0.curve);
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
    key: "__insertEvent",
    value: function __insertEvent(event) {
      var time = event.time;
      var events = this.$events;
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
  }, {
    key: "value",
    get: function get() {
      this._.value = this.$valueAtTime(this.$context.currentTime);
      return this._.value;
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
  }], [{
    key: "$linearRampToValueAtTime",
    value: function $linearRampToValueAtTime(v, v0, v1, t, t0, t1) {
      if (t <= t0) {
        return v0;
      }
      if (t1 <= t) {
        return v1;
      }
      var dt = (t - t0) / (t1 - t0);

      return (1 - dt) * v0 + dt * v1;
    }
  }, {
    key: "$exponentialRampToValueAtTime",
    value: function $exponentialRampToValueAtTime(v, v0, v1, t, t0, t1) {
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
  }, {
    key: "$setTargetAtTime",
    value: function $setTargetAtTime(v0, v1, t, t0, tau) {
      if (t <= t0) {
        return v0;
      }
      return v1 + (v0 - v1) * Math.exp((t0 - t) / tau);
    }
  }, {
    key: "$setValueCurveAtTime",
    value: function $setValueCurveAtTime(v, t, t0, t1, curve) {
      var dt = (t - t0) / (t1 - t0);

      if (dt <= 0) {
        return (0, _defaults2.default)(curve[0], v);
      }

      if (1 <= dt) {
        return (0, _defaults2.default)(curve[curve.length - 1], v);
      }

      return (0, _defaults2.default)(curve[curve.length * dt | 0], v);
    }
  }]);

  return AudioParam;
})(), (_desc = _dec(_class.prototype, "value", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "value")) || _desc, _desc ? Object.defineProperty(_class.prototype, "value", _desc) : void 0, _desc = _dec2(_class.prototype, "name", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "name")) || _desc, _desc ? Object.defineProperty(_class.prototype, "name", _desc) : void 0, _desc = _dec3(_class.prototype, "defaultValue", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "defaultValue")) || _desc, _desc ? Object.defineProperty(_class.prototype, "defaultValue", _desc) : void 0, _desc = _dec4(_class.prototype, "setValueAtTime", _desc = _dec5(_class.prototype, "setValueAtTime", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "setValueAtTime")) || _desc) || _desc, _desc ? Object.defineProperty(_class.prototype, "setValueAtTime", _desc) : void 0, _desc = _dec6(_class.prototype, "linearRampToValueAtTime", _desc = _dec7(_class.prototype, "linearRampToValueAtTime", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "linearRampToValueAtTime")) || _desc) || _desc, _desc ? Object.defineProperty(_class.prototype, "linearRampToValueAtTime", _desc) : void 0, _desc = _dec8(_class.prototype, "exponentialRampToValueAtTime", _desc = _dec9(_class.prototype, "exponentialRampToValueAtTime", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "exponentialRampToValueAtTime")) || _desc) || _desc, _desc ? Object.defineProperty(_class.prototype, "exponentialRampToValueAtTime", _desc) : void 0, _desc = _dec10(_class.prototype, "setTargetAtTime", _desc = _dec11(_class.prototype, "setTargetAtTime", _desc = _dec12(_class.prototype, "setTargetAtTime", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "setTargetAtTime")) || _desc) || _desc) || _desc, _desc ? Object.defineProperty(_class.prototype, "setTargetAtTime", _desc) : void 0, _desc = _dec13(_class.prototype, "setValueCurveAtTime", _desc = _dec14(_class.prototype, "setValueCurveAtTime", _desc = _dec15(_class.prototype, "setValueCurveAtTime", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "setValueCurveAtTime")) || _desc) || _desc) || _desc, _desc ? Object.defineProperty(_class.prototype, "setValueCurveAtTime", _desc) : void 0, _desc = _dec16(_class.prototype, "cancelScheduledValues", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "cancelScheduledValues")) || _desc, _desc ? Object.defineProperty(_class.prototype, "cancelScheduledValues", _desc) : void 0), _class));
exports.default = AudioParam;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./decorators/methods":32,"./decorators/props":33,"./utils/Immigration":42,"./utils/Junction":43,"./utils/defaults":46,"./utils/toJSON":51,"./utils/toSeconds":55,"./validators":56}],10:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _Immigration = require("./utils/Immigration");

var _Immigration2 = _interopRequireDefault(_Immigration);

var _Event2 = require("./dom/Event");

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

    immigration.check(admission, function () {
      throw new TypeError("Illegal constructor");
    });

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AudioProcessingEvent).call(this, "audioprocess", node));

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
},{"./dom/Event":35,"./utils/Immigration":42}],11:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _desc, _value, _class, _class2, _temp;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _AudioNode2 = require("./AudioNode");

var _AudioNode3 = _interopRequireDefault(_AudioNode2);

var _props = require("./decorators/props");

var props = _interopRequireWildcard(_props);

var _methods = require("./decorators/methods");

var methods = _interopRequireWildcard(_methods);

var _validators = require("./validators");

var validators = _interopRequireWildcard(_validators);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BiquadFilterNode = (_dec = props.enums(["lowpass", "highpass", "bandpass", "lowshelf", "highshelf", "peaking", "notch", "allpass"]), _dec2 = props.audioparam(350), _dec3 = props.audioparam(0), _dec4 = props.audioparam(1), _dec5 = props.audioparam(0), _dec6 = methods.param("frequencyHz", validators.isInstanceOf(Float32Array)), _dec7 = methods.param("magResponse", validators.isInstanceOf(Float32Array)), _dec8 = methods.param("phaseResponse", validators.isInstanceOf(Float32Array)), (_class = (_temp = _class2 = (function (_AudioNode) {
  _inherits(BiquadFilterNode, _AudioNode);

  function BiquadFilterNode(admission, context) {
    _classCallCheck(this, BiquadFilterNode);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(BiquadFilterNode).call(this, admission, {
      name: "BiquadFilterNode",
      context: context,
      numberOfInputs: 1,
      numberOfOutputs: 1,
      channelCount: 2,
      channelCountMode: "max",
      channelInterpretation: "speakers"
    }));
  }

  _createClass(BiquadFilterNode, [{
    key: "type",
    value: function type() {}
  }, {
    key: "frequency",
    value: function frequency() {}
  }, {
    key: "detune",
    value: function detune() {}
  }, {
    key: "Q",
    value: function Q() {}
  }, {
    key: "gain",
    value: function gain() {}
  }, {
    key: "getFrequencyResponse",
    value: function getFrequencyResponse() {}
  }]);

  return BiquadFilterNode;
})(_AudioNode3.default), _class2.$JSONKeys = ["type", "frequency", "detune", "Q", "gain"], _temp), (_desc = _dec(_class.prototype, "type", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "type")) || _desc, _desc ? Object.defineProperty(_class.prototype, "type", _desc) : void 0, _desc = _dec2(_class.prototype, "frequency", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "frequency")) || _desc, _desc ? Object.defineProperty(_class.prototype, "frequency", _desc) : void 0, _desc = _dec3(_class.prototype, "detune", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "detune")) || _desc, _desc ? Object.defineProperty(_class.prototype, "detune", _desc) : void 0, _desc = _dec4(_class.prototype, "Q", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "Q")) || _desc, _desc ? Object.defineProperty(_class.prototype, "Q", _desc) : void 0, _desc = _dec5(_class.prototype, "gain", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "gain")) || _desc, _desc ? Object.defineProperty(_class.prototype, "gain", _desc) : void 0, _desc = _dec6(_class.prototype, "getFrequencyResponse", _desc = _dec7(_class.prototype, "getFrequencyResponse", _desc = _dec8(_class.prototype, "getFrequencyResponse", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "getFrequencyResponse")) || _desc) || _desc) || _desc, _desc ? Object.defineProperty(_class.prototype, "getFrequencyResponse", _desc) : void 0), _class));
exports.default = BiquadFilterNode;
},{"./AudioNode":8,"./decorators/methods":32,"./decorators/props":33,"./validators":56}],12:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _dec, _desc, _value, _class, _class2, _temp;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _AudioNode2 = require("./AudioNode");

var _AudioNode3 = _interopRequireDefault(_AudioNode2);

var _methods = require("./decorators/methods");

var methods = _interopRequireWildcard(_methods);

var _validators = require("./validators");

var validators = _interopRequireWildcard(_validators);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChannelMergerNode = (_dec = methods.param("numberOfInputs", validators.isPositiveInteger), (_class = (_temp = _class2 = (function (_AudioNode) {
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

    _this.__createChannelMerger(numberOfInputs);
    return _this;
  }

  _createClass(ChannelMergerNode, [{
    key: "__createChannelMerger",
    value: function __createChannelMerger() {}
  }]);

  return ChannelMergerNode;
})(_AudioNode3.default), _class2.$JSONKeys = [], _temp), (_desc = _dec(_class.prototype, "__createChannelMerger", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "__createChannelMerger")) || _desc, _desc ? Object.defineProperty(_class.prototype, "__createChannelMerger", _desc) : void 0), _class));
exports.default = ChannelMergerNode;
},{"./AudioNode":8,"./decorators/methods":32,"./validators":56}],13:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _dec, _desc, _value, _class, _class2, _temp;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _AudioNode2 = require("./AudioNode");

var _AudioNode3 = _interopRequireDefault(_AudioNode2);

var _methods = require("./decorators/methods");

var methods = _interopRequireWildcard(_methods);

var _validators = require("./validators");

var validators = _interopRequireWildcard(_validators);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChannelSplitterNode = (_dec = methods.param("numberOfOutputs", validators.isPositiveInteger), (_class = (_temp = _class2 = (function (_AudioNode) {
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

    _this.__createChannelSplitter(numberOfOutputs);
    return _this;
  }

  _createClass(ChannelSplitterNode, [{
    key: "__createChannelSplitter",
    value: function __createChannelSplitter() {}
  }]);

  return ChannelSplitterNode;
})(_AudioNode3.default), _class2.$JSONKeys = [], _temp), (_desc = _dec(_class.prototype, "__createChannelSplitter", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "__createChannelSplitter")) || _desc, _desc ? Object.defineProperty(_class.prototype, "__createChannelSplitter", _desc) : void 0), _class));
exports.default = ChannelSplitterNode;
},{"./AudioNode":8,"./decorators/methods":32,"./validators":56}],14:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _dec, _dec2, _desc, _value, _class, _class2, _temp;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _AudioNode2 = require("./AudioNode");

var _AudioNode3 = _interopRequireDefault(_AudioNode2);

var _AudioBuffer = require("./AudioBuffer");

var _AudioBuffer2 = _interopRequireDefault(_AudioBuffer);

var _props = require("./decorators/props");

var props = _interopRequireWildcard(_props);

var _validators = require("./validators");

var validators = _interopRequireWildcard(_validators);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ConvolverNode = (_dec = props.typed(validators.isNullOrInstanceOf(_AudioBuffer2.default), null), _dec2 = props.typed(validators.isBoolean, true), (_class = (_temp = _class2 = (function (_AudioNode) {
  _inherits(ConvolverNode, _AudioNode);

  function ConvolverNode(admission, context) {
    _classCallCheck(this, ConvolverNode);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ConvolverNode).call(this, admission, {
      name: "ConvolverNode",
      context: context,
      numberOfInputs: 1,
      numberOfOutputs: 1,
      channelCount: 2,
      channelCountMode: "clamped-max",
      channelInterpretation: "speakers"
    }));
  }

  _createClass(ConvolverNode, [{
    key: "buffer",
    value: function buffer() {}
  }, {
    key: "normalize",
    value: function normalize() {}
  }]);

  return ConvolverNode;
})(_AudioNode3.default), _class2.$JSONKeys = ["normalize"], _temp), (_desc = _dec(_class.prototype, "buffer", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "buffer")) || _desc, _desc ? Object.defineProperty(_class.prototype, "buffer", _desc) : void 0, _desc = _dec2(_class.prototype, "normalize", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "normalize")) || _desc, _desc ? Object.defineProperty(_class.prototype, "normalize", _desc) : void 0), _class));
exports.default = ConvolverNode;
},{"./AudioBuffer":3,"./AudioNode":8,"./decorators/props":33,"./validators":56}],15:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _dec, _dec2, _desc, _value, _class, _class2, _temp;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _AudioNode2 = require("./AudioNode");

var _AudioNode3 = _interopRequireDefault(_AudioNode2);

var _props = require("./decorators/props");

var props = _interopRequireWildcard(_props);

var _methods = require("./decorators/methods");

var methods = _interopRequireWildcard(_methods);

var _validators = require("./validators");

var validators = _interopRequireWildcard(_validators);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DelayNode = (_dec = methods.param("maxDelayTime", validators.isPositiveNumber), _dec2 = props.audioparam(0), (_class = (_temp = _class2 = (function (_AudioNode) {
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

    _this.__createDelay(maxDelayTime);
    return _this;
  }

  _createClass(DelayNode, [{
    key: "__createDelay",
    value: function __createDelay(maxDelayTime) {
      this._.maxDelayTime = maxDelayTime;
    }
  }, {
    key: "delayTime",
    value: function delayTime() {}
  }, {
    key: "$maxDelayTime",
    get: function get() {
      return this._.maxDelayTime;
    }
  }]);

  return DelayNode;
})(_AudioNode3.default), _class2.$JSONKeys = ["delayTime"], _temp), (_desc = _dec(_class.prototype, "__createDelay", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "__createDelay")) || _desc, _desc ? Object.defineProperty(_class.prototype, "__createDelay", _desc) : void 0, _desc = _dec2(_class.prototype, "delayTime", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "delayTime")) || _desc, _desc ? Object.defineProperty(_class.prototype, "delayTime", _desc) : void 0), _class));
exports.default = DelayNode;
},{"./AudioNode":8,"./decorators/methods":32,"./decorators/props":33,"./validators":56}],16:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _desc, _value, _class, _class2, _temp;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _AudioNode2 = require("./AudioNode");

var _AudioNode3 = _interopRequireDefault(_AudioNode2);

var _props = require("./decorators/props");

var props = _interopRequireWildcard(_props);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DynamicsCompressorNode = (_dec = props.audioparam(-24), _dec2 = props.audioparam(30), _dec3 = props.audioparam(12), _dec4 = props.audioparam(0), _dec5 = props.audioparam(0.003), _dec6 = props.audioparam(0.25), (_class = (_temp = _class2 = (function (_AudioNode) {
  _inherits(DynamicsCompressorNode, _AudioNode);

  function DynamicsCompressorNode(admission, context) {
    _classCallCheck(this, DynamicsCompressorNode);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(DynamicsCompressorNode).call(this, admission, {
      name: "DynamicsCompressorNode",
      context: context,
      numberOfInputs: 1,
      numberOfOutputs: 1,
      channelCount: 2,
      channelCountMode: "explicit",
      channelInterpretation: "speakers"
    }));
  }

  _createClass(DynamicsCompressorNode, [{
    key: "threshold",
    value: function threshold() {}
  }, {
    key: "knee",
    value: function knee() {}
  }, {
    key: "ratio",
    value: function ratio() {}
  }, {
    key: "reduction",
    value: function reduction() {}
  }, {
    key: "attack",
    value: function attack() {}
  }, {
    key: "release",
    value: function release() {}
  }]);

  return DynamicsCompressorNode;
})(_AudioNode3.default), _class2.$JSONKeys = ["threshold", "knee", "ratio", "reduction", "attack", "release"], _temp), (_desc = _dec(_class.prototype, "threshold", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "threshold")) || _desc, _desc ? Object.defineProperty(_class.prototype, "threshold", _desc) : void 0, _desc = _dec2(_class.prototype, "knee", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "knee")) || _desc, _desc ? Object.defineProperty(_class.prototype, "knee", _desc) : void 0, _desc = _dec3(_class.prototype, "ratio", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "ratio")) || _desc, _desc ? Object.defineProperty(_class.prototype, "ratio", _desc) : void 0, _desc = _dec4(_class.prototype, "reduction", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "reduction")) || _desc, _desc ? Object.defineProperty(_class.prototype, "reduction", _desc) : void 0, _desc = _dec5(_class.prototype, "attack", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "attack")) || _desc, _desc ? Object.defineProperty(_class.prototype, "attack", _desc) : void 0, _desc = _dec6(_class.prototype, "release", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "release")) || _desc, _desc ? Object.defineProperty(_class.prototype, "release", _desc) : void 0), _class));
exports.default = DynamicsCompressorNode;
},{"./AudioNode":8,"./decorators/props":33}],17:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _dec, _desc, _value, _class, _class2, _temp;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _AudioNode2 = require("./AudioNode");

var _AudioNode3 = _interopRequireDefault(_AudioNode2);

var _props = require("./decorators/props");

var props = _interopRequireWildcard(_props);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GainNode = (_dec = props.audioparam(1), (_class = (_temp = _class2 = (function (_AudioNode) {
  _inherits(GainNode, _AudioNode);

  function GainNode(admission, context) {
    _classCallCheck(this, GainNode);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(GainNode).call(this, admission, {
      name: "GainNode",
      context: context,
      numberOfInputs: 1,
      numberOfOutputs: 1,
      channelCount: 2,
      channelCountMode: "max",
      channelInterpretation: "speakers"
    }));
  }

  _createClass(GainNode, [{
    key: "gain",
    value: function gain() {}
  }]);

  return GainNode;
})(_AudioNode3.default), _class2.$JSONKeys = ["gain"], _temp), (_desc = _dec(_class.prototype, "gain", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "gain")) || _desc, _desc ? Object.defineProperty(_class.prototype, "gain", _desc) : void 0), _class));
exports.default = GainNode;
},{"./AudioNode":8,"./decorators/props":33}],18:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _dec, _desc, _value, _class, _class2, _temp;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _AudioNode2 = require("./AudioNode");

var _AudioNode3 = _interopRequireDefault(_AudioNode2);

var _HTMLMediaElement = require("./dom/HTMLMediaElement");

var _HTMLMediaElement2 = _interopRequireDefault(_HTMLMediaElement);

var _methods = require("./decorators/methods");

var methods = _interopRequireWildcard(_methods);

var _validators = require("./validators");

var validators = _interopRequireWildcard(_validators);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MediaElementAudioSourceNode = (_dec = methods.param("mediaElement", validators.isInstanceOf(_HTMLMediaElement2.default)), (_class = (_temp = _class2 = (function (_AudioNode) {
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

    _this.__createMediaElementSource(mediaElement);
    return _this;
  }

  _createClass(MediaElementAudioSourceNode, [{
    key: "__createMediaElementSource",
    value: function __createMediaElementSource() {}
  }]);

  return MediaElementAudioSourceNode;
})(_AudioNode3.default), _class2.$JSONKeys = [], _temp), (_desc = _dec(_class.prototype, "__createMediaElementSource", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "__createMediaElementSource")) || _desc, _desc ? Object.defineProperty(_class.prototype, "__createMediaElementSource", _desc) : void 0), _class));
exports.default = MediaElementAudioSourceNode;
},{"./AudioNode":8,"./decorators/methods":32,"./dom/HTMLMediaElement":38,"./validators":56}],19:[function(require,module,exports){
"use strict";

var _class, _temp;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _AudioNode2 = require("./AudioNode");

var _AudioNode3 = _interopRequireDefault(_AudioNode2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MediaStreamAudioDestinationNode = (_temp = _class = (function (_AudioNode) {
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
})(_AudioNode3.default), _class.$JSONKeys = [], _temp);
exports.default = MediaStreamAudioDestinationNode;
},{"./AudioNode":8}],20:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _dec, _desc, _value, _class, _class2, _temp;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _AudioNode2 = require("./AudioNode");

var _AudioNode3 = _interopRequireDefault(_AudioNode2);

var _MediaStream = require("./dom/MediaStream");

var _MediaStream2 = _interopRequireDefault(_MediaStream);

var _methods = require("./decorators/methods");

var methods = _interopRequireWildcard(_methods);

var _validators = require("./validators");

var validators = _interopRequireWildcard(_validators);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MediaStreamAudioSourceNode = (_dec = methods.param("mediaStream", validators.isInstanceOf(_MediaStream2.default)), (_class = (_temp = _class2 = (function (_AudioNode) {
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

    _this.__createMediaStreamSource(mediaStream);
    return _this;
  }

  _createClass(MediaStreamAudioSourceNode, [{
    key: "__createMediaStreamSource",
    value: function __createMediaStreamSource() {}
  }]);

  return MediaStreamAudioSourceNode;
})(_AudioNode3.default), _class2.$JSONKeys = [], _temp), (_desc = _dec(_class.prototype, "__createMediaStreamSource", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "__createMediaStreamSource")) || _desc, _desc ? Object.defineProperty(_class.prototype, "__createMediaStreamSource", _desc) : void 0), _class));
exports.default = MediaStreamAudioSourceNode;
},{"./AudioNode":8,"./decorators/methods":32,"./dom/MediaStream":39,"./validators":56}],21:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _Immigration = require("./utils/Immigration");

var _Immigration2 = _interopRequireDefault(_Immigration);

var _Event2 = require("./dom/Event");

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

    immigration.check(admission, function () {
      throw new TypeError("Illegal constructor");
    });

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(OfflineAudioCompletionEvent).call(this, "complete", node));

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
},{"./dom/Event":35,"./utils/Immigration":42}],22:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _desc, _value, _class;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _Configuration = require("./utils/Configuration");

var _Configuration2 = _interopRequireDefault(_Configuration);

var _Immigration = require("./utils/Immigration");

var _Immigration2 = _interopRequireDefault(_Immigration);

var _Event = require("./dom/Event");

var _Event2 = _interopRequireDefault(_Event);

var _AudioContext2 = require("./AudioContext");

var _AudioContext3 = _interopRequireDefault(_AudioContext2);

var _AudioBuffer = require("./AudioBuffer");

var _AudioBuffer2 = _interopRequireDefault(_AudioBuffer);

var _OfflineAudioCompletionEvent = require("./OfflineAudioCompletionEvent");

var _OfflineAudioCompletionEvent2 = _interopRequireDefault(_OfflineAudioCompletionEvent);

var _props = require("./decorators/props");

var props = _interopRequireWildcard(_props);

var _methods = require("./decorators/methods");

var methods = _interopRequireWildcard(_methods);

var _validators = require("./validators");

var validators = _interopRequireWildcard(_validators);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var configuration = _Configuration2.default.getInstance();
var immigration = _Immigration2.default.getInstance();

var OfflineAudioContext = (_dec = methods.param("numberOfChannels", validators.isPositiveInteger), _dec2 = methods.param("length", validators.isPositiveInteger), _dec3 = methods.param("sampleRate", validators.isPositiveInteger), _dec4 = props.on("complete"), _dec5 = methods.contract({
  precondition: function precondition() {
    if (this._.rendering) {
      throw new TypeError("Cannot call startRendering more than once.");
    }
  }
}), _dec6 = methods.contract({
  precondition: function precondition(methodName) {
    if (configuration.getState("AudioContext#" + methodName) !== "enabled") {
      throw new TypeError("not enabled");
    }
  }
}), (_class = (function (_AudioContext) {
  _inherits(OfflineAudioContext, _AudioContext);

  function OfflineAudioContext(numberOfChannels, length, sampleRate) {
    _classCallCheck(this, OfflineAudioContext);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(OfflineAudioContext).call(this));

    _this.__OfflineAudioContext(numberOfChannels, length, sampleRate);
    return _this;
  }

  _createClass(OfflineAudioContext, [{
    key: "__OfflineAudioContext",
    value: function __OfflineAudioContext(numberOfChannels, length, sampleRate) {
      this._.sampleRate = sampleRate;
      this._.numberOfChannels = numberOfChannels;
      this._.length = length;
      this._.rendering = false;
      this._.resolve = null;
      this._.state = "suspended";
    }
  }, {
    key: "oncomplete",
    value: function oncomplete() {}
  }, {
    key: "suspend",
    value: function suspend() {
      return this.__transitionToState("suspend");
    }
  }, {
    key: "resume",
    value: function resume() {
      return this.__transitionToState("resume");
    }
  }, {
    key: "close",
    value: function close() {
      return this.__transitionToState("close");
    }
  }, {
    key: "startRendering",
    value: function startRendering() {
      var _this2 = this;

      var isPromiseBased = configuration.getState("OfflineAudioContext#startRendering") === "promise";

      this._.rendering = true;

      if (isPromiseBased) {
        return new Promise(function (resolve) {
          _this2._.resolve = resolve;
          _this2._.state = "running";
          _this2.dispatchEvent(new _Event2.default("statechange", _this2));
        });
      }

      this._.state = "running";
      this.dispatchEvent(new _Event2.default("statechange", this));
    }
  }, {
    key: "__transitionToState",
    value: function __transitionToState(methodName) {
      return new Promise(function () {
        throw new TypeError("Cannot " + methodName + " on an OfflineAudioContext.");
      });
    }
  }, {
    key: "__process",
    value: function __process(microseconds) {
      var _this3 = this;

      if (!this._.rendering || this._.length <= this._.processedSamples) {
        return;
      }

      var nextMicroCurrentTime = this._.microCurrentTime + microseconds;

      while (this._.microCurrentTime < nextMicroCurrentTime) {
        var microCurrentTime = Math.min(this._.microCurrentTime + 1000, nextMicroCurrentTime);
        var processedSamples = Math.floor(microCurrentTime / (1000 * 1000) * this.sampleRate);
        var inNumSamples = processedSamples - this._.processedSamples;

        this.destination.$process(inNumSamples, ++this._.tick);

        this._.microCurrentTime = microCurrentTime;
        this._.processedSamples = processedSamples;

        if (this._.length <= this._.processedSamples) {
          break;
        }
      }

      if (this._.length <= this._.processedSamples) {
        var renderedBuffer = immigration.apply(function (admission) {
          return new _AudioBuffer2.default(admission, _this3, _this3._.numberOfChannels, _this3._.length, _this3.sampleRate);
        });
        var event = immigration.apply(function (admission) {
          return new _OfflineAudioCompletionEvent2.default(admission, _this3);
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
    key: "$name",
    get: function get() {
      return "OfflineAudioContext";
    }
  }]);

  return OfflineAudioContext;
})(_AudioContext3.default), (_desc = _dec(_class.prototype, "__OfflineAudioContext", _desc = _dec2(_class.prototype, "__OfflineAudioContext", _desc = _dec3(_class.prototype, "__OfflineAudioContext", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "__OfflineAudioContext")) || _desc) || _desc) || _desc, _desc ? Object.defineProperty(_class.prototype, "__OfflineAudioContext", _desc) : void 0, _desc = _dec4(_class.prototype, "oncomplete", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "oncomplete")) || _desc, _desc ? Object.defineProperty(_class.prototype, "oncomplete", _desc) : void 0, _desc = _dec5(_class.prototype, "startRendering", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "startRendering")) || _desc, _desc ? Object.defineProperty(_class.prototype, "startRendering", _desc) : void 0, _desc = _dec6(_class.prototype, "__transitionToState", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "__transitionToState")) || _desc, _desc ? Object.defineProperty(_class.prototype, "__transitionToState", _desc) : void 0), _class));
exports.default = OfflineAudioContext;
},{"./AudioBuffer":3,"./AudioContext":5,"./OfflineAudioCompletionEvent":21,"./decorators/methods":32,"./decorators/props":33,"./dom/Event":35,"./utils/Configuration":41,"./utils/Immigration":42,"./validators":56}],23:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _desc, _value, _class, _class2, _temp;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _AudioNode2 = require("./AudioNode");

var _AudioNode3 = _interopRequireDefault(_AudioNode2);

var _PeriodicWave = require("./PeriodicWave");

var _PeriodicWave2 = _interopRequireDefault(_PeriodicWave);

var _Event = require("./dom/Event");

var _Event2 = _interopRequireDefault(_Event);

var _toSeconds = require("./utils/toSeconds");

var _toSeconds2 = _interopRequireDefault(_toSeconds);

var _props = require("./decorators/props");

var props = _interopRequireWildcard(_props);

var _methods = require("./decorators/methods");

var methods = _interopRequireWildcard(_methods);

var _validators = require("./validators");

var validators = _interopRequireWildcard(_validators);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OscillatorNode = (_dec = props.enums(["sine", "square", "sawtooth", "triangle"]), _dec2 = props.audioparam(440), _dec3 = props.audioparam(0), _dec4 = props.on("ended"), _dec5 = methods.param("[ when ]", validators.isPositiveNumber), _dec6 = methods.contract({
  precondition: function precondition() {
    if (this._.startTime !== Infinity) {
      throw new Error("Cannot start more than once.");
    }
  }
}), _dec7 = methods.param("[ when ]", validators.isPositiveNumber), _dec8 = methods.contract({
  precondition: function precondition() {
    if (this._.startTime === Infinity) {
      throw new Error("Cannot call stop without calling start first.");
    }
    if (this._.stopTime !== Infinity) {
      throw new Error("Cannot stop more than once.");
    }
  }
}), _dec9 = methods.param("periodicWave", validators.isInstanceOf(_PeriodicWave2.default)), (_class = (_temp = _class2 = (function (_AudioNode) {
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

    _this._.custom = null;
    _this._.startTime = Infinity;
    _this._.stopTime = Infinity;
    _this._.firedOnEnded = false;
    return _this;
  }

  _createClass(OscillatorNode, [{
    key: "type",
    value: function type() {}
  }, {
    key: "frequency",
    value: function frequency() {}
  }, {
    key: "detune",
    value: function detune() {}
  }, {
    key: "onended",
    value: function onended() {}
  }, {
    key: "start",
    value: function start() {
      var when = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

      this._.startTime = when;
    }
  }, {
    key: "stop",
    value: function stop() {
      var when = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

      this._.stopTime = when;
    }
  }, {
    key: "setPeriodicWave",
    value: function setPeriodicWave(periodicWave) {
      this._.type = "custom";
      this._.custom = periodicWave;
    }
  }, {
    key: "$stateAtTime",
    value: function $stateAtTime(when) {
      var playbackTime = (0, _toSeconds2.default)(when);

      if (this._.startTime === Infinity) {
        return "UNSCHEDULED";
      }
      if (playbackTime < this._.startTime) {
        return "SCHEDULED";
      }
      if (playbackTime < this._.stopTime) {
        return "PLAYING";
      }

      return "FINISHED";
    }
  }, {
    key: "__process",
    value: function __process() {
      if (!this._.firedOnEnded && this.$stateAtTime(this.context.currentTime) === "FINISHED") {
        this.dispatchEvent(new _Event2.default("ended", this));
        this._.firedOnEnded = true;
      }
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
})(_AudioNode3.default), _class2.$JSONKeys = ["type", "frequency", "detune"], _temp), (_desc = _dec(_class.prototype, "type", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "type")) || _desc, _desc ? Object.defineProperty(_class.prototype, "type", _desc) : void 0, _desc = _dec2(_class.prototype, "frequency", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "frequency")) || _desc, _desc ? Object.defineProperty(_class.prototype, "frequency", _desc) : void 0, _desc = _dec3(_class.prototype, "detune", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "detune")) || _desc, _desc ? Object.defineProperty(_class.prototype, "detune", _desc) : void 0, _desc = _dec4(_class.prototype, "onended", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "onended")) || _desc, _desc ? Object.defineProperty(_class.prototype, "onended", _desc) : void 0, _desc = _dec5(_class.prototype, "start", _desc = _dec6(_class.prototype, "start", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "start")) || _desc) || _desc, _desc ? Object.defineProperty(_class.prototype, "start", _desc) : void 0, _desc = _dec7(_class.prototype, "stop", _desc = _dec8(_class.prototype, "stop", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "stop")) || _desc) || _desc, _desc ? Object.defineProperty(_class.prototype, "stop", _desc) : void 0, _desc = _dec9(_class.prototype, "setPeriodicWave", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "setPeriodicWave")) || _desc, _desc ? Object.defineProperty(_class.prototype, "setPeriodicWave", _desc) : void 0), _class));
exports.default = OscillatorNode;
},{"./AudioNode":8,"./PeriodicWave":25,"./decorators/methods":32,"./decorators/props":33,"./dom/Event":35,"./utils/toSeconds":55,"./validators":56}],24:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _desc, _value, _class, _class2, _temp;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _AudioNode2 = require("./AudioNode");

var _AudioNode3 = _interopRequireDefault(_AudioNode2);

var _props = require("./decorators/props");

var props = _interopRequireWildcard(_props);

var _methods = require("./decorators/methods");

var methods = _interopRequireWildcard(_methods);

var _validators = require("./validators");

var validators = _interopRequireWildcard(_validators);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PannerNode = (_dec = props.enums(["HRTF", "equalpower"]), _dec2 = props.enums(["inverse", "linear", "exponential"]), _dec3 = props.typed(validators.isNumber, 1), _dec4 = props.typed(validators.isNumber, 10000), _dec5 = props.typed(validators.isNumber, 1), _dec6 = props.typed(validators.isNumber, 360), _dec7 = props.typed(validators.isNumber, 360), _dec8 = props.typed(validators.isNumber, 0), _dec9 = methods.param("x", validators.isNumber), _dec10 = methods.param("y", validators.isNumber), _dec11 = methods.param("z", validators.isNumber), _dec12 = methods.param("x", validators.isNumber), _dec13 = methods.param("y", validators.isNumber), _dec14 = methods.param("z", validators.isNumber), _dec15 = methods.param("x", validators.isNumber), _dec16 = methods.param("y", validators.isNumber), _dec17 = methods.param("z", validators.isNumber), (_class = (_temp = _class2 = (function (_AudioNode) {
  _inherits(PannerNode, _AudioNode);

  function PannerNode(admission, context) {
    _classCallCheck(this, PannerNode);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(PannerNode).call(this, admission, {
      name: "PannerNode",
      context: context,
      numberOfInputs: 1,
      numberOfOutputs: 1,
      channelCount: 2,
      channelCountMode: "clamped-max",
      channelInterpretation: "speakers"
    }));
  }

  _createClass(PannerNode, [{
    key: "panningModel",
    value: function panningModel() {}
  }, {
    key: "distanceModel",
    value: function distanceModel() {}
  }, {
    key: "refDistance",
    value: function refDistance() {}
  }, {
    key: "maxDistance",
    value: function maxDistance() {}
  }, {
    key: "rolloffFactor",
    value: function rolloffFactor() {}
  }, {
    key: "coneInnerAngle",
    value: function coneInnerAngle() {}
  }, {
    key: "coneOuterAngle",
    value: function coneOuterAngle() {}
  }, {
    key: "coneOuterGain",
    value: function coneOuterGain() {}
  }, {
    key: "setPosition",
    value: function setPosition() {}
  }, {
    key: "setOrientation",
    value: function setOrientation() {}
  }, {
    key: "setVelocity",
    value: function setVelocity() {}
  }]);

  return PannerNode;
})(_AudioNode3.default), _class2.$JSONKeys = ["panningModel", "distanceModel", "refDistance", "maxDistance", "rolloffFactor", "coneInnerAngle", "coneOuterAngle", "coneOuterGain"], _temp), (_desc = _dec(_class.prototype, "panningModel", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "panningModel")) || _desc, _desc ? Object.defineProperty(_class.prototype, "panningModel", _desc) : void 0, _desc = _dec2(_class.prototype, "distanceModel", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "distanceModel")) || _desc, _desc ? Object.defineProperty(_class.prototype, "distanceModel", _desc) : void 0, _desc = _dec3(_class.prototype, "refDistance", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "refDistance")) || _desc, _desc ? Object.defineProperty(_class.prototype, "refDistance", _desc) : void 0, _desc = _dec4(_class.prototype, "maxDistance", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "maxDistance")) || _desc, _desc ? Object.defineProperty(_class.prototype, "maxDistance", _desc) : void 0, _desc = _dec5(_class.prototype, "rolloffFactor", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "rolloffFactor")) || _desc, _desc ? Object.defineProperty(_class.prototype, "rolloffFactor", _desc) : void 0, _desc = _dec6(_class.prototype, "coneInnerAngle", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "coneInnerAngle")) || _desc, _desc ? Object.defineProperty(_class.prototype, "coneInnerAngle", _desc) : void 0, _desc = _dec7(_class.prototype, "coneOuterAngle", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "coneOuterAngle")) || _desc, _desc ? Object.defineProperty(_class.prototype, "coneOuterAngle", _desc) : void 0, _desc = _dec8(_class.prototype, "coneOuterGain", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "coneOuterGain")) || _desc, _desc ? Object.defineProperty(_class.prototype, "coneOuterGain", _desc) : void 0, _desc = _dec9(_class.prototype, "setPosition", _desc = _dec10(_class.prototype, "setPosition", _desc = _dec11(_class.prototype, "setPosition", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "setPosition")) || _desc) || _desc) || _desc, _desc ? Object.defineProperty(_class.prototype, "setPosition", _desc) : void 0, _desc = _dec12(_class.prototype, "setOrientation", _desc = _dec13(_class.prototype, "setOrientation", _desc = _dec14(_class.prototype, "setOrientation", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "setOrientation")) || _desc) || _desc) || _desc, _desc ? Object.defineProperty(_class.prototype, "setOrientation", _desc) : void 0, _desc = _dec15(_class.prototype, "setVelocity", _desc = _dec16(_class.prototype, "setVelocity", _desc = _dec17(_class.prototype, "setVelocity", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "setVelocity")) || _desc) || _desc) || _desc, _desc ? Object.defineProperty(_class.prototype, "setVelocity", _desc) : void 0), _class));
exports.default = PannerNode;
},{"./AudioNode":8,"./decorators/methods":32,"./decorators/props":33,"./validators":56}],25:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _dec, _dec2, _dec3, _desc, _value, _class;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _Immigration = require("./utils/Immigration");

var _Immigration2 = _interopRequireDefault(_Immigration);

var _methods = require("./decorators/methods");

var methods = _interopRequireWildcard(_methods);

var _validators = require("./validators");

var validators = _interopRequireWildcard(_validators);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var immigration = _Immigration2.default.getInstance();

var PeriodicWave = (_dec = methods.param("real", validators.isInstanceOf(Float32Array)), _dec2 = methods.param("imag", validators.isInstanceOf(Float32Array)), _dec3 = methods.contract({
  precondition: function precondition(real, imag) {
    if (4096 < real.length) {
      throw new TypeError("The length of \"{{real}}\" array (" + real.length + ") exceeds allow maximum of 4096.");
    }
    if (4096 < imag.length) {
      throw new TypeError("The length of \"{{imag}}\" array (" + imag.length + ") exceeds allow maximum of 4096.");
    }
    if (real.length !== imag.length) {
      throw new TypeError("The length of \"{{real}}\" array (" + real.length + ") and length of \"imag\" array (" + imag.length + ") must match.");
    }
  }
}), (_class = (function () {
  function PeriodicWave(admission, context, real, imag) {
    _classCallCheck(this, PeriodicWave);

    immigration.check(admission, function () {
      throw new TypeError("Illegal constructor");
    });
    Object.defineProperty(this, "_", { value: {} });

    this._.context = context;
    this.__createPeriodicWave(real, imag);
  }

  _createClass(PeriodicWave, [{
    key: "__createPeriodicWave",
    value: function __createPeriodicWave(real, imag) {
      this._.real = real;
      this._.imag = imag;
    }
  }, {
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
})(), (_desc = _dec(_class.prototype, "__createPeriodicWave", _desc = _dec2(_class.prototype, "__createPeriodicWave", _desc = _dec3(_class.prototype, "__createPeriodicWave", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "__createPeriodicWave")) || _desc) || _desc) || _desc, _desc ? Object.defineProperty(_class.prototype, "__createPeriodicWave", _desc) : void 0), _class));
exports.default = PeriodicWave;
},{"./decorators/methods":32,"./utils/Immigration":42,"./validators":56}],26:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _desc, _value, _class, _class2, _temp;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _Immigration = require("./utils/Immigration");

var _Immigration2 = _interopRequireDefault(_Immigration);

var _AudioNode2 = require("./AudioNode");

var _AudioNode3 = _interopRequireDefault(_AudioNode2);

var _AudioBuffer = require("./AudioBuffer");

var _AudioBuffer2 = _interopRequireDefault(_AudioBuffer);

var _AudioProcessingEvent = require("./AudioProcessingEvent");

var _AudioProcessingEvent2 = _interopRequireDefault(_AudioProcessingEvent);

var _props = require("./decorators/props");

var props = _interopRequireWildcard(_props);

var _methods = require("./decorators/methods");

var methods = _interopRequireWildcard(_methods);

var _validators = require("./validators");

var validators = _interopRequireWildcard(_validators);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var immigration = _Immigration2.default.getInstance();

var ScriptProcessorNode = (_dec = methods.param("bufferSize", validators.isPositiveInteger), _dec2 = methods.param("numberOfInputChannels", validators.isPositiveInteger), _dec3 = methods.param("numberOfOutputChannels", validators.isPositiveInteger), _dec4 = methods.contract({
  precondition: function precondition(bufferSize) {
    if ([256, 512, 1024, 2048, 4096, 8192, 16384].indexOf(bufferSize) === -1) {
      throw new TypeError("The {{bufferSize}} should be one of [ 256, 512, 1024, 2048, 4096, 8192, 16384 ], but got " + bufferSize + ".");
    }
  }
}), _dec5 = props.readonly(), _dec6 = props.on("audioprocess"), (_class = (_temp = _class2 = (function (_AudioNode) {
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

    _this.__createScriptProcessor(bufferSize, numberOfInputChannels, numberOfOutputChannels);
    return _this;
  }

  _createClass(ScriptProcessorNode, [{
    key: "__createScriptProcessor",
    value: function __createScriptProcessor(bufferSize, numberOfInputChannels, numberOfOutputChannels) {
      this._.bufferSize = bufferSize;
      this._.numberOfInputChannels = numberOfInputChannels;
      this._.numberOfOutputChannels = numberOfOutputChannels;
      this._.numSamples = 0;
    }
  }, {
    key: "bufferSize",
    value: function bufferSize() {
      return this._.bufferSize;
    }
  }, {
    key: "onaudioprocess",
    value: function onaudioprocess() {}
  }, {
    key: "__process",
    value: function __process(inNumSamples) {
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
  }]);

  return ScriptProcessorNode;
})(_AudioNode3.default), _class2.$JSONKeys = [], _temp), (_desc = _dec(_class.prototype, "__createScriptProcessor", _desc = _dec2(_class.prototype, "__createScriptProcessor", _desc = _dec3(_class.prototype, "__createScriptProcessor", _desc = _dec4(_class.prototype, "__createScriptProcessor", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "__createScriptProcessor")) || _desc) || _desc) || _desc) || _desc, _desc ? Object.defineProperty(_class.prototype, "__createScriptProcessor", _desc) : void 0, _desc = _dec5(_class.prototype, "bufferSize", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "bufferSize")) || _desc, _desc ? Object.defineProperty(_class.prototype, "bufferSize", _desc) : void 0, _desc = _dec6(_class.prototype, "onaudioprocess", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "onaudioprocess")) || _desc, _desc ? Object.defineProperty(_class.prototype, "onaudioprocess", _desc) : void 0), _class));
exports.default = ScriptProcessorNode;
},{"./AudioBuffer":3,"./AudioNode":8,"./AudioProcessingEvent":10,"./decorators/methods":32,"./decorators/props":33,"./utils/Immigration":42,"./validators":56}],27:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _dec, _desc, _value, _class, _class2, _temp;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _AudioNode2 = require("./AudioNode");

var _AudioNode3 = _interopRequireDefault(_AudioNode2);

var _props = require("./decorators/props");

var props = _interopRequireWildcard(_props);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StereoPannerNode = (_dec = props.audioparam(0), (_class = (_temp = _class2 = (function (_AudioNode) {
  _inherits(StereoPannerNode, _AudioNode);

  function StereoPannerNode(admission, context) {
    _classCallCheck(this, StereoPannerNode);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(StereoPannerNode).call(this, admission, {
      name: "StereoPannerNode",
      context: context,
      numberOfInputs: 1,
      numberOfOutputs: 1,
      channelCount: 2,
      channelCountMode: "clamped-max",
      channelInterpretation: "speakers"
    }));
  }

  _createClass(StereoPannerNode, [{
    key: "pan",
    value: function pan() {}
  }]);

  return StereoPannerNode;
})(_AudioNode3.default), _class2.$JSONKeys = ["pan"], _temp), (_desc = _dec(_class.prototype, "pan", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "pan")) || _desc, _desc ? Object.defineProperty(_class.prototype, "pan", _desc) : void 0), _class));
exports.default = StereoPannerNode;
},{"./AudioNode":8,"./decorators/props":33}],28:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _dec, _dec2, _desc, _value, _class, _class2, _temp;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _AudioNode2 = require("./AudioNode");

var _AudioNode3 = _interopRequireDefault(_AudioNode2);

var _props = require("./decorators/props");

var props = _interopRequireWildcard(_props);

var _validators = require("./validators");

var validators = _interopRequireWildcard(_validators);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WaveShaperNode = (_dec = props.typed(validators.isNullOrInstanceOf(Float32Array), null), _dec2 = props.enums(["none", "2x", "4x"]), (_class = (_temp = _class2 = (function (_AudioNode) {
  _inherits(WaveShaperNode, _AudioNode);

  function WaveShaperNode(admission, context) {
    _classCallCheck(this, WaveShaperNode);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(WaveShaperNode).call(this, admission, {
      name: "WaveShaperNode",
      context: context,
      numberOfInputs: 1,
      numberOfOutputs: 1,
      channelCount: 2,
      channelCountMode: "max",
      channelInterpretation: "speakers"
    }));
  }

  _createClass(WaveShaperNode, [{
    key: "curve",
    value: function curve() {}
  }, {
    key: "oversample",
    value: function oversample() {}
  }]);

  return WaveShaperNode;
})(_AudioNode3.default), _class2.$JSONKeys = ["oversample"], _temp), (_desc = _dec(_class.prototype, "curve", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "curve")) || _desc, _desc ? Object.defineProperty(_class.prototype, "curve", _desc) : void 0, _desc = _dec2(_class.prototype, "oversample", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "oversample")) || _desc, _desc ? Object.defineProperty(_class.prototype, "oversample", _desc) : void 0), _class));
exports.default = WaveShaperNode;
},{"./AudioNode":8,"./decorators/props":33,"./validators":56}],29:[function(require,module,exports){
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
},{}],30:[function(require,module,exports){
(function (global){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Configuration = require("./utils/Configuration");

var _Configuration2 = _interopRequireDefault(_Configuration);

var _Immigration = require("./utils/Immigration");

var _Immigration2 = _interopRequireDefault(_Immigration);

var _WebAudioAPI = require("./WebAudioAPI");

var _WebAudioAPI2 = _interopRequireDefault(_WebAudioAPI);

var _Element = require("./dom/Element");

var _Element2 = _interopRequireDefault(_Element);

var _Event = require("./dom/Event");

var _Event2 = _interopRequireDefault(_Event);

var _EventTarget = require("./dom/EventTarget");

var _EventTarget2 = _interopRequireDefault(_EventTarget);

var _HTMLElement = require("./dom/HTMLElement");

var _HTMLElement2 = _interopRequireDefault(_HTMLElement);

var _HTMLMediaElement = require("./dom/HTMLMediaElement");

var _HTMLMediaElement2 = _interopRequireDefault(_HTMLMediaElement);

var _MediaStream = require("./dom/MediaStream");

var _MediaStream2 = _interopRequireDefault(_MediaStream);

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

var _GainNode = require("./GainNode");

var _GainNode2 = _interopRequireDefault(_GainNode);

var _MediaElementAudioSourceNode = require("./MediaElementAudioSourceNode");

var _MediaElementAudioSourceNode2 = _interopRequireDefault(_MediaElementAudioSourceNode);

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

var _getAPIVersion = require("./utils/getAPIVersion");

var _getAPIVersion2 = _interopRequireDefault(_getAPIVersion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sampleRate = 44100;
var configuration = _Configuration2.default.getInstance();

var WebAudioTestAPI = {
  VERSION: (0, _getAPIVersion2.default)(),
  utils: { Configuration: _Configuration2.default, Immigration: _Immigration2.default },
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
},{"./AnalyserNode":2,"./AudioBuffer":3,"./AudioBufferSourceNode":4,"./AudioContext":5,"./AudioDestinationNode":6,"./AudioListener":7,"./AudioNode":8,"./AudioParam":9,"./AudioProcessingEvent":10,"./BiquadFilterNode":11,"./ChannelMergerNode":12,"./ChannelSplitterNode":13,"./ConvolverNode":14,"./DelayNode":15,"./DynamicsCompressorNode":16,"./GainNode":17,"./MediaElementAudioSourceNode":18,"./MediaStreamAudioDestinationNode":19,"./MediaStreamAudioSourceNode":20,"./OfflineAudioCompletionEvent":21,"./OfflineAudioContext":22,"./OscillatorNode":23,"./PannerNode":24,"./PeriodicWave":25,"./ScriptProcessorNode":26,"./StereoPannerNode":27,"./WaveShaperNode":28,"./WebAudioAPI":29,"./dom/Element":34,"./dom/Event":35,"./dom/EventTarget":36,"./dom/HTMLElement":37,"./dom/HTMLMediaElement":38,"./dom/MediaStream":39,"./utils/Configuration":41,"./utils/Immigration":42,"./utils/getAPIVersion":48}],31:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = "0.5.2";
},{}],32:[function(require,module,exports){
"use strict";

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.param = param;
exports.returns = returns;
exports.contract = contract;

var _format = require("../utils/format");

var _format2 = _interopRequireDefault(_format);

var _toS = require("../utils/toS");

var _toS2 = _interopRequireDefault(_toS);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var repository = new WeakMap();

function createMethodForm(methodName, parameters, returnValue, errParamName) {
  var retType = returnValue ? returnValue.typeName : "void";
  var result = methodName + "(";
  var optional = false;
  var errArgIndex = -1;

  for (var i = 0; i < parameters.length; i++) {
    if (!optional && parameters[i].optional) {
      optional = true;
      result += "[ ";
    }
    if (parameters[i].paramName === errParamName) {
      errArgIndex = result.length;
    }
    result += parameters[i].paramName;
    // result += ": " + parameters[i].validator.typeName;
    if (i < parameters.length - 1) {
      result += ", ";
    }
  }

  if (optional) {
    result += " ]";
  }

  result += "): " + retType;

  return [errArgIndex, result];
}

function repeat(ch, n) {
  var str = "";

  while (n--) {
    str += ch;
  }

  return str;
}

function createExecuteError(klassName, methodName, parameters, returnValue, message) {
  var matches = /{{(\w+)}}/.exec(message);

  if (matches) {
    var _createMethodForm = createMethodForm(methodName, parameters, returnValue, matches[1]);

    var _createMethodForm2 = _slicedToArray(_createMethodForm, 2);

    var errArgIndex = _createMethodForm2[0];
    var methodForm = _createMethodForm2[1];

    if (errArgIndex !== -1) {
      message = ["\t" + methodForm, "\t" + repeat(" ", errArgIndex) + "|", "\t" + repeat(" ", errArgIndex) + message].join("\n");
    }
  }

  return new TypeError((0, _format2.default)("\n    Failed to execute the '" + methodName + "' on '" + klassName + "'\n\n    " + message + "\n  ") + "\n");
}

function createValidator(methodName) {
  var config = {};

  function validate() {
    var _config$methodBody;

    var methodName = config.methodName;
    var parameters = config.parameters;
    var returnValue = config.returnValue;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var errArgIndex = validateArguments(args, parameters);

    if (errArgIndex !== -1) {
      var errParamName = parameters[errArgIndex].paramName;
      var expectedType = parameters[errArgIndex].validator.description;
      var actualValue = (0, _toS2.default)(args[errArgIndex]);
      var errMessage = "'{{" + errParamName + "}}' require $a " + expectedType + ", but got " + actualValue + ".";

      throw createExecuteError(this.constructor.name, methodName, parameters, returnValue, errMessage);
    }

    if (typeof config.precondition === "function") {
      try {
        var _config$precondition;

        (_config$precondition = config.precondition).call.apply(_config$precondition, [this].concat(args));
      } catch (e) {
        throw createExecuteError(this.constructor.name, methodName, parameters, returnValue, e.message.trim());
      }
    }

    var res = (_config$methodBody = config.methodBody).call.apply(_config$methodBody, [this].concat(args));

    if (typeof config.postcondition === "function") {
      try {
        config.postcondition.call(this, res);
      } catch (e) {
        throw createExecuteError(this.constructor.name, methodName, parameters, returnValue, e.message.trim());
      }
    }

    return res;
  }

  config.methodName = /(?:__)?(\w+)/.exec(methodName)[1];
  config.parameters = [];
  config.descriptor = {
    value: validate, enumerable: true, configurable: true
  };

  return config;
}

function validateArguments(values, validators) {
  for (var i = 0; i < validators.length; i++) {
    if (validators[i].optional === true && values.length <= i) {
      break;
    }
    if (!validators[i].validator.test(values[i])) {
      return i;
    }
  }
  return -1;
}

function getMethodConfig(target, methodName) {
  var classConfig = repository.get(target);

  if (!classConfig) {
    repository.set(target, classConfig = {});
  }

  if (!classConfig[methodName]) {
    classConfig[methodName] = createValidator(methodName);
  }

  return classConfig[methodName];
}

function param(paramName, validator) {
  return function (target, methodName, descriptor) {
    var methodConfig = getMethodConfig(target, methodName);
    var optional = /^\[\s*\w+?\s*\]$/.test(paramName);

    if (optional) {
      paramName = paramName.replace(/^\[|\]$/g, "").trim();
    }

    methodConfig.parameters.unshift({ paramName: paramName, validator: validator, optional: optional });
    methodConfig.methodBody = methodConfig.methodBody || descriptor.value;

    return methodConfig.descriptor;
  };
}

function returns(validator) {
  return function (target, methodName, descriptor) {
    var methodConfig = getMethodConfig(target, methodName);

    methodConfig.returnValue = validator;
    methodConfig.methodBody = methodConfig.methodBody || descriptor.value;

    return methodConfig.descriptor;
  };
}

function contract(_ref) {
  var precondition = _ref.precondition;
  var postcondition = _ref.postcondition;

  return function (target, methodName, descriptor) {
    var methodConfig = getMethodConfig(target, methodName);

    methodConfig.precondition = precondition;
    methodConfig.postcondition = postcondition;
    methodConfig.methodBody = methodConfig.methodBody || descriptor.value;

    return methodConfig.descriptor;
  };
}
},{"../utils/format":47,"../utils/toS":54}],33:[function(require,module,exports){
(function (global){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.audioparam = audioparam;
exports.enums = enums;
exports.on = on;
exports.readonly = readonly;
exports.typed = typed;

var _Immigration = require("../utils/Immigration");

var _Immigration2 = _interopRequireDefault(_Immigration);

var _format = require("../utils/format");

var _format2 = _interopRequireDefault(_format);

var _toS = require("../utils/toS");

var _toS2 = _interopRequireDefault(_toS);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var immigration = _Immigration2.default.getInstance();

function createSetterError(klassName, propName, message) {
  return new TypeError((0, _format2.default)("\n    Failed to set the '" + propName + "' property on '" + klassName + "'\n    " + message + "\n  ") + "\n");
}

function audioparam(defaultValue) {
  return function (target, propName, descriptor) {
    descriptor.get = function get() {
      var _this = this;

      if (!this._.hasOwnProperty(propName)) {
        this._[propName] = immigration.apply(function (admission) {
          return new global.WebAudioTestAPI.AudioParam(admission, _this, propName, defaultValue);
        });
      }
      return this._[propName];
    };

    descriptor.set = function set(value) {
      throw createSetterError(this.constructor.name, propName, "\n        \tAttempt to assign to readonly property. Do you mean this?\n\n        \t\t\t" + propName + ".value = " + (0, _toS2.default)(value) + ";\n      ");
    };

    return {
      get: descriptor.get,
      set: descriptor.set,
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable
    };
  };
}

function enums(values) {
  return function (target, propName, descriptor) {
    if (typeof descriptor.get !== "function") {
      descriptor.get = function get() {
        if (!this._.hasOwnProperty(propName)) {
          this._[propName] = values[0];
        }
        return this._[propName];
      };
    }

    descriptor.set = function set(value) {
      if (values.indexOf(value) === -1) {
        throw createSetterError(this.constructor.name, propName, "\n          \tThis property should be one of [ " + values.map(_toS2.default).join(", ") + " ], but got " + (0, _toS2.default)(value) + ".\n        ");
      }
      this._[propName] = value;
    };

    return {
      get: descriptor.get,
      set: descriptor.set,
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable
    };
  };
}

function on() {
  return function (target, propName, descriptor) {
    descriptor.get = function get() {
      if (!this._.hasOwnProperty(propName)) {
        this._[propName] = null;
      }
      return this._[propName];
    };
    descriptor.set = function set(value) {
      if (value !== null && typeof value !== "function") {
        throw createSetterError(this.constructor.name, propName, "\n          \tA callback should be a function or null, but got " + (0, _toS2.default)(value) + ".\n        ");
      }
      this._[propName] = value;
    };

    return {
      get: descriptor.get,
      set: descriptor.set,
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable
    };
  };
}

function readonly(value) {
  return function (target, propName, descriptor) {
    var getter = descriptor.get || descriptor.value;

    if (typeof descriptor.get !== "function") {
      descriptor.get = function get() {
        if (typeof value !== "undefined") {
          return value;
        }
        if (typeof getter === "function") {
          return getter.call(this);
        }
      };
    }

    descriptor.set = function set() {
      throw createSetterError(this.constructor.name, propName, "\n        \tAttempt to assign to readonly property.\n      ");
    };

    return {
      get: descriptor.get,
      set: descriptor.set,
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable
    };
  };
}

function typed(validator, defaultValue) {
  return function (target, propName, descriptor) {
    if (typeof descriptor.get !== "function") {
      descriptor.get = function get() {
        if (!this._.hasOwnProperty(propName)) {
          this._[propName] = defaultValue;
        }
        return this._[propName];
      };
    }

    if (typeof descriptor.set !== "function") {
      descriptor.set = function set(value) {
        if (!validator.test(value)) {
          throw createSetterError(this.constructor.name, propName, "\n            \tThis property should be $a " + validator.description + ", but got " + (0, _toS2.default)(value) + ".\n          ");
        }
        this._[propName] = value;
      };
    }

    return {
      get: descriptor.get,
      set: descriptor.set,
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable
    };
  };
}
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../utils/Immigration":42,"../utils/format":47,"../utils/toS":54}],34:[function(require,module,exports){
(function (global){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _inLaws2 = require("../utils/inLaws");

var _inLaws3 = _interopRequireDefault(_inLaws2);

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

var Element = (function (_inLaws) {
  _inherits(Element, _inLaws);

  function Element() {
    _classCallCheck(this, Element);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Element).apply(this, arguments));
  }

  return Element;
})((0, _inLaws3.default)(global.Element));

exports.default = Element;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../utils/inLaws":49,"./EventTarget":36}],35:[function(require,module,exports){
(function (global){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _inLaws2 = require("../utils/inLaws");

var _inLaws3 = _interopRequireDefault(_inLaws2);

var _defaults = require("../utils/defaults");

var _defaults2 = _interopRequireDefault(_defaults);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

global.Event = global.Event || function Event() {
  _classCallCheck(this, Event);

  throw new TypeError("Illegal constructor");
};

var Event = (function (_inLaws) {
  _inherits(Event, _inLaws);

  function Event(name, target) {
    _classCallCheck(this, Event);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Event).call(this));

    Object.defineProperty(_this, "_", { value: {} });

    _this._.type = name;
    _this._.target = (0, _defaults2.default)(target, null);
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
})((0, _inLaws3.default)(global.Event));

exports.default = Event;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../utils/defaults":46,"../utils/inLaws":49}],36:[function(require,module,exports){
(function (global){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _dec, _dec2, _dec3, _dec4, _dec5, _desc, _value, _class;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _events = require("events");

var _Event = require("./Event");

var _Event2 = _interopRequireDefault(_Event);

var _inLaws2 = require("../utils/inLaws");

var _inLaws3 = _interopRequireDefault(_inLaws2);

var _methods = require("../decorators/methods");

var methods = _interopRequireWildcard(_methods);

var _validators = require("../validators");

var validators = _interopRequireWildcard(_validators);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EMITTER = Symbol("emitter");

global.EventTarget = global.EventTarget || function EventTarget() {
  _classCallCheck(this, EventTarget);

  throw new TypeError("Illegal constructor");
};

var EventTarget = (_dec = methods.param("type", validators.isString), _dec2 = methods.param("listener", validators.isFunction), _dec3 = methods.param("type", validators.isString), _dec4 = methods.param("listener", validators.isFunction), _dec5 = methods.param("event", validators.isInstanceOf(_Event2.default)), (_class = (function (_inLaws) {
  _inherits(EventTarget, _inLaws);

  function EventTarget() {
    _classCallCheck(this, EventTarget);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(EventTarget).call(this));

    _this[EMITTER] = new _events.EventEmitter();
    return _this;
  }

  _createClass(EventTarget, [{
    key: "addEventListener",
    value: function addEventListener(type, listener) {
      this[EMITTER].addListener(type, listener);
    }
  }, {
    key: "removeEventListener",
    value: function removeEventListener(type, listener) {
      this[EMITTER].removeListener(type, listener);
    }
  }, {
    key: "dispatchEvent",
    value: function dispatchEvent(event) {
      var _this2 = this;

      var type = event.type;
      var callback = this["on" + type];

      if (typeof callback === "function") {
        callback.call(this, event);
      }

      this[EMITTER].listeners(type).forEach(function (listener) {
        listener.call(_this2, event);
      });

      return true;
    }
  }, {
    key: "$addListener",
    value: function $addListener(event, listener) {
      this[EMITTER].addListener(event, listener);
      return this;
    }
  }, {
    key: "$emit",
    value: function $emit() {
      var _EMITTER;

      (_EMITTER = this[EMITTER]).emit.apply(_EMITTER, arguments);
      return this;
    }
  }, {
    key: "$getMaxListeners",
    value: function $getMaxListeners() {
      return this[EMITTER].getMaxListeners();
    }
  }, {
    key: "$listenerCount",
    value: function $listenerCount(type) {
      return this[EMITTER].listenerCount(type);
    }
  }, {
    key: "$listeners",
    value: function $listeners(event) {
      return this[EMITTER].listeners(event);
    }
  }, {
    key: "$on",
    value: function $on(event, listener) {
      this[EMITTER].on(event, listener);
      return this;
    }
  }, {
    key: "$once",
    value: function $once(event, listener) {
      this[EMITTER].on(event, listener);
      return this;
    }
  }, {
    key: "$removeAllListeners",
    value: function $removeAllListeners(event) {
      this[EMITTER].removeAllListeners(event);
      return this;
    }
  }, {
    key: "$removeListener",
    value: function $removeListener(event, listener) {
      this[EMITTER].removeAllListeners(event, listener);
      return this;
    }
  }, {
    key: "$setMaxListeners",
    value: function $setMaxListeners(event, listener) {
      this[EMITTER].setMaxListeners(event, listener);
      return this;
    }
  }]);

  return EventTarget;
})((0, _inLaws3.default)(global.EventTarget)), (_desc = _dec(_class.prototype, "addEventListener", _desc = _dec2(_class.prototype, "addEventListener", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "addEventListener")) || _desc) || _desc, _desc ? Object.defineProperty(_class.prototype, "addEventListener", _desc) : void 0, _desc = _dec3(_class.prototype, "removeEventListener", _desc = _dec4(_class.prototype, "removeEventListener", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "removeEventListener")) || _desc) || _desc, _desc ? Object.defineProperty(_class.prototype, "removeEventListener", _desc) : void 0, _desc = _dec5(_class.prototype, "dispatchEvent", _desc = Object.getOwnPropertyDescriptor(_class.prototype, "dispatchEvent")) || _desc, _desc ? Object.defineProperty(_class.prototype, "dispatchEvent", _desc) : void 0), _class));
exports.default = EventTarget;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../decorators/methods":32,"../utils/inLaws":49,"../validators":56,"./Event":35,"events":67}],37:[function(require,module,exports){
(function (global){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _inLaws2 = require("../utils/inLaws");

var _inLaws3 = _interopRequireDefault(_inLaws2);

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

var HTMLElement = (function (_inLaws) {
  _inherits(HTMLElement, _inLaws);

  function HTMLElement() {
    _classCallCheck(this, HTMLElement);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(HTMLElement).apply(this, arguments));
  }

  return HTMLElement;
})((0, _inLaws3.default)(global.HTMLElement));

exports.default = HTMLElement;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../utils/inLaws":49,"./Element":34}],38:[function(require,module,exports){
(function (global){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _inLaws2 = require("../utils/inLaws");

var _inLaws3 = _interopRequireDefault(_inLaws2);

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

var HTMLMediaElement = (function (_inLaws) {
  _inherits(HTMLMediaElement, _inLaws);

  function HTMLMediaElement() {
    _classCallCheck(this, HTMLMediaElement);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(HTMLMediaElement).apply(this, arguments));
  }

  return HTMLMediaElement;
})((0, _inLaws3.default)(global.HTMLMediaElement));

exports.default = HTMLMediaElement;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../utils/inLaws":49,"./HTMLElement":37}],39:[function(require,module,exports){
(function (global){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _inLaws2 = require("../utils/inLaws");

var _inLaws3 = _interopRequireDefault(_inLaws2);

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

var MediaStream = (function (_inLaws) {
  _inherits(MediaStream, _inLaws);

  function MediaStream() {
    _classCallCheck(this, MediaStream);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(MediaStream).apply(this, arguments));
  }

  return MediaStream;
})((0, _inLaws3.default)(global.MediaStream));

exports.default = MediaStream;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../utils/inLaws":49,"./EventTarget":36}],40:[function(require,module,exports){
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
},{"./WebAudioTestAPI":30}],41:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _api = require("./api");

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
},{"./api":44}],42:[function(require,module,exports){
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
},{}],43:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _appendIfNotExists = require("./appendIfNotExists");

var _appendIfNotExists2 = _interopRequireDefault(_appendIfNotExists);

var _removeIfExists = require("./removeIfExists");

var _removeIfExists2 = _interopRequireDefault(_removeIfExists);

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
      (0, _appendIfNotExists2.default)(this.outputs, destination);
      (0, _appendIfNotExists2.default)(destination.inputs, this);
    }
  }, {
    key: "disconnectAll",
    value: function disconnectAll() {
      var _this = this;

      this.outputs.splice(0).forEach(function (destination) {
        (0, _removeIfExists2.default)(destination.inputs, _this);
      });
    }
  }, {
    key: "disconnectNode",
    value: function disconnectNode(node) {
      for (var i = this.outputs.length - 1; i >= 0; i--) {
        var destination = this.outputs[i];

        if (destination.node === node) {
          this.outputs.splice(i, 1);
          (0, _removeIfExists2.default)(destination.inputs, this);
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
          (0, _removeIfExists2.default)(destination.inputs, this);
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
},{"./appendIfNotExists":45,"./removeIfExists":50}],44:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  "AnalyserNode#getFloatTimeDomainData": {
    states: ["disabled", "enabled"]
  },
  "AudioBuffer#copyToChannel": {
    states: ["disabled", "enabled"]
  },
  "AudioBuffer#copyFromChannel": {
    states: ["disabled", "enabled"]
  },
  "AudioContext#createAudioWorker": {
    states: ["disabled", "enabled"]
  },
  "AudioContext#createStereoPanner": {
    states: ["disabled", "enabled"]
  },
  "AudioContext#decodeAudioData": {
    states: ["void", "promise"]
  },
  "AudioContext#close": {
    states: ["disabled", "enabled"]
  },
  "AudioContext#suspend": {
    states: ["disabled", "enabled"]
  },
  "AudioContext#resume": {
    states: ["disabled", "enabled"]
  },
  "OfflineAudioContext#startRendering": {
    states: ["void", "promise"]
  },
  "AudioNode#disconnect": {
    states: ["channel", "selective"]
  }
};
},{}],45:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = appendIfNotExists;
function appendIfNotExists(list, value) {
  var index = list.indexOf(value);

  if (index === -1) {
    list.push(value);
  }
}
},{}],46:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = defaults;
function defaults(value, defaultValue) {
  return typeof value !== "undefined" ? value : defaultValue;
}
},{}],47:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = format;
function format(text) {
  text = text.trim();
  text = text.replace(/\$a (\w)/g, function (_, a) {
    if (/[aiueo]/i.test(a)) {
      return "an " + a;
    }
    return "a " + a;
  });
  text = text.replace(/{{(\w+)}}/g, "$1");
  text = text.replace(/^ +/gm, "");
  return text;
}
},{}],48:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getAPIVersion;

var _version__ = require("../__version__");

var _version__2 = _interopRequireDefault(_version__);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getAPIVersion() {
  return _version__2.default;
}
},{"../__version__":31}],49:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = inLaws;
function inLaws(superClass) {
  function ctor() {}

  ctor.prototype = Object.create(superClass.prototype, {
    constructor: { value: ctor, enumerable: false, writable: true, configurable: true }
  });

  return ctor;
}
},{}],50:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = removeIfExists;
function removeIfExists(list, value) {
  var index = list.indexOf(value);

  if (index !== -1) {
    return list.splice(index, 1)[0];
  }

  return null;
}
},{}],51:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toJSON;

var _toNodeName = require("./toNodeName");

var _toNodeName2 = _interopRequireDefault(_toNodeName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function toJSON(node, func) {
  var memo = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

  var result = undefined;

  if (memo.indexOf(node) !== -1) {
    return "<circular:" + (0, _toNodeName2.default)(node) + ">";
  }
  memo.push(node);

  result = func(node, memo);

  memo.pop();

  return result;
}
},{"./toNodeName":53}],52:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toMicroseconds;
var MIN_MICRO_SECONDS = 0;
var MAX_MICRO_SECONDS = 24 * 60 * 60 * 1000 * 1000;

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
},{}],53:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toNodeName;
function toNodeName(obj) {
  if (obj.hasOwnProperty("$id")) {
    return obj.$name + "#" + obj.$id;
  }
  return obj.$name;
}
},{}],54:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toS;

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function toS(value) {
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
    return "[ " + value.map(toS).join(", ") + " ]";
  }

  if (value.constructor === ({}).constructor) {
    return "{ " + Object.keys(value).map(function (key) {
      return key + ": " + toS(value[key]);
    }).join(", ") + "}";
  }

  var name = value.constructor.name || Object.prototype.toString.call(value).slice(8, -1);

  return "a " + name;
}
},{}],55:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toSeconds;

var _toMicroseconds = require("./toMicroseconds");

var _toMicroseconds2 = _interopRequireDefault(_toMicroseconds);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function toSeconds(time) {
  return (0, _toMicroseconds2.default)(time) / (1000 * 1000);
}
},{"./toMicroseconds":52}],56:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isString = exports.isPositiveNumber = exports.isPositiveInteger = exports.isNumber = exports.isNullOrInstanceOf = exports.isInteger = exports.isInstanceOf = exports.isFunction = exports.isBoolean = exports.isAudioSource = undefined;

var _isAudioSource2 = require("./isAudioSource");

var _isAudioSource3 = _interopRequireDefault(_isAudioSource2);

var _isBoolean2 = require("./isBoolean");

var _isBoolean3 = _interopRequireDefault(_isBoolean2);

var _isFunction2 = require("./isFunction");

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _isInstanceOf2 = require("./isInstanceOf");

var _isInstanceOf3 = _interopRequireDefault(_isInstanceOf2);

var _isInteger2 = require("./isInteger");

var _isInteger3 = _interopRequireDefault(_isInteger2);

var _isNullOrInstanceOf2 = require("./isNullOrInstanceOf");

var _isNullOrInstanceOf3 = _interopRequireDefault(_isNullOrInstanceOf2);

var _isNumber2 = require("./isNumber");

var _isNumber3 = _interopRequireDefault(_isNumber2);

var _isPositiveInteger2 = require("./isPositiveInteger");

var _isPositiveInteger3 = _interopRequireDefault(_isPositiveInteger2);

var _isPositiveNumber2 = require("./isPositiveNumber");

var _isPositiveNumber3 = _interopRequireDefault(_isPositiveNumber2);

var _isString2 = require("./isString");

var _isString3 = _interopRequireDefault(_isString2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.isAudioSource = _isAudioSource3.default;
exports.isBoolean = _isBoolean3.default;
exports.isFunction = _isFunction3.default;
exports.isInstanceOf = _isInstanceOf3.default;
exports.isInteger = _isInteger3.default;
exports.isNullOrInstanceOf = _isNullOrInstanceOf3.default;
exports.isNumber = _isNumber3.default;
exports.isPositiveInteger = _isPositiveInteger3.default;
exports.isPositiveNumber = _isPositiveNumber3.default;
exports.isString = _isString3.default;
},{"./isAudioSource":57,"./isBoolean":58,"./isFunction":59,"./isInstanceOf":60,"./isInteger":61,"./isNullOrInstanceOf":62,"./isNumber":63,"./isPositiveInteger":64,"./isPositiveNumber":65,"./isString":66}],57:[function(require,module,exports){
(function (global){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  description: "AudioNode or an AudioParam",
  typeName: "AudioNode|AudioParam",
  test: function test(value) {
    return value instanceof global.AudioNode || value instanceof global.AudioParam;
  }
};
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],58:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  description: "boolean",
  typeName: "boolean",
  test: function test(value) {
    return typeof value === "boolean";
  }
};
},{}],59:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  description: "function",
  typeName: "function",
  test: function test(value) {
    return typeof value === "function";
  }
};
},{}],60:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isInstanceOf;
function isInstanceOf(klass) {
  return {
    description: klass.name,
    typeName: klass.name,
    test: function test(value) {
      return value instanceof klass;
    }
  };
}
},{}],61:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  description: "integer",
  typeName: "number",
  test: function test(value) {
    return value === (value | 0);
  }
};
},{}],62:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isNullOrInstanceOf;
function isNullOrInstanceOf(klass) {
  return {
    description: klass.name,
    typeName: klass.name + "|null",
    test: function test(value) {
      return value === null || value instanceof klass;
    }
  };
}
},{}],63:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  description: "number",
  typeName: "number",
  test: function test(value) {
    return value === +value;
  }
};
},{}],64:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  description: "positive integer",
  typeName: "number",
  test: function test(value) {
    return value === (value | 0) && 0 <= value;
  }
};
},{}],65:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  description: "positive number",
  typeName: "number",
  test: function test(value) {
    return value === +value && 0 <= value;
  }
};
},{}],66:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  description: "string",
  typeName: "string",
  test: function test(value) {
    return typeof value === "string";
  }
};
},{}],67:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      }
      throw TypeError('Uncaught, unspecified "error" event.');
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}]},{},[1])(1)
});