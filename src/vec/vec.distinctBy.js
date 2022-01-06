import isEqual from 'lodash.isequal';
import {
  throwIfGeneratorFunction,
  throwIfNotFunction,
  throwIfNullOrUndefined,
} from '../throwHelper';
import Vec from './vec.core';

/** @module */

/**
 * <h3> distinctBy(projection) ⇒ Vec </h3>
 * Returns a vector that contains no duplicate entries according to the equality comparisons on the keys returned by the given key-generating function.
 * If an element occurs multiple times in the array then the later occurrences are discarded.
 * @param {function} projection A function transforming the vector items into comparable keys.
 * @return {Vec} The result vector.
 * @exception {TypeError} if struturalEquality parameter is null or undefined; or projection parameter is a generator function
 * @example
 * const mixedVec = Vec.of(
 *    { name: "Fsharp", family: { name: "ML" } },
 *    { name: "OCaml", family: { name: "ML" } },
 *    { name: "C++", family: { name: "Smalltalk" } }
 * );
 * const distinctedByVec_1 = mixedVec.distinctBy(x => x.family, false);
 * console.log(distinctedByVec_1);
 * // =>
 *  [ { name: 'Fsharp', family: { name: 'ML' } },
 *    { name: 'OCaml', family: { name: 'ML' } },
 *    { name: 'C++', family: { name: 'Smalltalk' } } ]
 *
 * const distinctedByVec_2 = mixedVec.distinctBy(x => x.family, true);
 * console.log(distinctedByVec_2);
 * // =>
 *  [ { name: 'Fsharp', family: { name: 'ML' } },
 *    { name: 'C++', family: { name: 'Smalltalk' } } ]
 */
function distinctBy(projection) {
  throwIfNullOrUndefined(this, 'this');
  throwIfNotFunction(projection, 'projection');
  throwIfGeneratorFunction(projection, 'projection');

  let thisArg;

  if (arguments.length > 1) {
    thisArg = arguments[1];
  }

  const set = new Set();
  const vec = new Vec();

  for (let i = 0; i < this.length; i += 1) {
    const value = this[i];
    const key = projection.call(thisArg, value);

    let hasKey = false;
    for (const k of set) {
      if (isEqual(k, key)) {
        hasKey = true;
        break;
      }
    }
    if (!hasKey) {
      set.add(key);
      vec.push(value);
    }
  }

  return vec;
}

export default distinctBy;
