"use strict";

/* istanbul ignore if */
if (global.WEB_AUDIO_TEST_API_IGNORE) {
  return;
}

var WebAudioTestAPI = {};

WebAudioTestAPI.VERSION = "0.1.16";
WebAudioTestAPI.sampleRate = 44100;

// TODO: DEPRECATED
WebAudioTestAPI.bufferSize = 128;
WebAudioTestAPI.currentTimeIncr = WebAudioTestAPI.bufferSize / WebAudioTestAPI.sampleRate;

global.WebAudioTestAPI = WebAudioTestAPI;

global.AudioContext = require("./AudioContext");
global.OfflineAudioContext = require("./OfflineAudioContext");

module.exports = WebAudioTestAPI;
