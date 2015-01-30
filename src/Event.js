"use strict";

var _ = require("./utils");

function Event(name, target) {
  this.type = name;
  this.target = _.defaults(target, null);
  this.timeStamp = Date.now();
}
_.inherits(Event, global.Event);

/* istanbul ignore else */
if (typeof global.Event === "undefined") {
  global.Event = Event;
}

module.exports = global.WebAudioTestAPI.Event = Event;
