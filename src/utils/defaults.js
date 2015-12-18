module.exports = function defaults(value, defaultValue) {
  return typeof value !== "undefined" ? value : defaultValue;
};
