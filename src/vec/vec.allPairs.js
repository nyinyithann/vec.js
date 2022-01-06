/* eslint-disable */

import Vec from './vec.core';

/** @module */

/**
 * <h1> Vec APIs </h1>
 * <hr/>
 * <h3> Vec.allPairs(source1, source2) ⇒ Vec </h3>
 * Returns a new vector that contains all pairings of elements from the first and second arrays or vectors.
 * @param {Array|Vec} source1 The first input array or vector.
 * @param {Array|Vec} source2 The second input array or vector.
 * @returns {Vec} The resulting vector of pairs.
 * @exception {TypeError} if either of the input arguments is null or not of type array or vector.
 * @example
 * const source1 = new Vec(1,2,3);
 * const source2 = new Vec(4,5);
 * const pairs = Vec.allPairs(source1, source2);
 * console.log(pairs);
 * // =>  [ [ 1, 4 ], [ 1, 5 ], [ 2, 4 ], [ 2, 5 ], [ 3, 4 ], [ 3, 5 ] ]
 */
function allPairs(source1, source2) {
  if (!Array.isArray(source1) && !Vec.isVec(source1)) {
    throw new TypeError('source1 should be an Array or a Vec.');
  }

  if (!Array.isArray(source2) && !Vec.isVec(source2)) {
    throw new TypeError('source2 should be an Array or a Vec.');
  }

  const len1 = source1.length;
  const len2 = source2.length;

  const result = new Vec(len1 * len2);
  for (let i = 0; i < len1; i += 1) {
    for (let j = 0; j < len2; j += 1) {
      result[i * len2 + j] = new Vec(source1[i], source2[j]);
    }
  }

  return result;
}

export default allPairs;
