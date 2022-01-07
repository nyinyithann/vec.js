import { throwIfNullOrUndefined } from '../throwHelper';

/** @module */

/**
 * <h3> head() ⇒ element </h3>
 * Returns the first element of the vector.
 * @return {*} The first element of the vector or undefined if the vector is empty.
 * @example
 * const oneToFour = Vec.init(5, x => x + 1);
 * const head = oneToFour.head();
 * console.log(head);
 * // => 1
 */
function head() {
  throwIfNullOrUndefined(this, 'this');

  if (this.isEmpty()) {
    return undefined;
  }

  return this[0];
}

export default head;
