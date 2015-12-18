module.exports = function isNullOrInstanceOf(klass) {
  return {
    description: klass.name,
    typeName: `${klass.name}|null`,
    test: (value) => value === null || value instanceof klass
  };
};
