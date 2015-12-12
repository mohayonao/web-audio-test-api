import assert from "power-assert";
import toSeconds from "../../src/utils/toSeconds";

describe("utils/toSeconds(time: number|string): number", () => {
  it("works", () => {
    assert(toSeconds(1.500) === 1.500);
    assert(toSeconds(NaN) === 0);
    assert(toSeconds("00:00.250") === 0.250);
    assert(toSeconds("00:01.250") === 1.250);
    assert(toSeconds("01:01.250") === 61.250);
    assert(toSeconds(null) === 0);
  });
});
