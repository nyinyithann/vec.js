import create from './vec.create';
import {
  throwIfGeneratorFunction,
  throwIfNotFunction,
  throwIfNullOrUndefined,
} from '../throwHelper';

/** @module */

/**
 * <h3> scan(folder, initialState) ⇒ Vec </h3>
 * Like reduce method, but return the intermediary and final results.
 * @param {function} folder The function to update the state given the input elements.
 * @param {*} initialState The initial state.
 * @return {Vec} The result vector.
 * @exception {TypeError} when initialState is null or undefined. Or folder is not a function or folder is a generator function.
 * @example
 * const tenNumbers = Vec.init(10, x => x + 1);
 * const scanned = tenNumbers.scan((state, elem) => state + elem, 0);
 * console.log(scanned);
 * // => [ 0, 1, 3, 6, 10, 15, 21, 28, 36, 45, 55 ]

 * const threeFuncs = Vec.of(x => x - 1, x => x - 2, x => x - 3);
 * const scannedValues = threeFuncs.scan((state, f) => f(state), 1);
 * console.log(scannedValues)
 * // => [ 1, 0, -2, -5 ]
 */
function scan(folder, initialState) {
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
  for (let i = 0; i < this.length; i += 1) {
    state = folder.call(thisArg, state, this[i]);
    vec[i + 1] = state;
  }

  return vec;
}

export default scan;
