import create from './vec.create';
import {
  throwIfGeneratorFunction,
  throwIfNotFunction,
  throwIfNullOrUndefined,
} from '../throwHelper';

/** @module */

/**
 * <h3> scanRight(folder, initialState) ⇒ Vec </h3>
 * Like reduceRight method, but return the intermediary and final results.
 * @param {function} folder The function to update the state given the input elements.
 * @param {*} initialState The initial state.
 * @return {Vec} The result vector.
 * @exception {TypeError} when initialState is null or undefined. Or folder is not a function or folder is a generator function.
 * @example
 * const threeFuncs_1 = Vec.of(x => x - 1, x => x - 2, x => x - 3);
 * const scannedValues_1 = threeFuncs_1.scanRight((f, state) => f(state), 1);
 * console.log(scannedValues_1)
 * // => [ -5, -4, -2, 1 ]
 */
function scanRight(folder, initialState) {
  throwIfNullOrUndefined(this, 'this');
  throwIfNullOrUndefined(initialState, 'initialState');
  throwIfNotFunction(folder, 'folder');
  throwIfGeneratorFunction(folder, 'folder');

  let thisArg;

  if (arguments.length > 2) {
    thisArg = arguments[2];
  }

  let state = initialState;
  const vec = create(this.length + 1, initialState);
  for (let i = this.length - 1; i >= 0; i -= 1) {
    state = folder.call(thisArg, this[i], state);
    vec[i] = state;
  }

  return vec;
}

export default scanRight;
