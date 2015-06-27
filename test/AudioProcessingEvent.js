describe("AudioProcessingEvent", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;
  var utils = WebAudioTestAPI.utils;
  var immigration = utils.Immigration.getInstance();

  describe("constructor", function() {
    it("()", function() {
      var event = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioProcessingEvent(admission);
      });

      assert(event instanceof global.AudioProcessingEvent);
      assert(event instanceof global.Event);

      assert.throws(function() {
        return new global.AudioProcessingEvent();
      }, function(e) {
        return e instanceof TypeError && /Illegal constructor/.test(e.message);
      });
    });
  });
});
