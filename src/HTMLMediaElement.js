import * as util from "./util";
import HTMLElement from "./HTMLElement";

global.HTMLMediaElement = global.HTMLMediaElement || class HTMLMediaElement extends HTMLElement {
  constructor() {
    super();
    throw new TypeError("Illegal constructor");
  }
};

export default class HTMLMediaElement extends util.preventSuperCall(global.HTMLMediaElement) {
}
