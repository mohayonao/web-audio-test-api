describe("AudioProcessingEvent", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;
  var utils = WebAudioTestAPI.utils;
  var immigration = utils.Immigration.getInstance();
  var audioContext;

  beforeEach(function() {
    audioContext = new WebAudioTestAPI.AudioContext();
  });

  describe("constructor()", function() {
    it("works", function() {
      var node = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioNode(admission, { context: audioContext });
      });
      var event = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioProcessingEvent(admission, node);
      });

      assert(event instanceof global.AudioProcessingEvent);
      assert(event instanceof global.Event);

      // test api
      assert(event.$name === "AudioProcessingEvent");
      assert(event.$node === node);
    });
    it("not work when 'new' directly", function() {
      assert.throws(function() { new global.AudioProcessingEvent(); }, TypeError);
    });
  });
});
