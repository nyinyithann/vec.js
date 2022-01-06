import Vec from './vec.core';
import { isNull, isUndefined } from '../util';
import empty from './vec.empty';
import { throwIfNullOrUndefined } from '../throwHelper';

/** @module */

/**
 * <h3> transpose() ⇒ Vec </h3>
 * Returns the transpose of the vector.
 * @return {Vec} The transposed vector.
 * @example
 * const matrix = Vec.of([1, 2, 3, 4, 5], [6, 7, 8, 9, 10]);
 * const tranposed = matrix.transpose();
 * console.log(tranposed);
 * // => [ [ 1, 6 ], [ 2, 7 ], [ 3, 8 ], [ 4, 9 ], [ 5, 10 ] ]
 */
function transpose() {
  throwIfNullOrUndefined(this, 'this');

  if (this.length === 0) {
    return empty();
  }

  let innerLen;
  for (let i = 0; i < this.length; i += 1) {
    if (isNull(innerLen) || isUndefined(innerLen)) {
      innerLen = this[i].length;
    } else if (innerLen !== this[i].length) {
      throw new TypeError('all Array or Vec elements of source should have the same length.');
    }
  }

  const result = new Vec(innerLen);
  const len = this.length;
  for (let x = 0; x < innerLen; x += 1) {
    result[x] = new Vec(len);
    for (let y = 0; y < len; y += 1) {
      result[x][y] = this[y][x];
    }
  }

  return result;
}

export default transpose;
