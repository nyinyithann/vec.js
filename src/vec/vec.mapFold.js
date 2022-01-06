import {
  throwIfGeneratorFunction,
  throwIfNotFunction,
  throwIfNullOrUndefined,
} from '../throwHelper';
import Vec from './vec.core';
import empty from './vec.empty';

/** @module */

/**
 * <h3> mapFold(mapping, state) ⇒ Vec </h3>
 * Builds a new vector whose elements are the results of applying the given function to each of the elements of the source vector.
 * The function is also used to accumulate a final value.
 * @param {function} mapping The function to transform elements from the vector and accumulate the final value.
 * @param {*} state The initial state.
 * @return {Vec} The vector of transformed elements, and the final accumulated value.
 * @exception {TypeError} when state is null or undefined or mapping is a generator function or mapping is not a function.
 * @example
 * const oneToTenVec = Vec.init(10, x => x + 1);
 * const mapFolder = (state, elem) => [ state + elem, state + elem];
 * const mapFoldResult = oneToTenVec.mapFold(mapFolder, 0);
 * console.log(mapFoldResult);
 * // => [ [ 1, 3, 6, 10, 15, 21, 28, 36, 45, 55 ], 55 ]
 *
 * const funcsVec_1 = Vec.of(x => x + 1, x => x + 1);
 * const mapFolder_1 = (state, x) => [x(state), x(state)];
 * const mapFoldResult_1 = funcsVec_1.mapFold(mapFolder_1, 1);
 * console.log(mapFoldResult_1);
 * // => [ [ 2, 3 ], 3 ]
 */
function mapFold(mapping, state) {
  throwIfNullOrUndefined(this, 'this');
  throwIfNullOrUndefined(state, 'state');
  throwIfNotFunction(mapping, 'mapping');
  throwIfGeneratorFunction(mapping, 'mapping');

  let acc = state;
  let thisArg;

  if (arguments.length > 2) {
    thisArg = arguments[2];
  }

  if (this.length === 0) {
    return new Vec(empty(), acc);
  }

  const vec = new Vec(this.length);
  for (let i = 0; i < this.length; i += 1) {
    const [h, s] = mapping.call(thisArg, acc, this[i]);
    vec[i] = h;
    acc = s;
  }

  return new Vec(vec, acc);
}

export default mapFold;
