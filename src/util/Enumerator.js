export default class Enumerator {
  constructor(list = []) {
    this.list = list;
  }

  contains(value) {
    return this.list.indexOf(value) !== -1;
  }

  toString() {
    return `enum { ${this.list.join(", ")} }`;
  }
}
