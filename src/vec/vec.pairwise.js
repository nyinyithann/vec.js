import empty from './vec.empty';
import Vec from './vec.core';
import { throwIfNullOrUndefined } from '../throwHelper';

/** @module */

/**
 * <h3> pairwise() ⇒ Vec </h3>
 * Returns a vector of each element in the vector and its predecessor, with the exception of the first element
 * which is only returned as the predecessor of the second element.
 * @return {Vec} The result vector.
 * @example
 * const vowels = Vec.of('a', 'e', 'i', 'o', 'u');
 * const p = vowels.pairwise();
 * console.log(p);
 * // => [ [ 'a', 'e' ], [ 'e', 'i' ], [ 'i', 'o' ], [ 'o', 'u' ] ]
 */
function pairwise() {
  throwIfNullOrUndefined(this, 'this');

  if (this.length < 2) {
    return empty();
  }

  return Vec.init(this.length - 1, (i) => new Vec(this[i], this[i + 1]));
}

export default pairwise;
