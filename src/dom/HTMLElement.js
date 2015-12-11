import inLaws from "../utils/inLaws";
import Element from "./Element";

global.HTMLElement = global.HTMLElement || class HTMLElement extends Element {
  constructor() {
    super();
    throw new TypeError("Illegal constructor");
  }
};

export default class HTMLElement extends inLaws(global.HTMLElement) {}
