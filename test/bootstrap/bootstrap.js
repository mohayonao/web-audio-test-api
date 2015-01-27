"use strict";

global.assert = require("power-assert");
global.window = global;

global.closeTo = function(actual, expected, delta) {
  return Math.abs(actual - expected) <= delta;
};

global.WEB_AUDIO_TEST_API_VERSION = require("../../package").version;

require("espower-loader")({
  cwd: process.cwd(),
  pattern: "test/**/*.js"
});

require("../../");
