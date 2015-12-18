module.exports = {
  description: "positive number",
  typeName: "number",
  test: (value) => value === +value && 0 <= value
};
