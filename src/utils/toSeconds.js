import toMicroseconds from "./toMicroseconds";

export default function toSeconds(time) {
  return toMicroseconds(time) / (1000 * 1000);
}
