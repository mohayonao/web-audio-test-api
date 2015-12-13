import Immigration from "./utils/Immigration";
import Event from "./dom/Event";

export default class OfflineAudioCompletionEvent extends Event {
  static $new(...args) {
    return Immigration.getInstance().
      apply(admission => new OfflineAudioCompletionEvent(admission, ...args));
  }

  constructor(admission, node) {
    super("complete", node);

    Immigration.getInstance().
      check(admission, () => { throw new TypeError("Illegal constructor"); });

    this._.node = node;
  }

  get $name() {
    return "OfflineAudioCompletionEvent";
  }

  get $node() {
    return this._.node;
  }
}
