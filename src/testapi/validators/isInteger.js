module.exports = {
  description: "integer",
  typeName: "number",
  test: (value) => value === (value|0)
};
