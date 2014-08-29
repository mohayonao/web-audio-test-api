"use strict";

global.chai   = require("chai");
global.sinon  = require("sinon");
global.expect = global.chai.expect;
global.window = global;

global.chai.use(require("sinon-chai"));
