import { throwIfNullOrUndefined } from '../throwHelper';
import Vec from './vec.core';

/** @module */

/**
 * <h3> unzip() ⇒ Vec </h3>
 * Splits a vector of pairs into two vectors.
 * @return {Vec} The vector containing two vectors.
 * @example
 * const pairsOfVec = new Vec(
 *    new Vec(1, 2),
 *    new Vec(3, 4),
 *    new Vec(5, 6)
 * );
 * const unzipped = pairsOfVec.unzip();
 * console.log(unzipped);
 * // => [ [ 1, 3, 5 ], [ 2, 4, 6 ] ]
 */
function unzip() {
  throwIfNullOrUndefined(this, 'this');

  const vec1 = new Vec(this.length);
  const vec2 = new Vec(this.length);

  for (let i = 0; i < this.length; i += 1) {
    const [f, s] = this[i];

    throwIfNullOrUndefined(f, 'f');
    throwIfNullOrUndefined(s, 's');

    vec1[i] = f;
    vec2[i] = s;
  }

  return new Vec(vec1, vec2);
}

export default unzip;
