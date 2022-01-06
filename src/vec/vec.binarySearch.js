import { throwIfNullOrUndefined } from '../throwHelper';
import { isNull, isUndefined } from '../util';

/** @module */

/**
 * <h3> binarySearch(item, comparer) ⇒ number </h3>
 * Searches the entire sorted vector for an element using the specified comparer and
 * returns the zero-based index of the element.
 * @param {*} item The object to locate.
 * @param {function} comparer The function to compare elements of the vector. if not provided, the default comparer will be used.
 * @return {number} The zero-based index of item in the sorted vector, if item is found; otherwise, -1.
 * @exception {TypeError} if the item to search is null or undefined.
 * @example
 * const randomNums = new Vec(10, 23, 32, 455, 233, 33, 456, 323, 42, 2, 45, 23, 66);
 * const descendingOrd = (x, y) => x > y ? -1 : x < y ? 1 : 0;
 * randomNums.sort(descendingOrd); // => [ 456, 455, 323, 233, 66, 45, 42, 33, 32, 23, 23, 10, 2 ]
 * const descendingIndex = randomNums.binarySearch(33, descendingOrd);
 * console.log(descendingIndex);
 * // => 7
 * const ascendingOrd = (x, y) => x < y ? -1 : x > y ? 1 : 0;
 * randomNums.sort(ascendingOrd); // => [ 2, 10, 23, 23, 32, 33, 42, 45, 66, 233, 323, 455, 456 ]
 * const ascendingIndex = randomNums.binarySearch(33); // default comparer is used here and it's the same as ascendingOrd
 * console.log(ascendingIndex);
 * // => 5
 */
function binarySearch(item, comparer) {
  throwIfNullOrUndefined(this, 'this');
  throwIfNullOrUndefined(item, 'item');

  const cmp =
    !isNull(comparer) && !isUndefined(comparer)
      ? comparer
      : (x, y) => {
          if (x > y) return 1;
          if (x < y) return -1;
          if (x === y) return 0;
          return -1;
        };

  if (this.length === 0) {
    return -1;
  }

  let thisArg;
  if (arguments.length > 2) {
    thisArg = arguments[2];
  }

  let low = 0;
  let high = this.length - 1;
  while (low <= high) {
    const middleIndex = Math.floor((low + high) / 2);

    const c = cmp.call(thisArg, this[middleIndex], item);

    if (c === 0) {
      return middleIndex;
    }
    if (c < 0) {
      low = middleIndex + 1;
    } else {
      high = middleIndex - 1;
    }
  }

  return -1;
}

export default binarySearch;
