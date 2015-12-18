const inLaws = require("../utils/inLaws");
const EventTarget = require("./EventTarget");

global.MediaStream = global.MediaStream || class MediaStream extends EventTarget {
  constructor() {
    super();
    throw new TypeError("Illegal constructor");
  }
};

module.exports = class MediaStream extends inLaws(global.MediaStream) {};
