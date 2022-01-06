import Vec from './vec.core';
import {
  throwIfGeneratorFunction,
  throwIfNotFunction,
  throwIfNullOrUndefined,
} from '../throwHelper';

/** @module */

/**
 * <h3> partition(predicate) ⇒ Vec </h3>
 * Splits the vector into two vectors, containing the elements for which the given predicate returns "true" and "false" respectively.
 * @param {function} predicate The function to test the input elements.
 * @return {Vec} A pair of vectors. The first containing the elements the predicate evaluated to true,
 * and the second containing those evaluated to false.
 * @exception {TypeError} when predicate is not a function or predicate is a generator function.
 * @example
 * const twelveNums = Vec.init(12, x => x + 1);
 * const [evens, odds] = twelveNums.partition(x => x % 2 === 0);
 * console.log(evens);
 * // => [ 2, 4, 6, 8, 10, 12 ]
 * console.log(odds);
 * // => [ 1, 3, 5, 7, 9, 11 ]
 */
function partition(predicate) {
  throwIfNullOrUndefined(this, 'this');
  throwIfNotFunction(predicate, 'predicate');
  throwIfGeneratorFunction(predicate, 'predicate');

  let thisArg;

  if (arguments.length > 1) {
    thisArg = arguments[1];
  }

  const left = new Vec();
  const right = new Vec();

  for (const item of this) {
    if (predicate.call(thisArg, item)) {
      left.push(item);
    } else {
      right.push(item);
    }
  }

  return new Vec(left, right);
}

export default partition;
