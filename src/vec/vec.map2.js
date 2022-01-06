import {
  throwIfGeneratorFunction,
  throwIfNotFunction,
  throwIfNullOrUndefined,
} from '../throwHelper';
import Vec from './vec.core';

/** @module */

/**
 * <h3> Vec.map2(mapping, source1, source2) ⇒ Vec </h3>
 * Builds a new collection whose elements are the results of applying the given function to the corresponding elements of the two vectors/arrays pairwise.
 * The two input arrays must have the same lengths.
 * @param {function} mapping The function to transform the pairs of the input elements.
 * @param {Array | Vec} source1 The first input array or vector.
 * @param {Array | Vec} source2 The second input array or vector.
 * @return {Vec} The vector of transformed elements.
 * @exception {TypeError} when
 * mapping is not a function or
 * mapping is a generator function or
 * source1 is neither an array nor a vector or
 * source2 is neither an array nor a vector or
 * the lengths of source1 and source2 are not the same.
 * @example
 * const v1 = Vec.of(1, 2, 3, 4, 5);
 * const v2 = Vec.of(1, 2, 3, 4, 5);
 * const mapping = (x, y, index) => x + y + index;
 * const mapped2 = Vec.map2(mapping, v1, v2);
 * console.log(mapped2);
 * // => [ 2, 5, 8, 11, 14 ]
 */
function map2(mapping, source1, source2) {
  throwIfNotFunction(mapping, 'mapping');
  throwIfGeneratorFunction(mapping, 'mapping');
  throwIfNullOrUndefined(source1, 'source1');
  throwIfNullOrUndefined(source2, 'source2');

  if (!Array.isArray(source1) && !Vec.isVec(source1)) {
    throw new TypeError('source1 should be an Array or a Vec.');
  }

  if (!Array.isArray(source2) && !Vec.isVec(source2)) {
    throw new TypeError('source2 should be an Array or a Vec.');
  }

  if (source1.length !== source2.length) {
    throw new TypeError('source1 and source2 have different lengths.');
  }

  const result = new Vec(source1.length);

  for (let i = 0; i < source1.length; i += 1) {
    result[i] = mapping(source1[i], source2[i], i);
  }

  return result;
}

export default map2;
