"use strict";

var _ = {};

_.NOP = /* istanbul ignore next */ function() {};

_.inherits = require("./inherits");

_.defaults = require("./defaults");

_.article = require("./article");

_.name = require("./name");

_.jsonCircularCheck = require("./jsonCircularCheck");

_.toMicroseconds = require("./toMicroseconds");

_.toSeconds = require("./toSeconds");

_.typeCheck = require("./typeCheck");

_.formatter = require("./formatter");

_.defineAttribute = require("./defineAttribute");

module.exports = _;
