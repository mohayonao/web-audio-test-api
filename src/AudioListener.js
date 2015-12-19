const testapi = require("./testapi");
const utils = require("./utils");

module.exports = class AudioListener {
  static $new(...args) {
    return utils.auth.request((token) => {
      return new AudioListener(token, ...args);
    });
  }

  constructor(token, context) {
    utils.auth.grant(token, () => {
      throw new TypeError("Illegal constructor");
    });
    Object.defineProperty(this, "_", { value: {} });

    this._.context = context;
  }

  @testapi.props.typed(testapi.isNumber, 1)
  dopplerFactor() {}

  @testapi.props.typed(testapi.isNumber, 343.3)
  speedOfSound() {}

  @testapi.methods.param("x", testapi.isNumber)
  @testapi.methods.param("y", testapi.isNumber)
  @testapi.methods.param("z", testapi.isNumber)
  setPosition() {}

  @testapi.methods.param("x", testapi.isNumber)
  @testapi.methods.param("y", testapi.isNumber)
  @testapi.methods.param("z", testapi.isNumber)
  @testapi.methods.param("xUp", testapi.isNumber)
  @testapi.methods.param("yUp", testapi.isNumber)
  @testapi.methods.param("zUp", testapi.isNumber)
  setOrientation() {}

  @testapi.methods.param("x", testapi.isNumber)
  @testapi.methods.param("y", testapi.isNumber)
  @testapi.methods.param("z", testapi.isNumber)
  setVelocity() {}

  get $name() {
    return "AudioListener";
  }

  get $context() {
    return this._.context;
  }
};
