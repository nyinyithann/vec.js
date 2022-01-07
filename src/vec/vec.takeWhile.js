import Vec from './vec.core';
import {
  throwIfGeneratorFunction,
  throwIfNotFunction,
  throwIfNullOrUndefined,
} from '../throwHelper';

/** @module */

/**
 * <h3> takeWhile(predicate) ⇒ Vec </h3>
 * Returns a vector that contains all elements of the original vector while the given predicate returns True, and then returns no further elements.
 * @param {function} predicate A function that evaluates to false when no more items should be returned.
 * @return {Vec} The result vector.
 * @exception {TypeError} When predicate is not a function, or predicate is a generator function.
 * @example
 * const oddsVec = Vec.of(99, 89, 11, 23, 3,9 , 11);
 * const takeWhileVec = oddsVec.takeWhile(x => x > 11);
 * console.log(takeWhileVec);
 * // => [ 99, 98 ]
 */
function takeWhile(predicate) {
  throwIfNullOrUndefined(this, 'this');
  throwIfNotFunction(predicate, 'predicate');
  throwIfGeneratorFunction(predicate, 'predicate');

  let thisArg;

  if (arguments.length > 1) {
    thisArg = arguments[1];
  }

  const result = new Vec();

  for (const item of this) {
    if (predicate.call(thisArg, item)) {
      result.push(item);
    } else {
      break;
    }
  }

  return result;
}

export default takeWhile;
