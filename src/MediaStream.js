import utils from "./utils";
import EventTarget from "./EventTarget";

global.MediaStream = global.MediaStream || class MediaStream extends EventTarget {
  constructor() {
    super();
    throw new TypeError("Illegal constructor");
  }
};

export default class MediaStream extends utils.preventSuperCall(global.MediaStream) {}
