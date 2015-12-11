export default function toNodeName(obj) {
  if (obj.hasOwnProperty("$id")) {
    return `${obj.$name}#${obj.$id}`;
  }
  return obj.$name;
}
