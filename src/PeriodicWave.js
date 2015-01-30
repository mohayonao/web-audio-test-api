"use strict";

var _ = require("./utils");

/* istanbul ignore else */
if (typeof global.PeriodicWave === "undefined") {
  global.PeriodicWave = function PeriodicWave() {
    throw new TypeError("Illegal constructor");
  };
}

function PeriodicWave(real, imag) {
  Object.defineProperties(this, {
    $name: { value: "PeriodicWave" },
    $real: { value: real },
    $imag: { value: imag },
  });
}
_.inherits(PeriodicWave, global.PeriodicWave);

module.exports = global.WebAudioTestAPI.PeriodicWave = PeriodicWave;
