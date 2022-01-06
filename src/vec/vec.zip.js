import Vec from './vec.core';
import { throwIfNullOrUndefined } from '../throwHelper';

/** @module */

/**
 * <h3> zip(other) ⇒ Vec </h3>
 * Combines the two vectors into a vector of pairs. The two vectors must have equal lengths
 * @param {Vec} other The other input vector.
 * @return {Vec} The vector of pairs.
 * @exception {TypeError} when other is null or undefined or the lengths of the source and other vectors are not the same.
 * @example
 * const oneToFourVec = Vec.of(1, 2, 3, 4);
 * const fiveToEightVec = Vec.of(5, 6, 7, 8);
 * const zipped = oneToFourVec.zip(fiveToEightVec);
 * console.log(zipped);
 * // => [ [ 1, 5 ], [ 2, 6 ], [ 3, 7 ], [ 4, 8 ] ]
 */
function zip(other) {
  throwIfNullOrUndefined(this, 'this');
  throwIfNullOrUndefined(other, 'other');

  const thisLen = this.length;
  if (thisLen !== other.length) {
    throw new TypeError('other has different array length.');
  }

  const vec = new Vec(thisLen);
  for (let i = 0; i < thisLen; i += 1) {
    vec[i] = new Vec(this[i], other[i]);
  }

  return vec;
}

export default zip;
