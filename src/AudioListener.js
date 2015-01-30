"use strict";

var _ = require("./utils");
var Inspector = require("./utils/Inspector");

function AudioListener(context) {
  _.$type(this, "dopplerFactor", "number", 1);
  _.$type(this, "speedOfSound", "number", 343.3);

  Object.defineProperties(this, {
    $name   : { value: "AudioListener" },
    $context: { value: context }
  });
}
_.inherits(AudioListener, global.AudioListener);

AudioListener.prototype.setPosition = function() {
  var inspector = new Inspector(this, "setPosition", [
    { name: "x", type: "number" },
    { name: "y", type: "number" },
    { name: "z", type: "number" },
  ]);

  inspector.validateArguments(arguments, function(msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });
};

AudioListener.prototype.setOrientation = function() {
  var inspector = new Inspector(this, "setOrientation", [
    { name: "x"  , type: "number" },
    { name: "y"  , type: "number" },
    { name: "z"  , type: "number" },
    { name: "xUp", type: "number" },
    { name: "yUp", type: "number" },
    { name: "zUp", type: "number" },
  ]);

  inspector.validateArguments(arguments, function(msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });
};

AudioListener.prototype.setVelocity = function() {
  var inspector = new Inspector(this, "setVelocity", [
    { name: "x", type: "number" },
    { name: "y", type: "number" },
    { name: "z", type: "number" },
  ]);

  inspector.validateArguments(arguments, function(msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });
};

module.exports = AudioListener;
