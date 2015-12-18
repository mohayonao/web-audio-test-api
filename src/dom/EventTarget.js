const EventEmitter = require("events").EventEmitter;
const Event = require("./Event");
const inLaws = require("../utils/inLaws");
const methods = require("../testapi/decorators/methods");
const validators = require("../testapi/validators");

const EMITTER = Symbol("emitter");

global.EventTarget = global.EventTarget || class EventTarget {
  constructor() {
    throw new TypeError("Illegal constructor");
  }
};

module.exports = class EventTarget extends inLaws(global.EventTarget) {
  constructor() {
    super();

    this[EMITTER] = new EventEmitter();
  }

  @methods.param("type", validators.isString)
  @methods.param("listener", validators.isFunction)
  addEventListener(type, listener) {
    this[EMITTER].addListener(type, listener);
  }

  @methods.param("type", validators.isString)
  @methods.param("listener", validators.isFunction)
  removeEventListener(type, listener) {
    this[EMITTER].removeListener(type, listener);
  }

  @methods.param("event", validators.isInstanceOf(Event))
  dispatchEvent(event) {
    const type = event.type;
    const callback = this["on" + type];

    if (typeof callback === "function") {
      this::callback(event);
    }

    this[EMITTER].listeners(type).forEach((listener) => {
      this::listener(event);
    });

    return true;
  }

  $addListener(event, listener) {
    this[EMITTER].addListener(event, listener);
    return this;
  }

  $emit(...args) {
    this[EMITTER].emit(...args);
    return this;
  }

  $getMaxListeners() {
    return this[EMITTER].getMaxListeners();
  }

  $listenerCount(type) {
    return this[EMITTER].listenerCount(type);
  }

  $listeners(event) {
    return this[EMITTER].listeners(event);
  }

  $on(event, listener) {
    this[EMITTER].on(event, listener);
    return this;
  }

  $once(event, listener) {
    this[EMITTER].on(event, listener);
    return this;
  }

  $removeAllListeners(event) {
    this[EMITTER].removeAllListeners(event);
    return this;
  }

  $removeListener(event, listener) {
    this[EMITTER].removeAllListeners(event, listener);
    return this;
  }

  $setMaxListeners(event, listener) {
    this[EMITTER].setMaxListeners(event, listener);
    return this;
  }
};
