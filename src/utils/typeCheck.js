"use strict";

function typeCheck(value, type) {
  switch (type) {
  case "boolean":
    return typeof value === "boolean";
  case "function":
    return typeof value === "function";
  case "number":
    return typeof value === "number" && !isNaN(value);
  case "string":
    return typeof value === "string";
  case "null":
    return value === null;
  }

  if (/[A-Z]/.test(type.charAt(0)) && typeof global[type] === "function") {
    return value instanceof global[type];
  }

  var matches = /^enum\s*{(.*?)}$/.exec(type);
  if (matches) {
    return enumCheck(value, matches[1].split(",").map(function(item) {
      return item.trim();
    }));
  }

  return false;
}

function enumCheck(value, items) {
  return items.some(function(item) {
    if (/^\d+$/.test(item)) {
      return value === +item;
    }
    return value === item;
  });
}

module.exports = function(value, type) {
  return type.split("|").some(function(type) {
    return typeCheck(value, type.trim());
  });
};
