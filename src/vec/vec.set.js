import { throwIfNullOrUndefined } from '../throwHelper';

/** @module */

/**
 * <h3> set(index, value) ⇒ Vec </h3>
 * Sets an element of a vector.
 * @param {number} index The index to add an element.
 * @param {*} value The value to add into the vector at the given index.
 * @return {*} The value set.
 * @example
 * const newVec = new Vec();
 * const setVal = newVec.set(5, 256);
 * console.log(setVal);
 * // => 256
 * console.log(newVec);
 * // => [ , , , , , 256 ]
 */
function set(index, value) {
  throwIfNullOrUndefined(this, 'this');

  // eslint-disable-next-line no-return-assign
  return (this[index] = value);
}

export default set;
