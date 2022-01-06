import {
  throwIfGeneratorFunction,
  throwIfNotFunction,
  throwIfNullOrUndefined,
} from '../throwHelper';
import Vec from './vec.core';

/** @module */

/**
 * <h3> Vec.forEach2(action, source1, source2) </h3>
 * Applies the given function to pair of elements drawn from matching indices in two arrays or vectors.
 * The two input arrays or vectors must have the same lengths.
 * @param {function} action The function to apply.
 * @param {Array | Vec} source1 The first input array or vector.
 * @param {Array | Vec} source2 The second input array or vector.
 * @exception {TypeError} when
 * action is a generator function or
 * action is not a function or
 * source1 is neither an array nor a vector or
 * source2 is neither an array nor a vector.
 * @example
 * const charVec_1 = Vec.of('a', 'b', 'c', 'd');
 * const charVec_2 = Vec.of('d', 'e', 'f', 'g');
 * const charVecResult = new Vec();
 * Vec.forEach2((a, b, index) => charVecResult.push(a + b + index), charVec_1, charVec_2);
 * console.log(charVecResult);
 * // => [ 'ad0', 'be1', 'cf2', 'dg3' ]
 */
function forEach2(action, source1, source2) {
  throwIfNotFunction(action, 'action');
  throwIfGeneratorFunction(action, 'action');
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

  for (let i = 0; i < source1.length; i += 1) {
    action(source1[i], source2[i], i);
  }
}

export default forEach2;
