const inLaws = require("../utils/inLaws");
const Element = require("./Element");

global.HTMLElement = global.HTMLElement || class HTMLElement extends Element {
  constructor() {
    super();
    throw new TypeError("Illegal constructor");
  }
};

module.exports = class HTMLElement extends inLaws(global.HTMLElement) {};
