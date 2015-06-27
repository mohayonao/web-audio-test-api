global.window = global;
global.window.location = global.window.location || {};

global.assert = require("power-assert");
global.sinon = require("sinon");
global._ = require("lodash");

global.closeTo = function(actual, expected, delta) {
  return Math.abs(actual - expected) <= delta;
};

require("../../src");
