const dom = require("./dom");
const utils = require("./utils");

module.exports = class OfflineAudioCompletionEvent extends dom.Event {
  static $new(...args) {
    return utils.auth.request((token) => {
      return new OfflineAudioCompletionEvent(token, ...args);
    });
  }

  constructor(token, node) {
    super("complete", node);

    utils.auth.grant(token, () => {
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
};
