import * as util from "./util";
import EventTarget from "./EventTarget";

global.MediaStream = global.MediaStream || class MediaStream extends EventTarget {
  constructor() {
    super();
    throw new TypeError("Illegal constructor");
  }
};

export default class MediaStream extends util.preventSuperCall(global.MediaStream) {
}
