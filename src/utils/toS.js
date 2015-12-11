export default function toS(value) {
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
    return `[ ${value.map(toS).join(", ")} ]`;
  }

  if (value.constructor === {}.constructor) {
    return "{ " + Object.keys(value).map((key) => {
      return key + ": " + toS(value[key]);
    }).join(", ") + "}";
  }

  let name = value.constructor.name || Object.prototype.toString.call(value).slice(8, -1);

  return `a ${name}`;
}
