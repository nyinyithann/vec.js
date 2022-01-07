import {
  throwIfGeneratorFunction,
  throwIfNegativeNumber,
  throwIfNotFunction,
} from '../throwHelper';
import Vec from './vec.core';
import empty from './vec.empty';

/** @module */

/**
 * <h3> Vec.init(count, initializer) ⇒ Vec </h3>
 * Generate a new Vec by invoking initializer function passed as the argument up to the given count.
 * @param {number} count The maximum number of items to generate for the Vec.
 * @param {function } initializer A function that generates an item in the Vec from a given index.
 * @return {Vec} The result vector.
 * @exception {TypeError} if count is a negative number; or initializer is a generator function or not a function.
 * @example
 * const fiveNums = Vec.init(5, x => x * 2);
 * console.log(fiveNums);
 * // => [0, 2, 4, 6, 8]
 */
function init(count, initializer) {
  throwIfNegativeNumber(count, 'count');
  throwIfNotFunction(initializer, 'initializer');
  throwIfGeneratorFunction(initializer, 'initializer');

  const c = Math.floor(count);

  if (c === 0) {
    return empty();
  }

  const vec = new Vec();
  for (let i = 0; i < c; i += 1) {
    vec.push(initializer(i));
  }
  return vec;
}

export default init;
