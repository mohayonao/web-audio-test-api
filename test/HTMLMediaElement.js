"use strict";

describe("HTMLMediaElement", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;

  describe("constructor", function() {
    it("()", function() {
      var element = new WebAudioTestAPI.HTMLMediaElement();

      assert(element instanceof global.HTMLMediaElement);
      assert(element instanceof global.HTMLElement);

      assert.throws(function() {
        global.HTMLMediaElement();
      }, function(e) {
        return e instanceof TypeError && /Illegal constructor/.test(e.message);
      });
    });
  });

});
