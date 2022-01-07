import {
  throwIfGeneratorFunction,
  throwIfNotFunction,
  throwIfNullOrUndefined,
} from '../throwHelper';
import Vec from './vec.core';

/** @module */

/**
 * <h3> Vec.map3(mapping, source1, source2, source3) ⇒ Vec </h3>
 * Builds a new collection whose elements are the results of applying the given function to the corresponding elements of the three vectors/arrays pairwise.
 * The two input arrays must have the same lengths.
 * @param {function} mapping The function to transform the pairs of the input elements.
 * @param {Array | Vec} source1 The first input array or vector.
 * @param {Array | Vec} source2 The second input array or vector.
 * @param {Array | Vec} source3 The third input array or vector.
 * @return {Vec} The vector of transformed elements.
 * @exception {TypeError} when
 *  mapping is not a function or
 *  mapping is a generator function or
 *  source1 is neither an array nor a vector or
 *  source2 is neither an array nor a vector or
 *  source3 is neither an array nor a vector or
 *  the lengths of source1, source2, and source3 are not the same.
 * @example
 * const vec_1 = Vec.of(1, 2, 3, 4, 5);
 * const vec_2 = Vec.of(1, 2, 3, 4, 5);
 * const vec_3 = Vec.of(1, 2, 3, 4, 5);
 * const mapping3 = (x, y, z, index) => x + y + z + index;
 * const mapped3 = Vec.map3(mapping3, vec_1, vec_2, vec_3);
 * console.log(mapped3);
 * // => [ 3, 7, 11, 15, 19 ]
 */
function map3(mapping, source1, source2, source3) {
  throwIfNotFunction(mapping, 'mapping');
  throwIfGeneratorFunction(mapping, 'mapping');
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
    result[i] = mapping(source1[i], source2[i], source3[i], i);
  }

  return result;
}

export default map3;
