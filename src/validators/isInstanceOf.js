export default function isInstanceOf(klass) {
  return {
    name: klass.name,
    test: (value) => value instanceof klass
  };
}
