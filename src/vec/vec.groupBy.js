import isEqual from 'lodash.isequal';
import {
  throwIfGeneratorFunction,
  throwIfNotFunction,
  throwIfNullOrUndefined,
} from '../throwHelper';
import Vec from './vec.core';

/** @module */

/**
 * <h3> groupBy(projection) ⇒ Vec </h3>
 * Applies a key-generating function to each element of a vector and yields a vector of unique keys.
 * Each unique key contains a vector of all elements that match to this key.
 * @param {Function} projection A function that transforms an element of the vector into a key.
 * @return {Vec} The result vector.
 * @exception {TypeError} when
 * structuralEquality parameter is null or undefined or
 * projection is a generator function or
 * projection is not a function.
 * @example
 *
 * const langs = Vec.of(
 *    { name: "Fsharp", family: { name: "ML" } },
 *    { name: "OCaml", family: { name: "ML" } },
 *    { name: "C++", family: { name: "Smalltalk" }},
 *    { name: "C#", family: { name: "Smalltalk" }},
 *    { name: "FcukTheCoup", family: { name: "Generation Z" }},
 * );
 * const groupsByFamily = langs.groupBy(({family}) => family, true);
 * groupsByFamily.forEach(([key, values]) => {
 *    console.log(`key: ${key.name}`);
 *    console.log(`\tvalues: `);
 *    console.log(values);
 * });
 * // =>
 * key: ML
 * values:
 *  [ { name: 'Fsharp', family: { name: 'ML' } },
 *    { name: 'OCaml', family: { name: 'ML' } } ]
 * key: Smalltalk
 * values:
 *  [ { name: 'C++', family: { name: 'Smalltalk' } },
 *    { name: 'C#', family: { name: 'Smalltalk' } } ]
 * key: Generation Z
 * values:
 *  [ { name: 'FcukTheCoup', family: { name: 'Generation Z' } } ]
 */
function groupBy(projection) {
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

    let foundKey = false;

    for (const k of map.keys()) {
      if (isEqual(k, key)) {
        const values = map.get(k);
        values.push(item);
        foundKey = true;
        break;
      }
    }

    if (!foundKey) {
      map.set(key, Vec.of(item));
    }
  }

  const vec = new Vec();
  map.forEach((v, k) => vec.push(Vec.of(k, v)));
  return vec;
}

export default groupBy;
