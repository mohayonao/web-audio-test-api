describe("OfflineAudioCompletionEvent", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;
  var audioContext;

  beforeEach(function() {
    audioContext = new WebAudioTestAPI.AudioContext();
  });

  describe("constructor()", function() {
    it("works", function() {
      var node = WebAudioTestAPI.AudioNode.$new({ context: audioContext });
      var event = WebAudioTestAPI.OfflineAudioCompletionEvent.$new(node);

      assert(event instanceof global.OfflineAudioCompletionEvent);
      assert(event instanceof global.Event);

      // test api
      assert(event.$name === "OfflineAudioCompletionEvent");
      assert(event.$node === node);
    });
    it("not work when 'new' directly", function() {
      assert.throws(function() { new global.OfflineAudioCompletionEvent(); }, TypeError);
    });
  });
});
