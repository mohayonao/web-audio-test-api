"use strict";

global.chai   = require("chai");
global.assert = global.chai.assert;
global.window = global;

global.closeTo = function(actual, expected, delta) {
  return Math.abs(actual - expected) <= delta;
};

global.WEB_AUDIO_TEST_API_VERSION = require("../../package").version;

require("../../");
