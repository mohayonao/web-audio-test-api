describe("OfflineAudioCompletionEvent", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;
  var util = WebAudioTestAPI.util;

  describe("constructor", function() {
    it("()", function() {
      var event = util.immigration.apply(function(admission) {
        return new WebAudioTestAPI.OfflineAudioCompletionEvent(admission);
      });

      assert(event instanceof global.OfflineAudioCompletionEvent);
      assert(event instanceof global.Event);

      assert.throws(function() {
        return new global.OfflineAudioCompletionEvent();
      }, function(e) {
        return e instanceof TypeError && /Illegal constructor/.test(e.message);
      });
    });
  });
});
