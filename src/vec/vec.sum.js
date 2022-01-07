import { throwIfNullOrUndefined } from '../throwHelper';
import { isNumber } from '../util';

/** @module */

/**
 * <h3> sum() ⇒ number|undefined </h3>
 * Returns the sum of the elements in the vector.
 * @return {number|undefined} The sum of the elements in the vector if all the elements are number. Otherwise, undefined.
 * @example
 * const fiveNumbers = Vec.of(10,20,30,40,50);
 * const sum = fiveNumbers.sum();
 * console.log(sum);
 * // => 150
 */
function sum() {
  throwIfNullOrUndefined(this, 'this');

  if (this.length === 0) {
    return undefined;
  }

  let sumNum = 0;

  for (let i = 0; i < this.length; i += 1) {
    if (isNumber(this[i])) {
      sumNum += this[i];
    }
  }

  return sumNum;
}

export default sum;
