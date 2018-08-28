import Configuration from "./utils/Configuration";
import Immigration from "./utils/Immigration";
import Junction from "./utils/Junction";
import EventTarget from "./dom/EventTarget";
import defaults from "./utils/defaults";
import toJSON from "./utils/toJSON";
import toNodeName from "./utils/toNodeName";
import * as props from "./decorators/props";
import * as methods from "./decorators/methods";
import * as validators from "./validators";

let configuration = Configuration.getInstance();
let immigration = Immigration.getInstance();

export default class AudioNode extends EventTarget {
  static $JSONKeys = [];

  constructor(admission, spec) {
    immigration.check(admission, () => {
      throw new TypeError("Illegal constructor");
    });
    super();

    Object.defineProperty(this, "_", { value: {} });

    this._.context = spec.context;
    this.__createAudioNode(spec);
  }

  @methods.contract({
    precondition() {
      if (this._.context.state === "closed") {
        throw new TypeError(`AudioContext has been closed`);
      }
    }
  })
  __createAudioNode(spec) {
    this._.name = defaults(spec.name, "AudioNode");
    this._.numberOfInputs = defaults(spec.numberOfInputs, 1);
    this._.numberOfOutputs = defaults(spec.numberOfOutputs, 1);
    this._.channelCount = defaults(spec.channelCount, 2);
    this._.channelCountMode = defaults(spec.channelCountMode, "max");
    this._.channelInterpretation = defaults(spec.channelInterpretation, "speakers");
    this._.inputs = new Array(this._.numberOfInputs).fill().map(i => new Junction(this, i));
    this._.outputs = new Array(this._.numberOfOutputs).fill().map(i => new Junction(this, i));
    this._.tick = -1;
  }

  @props.readonly()
  context() {
    return this._.context;
  }

  @props.readonly()
  numberOfInputs() {
    return this._.numberOfInputs;
  }

  @props.readonly()
  numberOfOutputs() {
    return this._.numberOfOutputs;
  }

  @props.typed(validators.isPositiveInteger, 2)
  channelCount() {}

  @props.enums([ "max", "clamped-max", "explicit" ])
  channelCountMode() {}

  @props.enums([ "speakers", "discrete" ])
  channelInterpretation() {}

  @methods.param("destination", validators.isAudioSource)
  @methods.param("[ output ]", validators.isPositiveInteger)
  @methods.param("[ input ]", validators.isPositiveInteger)
  @methods.contract({
    precondition(destination, output = 0, input = 0) {
      if (this.$context !== destination.$context) {
        throw new TypeError("Cannot connect to a destination belonging to a different AudioContext.");
      }
      if (this.numberOfOutputs <= output) {
        throw new TypeError(`The {{output}} index (${output}) exceeds number of outputs (${this.numberOfOutputs}).`);
      }
      if ((destination.numberOfInputs || 1) <= input) {
        throw new TypeError(`The {{input}} index (${input}) exceeds number of inputs (${destination.numberOfInputs}).`);
      }
    }
  })
  connect(destination, output = 0, input = 0) {
    this._.outputs[output].connect(destination.$inputs[input]);
  }

  disconnect(destination, output, input) {
    if (configuration.getState("AudioNode#disconnect") !== "selective") {
      return this.__disconnect$$Channel(defaults(destination, 0));
    }

    switch (arguments.length) {
    case 0:
      return this.__disconnect$$All();
    case 1:
      if (typeof destination === "number") {
        return this.__disconnect$$Channel(destination);
      }
      return this.__disconnect$$Selective1(destination);
    case 2:
      return this.__disconnect$$Selective2(destination, output);
    case 3:
      return this.__disconnect$$Selective3(destination, output, input);
    default:
      // no default
    }
  }

  __disconnect$$All() {
    this._.outputs.forEach((junction) => {
      junction.disconnectAll();
    });
  }

  @methods.param("output", validators.isPositiveInteger)
  @methods.contract({
    precondition(output) {
      if (this.numberOfOutputs <= output) {
        throw new TypeError(`The {{output}} index (${output}) exceeds number of outputs (${this.numberOfOutputs}).`);
      }
    }
  })
  __disconnect$$Channel(output) {
    this._.outputs[output].disconnectAll();
  }

