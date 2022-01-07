import {
  throwIfGeneratorFunction,
  throwIfNotFunction,
  throwIfNullOrUndefined,
} from '../throwHelper';

/** @module */

/**
 * <h3> findRight(predicate) ⇒ element of the vector or undefined </h3>
 * Returns the last element for which the given function returns 'true'.
 * Returns undefined if none of the elements satisfy the predicate.
 * @param {function} predicate The function to test the input elements.
 * @return {*} The last element for which predicate returns true.
 * @exception {TypeError} if predicate is a generator function or not a function.
 * @example
 * const p1 = { x : 10, y : 50};
 * const p2 = { x : 10, y : 60};
 * const p3 = { x : 10, y : 70};
 * const nums = new Vec(p1, p2, p3);
 * const result = nums.findRight(({x}) => x === 10);
 * console.log(result);
 * // => { x: 10, y: 70 }
 */
function findRight(predicate) {
  throwIfNullOrUndefined(this, 'this');
  throwIfNotFunction(predicate, 'predicate');
  throwIfGeneratorFunction(predicate, 'predicate');

  const thisVec = Object(this);

  let thisArg;

  if (arguments.length > 1) {
    thisArg = arguments[1];
  }

  const loop = function (index) {
    if (index < 0) {
      return undefined;
    }
    if (predicate.call(thisArg, thisVec[index])) {
      return thisVec[index];
    }
    return loop(index - 1);
  };

  return loop(this.length - 1);
}

export default findRight;
