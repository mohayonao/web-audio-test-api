describe("HTMLMediaElement", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;

  describe("constructor()", function() {
    it("works", function() {
      var element = new WebAudioTestAPI.dom.HTMLMediaElement();

      assert(element instanceof global.window.HTMLMediaElement);
      assert(element instanceof global.window.HTMLElement);
    });
    it("not work when 'new' directly", function() {
      assert.throws(function() { new global.HTMLMediaElement(); }, TypeError);
    });
  });
});
