const assert = require("power-assert");
const removeIfExists = require("../../src/utils/removeIfExists");

describe("utils/removeIfExists(list: any[], value: any): any[]", () => {
  it("works", () => {
    let list = [ 1, 2, 3, 4, 5 ];

    let result1 = removeIfExists(list, 3);
    let result2 = removeIfExists(list, 0);

    assert.deepEqual(list, [ 1, 2, 4, 5 ]);
    assert(result1 === 3);
    assert(result2 === null);
  });
});
