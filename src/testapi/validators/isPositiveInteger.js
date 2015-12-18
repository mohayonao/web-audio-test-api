module.exports = {
  description: "positive integer",
  typeName: "number",
  test: (value) => value === (value|0) && 0 <= value
};
