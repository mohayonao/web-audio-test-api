describe("Event", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;

  function Foo() {}

  describe("constructor()", function() {
    it("works", function() {
      var foo = new Foo();
      var e = new WebAudioTestAPI.Event("name", foo);

      assert(e instanceof global.window.Event);
      assert(e.type === "name");
      assert(e.target === foo);
      assert(typeof e.timestamp === "number");
    });
  });
});
