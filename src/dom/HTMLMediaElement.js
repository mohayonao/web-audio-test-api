import inLaws from "../utils/inLaws";
import HTMLElement from "./HTMLElement";

global.HTMLMediaElement = global.HTMLMediaElement || class HTMLMediaElement extends HTMLElement {
  constructor() {
    super();
    throw new TypeError("Illegal constructor");
  }
};

export default class HTMLMediaElement extends inLaws(global.HTMLMediaElement) {}
