/* eslint-disable  require-jsdoc */
/** @module */

/**
 * <h3> Vec </h3>
 * Vec extends Array and has all the methods of Array.
 * @example
 * const numbers = new Vec(1,2,3,4,5);
 * console.log(numbers);
 * // => [ 1, 2, 3, 4, 5 ]
 * console.log(Object.prototype.toString.call(numbers));
 * // => [object Array]
 * console.log(numbers instanceof Array)
 * // => true
 */
class Vec extends Array {
  get [Symbol.toStringTag]() {
    return 'Array';
  }

  static get [Symbol.species]() {
    return Vec;
  }
}

export default Vec;
