describe("MediaStream", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;

  describe("constructor()", function() {
    it("works", function() {
      var stream = new WebAudioTestAPI.MediaStream();

      assert(stream instanceof global.window.MediaStream);
      assert(stream instanceof global.window.EventTarget);
    });
    it("not work when 'new' directly", function() {
      assert.throws(function() { new global.MediaStream(); }, TypeError);
    });
  });
});
