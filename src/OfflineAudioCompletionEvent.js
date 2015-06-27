import Immigration from "./utils/Immigration";
import Event from "./Event";

let immigration = Immigration.getInstance();

export default class OfflineAudioCompletionEvent extends Event {
  constructor(admission, node) {
    super("complete", node);

    immigration.check(admission, () => {
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
