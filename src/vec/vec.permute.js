import Vec from './vec.core';
import { throwIfNullOrUndefined } from '../throwHelper';
import empty from './vec.empty';

/** @module */

/**
 * <h3> permute() ⇒ Vec </h3>
 * Returns a vector with all elements permuted.
 * The quickperm algorithm is used. https://www.quickperm.org/quickperm.php
 * @return {Vec} The result vector.
 * @example
 * const threeNums = Vec.of(1, 2, 3);
 * const permuted = threeNums.permute();
 * console.log(permuted);
 * // =>
 * //  [ [ 1, 2, 3 ],
 * //    [ 2, 1, 3 ],
 * //    [ 3, 1, 2 ],
 * //    [ 1, 3, 2 ],
 * //    [ 2, 3, 1 ],
 * //    [ 3, 2, 1 ] ]
 */
function permute() {
  throwIfNullOrUndefined(this, 'this');

  const n = this.length;
  if (n === 0) {
    return empty();
  }

  const result = new Vec();
  const pickup = () => {
    const tempVec = new Vec();
    for (let x = 0; x < n; x += 1) {
      tempVec.push(this[x]);
    }
    result.push(tempVec);
  };

  const p = new Vec(n);
  for (let i = 0; i < n; i += 1) {
    p[i] = 0;
  }
  pickup();
  let i = 1;
  let j;
  while (i < n) {
    if (p[i] < i) {
      j = (i % 2) * p[i];
      const tmp = this[j];
      this[j] = this[i];
      this[i] = tmp;
      pickup();
      p[i] += 1;
      i = 1;
    } else {
      p[i] = 0;
      i += 1;
    }
  }

  // reset this to original order
  for (let y = 0; y < n; y += 1) {
    this[y] = result[0][y];
  }

  return result;
}

export default permute;
