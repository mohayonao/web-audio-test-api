"use strict";

module.exports = function(value) {
  var type = typeof value;

  if (type === "string") {
    return "'" + value + "'";
  }
  if (type === "function") {
    return "function";
  }
  if (Array.isArray(value)) {
    return "array";
  }
  if (!value || type === "number" || type === "boolean") {
    return String(value);
  }
  if (value.constructor && value.constructor.name) {
    return value.constructor.name;
  }

  return Object.prototype.toString.call(value).slice(8, -1);
};
