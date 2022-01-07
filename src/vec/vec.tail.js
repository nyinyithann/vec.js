import { throwIfNullOrUndefined } from '../throwHelper';

/** @module */

/**
 * <h3> tail() ⇒ Vec </h3>
 * Returns a new array containing the elements of the original except the first element.
 * @return {Vec} A new vector containing the elements of the original except the first element.
 * If the vector is empty, empty vector will be returned.
 * @example
 * const sixNumbers = Vec.of(6, 5, 4, 3, 2, 1);
 * const tail = sixNumbers.tail();
 * console.log(tail);
 * // => [ 5, 4, 3, 2, 1 ]
 */
function tail() {
  throwIfNullOrUndefined(this, 'this');
  return this.slice(1);
}

export default tail;
