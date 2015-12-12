import inLaws from "../utils/inLaws";
import EventTarget from "./EventTarget";

global.Element = global.Element || class Element extends EventTarget {
  constructor() {
    super();
    throw new TypeError("Illegal constructor");
  }
};

export default class Element extends inLaws(global.Element) {}
