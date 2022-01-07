import { isNumber } from '../util';
import { throwIfNullOrUndefined } from '../throwHelper';

/** @module */

/**
 * <h3> max() ⇒ number|undefined </h3>
 * Returns the greatest of all elements of the vector.
 * @return {number|undefined}  The maximum number if the vector contains number; otherwise, undefined.
 * @example
 * const oneKItems = Vec.init(1000, x => x * x);
 * const max = oneKItems.max();
 * console.log(max);
 * // => 998001
 */
function max() {
  throwIfNullOrUndefined(this, 'this');

  if (this.length === 0) {
    return undefined;
  }

  let maxNum;

  for (let i = 0; i < this.length; i += 1) {
    if (isNumber(this[i])) {
      if (maxNum === undefined) {
        maxNum = this[i];
      } else if (this[i] > maxNum) {
        maxNum = this[i];
      }
    }
  }

  return maxNum;
}

export default max;
