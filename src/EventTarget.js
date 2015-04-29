import * as util from "./util";
import Inspector from "./util/Inspector";

global.EventTarget = global.EventTarget || class EventTarget {
  constructor() {
    throw new TypeError("Illegal constructor");
  }
};

export default class EventTarget extends util.preventSuperCall(global.EventTarget) {
  constructor() {
    super();

    Object.defineProperty(this, "_", {
      value: {
        inspector: new Inspector(this),
      },
    });

    this._.listeners = {};
  }

  addEventListener(type, listener) {
    this._.inspector.describe("addEventListener", (assert) => {
      assert(util.isString(type), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(type, "type", "string")}
        `);
      });

      assert(util.isFunction(listener), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(listener, "listener", "function")}
        `);
      });
    });

    this._.listeners[type] = this._.listeners[type] || [];
    this._.listeners[type].push(listener);
  }

  removeEventListener(type, listener) {
    this._.inspector.describe("removeEventListener", (assert) => {
      assert(util.isString(type), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(type, "type", "string")}
        `);
      });

      assert(util.isFunction(listener), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(listener, "listener", "function")}
        `);
      });
    });

    this._.listeners[type] = this._.listeners[type] || [];
    let index = this._.listeners[type].indexOf(listener);
    if (index !== -1) {
      this._.listeners[type].splice(index, 1);
    }
  }

  dispatchEvent(event) {
    this._.inspector.describe("dispatchEvent", (assert) => {
      assert(util.isInstanceOf(event, global.Event), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(event, "event", "Event")}
        `);
      });
    });

    let type = event.type;

    if (typeof this["on" + type] === "function") {
      this["on" + type].call(this, event);
    }

    this.$listeners(type).forEach((listener) => {
      listener.call(this, event);
    }, this);

    return true;
  }

  $listeners(type) {
    return (this._.listeners[type] || []).slice();
  }
}
