const toMicroseconds = require("./toMicroseconds");

module.exports = function toSeconds(time) {
  return toMicroseconds(time) / (1000 * 1000);
};
