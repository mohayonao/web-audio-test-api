import * as util from "./util";
import Element from "./Element";

global.HTMLElement = global.HTMLElement || class HTMLElement extends Element {
  constructor() {
    super();
    throw new TypeError("Illegal constructor");
  }
};

export default class HTMLElement extends util.preventSuperCall(global.HTMLElement) {
}
