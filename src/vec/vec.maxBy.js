import { isNumber } from '../util';
import {
  throwIfGeneratorFunction,
  throwIfNotFunction,
  throwIfNullOrUndefined,
} from '../throwHelper';

/** @module */

/**
 * <h3> maxBy(projection) ⇒ number|undefined </h3>
 * Returns the greatest of all elements of the vector.
 * @param {function} projection The function to transform the elements into a certain type.
 * @return {number|undefined} The maximum element.
 * @exception {TypeError} when projection is not a function or projection is a generator function.
 * @example
 * const thousandNums = Vec.init(1000, x => x + 1);
 * const biggestPerfectNumberUnder1000 = thousandNums.maxBy(x => {
 *    const v = new Vec();
 *    for(let i = 1; i < x; i += 1) {
 *        if (x % i === 0) {
 *            v.push(i);
 *        }
 *    }
 *    if (!v.isEmpty() &&  v.reduce((x,y) => x + y) === x) return x;
 * });
 * console.log(biggestPerfectNumberUnder1000);
 * // => 496
 */
function maxBy(projection) {
  throwIfNullOrUndefined(this, 'this');
  throwIfNotFunction(projection, 'projection');
  throwIfGeneratorFunction(projection, 'projection');

  let thisArg;

  if (arguments.length > 1) {
    thisArg = arguments[1];
  }

  if (this.length === 0) {
    return undefined;
  }

  let maxNum;

  for (let i = 0; i < this.length; i += 1) {
    const projected = projection.call(thisArg, this[i]);
    if (isNumber(projected)) {
      if (maxNum === undefined) {
        maxNum = projected;
      } else if (projected > maxNum) {
        maxNum = projected;
      }
    }
  }

  return maxNum;
}

export default maxBy;
