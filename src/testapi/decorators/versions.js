const caniuse = require("../../utils/caniuse");
const format = require("../../utils/format");
const toS = require("../../utils/toS");

function versions(specs) {
  return (target, name, descriptor) => {
    function fn(func, execute) {
      return function() {
        if (!caniuse(specs, versions.targetVersions)) {
          throw new TypeError(format(`
            Failed to ${execute} the '${name}' on '${this.constructor.name}'

            \tThis feature is not supported on the specified versions.

            \t\texpected: ${toS(specs)}
            \t\tactual  : ${toS(versions.targetVersions)}
          `) + "\n");
        }
        return func.apply(this, arguments);
      };
    }

    if (typeof descriptor.value === "function") {
      descriptor.value = fn(descriptor.value, "execute");
    }
    if (typeof descriptor.get === "function") {
      descriptor.get = fn(descriptor.get, "get");
    }
    if (typeof descriptor.set === "function") {
      descriptor.set = fn(descriptor.set, "set");
    }

    return descriptor;
  };
}

versions.targetVersions = {};

module.exports = versions;
