"use strict";

var _ = require("./utils");
var Inspector = require("./utils/Inspector");

/* istanbul ignore else */
if (typeof global.EventTarget === "undefined") {
  global.EventTarget = function EventTarget() {
    throw new TypeError("Illegal constructor");
  };
}

function EventTarget() {
  this._listeners = {};
}
_.inherits(EventTarget, global.EventTarget);

EventTarget.prototype.addEventListener = function(type, listener) {
  var inspector = new Inspector(this, "addEventListener", [
    { name: "type", type: "string" },
    { name: "listener", type: "function" },
  ]);

  inspector.validateArguments(arguments, function(msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });

  this._listeners[type] = this._listeners[type] || /* istanbul ignore next */ [];
  this._listeners[type].push(listener);
};

EventTarget.prototype.removeEventListener = function(type, listener) {
  var inspector = new Inspector(this, "addEventListener", [
    { name: "type", type: "string" },
    { name: "listener", type: "function" },
  ]);

  inspector.validateArguments(arguments, function(msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });

  this._listeners[type] = this._listeners[type] || /* istanbul ignore next */ [];
  var index = this._listeners[type].indexOf(listener);
  if (index !== -1) {
    this._listeners[type].splice(index, 1);
  }
};

EventTarget.prototype.dispatchEvent = function(event) {
  var inspector = new Inspector(this, "addEventListener", [
    { name: "event", type: "Event" },
  ]);

  inspector.validateArguments(arguments, function(msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });

  var type = event.type;

  /* istanbul ignore else */
  if (typeof this["on" + type] === "function") {
    this["on" + type].call(this, event);
  }

  this.$listeners(type).forEach(function(listener) {
    listener.call(this, event);
  }, this);

  return true;
};

EventTarget.prototype.$listeners = function(type) {
  return (this._listeners[type] || /* istanbul ignore next */ []).slice();
};

module.exports = global.WebAudioTestAPI.EventTarget = EventTarget;
