import { throwIfNegativeNumber } from '../throwHelper';
import Vec from './vec.core';
import empty from './vec.empty';

/** @module */

/**
 * <h3> Vec.create(count, value) ⇒ Vec </h3>
 * Creates a vector whose elements are all initially the given value.
 * @param {number} count The length of the vector to create.
 * @param {*} value The value for the elements.
 * @return {Vec} The created vector.
 * @example
 * const createdVec = Vec.create(10, 2);
 * console.log(createdVec);
 * // => [ 2, 2, 2, 2, 2, 2, 2, 2, 2, 2 ]
 */
function create(count, value) {
  throwIfNegativeNumber(count, 'count');

  const c = Math.floor(count);

  if (c === 0) {
    return empty();
  }

  const vec = new Vec();
  for (let i = 0; i < c; i += 1) {
    vec.push(value);
  }

  return vec;
}

export default create;
