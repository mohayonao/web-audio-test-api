import WebAudioTestAPI from "./WebAudioTestAPI";

if (!global.WEB_AUDIO_TEST_API_IGNORE) {
  WebAudioTestAPI.use();
}

export default WebAudioTestAPI;
