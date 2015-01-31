"use strict";

describe("Element", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;

  describe("constructor", function() {
    it("()", function() {
      var element = new WebAudioTestAPI.Element();

      assert(element instanceof global.Element);
      assert(element instanceof global.EventTarget);

      assert.throws(function() {
        global.Element();
      }, function(e) {
        return e instanceof TypeError && /Illegal constructor/.test(e.message);
      });
    });
  });

});
