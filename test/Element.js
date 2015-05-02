describe("Element", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;

  describe("constructor", function() {
    it("()", function() {
      var element = new WebAudioTestAPI.Element();

      assert(element instanceof global.window.Element);

      assert.throws(function() {
        return new global.Element();
      }, function(e) {
        return e instanceof TypeError;
      });
    });
  });

});
