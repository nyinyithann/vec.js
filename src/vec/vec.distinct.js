import isEqual from 'lodash.isequal';
import { throwIfNullOrUndefined } from '../throwHelper';
import Vec from './vec.core';

/** @module */

/**
 * <h3> distinct() ⇒ Vec </h3>
 * Returns a vector that contains no duplicate entries.
 * If an element occurs multiple times in the vector then the later occurrences are discarded.
 * @return {Vec} The result vector.
 * @exception {TypeError} if struturalEquality parameter is null or undefined.
 * @example
 * const mixedVec = Vec.of(1, 1, 1, 2, 2, 2, 3, 3, 3, { n: 1 }, { n: 1 });
 * const distinctVec_1 = mixedVec.distinct(false);
 * console.log(distinctVec_1);
 * // => [ 1, 2, 3, { n: 1 }, { n: 1 } ]
 * const distinctVec_2 = mixedVec.distinct(true);
 * console.log(distinctVec_2);
 * // => [ 1, 2, 3, { n: 1 } ]
 */
function distinct() {
  throwIfNullOrUndefined(this, 'this');

  const set = new Set();

  for (let i = 0; i < this.length; i += 1) {
    const key = this[i];
    if ([...set].every((x) => !isEqual(x, key))) {
      set.add(key);
    }
  }

  return Vec.from(set);
}

export default distinct;
