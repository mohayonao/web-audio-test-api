import utils from "./utils";

export function isConnectable(destination) {
  return utils.isInstanceOf(destination, global.AudioNode) || utils.isInstanceOf(destination, global.AudioParam);
}

export function disconnectAll() {
  this._.outputs.forEach((junction) => {
    junction.disconnectAll();
  });
}

export function disconnectChannel(output) {
  this._.inspector.describe("disconnect", [ "output" ], (assert) => {
    assert(utils.isPositiveInteger(output), (fmt) => {
      throw new TypeError(fmt.plain `
        ${fmt.form};
        ${fmt.butGot(output, "output", "positive integer")}
      `);
    });

    assert(output < this.numberOfOutputs, (fmt) => {
      throw new TypeError(fmt.plain `
        ${fmt.form};
        output index (${output}) exceeds number of outputs (${this.numberOfOutputs})
      `);
    });
  });

  this._.outputs[output].disconnectAll();
}

export function disconnectSelective1(destination) {
  this._.inspector.describe("disconnect", [ "destination" ], (assert) => {
    assert(isConnectable(destination), (fmt) => {
      throw new TypeError(fmt.plain `
        ${fmt.form};
        ${fmt.butGot(destination, "destination", "AudioNode or an AudioParam")}
      `);
    });

    let isConnectedDestination = this._.outputs.some(junction => junction.isConnected(destination));

    assert(isConnectedDestination, (fmt) => {
      throw new TypeError(fmt.plain `
        ${fmt.form};
        the given destination is not connected
      `);
    });
  });

  this._.outputs.forEach((junction) => {
    junction.disconnectNode(destination);
  });
}

export function disconnectSelective2(destination, output) {
  this._.inspector.describe("disconnect", [ "destination", "output" ], (assert) => {
    assert(isConnectable(destination), (fmt) => {
      throw new TypeError(fmt.plain `
        ${fmt.form};
        ${fmt.butGot(destination, "destination", "AudioNode or an AudioParam")}
      `);
    });

    let isConnectedDestination = this._.outputs.some(junction => junction.isConnected(destination));

    assert(isConnectedDestination, (fmt) => {
      throw new TypeError(fmt.plain `
        ${fmt.form};
        the given destination is not connected
      `);
    });

    assert(utils.isInteger(output), (fmt) => {
      throw new TypeError(fmt.plain `
        ${fmt.form};
        ${fmt.butGot(output, "output", "integer")}
      `);
    });

    assert(0 <= output && output < this.numberOfOutputs, (fmt) => {
      throw new TypeError(fmt.plain `
        ${fmt.form};
        ${fmt.outsideTheRange(output, "output", 0, this.numberOfOutputs)}
      `);
    });
  });

  this._.outputs[output].disconnectNode(destination);
}

export function disconnectSelective3(destination, output, input) {
  this._.inspector.describe("disconnect", [ "destination", "output", "input" ], (assert) => {
    assert(isConnectable(destination), (fmt) => {
      throw new TypeError(fmt.plain `
        ${fmt.form};
        ${fmt.butGot(destination, "destination", "AudioNode or an AudioParam")}
      `);
    });

    let isConnectedDestination = this._.outputs.some(junction => junction.isConnected(destination));

    assert(isConnectedDestination, (fmt) => {
      throw new TypeError(fmt.plain `
        ${fmt.form};
        the given destination is not connected
      `);
    });

    assert(utils.isInteger(output), (fmt) => {
      throw new TypeError(fmt.plain `
        ${fmt.form};
        ${fmt.butGot(output, "output", "integer")}
      `);
    });

    assert(utils.isInteger(input), (fmt) => {
      throw new TypeError(fmt.plain `
        ${fmt.form};
        ${fmt.butGot(input, "input", "integer")}
      `);
    });

    assert(0 <= output && output < this.numberOfOutputs, (fmt) => {
      throw new TypeError(fmt.plain `
        ${fmt.form};
        ${fmt.outsideTheRange(output, "output", 0, this.numberOfOutputs)}
      `);
    });

    assert(0 <= input && input < destination.numberOfInputs, (fmt) => {
      throw new TypeError(fmt.plain `
        ${fmt.form};
        ${fmt.outsideTheRange(input, "input", 0, this.numberOfOutputs)}
      `);
    });
  });

  this._.outputs[output].disconnectChannel(destination, input);
}

export default {
  disconnectAll,
  disconnectChannel,
  disconnectSelective1,
  disconnectSelective2,
  disconnectSelective3,
};
