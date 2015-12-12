describe("WebAudioTestAPI", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;

  after(function() {
    WebAudioTestAPI.use();
  });

  describe("VERSION: string", function() {
    it("works", function() {
      assert(typeof WebAudioTestAPI.VERSION === "string");
      if (typeof global.WEB_AUDIO_TEST_API_VERSION === "string") {
        assert(WebAudioTestAPI.VERSION === global.WEB_AUDIO_TEST_API_VERSION);
      }
    });
  });

  describe("sampleRate: number", function() {
    it("works", function() {
      assert(typeof WebAudioTestAPI.sampleRate === "number");
    });
  });

  describe("getState(name: string): string", function() {
    it("works", function() {
      assert(WebAudioTestAPI.getState("AnalyserNode#getFloatTimeDomainData") === "disabled");
    });
  });

  describe("setState(name: string, value: string): string", function() {
    it("works", function() {
      WebAudioTestAPI.setState({
        "AnalyserNode#getFloatTimeDomainData": "enabled"
      });

      assert(WebAudioTestAPI.getState("AnalyserNode#getFloatTimeDomainData") === "enabled");

      WebAudioTestAPI.setState({
        "AnalyserNode#getFloatTimeDomainData": "disabled"
      });
    });
  });

  describe("unuse(): void", function() {
    it("works", function() {
      WebAudioTestAPI.unuse();

      assert(global.AudioContext !== WebAudioTestAPI.AudioContext);
      assert(global.OfflineAudioContext !== WebAudioTestAPI.OfflineAudioContext);
    });
  });

  describe("use(): void", function() {
    it("works", function() {
      WebAudioTestAPI.use();

      assert(global.AudioContext === WebAudioTestAPI.AudioContext);
      assert(global.OfflineAudioContext === WebAudioTestAPI.OfflineAudioContext);
    });
  });
});
