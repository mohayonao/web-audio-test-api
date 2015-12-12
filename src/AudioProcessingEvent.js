import Immigration from "./utils/Immigration";
import Event from "./dom/Event";

let immigration = Immigration.getInstance();

export default class AudioProcessingEvent extends Event {
  constructor(admission, node) {
    immigration.check(admission, () => {
      throw new TypeError("Illegal constructor");
    });
    super("audioprocess", node);

    this._.node = node;
  }

  get $name() {
    return "AudioProcessingEvent";
  }

  get $node() {
    return this._.node;
  }
}
