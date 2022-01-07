import {
  throwIfGeneratorFunction,
  throwIfNotFunction,
  throwIfNullOrUndefined,
} from '../throwHelper';
import Vec from './vec.core';

/** @module */

/**
 * <h3> Vec.fold2(folder, state, source1, source2) ⇒ value </h3>
 * Applies a function to pairs of elements drawn from the two collections, left-to-right,
 * threading an accumulator argument through the computation.
 * The two input arrays must have the same lengths.
 * @param {function} folder The function to update the state given the input elements.
 * @param {*} state The initial state.
 * @param {Array | Vec} source1 The first input array or vector.
 * @param {Array | Vec} source2 The second input array or vector.
 * @return {*} The final state.
 * @exception {TypeError} when
 *  state is null or undefined or
 *  folder is not a function or
 *  folder is a generator function or
 *  source1 is neither an array nor a vector or
 *  source2 is neither an array nor a vector or
 * @example
 * const oneToTen_1 = Vec.init(10, x => x + 1);
 * const oneToTen_2 = Vec.init(10, x => x + 1);
 * const folder = (s, x, y) => x + y + s;
 * const state = Vec.fold2(folder, 0, oneToTen_1, oneToTen_2);
 * console.log(state);
 * // => 110
 */
function fold2(folder, state, source1, source2) {
  throwIfNullOrUndefined(state, 'state');
  throwIfNotFunction(folder, 'folder');
  throwIfGeneratorFunction(folder, 'folder');
  throwIfNullOrUndefined(source1, 'source1');
  throwIfNullOrUndefined(source2, 'source2');

  if (!Array.isArray(source1) && !Vec.isVec(source1)) {
    throw new TypeError('source1 should be an Array or a Vec.');
  }

  if (!Array.isArray(source2) && !Vec.isVec(source2)) {
    throw new TypeError('source2 should be an Array or a Vec.');
  }

  if (source1.length !== source2.length) {
    throw new TypeError('source1 and source2 have different lengths.');
  }

  let s = state;
  for (let i = 0; i < source1.length; i += 1) {
    s = folder(s, source1[i], source2[i]);
  }

  return s;
}

export default fold2;
