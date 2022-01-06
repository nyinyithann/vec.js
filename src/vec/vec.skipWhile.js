import {
  throwIfGeneratorFunction,
  throwIfNotFunction,
  throwIfNullOrUndefined,
} from '../throwHelper';
import empty from './vec.empty';

/** @module */

/**
 * <h3> skipWhile(predicate) ⇒ Vec </h3>
 * Bypasses elements in the vector while the given predicate returns True,
 * and then returns the remaining elements in a new vector.
 * @param {function} predicate A function that evaluates an element of the vector to a boolean value.
 * @return {Vec} The result vector.
 * @exception {TypeError} when predicate is not a function or predicate is a generator function.
 * @example
 * const randomVec = Vec.of(11, 3, 2, 4, 100, 65, 100, 2,);
 * const skipWhileResult = randomVec.skipWhile(x => x < 100);
 * console.log(skipWhileResult);
 * // => [ 100, 65, 100, 2 ]
 */
function skipWhile(predicate) {
  throwIfNullOrUndefined(this, 'this');
  throwIfNotFunction(predicate, 'predicate');
  throwIfGeneratorFunction(predicate, 'predicate');

  let thisArg;

  if (arguments.length > 1) {
    thisArg = arguments[1];
  }

  let i = 0;
  while (i < this.length && predicate.call(thisArg, this[i])) {
    i += 1;
  }

  if (i === this.length) {
    return empty();
  }
  return this.slice(i);
}

export default skipWhile;
