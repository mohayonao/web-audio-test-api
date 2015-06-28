import Configuration from "./Configuration";
import Enumerator from "./Enumerator";
import Formatter from "./Formatter";
import Immigration from "./Immigration";
import Inspector from "./Inspector";
import version from "../version";

const MIN_MICRO_SECONDS = 0;
const MAX_MICRO_SECONDS = 24 * 60 * 60 * 1000 * 1000;

export function appendIfNotExists(list, value) {
  let index = list.indexOf(value);

  if (index === -1) {
    list.push(value);
  }
}

export function article(str) {
  return (/[aeiou]/i.test(str.charAt(0)) ? "an" : "a");
}

export function defaults(value, defaultValue) {
  return typeof value !== "undefined" ? value : defaultValue;
}

export function countArguments(args) {
  for (let i = args.length - 1; i >= 0; i--) {
    if (typeof args[i] !== "undefined") {
      return i + 1;
    }
  }
  return 0;
}

export function fill(list, value) {
  for (let i = 0; i < list.length; i++) {
    list[i] = typeof value === "function" ? value(i) : value;
  }
  return list;
}

export function getAPIVersion() {
  return version;
}

export function isBoolean(value) {
  return typeof value === "boolean";
}

export function isFunction(value) {
  return typeof value === "function";
}

export function isInstanceOf(value, klass) {
  return value instanceof klass;
}

export function isNullOrFunction(value) {
  return (value === null) || isFunction(value);
}

export function isNullOrInstanceOf(value, klass) {
  return (value === null) || isInstanceOf(value, klass);
}

export function isNumber(value) {
  return !isNaN(value) && (typeof value === "number");
}

export function isInteger(value) {
  return isNumber(value) && (value === (value|0));
}

export function isPositiveNumber(value) {
  return isNumber(value) && (0 <= value);
}

export function isPositiveInteger(value) {
  return isPositiveNumber(value) && isInteger(value);
}

export function isString(value) {
  return typeof value === "string";
}

export function isUndefined(value) {
  return typeof value === "undefined";
}

export function removeIfExists(list, value) {
  let index = list.indexOf(value);

  if (index !== -1) {
    return list.splice(index, 1)[0];
  }

  return null;
}

export function toNodeName(obj) {
  if (obj.hasOwnProperty("$id")) {
    return `${obj.$name}#${obj.$id}`;
  }
  return obj.$name;
}

export function prettyPrint(value) {
  if (value === null || typeof value === "undefined") {
    return String(value);
  }
  let type = typeof value;

  if (type === "number" || type === "boolean") {
    return String(value);
  }

  if (type === "string") {
    return `'${value}'`;
  }

  if (Array.isArray(value)) {
    return `[ ${value.map(prettyPrint).join(", ")} ]`;
  }

  if (value.constructor === {}.constructor) {
    return "{ " + Object.keys(value).map((key) => {
      return key + ": " + prettyPrint(value[key]);
    }).join(", ") + "}";
  }

  let name = value.constructor.name || Object.prototype.toString.call(value).slice(8, -1);

  return `${article(name)} ${name}`;
}

export function preventSuperCall(superClass) {
  function ctor() {
  }

  ctor.prototype = Object.create(superClass.prototype, {
    constructor: { value: ctor, enumerable: false, writable: true, configurable: true },
  });

  return ctor;
}

export function toJSON(node, func, memo = []) {
  let result;

  if (memo.indexOf(node) !== -1) {
    return `<circular:${toNodeName(node)}>`;
  }
  memo.push(node);

  result = func(node, memo);

  memo.pop();

  return result;
}

export function toMicroseconds(time) {
  let value = 0;

  if (typeof time === "number") {
    // seconds -> microseconds
    value = Math.floor(time * 1000 * 1000) || 0;
    return Math.max(MIN_MICRO_SECONDS, Math.min(value, MAX_MICRO_SECONDS));
  }

  let matches = /^([0-5]\d):([0-5]\d)\.(\d\d\d)$/.exec(time);

  if (matches) {
    // minutes
    value += +matches[1];
    value *= 60;
    // seconds
    value += +matches[2];
    value *= 1000;
    // milliseconds
    value += +matches[3];
    value *= 1000;
    return Math.max(MIN_MICRO_SECONDS, Math.min(value, MAX_MICRO_SECONDS));
  }

  return value;
}

export function toSeconds(time) {
  return toMicroseconds(time) / (1000 * 1000);
}

export default {
  Configuration,
  Enumerator,
  Formatter,
  Immigration,
  Inspector,
  appendIfNotExists,
  article,
  countArguments,
  defaults,
  fill,
  getAPIVersion,
  isBoolean,
  isFunction,
  isInstanceOf,
  isNullOrFunction,
  isNullOrInstanceOf,
  isNumber,
  isInteger,
  isPositiveNumber,
  isPositiveInteger,
  isString,
  isUndefined,
  removeIfExists,
  toNodeName,
  prettyPrint,
  preventSuperCall,
  toJSON,
  toMicroseconds,
  toSeconds,
};
