import { throwIfNullOrUndefined } from '../throwHelper';
import Vec from './vec.core';
import empty from './vec.empty';

/** @module */

/**
 * <h3> take(count) ⇒ Vec </h3>
 * Returns the first N elements of the vector.
 * @param {number} count The number of items to take.
 * @return {Vec} The result vector.
 * @example
 * const zeroToTen = Vec.init(11, x => x);
 * const firstFive = zeroToTen.take(5);
 * console.log(firstFive);
 * // => [ 0, 1, 2, 3, 4 ]
 */
function take(count) {
  throwIfNullOrUndefined(this, 'this');

  if (count <= 0) {
    return empty();
  }

  const len = this.length;

  if (count >= len) {
    return this;
  }

  const thisVec = Object(this);
  let start = 0;

  const result = new Vec();

  while (start < count) {
    if (start === len) {
      break;
    } else {
      result.push(thisVec[start]);
      start += 1;
    }
  }

  return result;
}

export default take;
