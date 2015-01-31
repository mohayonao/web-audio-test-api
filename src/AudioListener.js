"use strict";

var _ = require("./utils");
var Inspector = require("./utils/Inspector");
var WebAudioTestAPI = require("./WebAudioTestAPI");

var AudioListenerConstructor = function AudioListener() {
  throw new TypeError("Illegal constructor");
};

function AudioListener(context) {
  var dopplerFactor = 1;
  var speedOfSound = 343.3;

  _.defineAttribute(this, "dopplerFactor", "number", dopplerFactor, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "speedOfSound", "number", speedOfSound, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });

  Object.defineProperties(this, {
    $name   : { value: "AudioListener" },
    $context: { value: context }
  });
}
_.inherits(AudioListener, AudioListenerConstructor);

AudioListener.exports = AudioListenerConstructor;

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

module.exports = WebAudioTestAPI.AudioListener = AudioListener;
