import Event from "./dom/Event";
import auth from "./utils/auth";

export default class OfflineAudioCompletionEvent extends Event {
  static $new(...args) {
    return auth.request((token) => {
      return new OfflineAudioCompletionEvent(token, ...args);
    });
  }

  constructor(token, node) {
    super("complete", node);

    auth.grant(token, () => {
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
