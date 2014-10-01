"use strict";

var _ = require("./utils");

function PeriodicWave(real, imag) {
  var caption = "PeriodicWave(real, imag)";
  _.check(caption, {
    real: { type: "Float32Array", given: real },
    imag: { type: "Float32Array", given: imag },
  });
  if (real.length !== imag.length) {
    throw new Error(_.format(
      "#{caption}: length of real array (#{real}) and length of imaginary array (#{imag}) must match", {
        caption: caption,
        real: real.length,
        imag: imag.length
      }
    ));
  }
  if (4096 < real.length || 4096 < imag.length) {
    throw new Error(_.format(
      "#{caption}: length of array (#{length}) exceeds allow maximum of 4096", {
        caption: caption,
        length : Math.max(real.length, imag.length)
      }
    ));
  }
  _.$read(this, "name", "PeriodicWave");
}
_.inherits(PeriodicWave, global.PeriodicWave);

module.exports = PeriodicWave;
