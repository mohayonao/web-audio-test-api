module.exports = function isInstanceOf(klass) {
  return {
    description: klass.name,
    typeName: klass.name,
    test: (value) => value instanceof klass
  };
};
