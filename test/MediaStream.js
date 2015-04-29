describe("MediaStream", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;

  describe("constructor", function() {
    it("()", function() {
      var stream = new WebAudioTestAPI.MediaStream();

      assert(stream instanceof global.window.MediaStream);
      assert(stream instanceof global.window.EventTarget);

      assert.throws(function() {
        return new global.MediaStream();
      }, function(e) {
        return e instanceof TypeError && /Illegal constructor/.test(e.message);
      });
    });
  });

});
