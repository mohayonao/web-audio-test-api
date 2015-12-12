import Immigration from "./utils/Immigration";
import Event from "./dom/Event";

let immigration = Immigration.getInstance();

export default class OfflineAudioCompletionEvent extends Event {
  constructor(admission, node) {
    immigration.check(admission, () => {
      throw new TypeError("Illegal constructor");
    });
    super("complete", node);

    this._.node = node;
  }

  get $name() {
    return "OfflineAudioCompletionEvent";
  }

  get $node() {
    return this._.node;
  }
}
