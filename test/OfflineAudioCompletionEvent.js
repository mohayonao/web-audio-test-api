describe("OfflineAudioCompletionEvent", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;
  var utils = WebAudioTestAPI.utils;
  var immigration = utils.Immigration.getInstance();
  var audioContext;

  beforeEach(function() {
    audioContext = new WebAudioTestAPI.AudioContext();
  });

  describe("constructor", function() {
    it("()", function() {
      var node = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioNode(admission, { context: audioContext });
      });
      var event = immigration.apply(function(admission) {
        return new WebAudioTestAPI.OfflineAudioCompletionEvent(admission, node);
      });

      assert(event instanceof global.OfflineAudioCompletionEvent);
      assert(event instanceof global.Event);

      assert.throws(function() {
        return new global.OfflineAudioCompletionEvent();
      }, function(e) {
        return e instanceof TypeError && /Illegal constructor/.test(e.message);
      });

      // test api
      assert(event.$name === "OfflineAudioCompletionEvent");
      assert(event.$node === node);
    });
  });
});
