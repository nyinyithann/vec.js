import { throwIfNegativeNumber, throwIfNullOrUndefined } from '../throwHelper';
import Vec from './vec.core';

/** @module */

/**
 * <h3> splitAt(index) ⇒ Vec </h3>
 * Splits the vector into two vectors, at the given index.
 * @param {number} index The index at which the vector is split.
 * @return {Vec} The result vector that contains the two split vectors.
 * @exception {TypeError} When index is negative.
 * @example
 * const twentyNumbers = Vec.init(20, x => x + 1);
 * const splitVec = twentyNumbers.splitAt(10);
 * console.log(splitVec);
 * // => [ [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ], [ 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 ] ]
 */
function splitAt(index) {
  throwIfNullOrUndefined(this, 'this');
  throwIfNegativeNumber(index, 'index');

  const idx = Math.floor(index);

  if (this.length < idx) {
    throw new TypeError('The vec has an insufficient number of elements.');
  }

  if (idx === 0) {
    return new Vec([], this.slice(0));
  }

  if (idx === this.length) {
    return new Vec(this.slice(0), []);
  }

  return new Vec(this.slice(0, idx), this.slice(idx));
}

export default splitAt;
