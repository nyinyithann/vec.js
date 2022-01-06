import { throwIfNullOrUndefined } from '../throwHelper';

/** @module */

/**
 * <h3> copy() ⇒ Vec </h3>
 * Builds a new vector that contains the elements of the source vector.
 * @return {Vec} A copy of the source vector.
 * @example
 * const sourceVec = Vec.init(5, x => x);
 * const copyVec = sourceVec.copy();
 * console.log(copyVec);
 * // => [ 0, 1, 2, 3, 4 ]
 */
function copy() {
  throwIfNullOrUndefined(this, 'this');
  return this.slice();
}

export default copy;
