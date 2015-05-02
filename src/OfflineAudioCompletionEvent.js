import * as util from "./util";
import Event from "./Event";

export default class OfflineAudioCompletionEvent extends Event {
  constructor(admission, node) {
    super("complete", node);

    util.immigration.check(admission, () => {
      throw new TypeError("Illegal constructor");
    });

    this._.node = node;
  }

  get $name() {
    return "OfflineAudioCompletionEvent";
  }

  get $node() {
    return this._.node;
  }
}
