export default function removeIfExists(list, value) {
  let index = list.indexOf(value);

  if (index !== -1) {
    return list.splice(index, 1)[0];
  }

  return null;
}
