describe("HTMLMediaElement", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;

  describe("constructor", function() {
    it("()", function() {
      var element = new WebAudioTestAPI.HTMLMediaElement();

      assert(element instanceof global.window.HTMLMediaElement);
      assert(element instanceof global.window.HTMLElement);

      assert.throws(function() {
        return new global.HTMLMediaElement();
      }, function(e) {
        return e instanceof TypeError;
      });
    });
  });
});
