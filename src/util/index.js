import Configuration from "./Configuration";
import Immigration from "./Immigration";
import VERSION from "../VERSION";

const MIN_MICRO_SECONDS = 0;
const MAX_MICRO_SECONDS = 24 * 60 * 60 * 1000 * 1000;

export function article(str) {
  return (/[aeiou]/i.test(str.charAt(0)) ? "an" : "a");
}

export function defaults(value, defaultValue) {
  return typeof value !== "undefined" ? value : defaultValue;
}

export function getAPIVersion() {
  return VERSION;
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

export function name(obj) {
  if (obj.hasOwnProperty("$id")) {
    return `${obj.$name}#${obj.$id}`;
  }
  return obj.$name;
}

export function pp(value) {
  if (value == null) {
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
    return `[ ${value.map(pp).join(", ")} ]`;
  }

  if (value.constructor === {}.constructor) {
    return "{ " + Object.keys(value).map((key) => {
      return key + ": " + pp(value[key]);
    }).join(", ") + "}";
  }

  let name = value.constructor.name || Object.prototype.toString.call(value).slice(8, -1);

  return `${article(name)} ${name}`;
}

export function preventSuperCall(superClass) {
  if (!superClass) {
    superClass = () => {};
  }
  function ctor() {}
  ctor.prototype = Object.create(superClass.prototype, {
    constructor: { value: ctor, enumerable: false, writable: true, configurable: true },
  });
  return ctor;
}

export function toJSON(node, func, memo) {
  let result;

  memo = memo || [];

  if (memo.indexOf(node) !== -1) {
    return `<circular:${name(node)}>`;
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
    value += +matches[1]; // minutes
    value *= 60;
    value += +matches[2]; // seconds
    value *= 1000;
    value += +matches[3];  // milliseconds
    value *= 1000;
    return Math.max(MIN_MICRO_SECONDS, Math.min(value, MAX_MICRO_SECONDS));
  }

  return value;
}

export function toSeconds(time) {
  return toMicroseconds(time) / (1000 * 1000);
}

export let configuration = new Configuration();

export let immigration = new Immigration();
