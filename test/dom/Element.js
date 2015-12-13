describe("Element", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;

  describe("constructor()", function() {
    it("works", function() {
      var element = new WebAudioTestAPI.Element();

      assert(element instanceof global.window.Element);
    });
    it("not work when 'new' directly", function() {
      assert.throws(function() { new global.Element(); }, TypeError);
    });
  });
});
