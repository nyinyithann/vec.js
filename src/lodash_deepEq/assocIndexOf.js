import { sameValueZeroEqual } from "../util";

function assocIndexOf(array, key) {
  let { length } = array;
  while (length--) {
    if (sameValueZeroEqual(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

export default assocIndexOf;
