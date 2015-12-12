import toNodeName from "./toNodeName";

export default function toJSON(node, func, memo = []) {
  let result;

  if (memo.indexOf(node) !== -1) {
    return `<circular:${toNodeName(node)}>`;
  }
  memo.push(node);

  result = func(node, memo);

  memo.pop();

  return result;
}
