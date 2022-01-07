import { throwIfNullOrUndefined } from '../throwHelper';

/** @module */

/**
 * <h3> last() ⇒ element </h3>
 * Returns the last element of the vector.
 * @return {*} The last element of the vector.
 * @example
 * console.log(Vec.init(1000, x => x).last())
 * // => 999
 */
function last() {
  throwIfNullOrUndefined(this, 'this');

  return this[this.length - 1];
}

export default last;
