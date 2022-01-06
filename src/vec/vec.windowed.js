import empty from './vec.empty';
import Vec from './vec.core';
import { throwIfNegativeNumber, throwIfNullOrUndefined } from '../throwHelper';

/** @module */

/**
 * <h3> windowed(windowSize) ⇒ Vec </h3>
 * Returns a vector of sliding windows containing elements drawn from the source vector.
 * Each window is returned as a fresh vector.
 * @param {number} windowSize The number of elements in each window.
 * @return {Vec} The result array.
 * @exception {TypeError} When windowSize is negative.
 * @example
 * const zeroToFive = Vec.init(6, x => x);
 * const windows = zeroToFive.windowed(2);
 * console.log(windows);
 * // => [ [ 0, 1 ], [ 1, 2 ], [ 2, 3 ], [ 3, 4 ], [ 4, 5 ] ]
 */
function windowed(windowSize) {
  throwIfNullOrUndefined(this, 'this');
  throwIfNegativeNumber(windowSize, 'windowSize');

  const wsize = Math.floor(windowSize);

  if (wsize > this.length) {
    return empty();
  }

  const size = this.length - wsize + 1;
  const vec = new Vec(size);
  for (let i = 0; i < size; i += 1) {
    vec[i] = this.slice(i, wsize + i);
  }

  return vec;
}

export default windowed;
