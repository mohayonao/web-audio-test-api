import Immigration from "./utils/Immigration";
import Event from "./Event";

let immigration = Immigration.getInstance();

export default class AudioProcessingEvent extends Event {
  constructor(admission, node) {
    super("audioprocess", node);

    immigration.check(admission, () => {
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
