describe("HTMLElement", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;

  describe("constructor()", function() {
    it("works", function() {
      var element = new WebAudioTestAPI.dom.HTMLElement();

      assert(element instanceof global.window.HTMLElement);
      assert(element instanceof global.window.Element);
    });
    it("not work when 'new' directly", function() {
      assert.throws(function() { new global.HTMLElement(); }, TypeError);
    });
  });
});
