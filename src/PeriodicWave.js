"use strict";

var _ = require("./utils");

function PeriodicWave(real, imag) {
  Object.defineProperties(this, {
    $name: { value: "PeriodicWave" },
    $real: { value: real },
    $imag: { value: imag },
  });
}
_.inherits(PeriodicWave, global.PeriodicWave);

module.exports = global.WebAudioTestAPI.PeriodicWave = PeriodicWave;
