const utils = require("../utils");

module.exports = class Junction {
  constructor(node, index) {
    this.node = node;
    this.index = index;
    this.inputs = [];
    this.outputs = [];
  }

  connect(destination) {
    utils.appendIfNotExists(this.outputs, destination);
    utils.appendIfNotExists(destination.inputs, this);
  }

  disconnectAll() {
    this.outputs.splice(0).forEach((destination) => {
      utils.removeIfExists(destination.inputs, this);
    });
  }

  disconnectNode(node) {
    for (let i = this.outputs.length - 1; i >= 0; i--) {
      let destination = this.outputs[i];

      if (destination.node === node) {
        this.outputs.splice(i, 1);
        utils.removeIfExists(destination.inputs, this);
      }
    }
  }

  disconnectChannel(node, input) {
    for (let i = this.outputs.length - 1; i >= 0; i--) {
      let destination = this.outputs[i];

      if (destination.node === node && destination.index === input) {
        this.outputs.splice(i, 1);
        utils.removeIfExists(destination.inputs, this);
      }
    }
  }

  isConnected(destination) {
    return this.outputs.some(junction => junction.node === destination);
  }

  process(inNumSamples, tick) {
    this.inputs.forEach((junction) => {
      junction.node.$process(inNumSamples, tick);
    });
  }

  toJSON(memo) {
    return this.inputs.map(junction => junction.node.toJSON(memo));
  }
};
