import { throwIfNullOrUndefined } from '../throwHelper';

/** @module */

/**
 * <h3> isEmpty() ⇒ boolean </h3>
 * Returns true if the vector is empty, otherwise; false.
 * @return {boolean} True if the vector is empty.
 */
function isEmpty() {
  throwIfNullOrUndefined(this, 'this');
  return this.length === 0;
}

export default isEmpty;
