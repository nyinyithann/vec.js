import {
  throwIfGeneratorFunction,
  throwIfNotFunction,
  throwIfNullOrUndefined,
} from '../throwHelper';
import Vec from './vec.core';

/** @module */

/**
 * <h3> some2(predicate, source1, source2) ⇒ boolean </h3>
 * Tests if any pair of corresponding elements of the vectors satisfies the given predicate.
 * The predicate is applied to matching elements in the two collections up to the lesser of the two lengths of the collections.
 * If any application returns true then the overall result is true and no further elements are tested.
 * @param {function} predicate The function to test the input elements.
 * @param {Array | Vec} source1 The first input vector.
 * @param {Array | Vec} source2 The second input vector.
 * @return {boolean} True if any result from predicate is true. Otherwise, false.
 * @exception {TypeError} when
 *  predicate is not a function or
 *  predicate is a generator function  or
 *  source1 is not an array or a vector or
 *  source2 is not an array or a vector or
 *  the lengths of source1 and source2 are not the same.
 * @example
 * const fourNumbers_1 = Vec.of(25, 4, 55, 61);
 * const fourNumbers_2 = Vec.of(2, 4, 5, 56);
 * const hasEvenPair = Vec.some2((x, y) => x % 2 === 0 && y % 2 === 0, fourNumbers_1, fourNumbers_2);
 * console.log(hasEvenPair);
 * // => true
 */
function some2(predicate, source1, source2) {
  throwIfNotFunction(predicate, 'predicate');
  throwIfGeneratorFunction(predicate, 'predicate');
  throwIfNullOrUndefined(source1, 'source1');
  throwIfNullOrUndefined(source2, 'source2');

  if (!Array.isArray(source1) && !Vec.isVec(source1)) {
    throw new TypeError('source1 should be Array or Vec.');
  }

  if (!Array.isArray(source2) && !Vec.isVec(source2)) {
    throw new TypeError('source2 should be Array or Vec.');
  }

  if (source1.length !== source2.length) {
    throw new TypeError('source1 and source2 have different lengths.');
  }

  return (function loop(i) {
    return (
      i < source1.length && (predicate(source1[i], source2[i]) || loop(i + 1))
    );
  })(0);
}

export default some2;
