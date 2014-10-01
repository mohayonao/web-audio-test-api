"use strict";

var _ = require("./utils");

function AudioNode(spec) {
  _.$read(this, "context", spec.context);
  _.$read(this, "name", spec.name);
  _.$read(this, "jsonAttrs", spec.jsonAttrs);
  _.$read(this, "numberOfInputs", spec.numberOfInputs);
  _.$read(this, "numberOfOutputs", spec.numberOfOutputs);
  _.$type(this, "channelCount", "number", spec.channelCount);
  _.$enum(this, "channelCountMode", [ "max", "clamped-max", "explicit" ], spec.channelCountMode);
  _.$enum(this, "channelInterpretation", [ "speakers", "discrete" ], spec.channelInterpretation);

  this.$inputs  = [];
  this._outputs = [];
  this._currentTime = -1;
}
_.inherits(AudioNode, global.AudioNode);

AudioNode.prototype.$process = function(currentTime, nextCurrentTime) {
  /* istanbul ignore else */
  if (currentTime !== this._currentTime) {
    this._currentTime = currentTime;

    this.$inputs.forEach(function(src) {
      src.$process(currentTime, nextCurrentTime);
    });

    Object.keys(this).forEach(function(key) {
      if (this[key] instanceof AudioParam) {
        this[key].$process(currentTime, nextCurrentTime);
      }
    }, this);

    if (this._process) {
      this._process(currentTime, nextCurrentTime);
    }
  }
};

AudioNode.prototype.toJSON = function(memo) {
  return _.jsonCircularCheck(this, function(memo) {
    var json = {};

    json.name = _.id(this);

    this.jsonAttrs.forEach(function(key) {
      if (this[key] && this[key].toJSON) {
        json[key] = this[key].toJSON(memo);
      } else {
        json[key] = this[key];
      }
    }, this);

    if (this.context.VERBOSE_JSON) {
      json.numberOfInputs = this.numberOfInputs;
      json.numberOfOutputs = this.numberOfOutputs;
      json.channelCount = this.channelCount;
      json.channelCountMode = this.channelCountMode;
      json.channelInterpretation = this.channelInterpretation;
    }

    json.inputs = this.$inputs.map(function(node) {
      return node.toJSON(memo);
    });

    return json;
  }, memo || /* istanbul ignore next */ []);
};

AudioNode.prototype.connect = function(destination, output, input) {
  var caption = _.caption(this, "connect(destination, output, input)");

  output = _.defaults(output, 0);
  input  = _.defaults(input , 0);

  if (!(destination instanceof AudioNode || destination instanceof AudioParam)) {
    throw new TypeError(_.format(
      "#{caption}: '#{name}' should be #{type}, but got #{given}", {
        caption: caption,
        name   : "destination",
        type   : "an instance of AudioNode or AudioParam",
        given  : _.toS(destination)
      }
    ));
  }

  _.check(caption, {
    output: { type: "number", given: output },
    input : { type: "number", given: input  },
  });

  if (this.context !== destination.context) {
    throw new Error(_.format(
      "#{caption}: cannot connect to a destination belonging to a different audio context", {
        caption: caption
      }
    ));
  }
  if (output < 0 || this.numberOfOutputs <= output) {
    throw new Error(_.format(
      "#{caption}: output index (#{index}) exceeds number of outputs (#{length})", {
        caption: caption,
        index  : output,
        length : this.numberOfOutputs
      }
    ));
  }
  if (input < 0 || destination.numberOfInputs <= input) {
    throw new Error(_.format(
      "#{caption}: input index (#{index}) exceeds number of inputs (#{length})", {
        caption: caption,
        index  : input,
        length : destination.numberOfInputs
      }
    ));
  }

  var index = this._outputs.indexOf(destination);
  /* istanbul ignore else */
  if (index === -1) {
    this._outputs.push(destination);
    destination.$inputs.push(this);
  }
};

AudioNode.prototype.disconnect = function(output) {
  var caption = _.caption(this, "disconnect(output)");

  output = _.defaults(output, 0);

  _.check(caption, {
    output: { type: "number", given: output }
  });

  if (output < 0 || this.numberOfOutputs <= output) {
    throw new Error(_.format(
      "#{caption}: output index (#{index}) exceeds number of outputs (#{length})", {
        caption: caption,
        index  : output,
        length : this.numberOfOutputs
      }
    ));
  }

  this._outputs.splice(0).forEach(function(dst) {
    var index = dst.$inputs.indexOf(this);
    /* istanbul ignore else */
    if (index !== -1) {
      dst.$inputs.splice(index, 1);
    }
  }, this);
};

module.exports = AudioNode;
