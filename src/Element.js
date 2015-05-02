import * as util from "./util";
import EventTarget from "./EventTarget";

global.Element = global.Element || class Element extends EventTarget {
  constructor() {
    super();
    throw new TypeError("Illegal constructor");
  }
};

export default class Element extends util.preventSuperCall(global.Element) {
}
