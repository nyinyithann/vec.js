import { throwIfNegativeNumber, throwIfNullOrUndefined } from '../throwHelper';
import Vec from './vec.core';
import empty from './vec.empty';

/** @module */

/**
 * <h3> chunkBySize(chunkSize) ⇒ Vec </h3>
 * Divides the source vector into chunks of size at most chunkSize.
 * @param {number} chunkSize The maximum size of each chunk.
 * @return {Vec} The vector divided into chunks.
 * @exception {TypeError} if chunkSize is negative.
 * @example
 * const vec = Vec.init(10, x => x + 1);
 * const chunks = vec.chunkBySize(3);
 * console.log(chunks);
 * // => [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ], [ 10 ] ]
 */
function chunkBySize(chunkSize) {
  throwIfNullOrUndefined(this, 'this');
  throwIfNegativeNumber(chunkSize, 'chunkSize');

  const ckSize = Math.floor(chunkSize);
  const len = this.length;

  if (len === 0) {
    return empty();
  }
  if (ckSize > len) {
    return new Vec(this.copy());
  }
  const vec = new Vec();
  const chunkCount = Math.floor(len / ckSize);
  const loopCount = chunkCount * ckSize;

  for (let i = 0; i < loopCount; i += ckSize) {
    vec.push(this.slice(i, i + ckSize));
  }

  if (loopCount === len) {
    return vec;
  }
  vec.push(this.slice(loopCount));
  return vec;
}

export default chunkBySize;
