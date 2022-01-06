import {
  throwIfGeneratorFunction,
  throwIfNotFunction,
  throwIfNullOrUndefined,
} from '../throwHelper';

/** @module */

/**
 * <h3> findIndexRight(predicate) ⇒ number </h3>
 * Returns the index of the last element in the vector that satisfies the given predicate.
 * Returns -1 if none of the elements satisfy the predicate.
 * @param {function} predicate The function to test the input elements.
 * @return {number} The index of the first element in the array that satisfies the given predicate.
 * @exception {TypeError} if predicate is a generator function or not a function.
 * @example
 * const nums = Vec.of(1, 2, 3, 4, 5, 6, 7, 8);
 * const indexRight = nums.findIndexRight(x => x % 2 === 1);
 * console.log(indexRight);
 * // => 6
 */
function findIndexRight(predicate) {
  throwIfNullOrUndefined(this, 'this');
  throwIfNotFunction(predicate, 'predicate');
  throwIfGeneratorFunction(predicate, 'predicate');

  const thisVec = Object(this);

  let thisArg;

  if (arguments.length > 1) {
    thisArg = arguments[1];
  }

  return (function loop(index) {
    if (index < 0) {
      return -1;
    } if (predicate.call(thisArg, thisVec[index])) {
      return index;
    }
    return loop(index - 1);
  }(this.length - 1));
}

export default findIndexRight;
