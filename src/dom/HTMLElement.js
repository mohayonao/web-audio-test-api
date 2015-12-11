import utils from "../utils";
import Element from "./Element";

global.HTMLElement = global.HTMLElement || class HTMLElement extends Element {
  constructor() {
    super();
    throw new TypeError("Illegal constructor");
  }
};

export default class HTMLElement extends utils.preventSuperCall(global.HTMLElement) {}
