import {
  throwIfGeneratorFunction,
  throwIfNotFunction,
  throwIfNullOrUndefined,
} from '../throwHelper';
import Vec from './vec.core';
import empty from './vec.empty';

/** @module */

/**
 * <h3> mapFoldRight(mapping, state) ⇒ Vec </h3>
 * Builds a new vector whose elements are the results of applying the given function to each of the elements of the source vector.
 * The function is also used to accumulate a final value.
 * @param {function} mapping The function to transform elements from the vector and accumulate the final value.
 * @param {*} state The initial state.
 * @return {Vec} The vector of transformed elements, and the final accumulated value.
 * @exception {TypeError} when state is null or undefined or mapping is a generator function or mapping is not a function.
 * @example
 * const funcsVec_2 = Vec.of(x => x + 1, x => x + 1);
 * const mapFolder_2 = (x, state) => [x(state), x(state)];
 * const mapFoldResult_2 = funcsVec_2.mapFoldRight(mapFolder_2, 1);
 * console.log(mapFoldResult_2);
 * // => [ [ 3, 2 ], 3 ]
 */
function mapFoldRight(mapping, state) {
  throwIfNullOrUndefined(this, 'this');
  throwIfNullOrUndefined(state, 'state');
  throwIfNotFunction(mapping, 'mapping');
  throwIfGeneratorFunction(mapping, 'mapping');

  let accumulator = state;
  let thisArg;

  if (arguments.length > 2) {
    thisArg = arguments[2];
  }

  if (this.length === 0) {
    return new Vec(empty(), state);
  }

  const vec = new Vec(this.length);
  for (let i = this.length - 1; i >= 0; i -= 1) {
    const [h, s] = mapping.call(thisArg, this[i], accumulator);
    vec[i] = h;
    accumulator = s;
  }

  return new Vec(vec, accumulator);
}

export default mapFoldRight;
