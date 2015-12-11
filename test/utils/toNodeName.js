import assert from "power-assert";
import toNodeName from "../../src/utils/toNodeName";

describe("utils/toNodeName(obj: object): string", () => {
  it("works", () => {
    assert(toNodeName({ $name: "name" }) === "name");
    assert(toNodeName({ $name: "name", $id: "id" }) === "name#id");
  });
});
