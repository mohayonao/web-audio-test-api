const dom = require("./dom");
const utils = require("./utils");

module.exports = class AudioProcessingEvent extends dom.Event {
  static $new(...args) {
    return utils.auth.request((token) => {
      return new AudioProcessingEvent(token, ...args);
    });
  }

  constructor(token, node) {
    super("audioprocess", node);

    utils.auth.grant(token, () => {
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
