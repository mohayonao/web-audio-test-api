"use strict";

/* istanbul ignore else */
if (!global.WEB_AUDIO_TEST_API_IGNORE) {
  require("./AudioContext");
  require("./OfflineAudioContext");

  var WebAudioTestAPI = require("./WebAudioTestAPI");

  WebAudioTestAPI.use();

  module.exports = global.WebAudioTestAPI = WebAudioTestAPI;
}
