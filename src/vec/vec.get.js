import { throwIfNullOrUndefined } from '../throwHelper';

/** @module */

/**
 * <h3> get(index) ⇒ element </h3>
 * Gets an element from an array.
 * @param {number} index The input index.
 * @return {*} The value of the array at the given index.
 * @example
 * const oddNums = Vec.of(1, 3, 5, 7);
 * const seven = oddNums.get(3);
 * console.log(seven);
 * // => 7
 */
function get(index) {
  throwIfNullOrUndefined(this, 'this');

  return this[index];
}

export default get;
