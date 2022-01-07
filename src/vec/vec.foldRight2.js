import {
  throwIfGeneratorFunction,
  throwIfNotFunction,
  throwIfNullOrUndefined,
} from '../throwHelper';
import Vec from './vec.core';

/** @module */

/**
 * <h3> Vec.foldRight2(folder, source1, source2, state) ⇒ value </h3>
 * Apply a function to pairs of elements drawn from the two collections, right-to-left,
 * threading an accumulator argument through the computation.
 * The two input arrays must have the same lengths.
 * @param {function} folder The function to update the state given the input elements.
 * @param {Array | Vec} source1 The first input array or vector.
 * @param {Array | Vec} source2 The second input array or vector.
 * @param {*} state The initial state.
 * @return {*} The final state.
 * @exception {TypeError} when
 * state is null or undefined or
 * folder is not a function or
 * folder is a generator function or
 * source1 is neither an array nor a vector or
 * source2 is neither an array nor a vector.
 * @example
 * const oneToHundred_1 = Vec.init(100, x => x + 1);
 * const oneToHundred_2 = Vec.init(100, x => x + 1);
 * const folderRight = (x, y, s) => x + y + s;
 * const foldRightState = Vec.foldRight2(folderRight, oneToHundred_1, oneToHundred_2, 0);
 * console.log(foldRightState);
 * // => 10100
 */
function foldRight2(folder, source1, source2, state) {
  throwIfNullOrUndefined(state, 'state');
  throwIfNotFunction(folder, 'folder');
  throwIfGeneratorFunction(folder, 'folder');
  throwIfNullOrUndefined(source1, 'source1');
  throwIfNullOrUndefined(source2, 'source2');

  if (!Array.isArray(source1) && !Vec.isVec(source1)) {
    throw new TypeError('source1 should be Array or Vec.');
  }

  if (!Array.isArray(source2) && !Vec.isVec(source2)) {
    throw new TypeError('source2 should be Array or Vec.');
  }

  if (source1.length !== source2.length) {
    throw new TypeError('source1 and source2 have different lengths.');
  }

  let s = state;
  for (let i = source1.length - 1; i >= 0; i -= 1) {
    s = folder(source1[i], source2[i], s);
  }

  return s;
}

export default foldRight2;
