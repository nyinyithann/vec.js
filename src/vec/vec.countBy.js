import isEqual from 'lodash.isequal';
import {
  throwIfGeneratorFunction,
  throwIfNotFunction,
  throwIfNullOrUndefined,
} from '../throwHelper';
import Vec from './vec.core';

/** @module */

/**
 * <h3> countBy(projection) ⇒ Vec </h3>
 * Applies a key-generating function to each element of a vector and
 * returns a vector yielding unique keys and their number of occurrences in the original array.
 * @param {function} projection A function transforming each item of the input vector into a key to be compared against the others.
 * @param {object} Value to use as this when executing projection
 * @return {Vec} The result vector.
 * @exception {TypeError} if struturalEquality parameter is null or undefined; or projection parameter is a generator function
 * or not a function.
 * @example
 * const countByVec = new Vec(1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5);
 * const counts_1 = countByVec.countBy(x => x);
 * console.log(counts_1);
 * // => [ [ 1, 5 ], [ 2, 5 ], [ 3, 3 ], [ 4, 3 ], [ 5, 1 ] ]
 * const counts_2 = countByVec.countBy(x => x % 2 === 0);
 * console.log(counts_2);
 * // => [ [ false, 9 ], [ true, 8 ] ]
 */
function countBy(projection) {
  throwIfNullOrUndefined(this, 'this');
  throwIfNotFunction(projection, 'projection');
  throwIfGeneratorFunction(projection, 'projection');

  let thisArg;

  if (arguments.length > 1) {
    thisArg = arguments[1];
  }

  const map = new Map();
  for (const item of this) {
    const key = projection.call(thisArg, item);
    let count = 1;
    let foundKey = false;
    for (const k of map.keys()) {
      if (isEqual(k, key)) {
        count = map.get(k) + 1;
        foundKey = true;
        map.set(k, count);
        break;
      }
    }
    if (!foundKey) {
      map.set(key, count);
    }
  }

  const vec = new Vec();
  map.forEach((v, k) => vec.push(Vec.of(k, v)));
  return vec;
}

export default countBy;
