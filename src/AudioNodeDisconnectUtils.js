import * as methods from "./decorators/methods";
import * as validators from "./validators";

export default class AudioNodeDisconnectUtils {
  static disconnectAll() {
    this._.outputs.forEach((junction) => {
      junction.disconnectAll();
    });
  }

  @methods.param("output", validators.isPositiveInteger)
  @methods.contract({
    precondition(output) {
      if (this.numberOfOutputs <= output) {
        throw new TypeError(`output index (${output}) exceeds number of outputs (${this.numberOfOutputs})`);
      }
    }
  })
  static disconnectChannel(output) {
    this._.outputs[output].disconnectAll();
  }

  @methods.param("destination", validators.isAudioSource)
  @methods.contract({
    precondition(destination) {
      if (!this._.outputs.some(junction => junction.isConnected(destination))) {
        throw new TypeError("the given destination is not connected");
      }
    }
  })
  static disconnectSelective1(destination) {
    this._.outputs.forEach((junction) => {
      junction.disconnectNode(destination);
    });
  }

  @methods.param("destination", validators.isAudioSource)
  @methods.param("output", validators.isPositiveInteger)
  @methods.contract({
    precondition(destination, output) {
      if (!this._.outputs.some(junction => junction.isConnected(destination))) {
        throw new TypeError("the given destination is not connected");
      }
      if (output < 0 || this.numberOfOutputs <= output) {
        throw new TypeError(`output provided (${output}) is outside the range [0, ${this.numberOfOutputs})`);
      }
    }
  })
  static disconnectSelective2(destination, output) {
    this._.outputs[output].disconnectNode(destination);
  }

  @methods.param("destination", validators.isAudioSource)
  @methods.param("output", validators.isPositiveInteger)
  @methods.param("input", validators.isPositiveInteger)
  @methods.contract({
    precondition(destination, output, input) {
      if (!this._.outputs.some(junction => junction.isConnected(destination))) {
        throw new TypeError("the given destination is not connected");
      }
      if (output < 0 || this.numberOfOutputs <= output) {
        throw new TypeError(`output provided (${output}) is outside the range [0, ${this.numberOfOutputs})`);
      }
      if (input < 0 || destination.numberOfInputs <= input) {
        throw new TypeError(`input provided (${input}) is outside the range [0, ${this.numberOfInputs})`);
      }
    }
  })
  static disconnectSelective3(destination, output, input) {
    this._.outputs[output].disconnectChannel(destination, input);
  }
}
