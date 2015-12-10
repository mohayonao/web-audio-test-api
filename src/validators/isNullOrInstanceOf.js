export default function isNullOrInstanceOf(klass) {
  return {
    name: klass.name,
    test: (value) => value === null || value instanceof klass,
  };
}
