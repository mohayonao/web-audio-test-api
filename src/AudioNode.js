"use strict";

var _ = require("./utils");
var Inspector = require("./utils/Inspector");

var ChannelCountMode = "enum { max, clamped-max, explicit }";
var ChannelInterpretation = "enum { speakers, discrete }";

function AudioNode(spec) {
  var context = spec.context;
  var numberOfInputs = spec.numberOfInputs;
  var numberOfOutputs = spec.numberOfOutputs;
  var channelCount = spec.channelCount;
  var channelCountMode = spec.channelCountMode;
  var channelInterpretation = spec.channelInterpretation;

  _.defineAttribute(this, "context", "readonly", context, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "numberOfInputs", "readonly", numberOfInputs, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "numberOfOutputs", "readonly", numberOfOutputs, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "channelCount", "number", channelCount, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "channelCountMode", ChannelCountMode, channelCountMode, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "channelInterpretation", ChannelInterpretation, channelInterpretation, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });

  Object.defineProperties(this, {
    $name     : { value: spec.name },
    $context  : { value: spec.context },
    $inputs   : { value: [] },
    $jsonAttrs: { value: spec.jsonAttrs },
  });
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
      if (this[key] instanceof global.AudioParam) {
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

    json.name = _.name(this);

    this.$jsonAttrs.forEach(function(key) {
      if (this[key] && this[key].toJSON) {
        json[key] = this[key].toJSON(memo);
      } else {
        json[key] = this[key];
      }
    }, this);

    if (this.$context.VERBOSE_JSON) {
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

AudioNode.prototype.connect = function(destination) {
  var inspector = new Inspector(this, "connect", [
    { name: "destination", type: "AudioNode | AudioParam", validate: sameContext },
    { name: "output"     , type: "optional number", validate: checkNumberOfOutput },
    { name: "input"      , type: "optional number", validate: checkNumberOfInput },
  ]);

  function sameContext(value) {
    if (this.$context !== value.$context) {
      return "cannot connect to a destination belonging to a different audio context";
    }
  }

  function checkNumberOfOutput(value, name) {
    if (value < 0 || this.numberOfOutputs <= value) {
      return name + " index (" + value + ") exceeds number of outputs (" + this.numberOfOutputs + ")";
    }
  }

  function checkNumberOfInput(value, name) {
    if (value < 0 || destination.numberOfInputs <= value) {
      return name + " index (" + value + ") exceeds number of inputs (" + destination.numberOfInputs + ")";
    }
  }

  inspector.validateArguments(arguments, function(msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });

  var index = this._outputs.indexOf(destination);
  /* istanbul ignore else */
  if (index === -1) {
    this._outputs.push(destination);
    destination.$inputs.push(this);
  }
};

AudioNode.prototype.disconnect = function() {
  var inspector = new Inspector(this, "connect", [
    { name: "output", type: "optional number", validate: checkNumberOfOutput },
  ]);

  function checkNumberOfOutput(value, name) {
    if (value < 0 || this.numberOfOutputs <= value) {
      return name + " index (" + value + ") exceeds number of outputs (" + this.numberOfOutputs + ")";
    }
  }

  inspector.validateArguments(arguments, function(msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });

  this._outputs.splice(0).forEach(function(dst) {
    var index = dst.$inputs.indexOf(this);
    /* istanbul ignore else */
    if (index !== -1) {
      dst.$inputs.splice(index, 1);
    }
  }, this);
};

module.exports = AudioNode;
