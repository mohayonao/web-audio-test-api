import utils from "./utils";
import HTMLElement from "./HTMLElement";

global.HTMLMediaElement = global.HTMLMediaElement || class HTMLMediaElement extends HTMLElement {
  constructor() {
    super();
    throw new TypeError("Illegal constructor");
  }
};

export default class HTMLMediaElement extends utils.preventSuperCall(global.HTMLMediaElement) {}
