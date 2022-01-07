import {
  throwIfGeneratorFunction,
  throwIfNotFunction,
  throwIfNullOrUndefined,
} from '../throwHelper';
import Vec from './vec.core';

/** @module */

/**
 * <h3> Vec.every2(predicate, source1, source2) ⇒ boolean </h3>
 * Tests if all corresponding elements of the vector satisfy the given predicate pairwise.
 * The predicate is applied to matching elements in the two collections up to the lesser of the two lengths of the collections.
 * If any application returns false then the overall result is false and no further elements are tested.
 * Otherwise; if one collection is longer than the other then { TypeError }will be thrown. Otherwise; true is returned.
 * @param {function} predicate The function to test the input elements.
 * @param {Array | Vec} source1 The first input array or vector.
 * @param {Array | Vec} source2 The second input array or vector.
 * @return {boolean} True if all of the array elements satisfy the predicate.
 * @exception {TypeError} when
 *  predicate is not a function or
 *  predicate is a generator function  or
 *  source1 is not an array or a vector or
 *  source2 is not an array or a vector or
 *  the lengths of source1 and source2 are not the same.
 * @example
 * const vec1 = Vec.of(2, 4, 6);
 * const vec2 = Vec.of(8, 10, 12);
 * const isEven = x => x % 2 === 0;
 * const allEven = Vec.every2(isEven, vec1, vec2);
 * console.log(allEven);
 * // => true
 */
function every2(predicate, source1, source2) {
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
      i >= source1.length || (predicate(source1[i], source2[i]) && loop(i + 1))
    );
  })(0);
}

export default every2;
