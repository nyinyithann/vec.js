import { throwIfNullOrUndefined } from '../throwHelper';
import Vec from './vec.core';

/** @module */

/**
 * <h3> Vec.zip3(source1, source2, source3) ⇒ Vec </h3>
 * Combines three vectors into a vector of pairs. The three vectors must have equal lengths.
 * @param {Array | Vec} source1 The first input array or vector.
 * @param {Array | Vec} source2 The second input array or vector.
 * @param {Array | Vec} source3 The third input array or vector.
 * @return {Vec} The result vector.
 * @exception {TypeError} when
 *  source1 is neither an array nor a vector or
 *  source2 is neither an array nor a vector or
 *  source3 is neither an array nor a vector or
 *  the lengths of source1, source2, and source3 are not the same.
 * @example
 * const sevenNumbers_1 = Vec.init(7, x => x);
 * const sevenNumbers_2 = Vec.init(7, x => x + x);
 * const sevenNumbers_3 = Vec.init(7, x => x * x);
 * const zipped3 = Vec.zip3(sevenNumbers_1, sevenNumbers_2, sevenNumbers_3);
 * console.log(zipped3);
 * // =>
 *  [ [ 0, 0, 0 ],
 *    [ 1, 2, 1 ],
 *    [ 2, 4, 4 ],
 *    [ 3, 6, 9 ],
 *    [ 4, 8, 16 ],
 *    [ 5, 10, 25 ],
 *    [ 6, 12, 36 ] ]
 */
function zip3(source1, source2, source3) {
  throwIfNullOrUndefined(source1, 'source1');
  throwIfNullOrUndefined(source2, 'source2');
  throwIfNullOrUndefined(source3, 'source2');

  if (!Array.isArray(source1) && !Vec.isVec(source1)) {
    throw new TypeError('source1 should be an Array or a Vec.');
  }

  if (!Array.isArray(source2) && !Vec.isVec(source2)) {
    throw new TypeError('source2 should be an Array or a Vec.');
  }

  if (!Array.isArray(source3) && !Vec.isVec(source3)) {
    throw new TypeError('source3 should be an Array or a Vec.');
  }

  if (source1.length !== source2.length || source1.length !== source3.length) {
    throw new TypeError(
      'source1, source2, and source3 have different lengths.'
    );
  }

  const result = new Vec(source1.length);
  for (let i = 0; i < source1.length; i += 1) {
    result[i] = new Vec(source1[i], source2[i], source3[i]);
  }

  return result;
}

export default zip3;
