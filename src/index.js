const WebAudioTestAPI = require("./WebAudioTestAPI");

if (!global.WEB_AUDIO_TEST_API_IGNORE) {
  WebAudioTestAPI.use();
}

module.exports = WebAudioTestAPI;
