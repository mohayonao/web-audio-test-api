describe("HTMLElement", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;

  describe("constructor()", function() {
    it("works", function() {
      var element = new WebAudioTestAPI.HTMLElement();

      assert(element instanceof global.window.HTMLElement);
      assert(element instanceof global.window.Element);

      assert.throws(function() {
        return new global.HTMLElement();
      }, function(e) {
        return e instanceof TypeError;
      });
    });
  });
});
