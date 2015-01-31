"use strict";

describe("HTMLElement", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;

  describe("constructor", function() {
    it("()", function() {
      var element = new WebAudioTestAPI.HTMLElement();

      assert(element instanceof global.HTMLElement);
      assert(element instanceof global.Element);

      assert.throws(function() {
        global.HTMLElement();
      }, function(e) {
        return e instanceof TypeError && /Illegal constructor/.test(e.message);
      });
    });
  });

});
