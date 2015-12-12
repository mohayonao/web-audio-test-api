describe("EventTarget", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;

  describe("constructor", function() {
    it("()", function() {
      var target = new WebAudioTestAPI.EventTarget();

      assert(target instanceof global.window.EventTarget);

      assert.throws(function() {
        return new global.EventTarget();
      }, TypeError);
    });
  });

  describe("addEventListener", function() {
    it("(type: string, listener: function): void", function() {
      var target = new WebAudioTestAPI.EventTarget();
      var listener1 = sinon.spy();
      var listener2 = sinon.spy();
      var listener3 = sinon.spy();

      target.addEventListener("foo", listener1);
      target.addEventListener("foo", listener2);
      target.addEventListener("bar", listener3);

      assert.deepEqual(target.$listeners("foo"), [ listener1, listener2 ]);
      assert.deepEqual(target.$listeners("bar"), [ listener3 ]);

      assert.throws(function() {
        target.addEventListener(null, sinon.spy());
      }, TypeError);

      assert.throws(function() {
        target.addEventListener("baz", "INVALID");
      }, TypeError);
    });
  });

  describe("removeEventListener", function() {
    it("(type: string, listener: function): void", function() {
      var target = new WebAudioTestAPI.EventTarget();
      var listener1 = sinon.spy();
      var listener2 = sinon.spy();
      var listener3 = sinon.spy();

      target.addEventListener("foo", listener1);
      target.addEventListener("foo", listener2);
      target.addEventListener("bar", listener3);

      target.removeEventListener("foo", listener1);
      target.removeEventListener("bar", listener2);
      target.removeEventListener("baz", listener3);

      assert.deepEqual(target.$listeners("foo"), [ listener2 ]);
      assert.deepEqual(target.$listeners("bar"), [ listener3 ]);

      assert.throws(function() {
        target.removeEventListener(null, sinon.spy());
      }, TypeError);

      assert.throws(function() {
        target.removeEventListener("baz", "INVALID");
      }, TypeError);
    });
  });

  describe("dispatchEvent", function() {
    it("(event: Event): void", function() {
      var target = new WebAudioTestAPI.EventTarget();
      var listener1 = sinon.spy();
      var listener2 = sinon.spy();
      var listener3 = sinon.spy();
      var listener4 = sinon.spy();
      var event = new WebAudioTestAPI.Event("foo");

      target.addEventListener("foo", listener1);
      target.addEventListener("foo", listener2);
      target.addEventListener("bar", listener3);

      target.onfoo = listener4;

      target.dispatchEvent(event);

      assert(listener1.callCount === 1);
      assert(listener2.callCount === 1);
      assert(listener3.callCount === 0);
      assert(listener4.callCount === 1);
      assert(listener1.calledOn(target));
      assert(listener2.calledOn(target));
      assert(listener4.calledOn(target));
      assert(listener1.args[0][0] === event);
      assert(listener2.args[0][0] === event);
      assert(listener4.args[0][0] === event);

      assert.throws(function() {
        target.dispatchEvent({});
      }, TypeError);
    });
  });
});
