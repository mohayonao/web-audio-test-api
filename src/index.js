"use strict";

/* istanbul ignore if */
if (global.WEB_AUDIO_TEST_API_IGNORE) {
  return;
}

var WebAudioAPI = {};

WebAudioAPI.AudioContext = global.AudioContext || global.webkitAudioContext;
WebAudioAPI.OfflineAudioContext = global.OfflineAudioContext || global.webkitOfflineAudioContext;

var WebAudioTestAPI = {};

WebAudioTestAPI.VERSION = "0.1.16";
WebAudioTestAPI.sampleRate = 44100;

// TODO: DEPRECATED
WebAudioTestAPI.bufferSize = 128;
WebAudioTestAPI.currentTimeIncr = WebAudioTestAPI.bufferSize / WebAudioTestAPI.sampleRate;

global.WebAudioTestAPI = WebAudioTestAPI;

global.AudioContext = require("./AudioContext");
global.OfflineAudioContext = require("./OfflineAudioContext");

WebAudioTestAPI.use = function() {
  global.AudioContext = WebAudioTestAPI.AudioContext;
  global.OfflineAudioContext = WebAudioTestAPI.OfflineAudioContext;
};

WebAudioTestAPI.unuse = function() {
  global.AudioContext = WebAudioAPI.AudioContext;
  global.OfflineAudioContext = WebAudioAPI.OfflineAudioContext;
};

module.exports = WebAudioTestAPI;
