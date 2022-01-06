import { throwIfNullOrUndefined } from '../throwHelper';
import { isNumber } from '../util';

/** @module */

/**
 * <h3> average() ⇒ number|undefined </h3>
 * Returns the average of the elements in the vector.
 * @return {number|undefined} The average of the elements in the vector or undefined if the vector is empty.
 * @example
 * const oneToTen = Vec.init(10, x => x + 1);
 * const avg = oneToTen.average();
 * console.log(avg);
 * // => 5.5
 */
function average() {
  throwIfNullOrUndefined(this, 'this');

  if (this.length === 0) {
    return undefined;
  }

  let sum = 0;

  for (let i = 0; i < this.length; i += 1) {
    if (isNumber(this[i])) {
      sum += this[i];
    }
  }

  return sum / this.length;
}

export default average;
