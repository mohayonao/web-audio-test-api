const Event = require("./dom/Event");
const auth = require("./utils/auth");

module.exports = class AudioProcessingEvent extends Event {
  static $new(...args) {
    return auth.request((token) => {
      return new AudioProcessingEvent(token, ...args);
    });
  }

  constructor(token, node) {
    super("audioprocess", node);

    auth.grant(token, () => {
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
};
