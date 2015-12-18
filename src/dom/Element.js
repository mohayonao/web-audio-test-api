const inLaws = require("../utils/inLaws");
const EventTarget = require("./EventTarget");

global.Element = global.Element || class Element extends EventTarget {
  constructor() {
    super();
    throw new TypeError("Illegal constructor");
  }
};

module.exports = class Element extends inLaws(global.Element) {};
