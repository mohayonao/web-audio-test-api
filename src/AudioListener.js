"use strict";

var _ = require("./utils");

function AudioListener(context) {
  _.$type(this, "dopplerFactor", "number", 1);
  _.$type(this, "speedOfSound", "number", 343.3);

  Object.defineProperties(this, {
    $name   : { value: "AudioListener" },
    $context: { value: context }
  });
}
_.inherits(AudioListener, global.AudioListener);

AudioListener.prototype.setPosition = function(x, y, z) {
  _.check(_.caption(this, "setPosition(x, y, z)"), {
    x: { type: "number", given: x },
    y: { type: "number", given: y },
    z: { type: "number", given: z },
  });
};

AudioListener.prototype.setOrientation = function(x, y, z, xUp, yUp, zUp) {
  _.check(_.caption(this, "setOrientation(x, y, z, xUp, yUp, zUp)"), {
    x  : { type: "number", given: x   },
    y  : { type: "number", given: y   },
    z  : { type: "number", given: z   },
    xUp: { type: "number", given: xUp },
    yUp: { type: "number", given: yUp },
    zUp: { type: "number", given: zUp },
  });
};

AudioListener.prototype.setVelocity = function(x, y, z) {
  _.check(_.caption(this, "setVelocity(x, y, z)"), {
    x: { type: "number", given: x },
    y: { type: "number", given: y },
    z: { type: "number", given: z },
  });
};

module.exports = AudioListener;
