import { isNumber } from '../util';
import {
  throwIfGeneratorFunction,
  throwIfNotFunction,
  throwIfNullOrUndefined,
} from '../throwHelper';

/** @module */

/**
 * <h3> minBy(projection) ⇒ number|undefined </h3>
 * Returns the smallest of all elements of the vector.
 * @param {function} projection The function to transform the elements into a certain type.
 * @return {number|undefined} The minimum element.
 * @exception {TypeError} when projection is not a function or projection is a generator function.
 * @example
 * const thousandNums = Vec.init(1000, x => x + 1);
 * const smallestPerfectNumberUnder1000 = thousandNums.minBy(x => {
 *    const v = new Vec();
 *    for(let i = 1; i < x; i += 1) {
 *        if (x % i === 0) {
 *            v.push(i);
 *        }
 *    }
 *    if (!v.isEmpty() &&  v.reduce((x,y) => x + y) === x) return x;
 * });
 * console.log(smallestPerfectNumberUnder1000);
 * // => 6
 */
function minBy(projection) {
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

  let minNum;

  for (let i = 0; i < this.length; i += 1) {
    const projected = projection.call(thisArg, this[i]);
    if (isNumber(projected)) {
      if (minNum === undefined) {
        minNum = projected;
      } else if (projected < minNum) {
        minNum = projected;
      }
    }
  }

  return minNum;
}

export default minBy;
