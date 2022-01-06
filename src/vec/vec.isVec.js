/** @module */

/**
 * <h3> Vec.isVec(source) ⇒ boolean </h3>
 * Checks if the given source is a vector or not.
 * @param {*} source The source to check.
 * @return {boolean} True if the source is vector, otherwise; false.
 * @example
 * console.log(Vec.isVec([]));
 * // => false
 * console.log(Vec.isVec({ n: 10 }));
 * // => false
 * console.log(Vec.isVec(Vec.of(1, 2, 3)));
 * // => true
 */
function isVec(source) {
  return Object.prototype.toString.call(source) === '[object Vec]';
}

export default isVec;
