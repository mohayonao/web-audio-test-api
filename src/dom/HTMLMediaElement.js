const inLaws = require("./inLaws");
const HTMLElement = require("./HTMLElement");

global.HTMLMediaElement = global.HTMLMediaElement || class HTMLMediaElement extends HTMLElement {
  constructor() {
    super();
    throw new TypeError("Illegal constructor");
  }
};

module.exports = class HTMLMediaElement extends inLaws(global.HTMLMediaElement) {};
