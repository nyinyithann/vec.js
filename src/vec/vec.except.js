import isEqual from 'lodash.isequal';
import { throwIfNullOrUndefined } from '../throwHelper';

/** @module */

/**
 * <h3> except(...itemsToExclude) ⇒ Vec </h3>
 * Returns a new list with the distinct elements of the input array which do not appear in the itemsToExclude sequence.
 * @param {...*} itemsToExclude A sequence whose elements that also occur in the source vector will cause those elements to be removed from the result.
 * @return {Vec} A vector that contains the distinct elements of source vector that do not appear in itemsToExclude.
 * @exception {TypeError} if structuralEquality parameter is null or undefined.
 * @example
 * const nObjVec = Vec.of({ n: 1 }, { n: 1 }, { n: 2 }, { n: 2 }, { n: 2 }, { n: 4 });
 * const except_1 = nObjVec.except(false, { n: 1 }, { n: 4 });
 * console.log(except_1);
 * // no items excluded under same-value-zero equality, no objects are equal to one another unless they are referencing to the same instance
 * // => [ { n: 1 }, { n: 1 }, { n: 2 }, { n: 2 }, { n: 2 }, { n: 4 } ]
 * const except_2 = nObjVec.except(true, { n: 1 }, { n: 2 });
 * console.log(except_2);
 * // => [ { n: 4 } ]
 */
function except(...itemsToExclude) {
  throwIfNullOrUndefined(this, 'this');

  if (this.length === 0) {
    return this;
  }

  if (itemsToExclude.length === 0) {
    return this.copy();
  }

  const set = new Set();

  for (const item of itemsToExclude) {
    if ([...set].every((x) => !isEqual(x, item))) {
      set.add(item);
    }
  }

  return this.filter((item) => {
    return [...set].every((x) => !isEqual(x, item));
  });
}

export default except;
