export default function defaults(value, defaultValue) {
  return typeof value !== "undefined" ? value : defaultValue;
}
