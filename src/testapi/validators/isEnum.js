module.exports = function isEnum(values) {
  return {
    description: `enum ( ${ values.join(", ") } )`,
    typeName: "any[]",
    test: (value) => values.indexOf(value) !== -1
  };
};
