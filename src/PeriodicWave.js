"use strict";

var _ = require("./utils");
var WebAudioTestAPI = require("./WebAudioTestAPI");

var PeriodicWaveConstructor = function PeriodicWave() {
  throw new TypeError("Illegal constructor");
};

function PeriodicWave(real, imag) {
  Object.defineProperties(this, {
    $name: { value: "PeriodicWave" },
    $real: { value: real },
    $imag: { value: imag },
  });
}
_.inherits(PeriodicWave, PeriodicWaveConstructor);

PeriodicWave.exports = PeriodicWaveConstructor;

module.exports = WebAudioTestAPI.PeriodicWave = PeriodicWave;
