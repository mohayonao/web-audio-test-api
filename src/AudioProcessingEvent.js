import Immigration from "./utils/Immigration";
import Event from "./dom/Event";

export default class AudioProcessingEvent extends Event {
  static $new(...args) {
    return Immigration.getInstance().
      apply(admission => new AudioProcessingEvent(admission, ...args));
  }

  constructor(admission, node) {
    super("audioprocess", node);

    Immigration.getInstance().
      check(admission, () => { throw new TypeError("Illegal constructor"); });

    this._.node = node;
  }

  get $name() {
    return "AudioProcessingEvent";
  }

  get $node() {
    return this._.node;
  }
}