  @methods.param("destination", validators.isAudioSource)
  @methods.contract({
    precondition(destination) {
      if (!this._.outputs.some(junction => junction.isConnected(destination))) {
        throw new TypeError("The given {{destination}} is not connected.");
      }
    }
  })
  __disconnect$$Selective1(destination) {
    this._.outputs.forEach((junction) => {
      junction.disconnectNode(destination);
    });
  }

  @methods.param("destination", validators.isAudioSource)
  @methods.param("output", validators.isPositiveInteger)
  @methods.contract({
    precondition(destination, output) {
      if (!this._.outputs.some(junction => junction.isConnected(destination))) {
        throw new TypeError("The given {{destination}} is not connected.");
      }
      if (this.numberOfOutputs <= output) {
        throw new TypeError(`The {{output}} provided (${output}) is outside the range [0, ${this.numberOfOutputs}).`);
      }
    }
  })
  __disconnect$$Selective2(destination, output) {
    this._.outputs[output].disconnectNode(destination);
  }

  @methods.param("destination", validators.isAudioSource)
  @methods.param("output", validators.isPositiveInteger)
  @methods.param("input", validators.isPositiveInteger)
  @methods.contract({
    precondition(destination, output, input) {
      if (!this._.outputs.some(junction => junction.isConnected(destination))) {
        throw new TypeError("The given {{destination}} is not connected.");
      }
      if (output < 0 || this.numberOfOutputs <= output) {
        throw new TypeError(`The {{output}} provided (${output}) is outside the range [0, ${this.numberOfOutputs}).`);
      }
      if (input < 0 || destination.numberOfInputs <= input) {
        throw new TypeError(`The {{input}} provided (${input}) is outside the range [0, ${this.numberOfInputs}).`);
      }
    }
  })
  __disconnect$$Selective3(destination, output, input) {
    this._.outputs[output].disconnectChannel(destination, input);
  }

  toJSON(memo) {
    function __toJSON(obj, memo) {
      if (obj && typeof obj.toJSON === "function") {
        return obj.toJSON(memo);
      }
      return obj;
    }

    return toJSON(this, (node, memo) => {
      let json = {};

      json.name = toNodeName(node);

      node.constructor.$JSONKeys.forEach((key) => {
        json[key] = __toJSON(node[key], memo);
      });

      if (node.$context.VERBOSE_JSON) {
        json.numberOfInputs = node.numberOfInputs;
        json.numberOfOutputs = node.numberOfOutputs;
        json.channelCount = node.channelCount;
        json.channelCountMode = node.channelCountMode;
        json.channelInterpretation = node.channelInterpretation;
      }

      if (node.$inputs.length === 1) {
        json.inputs = node.$inputs[0].toJSON(memo);
      } else {
        json.inputs = node.$inputs.map(junction => junction.toJSON(memo));
      }

      return json;
    }, memo);
  }

  get $name() {
    return this._.name;
  }

  get $context() {
    return this._.context;
  }

  get $inputs() {
    // TODO: remove v0.4.0
    if (this._.inputs.length === 0) {
      return [ new Junction(this, 0) ];
    }
    return this._.inputs;
  }

  $process(inNumSamples, tick) {
    if (this._.tick !== tick) {
      this._.tick = tick;
      this.$inputs.forEach((junction) => {
        junction.process(inNumSamples, tick);
      });
      Object.keys(this._).forEach((key) => {
        if (this[key] instanceof global.AudioParam) {
          this[key].$process(inNumSamples, tick);
        }
      });
      if (this.__process) {
        this.__process(inNumSamples);
      }
    }
  }

  $isConnectedTo(destination, output = 0, input = 0) {
    if (!(destination instanceof global.AudioNode) && !(destination instanceof global.AudioParam)) {
      return false;
    }

    let outputJunction = this._.outputs[output];
    let inputJunction = destination._.inputs[input];

    if (!outputJunction || !inputJunction) {
      return false;
    }

    return outputJunction.outputs.some(junction => junction === inputJunction);
  }

  $isConnectedFrom(destination, output = 0, input = 0) {
    if (!(destination instanceof global.AudioNode)) {
      return false;
    }

    let outputJunction = destination._.outputs[output];
    let inputJunction = this._.inputs[input];

    if (!outputJunction || !inputJunction) {
      return false;
    }

    return inputJunction.inputs.some(junction => junction === outputJunction);
  }
}
