import * as util from "./util";
import Event from "./Event";

export default class AudioProcessingEvent extends Event {
  constructor(admission, node) {
    super("audioprocess", node);

    util.immigration.check(admission, () => {
      throw new TypeError("Illegal constructor");
    });

    this._.node = node;
  }

  get $name() {
    return "AudioProcessingEvent";
  }

  get $node() {
    return this._.node;
  }
}
