import Immigration from "./utils/Immigration";
import * as props from "./decorators/props";
import * as methods from "./decorators/methods";
import * as validators from "./validators";

let immigration = Immigration.getInstance();

export default class AudioListener {
  constructor(admission, context) {
    immigration.check(admission, () => {
      throw new TypeError("Illegal constructor");
    });
    Object.defineProperty(this, "_", { value: {} });

    this._.context = context;
  }

  @props.typed(validators.isNumber, 1)
  dopplerFactor() {}

  @props.typed(validators.isNumber, 343.3)
  speedOfSound() {}

  @methods.param("x", validators.isNumber)
  @methods.param("y", validators.isNumber)
  @methods.param("z", validators.isNumber)
  setPosition() {}

  @methods.param("x", validators.isNumber)
  @methods.param("y", validators.isNumber)
  @methods.param("z", validators.isNumber)
  @methods.param("xUp", validators.isNumber)
  @methods.param("yUp", validators.isNumber)
  @methods.param("zUp", validators.isNumber)
  setOrientation() {}

  @methods.param("x", validators.isNumber)
  @methods.param("y", validators.isNumber)
  @methods.param("z", validators.isNumber)
  setVelocity() {}

  get $name() {
    return "AudioListener";
  }

  get $context() {
    return this._.context;
  }
}
