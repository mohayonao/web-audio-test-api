import Immigration from "./utils/Immigration";
import AudioNode from "./AudioNode";
import AudioParam from "./AudioParam";

let immigration = Immigration.getInstance();

export default class DynamicsCompressorNode extends AudioNode {
  constructor(admission, context) {
    super(admission, {
      name: "DynamicsCompressorNode",
      context: context,
      numberOfInputs: 1,
      numberOfOutputs: 1,
      channelCount: 2,
      channelCountMode: "explicit",
      channelInterpretation: "speakers",
    });

    this._.threshold = immigration.apply(admission =>
      new AudioParam(admission, this, "threshold", -24, -100, 0)
    );
    this._.knee = immigration.apply(admission =>
      new AudioParam(admission, this, "knee", 30, 0, 40)
    );
    this._.ratio = immigration.apply(admission =>
      new AudioParam(admission, this, "ratio", 12, 1, 20)
    );
    this._.reduction = immigration.apply(admission =>
      new AudioParam(admission, this, "reduction", 0, -20, 0)
    );
    this._.attack = immigration.apply(admission =>
      new AudioParam(admission, this, "attack", 0.003, 0, 1.0)
    );
    this._.release = immigration.apply(admission =>
      new AudioParam(admission, this, "release", 0.250, 0, 1.0)
    );
    this._.JSONKeys = DynamicsCompressorNode.$JSONKeys.slice();
  }

  get threshold() {
    return this._.threshold;
  }

  set threshold(value) {
    this._.inspector.describe("threshold", (assert) => {
      assert.throwReadOnlyTypeError(value);
    });
  }

  get knee() {
    return this._.knee;
  }

  set knee(value) {
    this._.inspector.describe("knee", (assert) => {
      assert.throwReadOnlyTypeError(value);
    });
  }

  get ratio() {
    return this._.ratio;
  }

  set ratio(value) {
    this._.inspector.describe("ratio", (assert) => {
      assert.throwReadOnlyTypeError(value);
    });
  }

  get reduction() {
    return this._.reduction;
  }

  set reduction(value) {
    this._.inspector.describe("reduction", (assert) => {
      assert.throwReadOnlyTypeError(value);
    });
  }

  get attack() {
    return this._.attack;
  }

  set attack(value) {
    this._.inspector.describe("attack", (assert) => {
      assert.throwReadOnlyTypeError(value);
    });
  }

  get release() {
    return this._.release;
  }

  set release(value) {
    this._.inspector.describe("release", (assert) => {
      assert.throwReadOnlyTypeError(value);
    });
  }
}

DynamicsCompressorNode.$JSONKeys = [
  "threshold",
  "knee",
  "ratio",
  "reduction",
  "attack",
  "release",
];
