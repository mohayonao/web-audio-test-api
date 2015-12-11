import utils from "./utils";
import Configuration from "./utils/Configuration";
import Immigration from "./utils/Immigration";
import Junction from "./utils/Junction";
import EventTarget from "./EventTarget";
import AudioNodeDisconnectUtils from "./AudioNodeDisconnectUtils";
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

    this._.context = spec.context;
    this._.name = utils.defaults(spec.name, "AudioNode");
    this._.numberOfInputs = utils.defaults(spec.numberOfInputs, 1);
    this._.numberOfOutputs = utils.defaults(spec.numberOfOutputs, 1);
    this._.channelCount = utils.defaults(spec.channelCount, 2);
    this._.channelCountMode = utils.defaults(spec.channelCountMode, "max");
    this._.channelInterpretation = utils.defaults(spec.channelInterpretation, "speakers");
    this._.inputs = utils.fill(new Array(Math.max(0, this._.numberOfInputs|0)), i => new Junction(this, i));
    this._.outputs = utils.fill(new Array(Math.max(0, this._.numberOfOutputs|0)), i => new Junction(this, i));
    this._.tick = -1;

    this.__createAudioNode();
  }

  @methods.contract({
    precondition() {
      if (this._.context.state === "closed") {
        throw new TypeError(`AudioContext has been closed`);
      }
    }
  })
  __createAudioNode() {}

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

  @props.enum([ "max", "clamped-max", "explicit" ])
  channelCountMode() {}

  @props.enum([ "speakers", "discrete" ])
  channelInterpretation() {}

  @methods.param("destination", validators.isAudioSource);
  @methods.param("[ output ]", validators.isPositiveInteger);
  @methods.param("[ input ]", validators.isPositiveInteger);
  @methods.contract({
    precondition(destination, output = 0, input = 0) {
      if (this.$context !== destination.$context) {
        throw new TypeError(`cannot connect to a destination belonging to a different audio context`);
      }
      if (this.numberOfOutputs <= output) {
        throw new TypeError(`output index (${output}) exceeds number of outputs (${this.numberOfOutputs})`);
      }
      if ((destination.numberOfInputs || 1) <= input) {
        throw new TypeError(`input index (${input}) exceeds number of inputs (${destination.numberOfInputs})`);
      }
    }
  })
  connect(destination, output = 0, input = 0) {
    this._.outputs[output].connect(destination.$inputs[input]);
  }

  // @methods.param("[ destination ]", validators.isAudioSource);
  // @methods.param("[ output ]", validators.isPositiveInteger);
  // @methods.param("[ input ]", validators.isPositiveInteger);
  disconnect(_destination, _output, _input) {
    let isSelectiveDisconnect = configuration.getState("AudioNode#disconnect") === "selective";
    let argNum = utils.countArguments([ _destination, _output, _input ]);

    if (!isSelectiveDisconnect) {
      AudioNodeDisconnectUtils.disconnectChannel.call(this, utils.defaults(_destination, 0));
      return;
    }

    switch (argNum) {
    case 0:
      AudioNodeDisconnectUtils.disconnectAll.call(this);
      break;
    case 1:
      if (utils.isNumber(_destination)) {
        AudioNodeDisconnectUtils.disconnectChannel.call(this, _destination);
      } else {
        AudioNodeDisconnectUtils.disconnectSelective1.call(this, _destination);
      }
      break;
    case 2:
      AudioNodeDisconnectUtils.disconnectSelective2.call(this, _destination, _output);
      break;
    case 3:
      AudioNodeDisconnectUtils.disconnectSelective3.call(this, _destination, _output, _input);
      break;
    default:
      // no default
    }
  }

  toJSON(memo) {
    function toJSON(obj, memo) {
      if (obj && typeof obj.toJSON === "function") {
        return obj.toJSON(memo);
      }
      return obj;
    }

    return utils.toJSON(this, (node, memo) => {
      let json = {};

      json.name = utils.toNodeName(node);

      node.constructor.$JSONKeys.forEach((key) => {
        json[key] = toJSON(node[key], memo);
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
      if (this._process) {
        this._process(inNumSamples);
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
