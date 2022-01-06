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

/** @module */

/**
 * <h3> empty() ⇒ Vec </h3>
 * Returns an empty vector.
 * @return {Vec} The empty vector.
 */

function empty() {
  return new Vec();
}

/* eslint-disable */
function getTag(value) {
  return typeof value === 'object' && value != null ? Object.prototype.toString.call(value) : '';
}
function isNull(value) {
  return value == null;
}
function isUndefined(value) {
  return typeof value === 'undefined';
}
function isNumber(value) {
  return typeof value === 'number' || getTag(value) === '[object Number]';
}
function isBigInt(value) {
  return typeof value === 'bigint' || getTag(value) === '[object BigInt]';
}
function isSymbol(value) {
  return typeof value === 'symbol' || getTag(value) === '[object Symbol]';
}
function isString(value) {
  return typeof value === 'string' || getTag(value) === '[object String]';
}
function isBoolean(value) {
  return typeof value === 'boolean' || getTag(value) === '[object Boolean]';
}
function isNotNull(value) {
  return !isNull(value);
}
function isNotUndefined(value) {
  return !isUndefined(value);
}
function isIterable(source) {
  return isNotNull(source) && isNotUndefined(source[Symbol.iterator]);
}
function isFunction(value) {
  return typeof value === 'function';
}
function isGeneratorFunction(value) {
  return isNotNull(value) && value[Symbol.toStringTag] === 'GeneratorFunction';
}
function isObject(value) {
  return value != null && typeof value === 'object';
}
function isPrimitive(value) {
  return isNull(value) || isUndefined(value) || isNumber(value) || isBigInt(value) || isSymbol(value) || isString(value) || isBoolean(value);
}

/* eslint-disable */
function throwIfNullOrUndefined(value, name = "value") {
  if (value == null || typeof value === "undefined") {
    throw new TypeError(`${name} is null or not defined.`);
  }
}
function throwIfNotFunction(value, name = "value") {
  if (!isFunction(value)) {
    throw new TypeError(`${name} is not a function.`);
  }
}
function throwIfNegativeNumber(value, name = "value") {
  if (!Number.isFinite(value) || value < 0) {
    throw new TypeError(`${name} must be a non-negative number.`);
  }
}
function throwIfGeneratorFunction(value, name = "value") {
  if (isGeneratorFunction(value)) {
    throw new TypeError(`${name} is a generator function. It should be a normal function.`);
  }
}

/** @module */

/**
 * <h3> Vec.init(count, initializer) ⇒ Vec </h3>
 * Generate a new Vec by invoking initializer function passed as the argument up to the given count.
 * @param {number} count The maximum number of items to generate for the Vec.
 * @param {function } initializer A function that generates an item in the Vec from a given index.
 * @return {Vec} The result vector.
 * @exception {TypeError} if count is a negative number; or initializer is a generator function or not a function.
 * @example
 * const fiveNums = Vec.init(5, x => x * 2);
 * console.log(fiveNums);
 * // => [0, 2, 4, 6, 8]
 */

function init(count, initializer) {
  throwIfNegativeNumber(count, 'count');
  throwIfNotFunction(initializer, 'initializer');
  throwIfGeneratorFunction(initializer, 'initializer');
  const c = Math.floor(count);

  if (c === 0) {
    return empty();
  }

  const vec = new Vec();

  for (let i = 0; i < c; i += 1) {
    vec.push(initializer(i));
  }

  return vec;
}

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

/** @module */

/**
 * <h3> copy() ⇒ Vec </h3>
 * Builds a new vector that contains the elements of the source vector.
 * @return {Vec} A copy of the source vector.
 * @example
 * const sourceVec = Vec.init(5, x => x);
 * const copyVec = sourceVec.copy();
 * console.log(copyVec);
 * // => [ 0, 1, 2, 3, 4 ]
 */

function copy() {
  throwIfNullOrUndefined(this, 'this');
  return this.slice();
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var lodash_isequal = createCommonjsModule(function (module, exports) {
  /**
   * Lodash (Custom Build) <https://lodash.com/>
   * Build: `lodash modularize exports="npm" -o ./`
   * Copyright JS Foundation and other contributors <https://js.foundation/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   */

  /** Used as the size to enable large array optimizations. */
  var LARGE_ARRAY_SIZE = 200;
  /** Used to stand-in for `undefined` hash values. */

  var HASH_UNDEFINED = '__lodash_hash_undefined__';
  /** Used to compose bitmasks for value comparisons. */

  var COMPARE_PARTIAL_FLAG = 1,
      COMPARE_UNORDERED_FLAG = 2;
  /** Used as references for various `Number` constants. */

  var MAX_SAFE_INTEGER = 9007199254740991;
  /** `Object#toString` result references. */

  var argsTag = '[object Arguments]',
      arrayTag = '[object Array]',
      asyncTag = '[object AsyncFunction]',
      boolTag = '[object Boolean]',
      dateTag = '[object Date]',
      errorTag = '[object Error]',
      funcTag = '[object Function]',
      genTag = '[object GeneratorFunction]',
      mapTag = '[object Map]',
      numberTag = '[object Number]',
      nullTag = '[object Null]',
      objectTag = '[object Object]',
      promiseTag = '[object Promise]',
      proxyTag = '[object Proxy]',
      regexpTag = '[object RegExp]',
      setTag = '[object Set]',
      stringTag = '[object String]',
      symbolTag = '[object Symbol]',
      undefinedTag = '[object Undefined]',
      weakMapTag = '[object WeakMap]';
  var arrayBufferTag = '[object ArrayBuffer]',
      dataViewTag = '[object DataView]',
      float32Tag = '[object Float32Array]',
      float64Tag = '[object Float64Array]',
      int8Tag = '[object Int8Array]',
      int16Tag = '[object Int16Array]',
      int32Tag = '[object Int32Array]',
      uint8Tag = '[object Uint8Array]',
      uint8ClampedTag = '[object Uint8ClampedArray]',
      uint16Tag = '[object Uint16Array]',
      uint32Tag = '[object Uint32Array]';
  /**
   * Used to match `RegExp`
   * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
   */

  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
  /** Used to detect host constructors (Safari). */

  var reIsHostCtor = /^\[object .+?Constructor\]$/;
  /** Used to detect unsigned integer values. */

  var reIsUint = /^(?:0|[1-9]\d*)$/;
  /** Used to identify `toStringTag` values of typed arrays. */

  var typedArrayTags = {};
  typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
  typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
  /** Detect free variable `global` from Node.js. */

  var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
  /** Detect free variable `self`. */

  var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
  /** Used as a reference to the global object. */

  var root = freeGlobal || freeSelf || Function('return this')();
  /** Detect free variable `exports`. */

  var freeExports = exports && !exports.nodeType && exports;
  /** Detect free variable `module`. */

  var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;
  /** Detect the popular CommonJS extension `module.exports`. */

  var moduleExports = freeModule && freeModule.exports === freeExports;
  /** Detect free variable `process` from Node.js. */

  var freeProcess = moduleExports && freeGlobal.process;
  /** Used to access faster Node.js helpers. */

  var nodeUtil = function () {
    try {
      return freeProcess && freeProcess.binding && freeProcess.binding('util');
    } catch (e) {}
  }();
  /* Node.js helper references. */


  var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
  /**
   * A specialized version of `_.filter` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {Array} Returns the new filtered array.
   */

  function arrayFilter(array, predicate) {
    var index = -1,
        length = array == null ? 0 : array.length,
        resIndex = 0,
        result = [];

    while (++index < length) {
      var value = array[index];

      if (predicate(value, index, array)) {
        result[resIndex++] = value;
      }
    }

    return result;
  }
  /**
   * Appends the elements of `values` to `array`.
   *
   * @private
   * @param {Array} array The array to modify.
   * @param {Array} values The values to append.
   * @returns {Array} Returns `array`.
   */


  function arrayPush(array, values) {
    var index = -1,
        length = values.length,
        offset = array.length;

    while (++index < length) {
      array[offset + index] = values[index];
    }

    return array;
  }
  /**
   * A specialized version of `_.some` for arrays without support for iteratee
   * shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {boolean} Returns `true` if any element passes the predicate check,
   *  else `false`.
   */


  function arraySome(array, predicate) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
      if (predicate(array[index], index, array)) {
        return true;
      }
    }

    return false;
  }
  /**
   * The base implementation of `_.times` without support for iteratee shorthands
   * or max array length checks.
   *
   * @private
   * @param {number} n The number of times to invoke `iteratee`.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the array of results.
   */


  function baseTimes(n, iteratee) {
    var index = -1,
        result = Array(n);

    while (++index < n) {
      result[index] = iteratee(index);
    }

    return result;
  }
  /**
   * The base implementation of `_.unary` without support for storing metadata.
   *
   * @private
   * @param {Function} func The function to cap arguments for.
   * @returns {Function} Returns the new capped function.
   */


  function baseUnary(func) {
    return function (value) {
      return func(value);
    };
  }
  /**
   * Checks if a `cache` value for `key` exists.
   *
   * @private
   * @param {Object} cache The cache to query.
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */


  function cacheHas(cache, key) {
    return cache.has(key);
  }
  /**
   * Gets the value at `key` of `object`.
   *
   * @private
   * @param {Object} [object] The object to query.
   * @param {string} key The key of the property to get.
   * @returns {*} Returns the property value.
   */


  function getValue(object, key) {
    return object == null ? undefined : object[key];
  }
  /**
   * Converts `map` to its key-value pairs.
   *
   * @private
   * @param {Object} map The map to convert.
   * @returns {Array} Returns the key-value pairs.
   */


  function mapToArray(map) {
    var index = -1,
        result = Array(map.size);
    map.forEach(function (value, key) {
      result[++index] = [key, value];
    });
    return result;
  }
  /**
   * Creates a unary function that invokes `func` with its argument transformed.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {Function} transform The argument transform.
   * @returns {Function} Returns the new function.
   */


  function overArg(func, transform) {
    return function (arg) {
      return func(transform(arg));
    };
  }
  /**
   * Converts `set` to an array of its values.
   *
   * @private
   * @param {Object} set The set to convert.
   * @returns {Array} Returns the values.
   */


  function setToArray(set) {
    var index = -1,
        result = Array(set.size);
    set.forEach(function (value) {
      result[++index] = value;
    });
    return result;
  }
  /** Used for built-in method references. */


  var arrayProto = Array.prototype,
      funcProto = Function.prototype,
      objectProto = Object.prototype;
  /** Used to detect overreaching core-js shims. */

  var coreJsData = root['__core-js_shared__'];
  /** Used to resolve the decompiled source of functions. */

  var funcToString = funcProto.toString;
  /** Used to check objects for own properties. */

  var hasOwnProperty = objectProto.hasOwnProperty;
  /** Used to detect methods masquerading as native. */

  var maskSrcKey = function () {
    var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
    return uid ? 'Symbol(src)_1.' + uid : '';
  }();
  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */


  var nativeObjectToString = objectProto.toString;
  /** Used to detect if a method is native. */

  var reIsNative = RegExp('^' + funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
  /** Built-in value references. */

  var Buffer = moduleExports ? root.Buffer : undefined,
      Symbol = root.Symbol,
      Uint8Array = root.Uint8Array,
      propertyIsEnumerable = objectProto.propertyIsEnumerable,
      splice = arrayProto.splice,
      symToStringTag = Symbol ? Symbol.toStringTag : undefined;
  /* Built-in method references for those with the same name as other `lodash` methods. */

  var nativeGetSymbols = Object.getOwnPropertySymbols,
      nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
      nativeKeys = overArg(Object.keys, Object);
  /* Built-in method references that are verified to be native. */

  var DataView = getNative(root, 'DataView'),
      Map = getNative(root, 'Map'),
      Promise = getNative(root, 'Promise'),
      Set = getNative(root, 'Set'),
      WeakMap = getNative(root, 'WeakMap'),
      nativeCreate = getNative(Object, 'create');
  /** Used to detect maps, sets, and weakmaps. */

  var dataViewCtorString = toSource(DataView),
      mapCtorString = toSource(Map),
      promiseCtorString = toSource(Promise),
      setCtorString = toSource(Set),
      weakMapCtorString = toSource(WeakMap);
  /** Used to convert symbols to primitives and strings. */

  var symbolProto = Symbol ? Symbol.prototype : undefined,
      symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;
  /**
   * Creates a hash object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */

  function Hash(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;
    this.clear();

    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  /**
   * Removes all key-value entries from the hash.
   *
   * @private
   * @name clear
   * @memberOf Hash
   */


  function hashClear() {
    this.__data__ = nativeCreate ? nativeCreate(null) : {};
    this.size = 0;
  }
  /**
   * Removes `key` and its value from the hash.
   *
   * @private
   * @name delete
   * @memberOf Hash
   * @param {Object} hash The hash to modify.
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */


  function hashDelete(key) {
    var result = this.has(key) && delete this.__data__[key];
    this.size -= result ? 1 : 0;
    return result;
  }
  /**
   * Gets the hash value for `key`.
   *
   * @private
   * @name get
   * @memberOf Hash
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */


  function hashGet(key) {
    var data = this.__data__;

    if (nativeCreate) {
      var result = data[key];
      return result === HASH_UNDEFINED ? undefined : result;
    }

    return hasOwnProperty.call(data, key) ? data[key] : undefined;
  }
  /**
   * Checks if a hash value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf Hash
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */


  function hashHas(key) {
    var data = this.__data__;
    return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
  }
  /**
   * Sets the hash `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf Hash
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the hash instance.
   */


  function hashSet(key, value) {
    var data = this.__data__;
    this.size += this.has(key) ? 0 : 1;
    data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value;
    return this;
  } // Add methods to `Hash`.


  Hash.prototype.clear = hashClear;
  Hash.prototype['delete'] = hashDelete;
  Hash.prototype.get = hashGet;
  Hash.prototype.has = hashHas;
  Hash.prototype.set = hashSet;
  /**
   * Creates an list cache object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */

  function ListCache(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;
    this.clear();

    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  /**
   * Removes all key-value entries from the list cache.
   *
   * @private
   * @name clear
   * @memberOf ListCache
   */


  function listCacheClear() {
    this.__data__ = [];
    this.size = 0;
  }
  /**
   * Removes `key` and its value from the list cache.
   *
   * @private
   * @name delete
   * @memberOf ListCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */


  function listCacheDelete(key) {
    var data = this.__data__,
        index = assocIndexOf(data, key);

    if (index < 0) {
      return false;
    }

    var lastIndex = data.length - 1;

    if (index == lastIndex) {
      data.pop();
    } else {
      splice.call(data, index, 1);
    }

    --this.size;
    return true;
  }
  /**
   * Gets the list cache value for `key`.
   *
   * @private
   * @name get
   * @memberOf ListCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */


  function listCacheGet(key) {
    var data = this.__data__,
        index = assocIndexOf(data, key);
    return index < 0 ? undefined : data[index][1];
  }
  /**
   * Checks if a list cache value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf ListCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */


  function listCacheHas(key) {
    return assocIndexOf(this.__data__, key) > -1;
  }
  /**
   * Sets the list cache `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf ListCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the list cache instance.
   */


  function listCacheSet(key, value) {
    var data = this.__data__,
        index = assocIndexOf(data, key);

    if (index < 0) {
      ++this.size;
      data.push([key, value]);
    } else {
      data[index][1] = value;
    }

    return this;
  } // Add methods to `ListCache`.


  ListCache.prototype.clear = listCacheClear;
  ListCache.prototype['delete'] = listCacheDelete;
  ListCache.prototype.get = listCacheGet;
  ListCache.prototype.has = listCacheHas;
  ListCache.prototype.set = listCacheSet;
  /**
   * Creates a map cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */

  function MapCache(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;
    this.clear();

    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  /**
   * Removes all key-value entries from the map.
   *
   * @private
   * @name clear
   * @memberOf MapCache
   */


  function mapCacheClear() {
    this.size = 0;
    this.__data__ = {
      'hash': new Hash(),
      'map': new (Map || ListCache)(),
      'string': new Hash()
    };
  }
  /**
   * Removes `key` and its value from the map.
   *
   * @private
   * @name delete
   * @memberOf MapCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */


  function mapCacheDelete(key) {
    var result = getMapData(this, key)['delete'](key);
    this.size -= result ? 1 : 0;
    return result;
  }
  /**
   * Gets the map value for `key`.
   *
   * @private
   * @name get
   * @memberOf MapCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */


  function mapCacheGet(key) {
    return getMapData(this, key).get(key);
  }
  /**
   * Checks if a map value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf MapCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */


  function mapCacheHas(key) {
    return getMapData(this, key).has(key);
  }
  /**
   * Sets the map `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf MapCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the map cache instance.
   */


  function mapCacheSet(key, value) {
    var data = getMapData(this, key),
        size = data.size;
    data.set(key, value);
    this.size += data.size == size ? 0 : 1;
    return this;
  } // Add methods to `MapCache`.


  MapCache.prototype.clear = mapCacheClear;
  MapCache.prototype['delete'] = mapCacheDelete;
  MapCache.prototype.get = mapCacheGet;
  MapCache.prototype.has = mapCacheHas;
  MapCache.prototype.set = mapCacheSet;
  /**
   *
   * Creates an array cache object to store unique values.
   *
   * @private
   * @constructor
   * @param {Array} [values] The values to cache.
   */

  function SetCache(values) {
    var index = -1,
        length = values == null ? 0 : values.length;
    this.__data__ = new MapCache();

    while (++index < length) {
      this.add(values[index]);
    }
  }
  /**
   * Adds `value` to the array cache.
   *
   * @private
   * @name add
   * @memberOf SetCache
   * @alias push
   * @param {*} value The value to cache.
   * @returns {Object} Returns the cache instance.
   */


  function setCacheAdd(value) {
    this.__data__.set(value, HASH_UNDEFINED);

    return this;
  }
  /**
   * Checks if `value` is in the array cache.
   *
   * @private
   * @name has
   * @memberOf SetCache
   * @param {*} value The value to search for.
   * @returns {number} Returns `true` if `value` is found, else `false`.
   */


  function setCacheHas(value) {
    return this.__data__.has(value);
  } // Add methods to `SetCache`.


  SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
  SetCache.prototype.has = setCacheHas;
  /**
   * Creates a stack cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */

  function Stack(entries) {
    var data = this.__data__ = new ListCache(entries);
    this.size = data.size;
  }
  /**
   * Removes all key-value entries from the stack.
   *
   * @private
   * @name clear
   * @memberOf Stack
   */


  function stackClear() {
    this.__data__ = new ListCache();
    this.size = 0;
  }
  /**
   * Removes `key` and its value from the stack.
   *
   * @private
   * @name delete
   * @memberOf Stack
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */


  function stackDelete(key) {
    var data = this.__data__,
        result = data['delete'](key);
    this.size = data.size;
    return result;
  }
  /**
   * Gets the stack value for `key`.
   *
   * @private
   * @name get
   * @memberOf Stack
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */


  function stackGet(key) {
    return this.__data__.get(key);
  }
  /**
   * Checks if a stack value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf Stack
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */


  function stackHas(key) {
    return this.__data__.has(key);
  }
  /**
   * Sets the stack `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf Stack
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the stack cache instance.
   */


  function stackSet(key, value) {
    var data = this.__data__;

    if (data instanceof ListCache) {
      var pairs = data.__data__;

      if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
        pairs.push([key, value]);
        this.size = ++data.size;
        return this;
      }

      data = this.__data__ = new MapCache(pairs);
    }

    data.set(key, value);
    this.size = data.size;
    return this;
  } // Add methods to `Stack`.


  Stack.prototype.clear = stackClear;
  Stack.prototype['delete'] = stackDelete;
  Stack.prototype.get = stackGet;
  Stack.prototype.has = stackHas;
  Stack.prototype.set = stackSet;
  /**
   * Creates an array of the enumerable property names of the array-like `value`.
   *
   * @private
   * @param {*} value The value to query.
   * @param {boolean} inherited Specify returning inherited property names.
   * @returns {Array} Returns the array of property names.
   */

  function arrayLikeKeys(value, inherited) {
    var isArr = isArray(value),
        isArg = !isArr && isArguments(value),
        isBuff = !isArr && !isArg && isBuffer(value),
        isType = !isArr && !isArg && !isBuff && isTypedArray(value),
        skipIndexes = isArr || isArg || isBuff || isType,
        result = skipIndexes ? baseTimes(value.length, String) : [],
        length = result.length;

    for (var key in value) {
      if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && ( // Safari 9 has enumerable `arguments.length` in strict mode.
      key == 'length' || // Node.js 0.10 has enumerable non-index properties on buffers.
      isBuff && (key == 'offset' || key == 'parent') || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset') || // Skip index properties.
      isIndex(key, length)))) {
        result.push(key);
      }
    }

    return result;
  }
  /**
   * Gets the index at which the `key` is found in `array` of key-value pairs.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} key The key to search for.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */


  function assocIndexOf(array, key) {
    var length = array.length;

    while (length--) {
      if (eq(array[length][0], key)) {
        return length;
      }
    }

    return -1;
  }
  /**
   * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
   * `keysFunc` and `symbolsFunc` to get the enumerable property names and
   * symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Function} keysFunc The function to get the keys of `object`.
   * @param {Function} symbolsFunc The function to get the symbols of `object`.
   * @returns {Array} Returns the array of property names and symbols.
   */


  function baseGetAllKeys(object, keysFunc, symbolsFunc) {
    var result = keysFunc(object);
    return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
  }
  /**
   * The base implementation of `getTag` without fallbacks for buggy environments.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */


  function baseGetTag(value) {
    if (value == null) {
      return value === undefined ? undefinedTag : nullTag;
    }

    return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
  }
  /**
   * The base implementation of `_.isArguments`.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an `arguments` object,
   */


  function baseIsArguments(value) {
    return isObjectLike(value) && baseGetTag(value) == argsTag;
  }
  /**
   * The base implementation of `_.isEqual` which supports partial comparisons
   * and tracks traversed objects.
   *
   * @private
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @param {boolean} bitmask The bitmask flags.
   *  1 - Unordered comparison
   *  2 - Partial comparison
   * @param {Function} [customizer] The function to customize comparisons.
   * @param {Object} [stack] Tracks traversed `value` and `other` objects.
   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
   */


  function baseIsEqual(value, other, bitmask, customizer, stack) {
    if (value === other) {
      return true;
    }

    if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
      return value !== value && other !== other;
    }

    return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
  }
  /**
   * A specialized version of `baseIsEqual` for arrays and objects which performs
   * deep comparisons and tracks traversed objects enabling objects with circular
   * references to be compared.
   *
   * @private
   * @param {Object} object The object to compare.
   * @param {Object} other The other object to compare.
   * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
   * @param {Function} customizer The function to customize comparisons.
   * @param {Function} equalFunc The function to determine equivalents of values.
   * @param {Object} [stack] Tracks traversed `object` and `other` objects.
   * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
   */


  function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
    var objIsArr = isArray(object),
        othIsArr = isArray(other),
        objTag = objIsArr ? arrayTag : getTag(object),
        othTag = othIsArr ? arrayTag : getTag(other);
    objTag = objTag == argsTag ? objectTag : objTag;
    othTag = othTag == argsTag ? objectTag : othTag;
    var objIsObj = objTag == objectTag,
        othIsObj = othTag == objectTag,
        isSameTag = objTag == othTag;

    if (isSameTag && isBuffer(object)) {
      if (!isBuffer(other)) {
        return false;
      }

      objIsArr = true;
      objIsObj = false;
    }

    if (isSameTag && !objIsObj) {
      stack || (stack = new Stack());
      return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
    }

    if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
      var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
          othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

      if (objIsWrapped || othIsWrapped) {
        var objUnwrapped = objIsWrapped ? object.value() : object,
            othUnwrapped = othIsWrapped ? other.value() : other;
        stack || (stack = new Stack());
        return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
      }
    }

    if (!isSameTag) {
      return false;
    }

    stack || (stack = new Stack());
    return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
  }
  /**
   * The base implementation of `_.isNative` without bad shim checks.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a native function,
   *  else `false`.
   */


  function baseIsNative(value) {
    if (!isObject(value) || isMasked(value)) {
      return false;
    }

    var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
    return pattern.test(toSource(value));
  }
  /**
   * The base implementation of `_.isTypedArray` without Node.js optimizations.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
   */


  function baseIsTypedArray(value) {
    return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
  }
  /**
   * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */


  function baseKeys(object) {
    if (!isPrototype(object)) {
      return nativeKeys(object);
    }

    var result = [];

    for (var key in Object(object)) {
      if (hasOwnProperty.call(object, key) && key != 'constructor') {
        result.push(key);
      }
    }

    return result;
  }
  /**
   * A specialized version of `baseIsEqualDeep` for arrays with support for
   * partial deep comparisons.
   *
   * @private
   * @param {Array} array The array to compare.
   * @param {Array} other The other array to compare.
   * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
   * @param {Function} customizer The function to customize comparisons.
   * @param {Function} equalFunc The function to determine equivalents of values.
   * @param {Object} stack Tracks traversed `array` and `other` objects.
   * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
   */


  function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
        arrLength = array.length,
        othLength = other.length;

    if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
      return false;
    } // Assume cyclic values are equal.


    var stacked = stack.get(array);

    if (stacked && stack.get(other)) {
      return stacked == other;
    }

    var index = -1,
        result = true,
        seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : undefined;
    stack.set(array, other);
    stack.set(other, array); // Ignore non-index properties.

    while (++index < arrLength) {
      var arrValue = array[index],
          othValue = other[index];

      if (customizer) {
        var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
      }

      if (compared !== undefined) {
        if (compared) {
          continue;
        }

        result = false;
        break;
      } // Recursively compare arrays (susceptible to call stack limits).


      if (seen) {
        if (!arraySome(other, function (othValue, othIndex) {
          if (!cacheHas(seen, othIndex) && (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
            return seen.push(othIndex);
          }
        })) {
          result = false;
          break;
        }
      } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
        result = false;
        break;
      }
    }

    stack['delete'](array);
    stack['delete'](other);
    return result;
  }
  /**
   * A specialized version of `baseIsEqualDeep` for comparing objects of
   * the same `toStringTag`.
   *
   * **Note:** This function only supports comparing values with tags of
   * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
   *
   * @private
   * @param {Object} object The object to compare.
   * @param {Object} other The other object to compare.
   * @param {string} tag The `toStringTag` of the objects to compare.
   * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
   * @param {Function} customizer The function to customize comparisons.
   * @param {Function} equalFunc The function to determine equivalents of values.
   * @param {Object} stack Tracks traversed `object` and `other` objects.
   * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
   */


  function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
    switch (tag) {
      case dataViewTag:
        if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
          return false;
        }

        object = object.buffer;
        other = other.buffer;

      case arrayBufferTag:
        if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
          return false;
        }

        return true;

      case boolTag:
      case dateTag:
      case numberTag:
        // Coerce booleans to `1` or `0` and dates to milliseconds.
        // Invalid dates are coerced to `NaN`.
        return eq(+object, +other);

      case errorTag:
        return object.name == other.name && object.message == other.message;

      case regexpTag:
      case stringTag:
        // Coerce regexes to strings and treat strings, primitives and objects,
        // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
        // for more details.
        return object == other + '';

      case mapTag:
        var convert = mapToArray;

      case setTag:
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
        convert || (convert = setToArray);

        if (object.size != other.size && !isPartial) {
          return false;
        } // Assume cyclic values are equal.


        var stacked = stack.get(object);

        if (stacked) {
          return stacked == other;
        }

        bitmask |= COMPARE_UNORDERED_FLAG; // Recursively compare objects (susceptible to call stack limits).

        stack.set(object, other);
        var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
        stack['delete'](object);
        return result;

      case symbolTag:
        if (symbolValueOf) {
          return symbolValueOf.call(object) == symbolValueOf.call(other);
        }

    }

    return false;
  }
  /**
   * A specialized version of `baseIsEqualDeep` for objects with support for
   * partial deep comparisons.
   *
   * @private
   * @param {Object} object The object to compare.
   * @param {Object} other The other object to compare.
   * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
   * @param {Function} customizer The function to customize comparisons.
   * @param {Function} equalFunc The function to determine equivalents of values.
   * @param {Object} stack Tracks traversed `object` and `other` objects.
   * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
   */


  function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
        objProps = getAllKeys(object),
        objLength = objProps.length,
        othProps = getAllKeys(other),
        othLength = othProps.length;

    if (objLength != othLength && !isPartial) {
      return false;
    }

    var index = objLength;

    while (index--) {
      var key = objProps[index];

      if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
        return false;
      }
    } // Assume cyclic values are equal.


    var stacked = stack.get(object);

    if (stacked && stack.get(other)) {
      return stacked == other;
    }

    var result = true;
    stack.set(object, other);
    stack.set(other, object);
    var skipCtor = isPartial;

    while (++index < objLength) {
      key = objProps[index];
      var objValue = object[key],
          othValue = other[key];

      if (customizer) {
        var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
      } // Recursively compare objects (susceptible to call stack limits).


      if (!(compared === undefined ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
        result = false;
        break;
      }

      skipCtor || (skipCtor = key == 'constructor');
    }

    if (result && !skipCtor) {
      var objCtor = object.constructor,
          othCtor = other.constructor; // Non `Object` object instances with different constructors are not equal.

      if (objCtor != othCtor && 'constructor' in object && 'constructor' in other && !(typeof objCtor == 'function' && objCtor instanceof objCtor && typeof othCtor == 'function' && othCtor instanceof othCtor)) {
        result = false;
      }
    }

    stack['delete'](object);
    stack['delete'](other);
    return result;
  }
  /**
   * Creates an array of own enumerable property names and symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names and symbols.
   */


  function getAllKeys(object) {
    return baseGetAllKeys(object, keys, getSymbols);
  }
  /**
   * Gets the data for `map`.
   *
   * @private
   * @param {Object} map The map to query.
   * @param {string} key The reference key.
   * @returns {*} Returns the map data.
   */


  function getMapData(map, key) {
    var data = map.__data__;
    return isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
  }
  /**
   * Gets the native function at `key` of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {string} key The key of the method to get.
   * @returns {*} Returns the function if it's native, else `undefined`.
   */


  function getNative(object, key) {
    var value = getValue(object, key);
    return baseIsNative(value) ? value : undefined;
  }
  /**
   * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the raw `toStringTag`.
   */


  function getRawTag(value) {
    var isOwn = hasOwnProperty.call(value, symToStringTag),
        tag = value[symToStringTag];

    try {
      value[symToStringTag] = undefined;
      var unmasked = true;
    } catch (e) {}

    var result = nativeObjectToString.call(value);

    if (unmasked) {
      if (isOwn) {
        value[symToStringTag] = tag;
      } else {
        delete value[symToStringTag];
      }
    }

    return result;
  }
  /**
   * Creates an array of the own enumerable symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of symbols.
   */


  var getSymbols = !nativeGetSymbols ? stubArray : function (object) {
    if (object == null) {
      return [];
    }

    object = Object(object);
    return arrayFilter(nativeGetSymbols(object), function (symbol) {
      return propertyIsEnumerable.call(object, symbol);
    });
  };
  /**
   * Gets the `toStringTag` of `value`.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */

  var getTag = baseGetTag; // Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.

  if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map && getTag(new Map()) != mapTag || Promise && getTag(Promise.resolve()) != promiseTag || Set && getTag(new Set()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) {
    getTag = function (value) {
      var result = baseGetTag(value),
          Ctor = result == objectTag ? value.constructor : undefined,
          ctorString = Ctor ? toSource(Ctor) : '';

      if (ctorString) {
        switch (ctorString) {
          case dataViewCtorString:
            return dataViewTag;

          case mapCtorString:
            return mapTag;

          case promiseCtorString:
            return promiseTag;

          case setCtorString:
            return setTag;

          case weakMapCtorString:
            return weakMapTag;
        }
      }

      return result;
    };
  }
  /**
   * Checks if `value` is a valid array-like index.
   *
   * @private
   * @param {*} value The value to check.
   * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
   * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
   */


  function isIndex(value, length) {
    length = length == null ? MAX_SAFE_INTEGER : length;
    return !!length && (typeof value == 'number' || reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
  }
  /**
   * Checks if `value` is suitable for use as unique object key.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
   */


  function isKeyable(value) {
    var type = typeof value;
    return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
  }
  /**
   * Checks if `func` has its source masked.
   *
   * @private
   * @param {Function} func The function to check.
   * @returns {boolean} Returns `true` if `func` is masked, else `false`.
   */


  function isMasked(func) {
    return !!maskSrcKey && maskSrcKey in func;
  }
  /**
   * Checks if `value` is likely a prototype object.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
   */


  function isPrototype(value) {
    var Ctor = value && value.constructor,
        proto = typeof Ctor == 'function' && Ctor.prototype || objectProto;
    return value === proto;
  }
  /**
   * Converts `value` to a string using `Object.prototype.toString`.
   *
   * @private
   * @param {*} value The value to convert.
   * @returns {string} Returns the converted string.
   */


  function objectToString(value) {
    return nativeObjectToString.call(value);
  }
  /**
   * Converts `func` to its source code.
   *
   * @private
   * @param {Function} func The function to convert.
   * @returns {string} Returns the source code.
   */


  function toSource(func) {
    if (func != null) {
      try {
        return funcToString.call(func);
      } catch (e) {}

      try {
        return func + '';
      } catch (e) {}
    }

    return '';
  }
  /**
   * Performs a
   * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * comparison between two values to determine if they are equivalent.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
   * @example
   *
   * var object = { 'a': 1 };
   * var other = { 'a': 1 };
   *
   * _.eq(object, object);
   * // => true
   *
   * _.eq(object, other);
   * // => false
   *
   * _.eq('a', 'a');
   * // => true
   *
   * _.eq('a', Object('a'));
   * // => false
   *
   * _.eq(NaN, NaN);
   * // => true
   */


  function eq(value, other) {
    return value === other || value !== value && other !== other;
  }
  /**
   * Checks if `value` is likely an `arguments` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an `arguments` object,
   *  else `false`.
   * @example
   *
   * _.isArguments(function() { return arguments; }());
   * // => true
   *
   * _.isArguments([1, 2, 3]);
   * // => false
   */


  var isArguments = baseIsArguments(function () {
    return arguments;
  }()) ? baseIsArguments : function (value) {
    return isObjectLike(value) && hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
  };
  /**
   * Checks if `value` is classified as an `Array` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an array, else `false`.
   * @example
   *
   * _.isArray([1, 2, 3]);
   * // => true
   *
   * _.isArray(document.body.children);
   * // => false
   *
   * _.isArray('abc');
   * // => false
   *
   * _.isArray(_.noop);
   * // => false
   */

  var isArray = Array.isArray;
  /**
   * Checks if `value` is array-like. A value is considered array-like if it's
   * not a function and has a `value.length` that's an integer greater than or
   * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
   * @example
   *
   * _.isArrayLike([1, 2, 3]);
   * // => true
   *
   * _.isArrayLike(document.body.children);
   * // => true
   *
   * _.isArrayLike('abc');
   * // => true
   *
   * _.isArrayLike(_.noop);
   * // => false
   */

  function isArrayLike(value) {
    return value != null && isLength(value.length) && !isFunction(value);
  }
  /**
   * Checks if `value` is a buffer.
   *
   * @static
   * @memberOf _
   * @since 4.3.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
   * @example
   *
   * _.isBuffer(new Buffer(2));
   * // => true
   *
   * _.isBuffer(new Uint8Array(2));
   * // => false
   */


  var isBuffer = nativeIsBuffer || stubFalse;
  /**
   * Performs a deep comparison between two values to determine if they are
   * equivalent.
   *
   * **Note:** This method supports comparing arrays, array buffers, booleans,
   * date objects, error objects, maps, numbers, `Object` objects, regexes,
   * sets, strings, symbols, and typed arrays. `Object` objects are compared
   * by their own, not inherited, enumerable properties. Functions and DOM
   * nodes are compared by strict equality, i.e. `===`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
   * @example
   *
   * var object = { 'a': 1 };
   * var other = { 'a': 1 };
   *
   * _.isEqual(object, other);
   * // => true
   *
   * object === other;
   * // => false
   */

  function isEqual(value, other) {
    return baseIsEqual(value, other);
  }
  /**
   * Checks if `value` is classified as a `Function` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a function, else `false`.
   * @example
   *
   * _.isFunction(_);
   * // => true
   *
   * _.isFunction(/abc/);
   * // => false
   */


  function isFunction(value) {
    if (!isObject(value)) {
      return false;
    } // The use of `Object#toString` avoids issues with the `typeof` operator
    // in Safari 9 which returns 'object' for typed arrays and other constructors.


    var tag = baseGetTag(value);
    return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
  }
  /**
   * Checks if `value` is a valid array-like length.
   *
   * **Note:** This method is loosely based on
   * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
   * @example
   *
   * _.isLength(3);
   * // => true
   *
   * _.isLength(Number.MIN_VALUE);
   * // => false
   *
   * _.isLength(Infinity);
   * // => false
   *
   * _.isLength('3');
   * // => false
   */


  function isLength(value) {
    return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
  }
  /**
   * Checks if `value` is the
   * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
   * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an object, else `false`.
   * @example
   *
   * _.isObject({});
   * // => true
   *
   * _.isObject([1, 2, 3]);
   * // => true
   *
   * _.isObject(_.noop);
   * // => true
   *
   * _.isObject(null);
   * // => false
   */


  function isObject(value) {
    var type = typeof value;
    return value != null && (type == 'object' || type == 'function');
  }
  /**
   * Checks if `value` is object-like. A value is object-like if it's not `null`
   * and has a `typeof` result of "object".
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
   * @example
   *
   * _.isObjectLike({});
   * // => true
   *
   * _.isObjectLike([1, 2, 3]);
   * // => true
   *
   * _.isObjectLike(_.noop);
   * // => false
   *
   * _.isObjectLike(null);
   * // => false
   */


  function isObjectLike(value) {
    return value != null && typeof value == 'object';
  }
  /**
   * Checks if `value` is classified as a typed array.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
   * @example
   *
   * _.isTypedArray(new Uint8Array);
   * // => true
   *
   * _.isTypedArray([]);
   * // => false
   */


  var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
  /**
   * Creates an array of the own enumerable property names of `object`.
   *
   * **Note:** Non-object values are coerced to objects. See the
   * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
   * for more details.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Object
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.keys(new Foo);
   * // => ['a', 'b'] (iteration order is not guaranteed)
   *
   * _.keys('hi');
   * // => ['0', '1']
   */

  function keys(object) {
    return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
  }
  /**
   * This method returns a new empty array.
   *
   * @static
   * @memberOf _
   * @since 4.13.0
   * @category Util
   * @returns {Array} Returns the new empty array.
   * @example
   *
   * var arrays = _.times(2, _.stubArray);
   *
   * console.log(arrays);
   * // => [[], []]
   *
   * console.log(arrays[0] === arrays[1]);
   * // => false
   */


  function stubArray() {
    return [];
  }
  /**
   * This method returns `false`.
   *
   * @static
   * @memberOf _
   * @since 4.13.0
   * @category Util
   * @returns {boolean} Returns `false`.
   * @example
   *
   * _.times(2, _.stubFalse);
   * // => [false, false]
   */


  function stubFalse() {
    return false;
  }

  module.exports = isEqual;
});

/** @module */

/**
 * <h3> countBy(projection) ⇒ Vec </h3>
 * Applies a key-generating function to each element of a vector and
 * returns a vector yielding unique keys and their number of occurrences in the original array.
 * @param {function} projection A function transforming each item of the input vector into a key to be compared against the others.
 * @param {object} Value to use as this when executing projection
 * @return {Vec} The result vector.
 * @exception {TypeError} if struturalEquality parameter is null or undefined; or projection parameter is a generator function
 * or not a function.
 * @example
 * const countByVec = new Vec(1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5);
 * const counts_1 = countByVec.countBy(x => x);
 * console.log(counts_1);
 * // => [ [ 1, 5 ], [ 2, 5 ], [ 3, 3 ], [ 4, 3 ], [ 5, 1 ] ]
 * const counts_2 = countByVec.countBy(x => x % 2 === 0);
 * console.log(counts_2);
 * // => [ [ false, 9 ], [ true, 8 ] ]
 */

function countBy(projection) {
  throwIfNullOrUndefined(this, 'this');
  throwIfNotFunction(projection, 'projection');
  throwIfGeneratorFunction(projection, 'projection');
  let thisArg;

  if (arguments.length > 1) {
    thisArg = arguments[1];
  }

  const map = new Map();

  for (const item of this) {
    const key = projection.call(thisArg, item);
    let count = 1;
    let foundKey = false;

    for (const k of map.keys()) {
      if (lodash_isequal(k, key)) {
        count = map.get(k) + 1;
        foundKey = true;
        map.set(k, count);
        break;
      }
    }

    if (!foundKey) {
      map.set(key, count);
    }
  }

  const vec = new Vec();
  map.forEach((v, k) => vec.push(Vec.of(k, v)));
  return vec;
}

/** @module */

/**
 * <h3> Vec.create(count, value) ⇒ Vec </h3>
 * Creates a vector whose elements are all initially the given value.
 * @param {number} count The length of the vector to create.
 * @param {*} value The value for the elements.
 * @return {Vec} The created vector.
 * @example
 * const createdVec = Vec.create(10, 2);
 * console.log(createdVec);
 * // => [ 2, 2, 2, 2, 2, 2, 2, 2, 2, 2 ]
 */

function create(count, value) {
  throwIfNegativeNumber(count, 'count');
  const c = Math.floor(count);

  if (c === 0) {
    return empty();
  }

  const vec = new Vec();

  for (let i = 0; i < c; i += 1) {
    vec.push(value);
  }

  return vec;
}

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

/** @module */

/**
 * <h3> findRight(predicate) ⇒ element of the vector or undefined </h3>
 * Returns the last element for which the given function returns 'true'.
 * Returns undefined if none of the elements satisfy the predicate.
 * @param {function} predicate The function to test the input elements.
 * @return {*} The last element for which predicate returns true.
 * @exception {TypeError} if predicate is a generator function or not a function.
 * @example
 * const p1 = { x : 10, y : 50};
 * const p2 = { x : 10, y : 60};
 * const p3 = { x : 10, y : 70};
 * const nums = new Vec(p1, p2, p3);
 * const result = nums.findRight(({x}) => x === 10);
 * console.log(result);
 * // => { x: 10, y: 70 }
 */

function findRight(predicate) {
  throwIfNullOrUndefined(this, 'this');
  throwIfNotFunction(predicate, 'predicate');
  throwIfGeneratorFunction(predicate, 'predicate');
  const thisVec = Object(this);
  let thisArg;

  if (arguments.length > 1) {
    thisArg = arguments[1];
  }

  const loop = function (index) {
    if (index < 0) {
      return undefined;
    }

    if (predicate.call(thisArg, thisVec[index])) {
      return thisVec[index];
    }

    return loop(index - 1);
  };

  return loop(this.length - 1);
}

/** @module */

/**
 * <h3> findIndexRight(predicate) ⇒ number </h3>
 * Returns the index of the last element in the vector that satisfies the given predicate.
 * Returns -1 if none of the elements satisfy the predicate.
 * @param {function} predicate The function to test the input elements.
 * @return {number} The index of the first element in the array that satisfies the given predicate.
 * @exception {TypeError} if predicate is a generator function or not a function.
 * @example
 * const nums = Vec.of(1, 2, 3, 4, 5, 6, 7, 8);
 * const indexRight = nums.findIndexRight(x => x % 2 === 1);
 * console.log(indexRight);
 * // => 6
 */

function findIndexRight(predicate) {
  throwIfNullOrUndefined(this, 'this');
  throwIfNotFunction(predicate, 'predicate');
  throwIfGeneratorFunction(predicate, 'predicate');
  const thisVec = Object(this);
  let thisArg;

  if (arguments.length > 1) {
    thisArg = arguments[1];
  }

  return function loop(index) {
    if (index < 0) {
      return -1;
    }

    if (predicate.call(thisArg, thisVec[index])) {
      return index;
    }

    return loop(index - 1);
  }(this.length - 1);
}

/** @module */

/**
 * <h3> head() ⇒ element </h3>
 * Returns the first element of the vector.
 * @return {*} The first element of the vector or undefined if the vector is empty.
 * @example
 * const oneToFour = Vec.init(5, x => x + 1);
 * const head = oneToFour.head();
 * console.log(head);
 * // => 1
 */

function head() {
  throwIfNullOrUndefined(this, 'this');

  if (this.isEmpty()) {
    return undefined;
  }

  return this[0];
}

/** @module */

/**
 * <h3> tail() ⇒ Vec </h3>
 * Returns a new array containing the elements of the original except the first element.
 * @return {Vec} A new vector containing the elements of the original except the first element.
 * If the vector is empty, empty vector will be returned.
 * @example
 * const sixNumbers = Vec.of(6, 5, 4, 3, 2, 1);
 * const tail = sixNumbers.tail();
 * console.log(tail);
 * // => [ 5, 4, 3, 2, 1 ]
 */

function tail() {
  throwIfNullOrUndefined(this, 'this');
  return this.slice(1);
}

/** @module */

/**
 * <h3> get(index) ⇒ element </h3>
 * Gets an element from an array.
 * @param {number} index The input index.
 * @return {*} The value of the array at the given index.
 * @example
 * const oddNums = Vec.of(1, 3, 5, 7);
 * const seven = oddNums.get(3);
 * console.log(seven);
 * // => 7
 */

function get(index) {
  throwIfNullOrUndefined(this, 'this');
  return this[index];
}

/** @module */

/**
 * <h3> set(index, value) ⇒ Vec </h3>
 * Sets an element of a vector.
 * @param {number} index The index to add an element.
 * @param {*} value The value to add into the vector at the given index.
 * @return {*} The value set.
 * @example
 * const newVec = new Vec();
 * const setVal = newVec.set(5, 256);
 * console.log(setVal);
 * // => 256
 * console.log(newVec);
 * // => [ , , , , , 256 ]
 */

function set(index, value) {
  throwIfNullOrUndefined(this, 'this'); // eslint-disable-next-line no-return-assign

  return this[index] = value;
}

/** @module */

/**
 * <h3> last() ⇒ element </h3>
 * Returns the last element of the vector.
 * @return {*} The last element of the vector.
 * @example
 * console.log(Vec.init(1000, x => x).last())
 * // => 999
 */

function last() {
  throwIfNullOrUndefined(this, 'this');
  return this[this.length - 1];
}

/** @module */

/**
 * <h3> take(count) ⇒ Vec </h3>
 * Returns the first N elements of the vector.
 * @param {number} count The number of items to take.
 * @return {Vec} The result vector.
 * @example
 * const zeroToTen = Vec.init(11, x => x);
 * const firstFive = zeroToTen.take(5);
 * console.log(firstFive);
 * // => [ 0, 1, 2, 3, 4 ]
 */

function take(count) {
  throwIfNullOrUndefined(this, 'this');

  if (count <= 0) {
    return empty();
  }

  const len = this.length;

  if (count >= len) {
    return this;
  }

  const thisVec = Object(this);
  let start = 0;
  const result = new Vec();

  while (start < count) {
    if (start === len) {
      break;
    } else {
      result.push(thisVec[start]);
      start += 1;
    }
  }

  return result;
}

/** @module */

/**
 * <h3> takeWhile(predicate) ⇒ Vec </h3>
 * Returns a vector that contains all elements of the original vector while the given predicate returns True, and then returns no further elements.
 * @param {function} predicate A function that evaluates to false when no more items should be returned.
 * @return {Vec} The result vector.
 * @exception {TypeError} When predicate is not a function, or predicate is a generator function.
 * @example
 * const oddsVec = Vec.of(99, 89, 11, 23, 3,9 , 11);
 * const takeWhileVec = oddsVec.takeWhile(x => x > 11);
 * console.log(takeWhileVec);
 * // => [ 99, 98 ]
 */

function takeWhile(predicate) {
  throwIfNullOrUndefined(this, 'this');
  throwIfNotFunction(predicate, 'predicate');
  throwIfGeneratorFunction(predicate, 'predicate');
  let thisArg;

  if (arguments.length > 1) {
    thisArg = arguments[1];
  }

  const result = new Vec();

  for (const item of this) {
    if (predicate.call(thisArg, item)) {
      result.push(item);
    } else {
      break;
    }
  }

  return result;
}

/** @module */

/**
 * <h3> skipWhile(predicate) ⇒ Vec </h3>
 * Bypasses elements in the vector while the given predicate returns True,
 * and then returns the remaining elements in a new vector.
 * @param {function} predicate A function that evaluates an element of the vector to a boolean value.
 * @return {Vec} The result vector.
 * @exception {TypeError} when predicate is not a function or predicate is a generator function.
 * @example
 * const randomVec = Vec.of(11, 3, 2, 4, 100, 65, 100, 2,);
 * const skipWhileResult = randomVec.skipWhile(x => x < 100);
 * console.log(skipWhileResult);
 * // => [ 100, 65, 100, 2 ]
 */

function skipWhile(predicate) {
  throwIfNullOrUndefined(this, 'this');
  throwIfNotFunction(predicate, 'predicate');
  throwIfGeneratorFunction(predicate, 'predicate');
  let thisArg;

  if (arguments.length > 1) {
    thisArg = arguments[1];
  }

  let i = 0;

  while (i < this.length && predicate.call(thisArg, this[i])) {
    i += 1;
  }

  if (i === this.length) {
    return empty();
  }

  return this.slice(i);
}

/** @module */

/**
 * <h3> min() ⇒ number|undefined </h3>
 * Returns the smallest of all elements of the vector.
 * @return {number|undefined}  The minimum number if the vector contains number; otherwise, undefined.
 * @example
 * const vec = Vec.of(1, 2, 3, 4, 5, 0);
 * const min = vec.min();
 * console.log(min);
 * // => 0
 */

function min() {
  throwIfNullOrUndefined(this, 'this');

  if (this.length === 0) {
    return undefined;
  }

  let minNum;

  for (let i = 1; i < this.length; i += 1) {
    if (isNumber(this[i])) {
      if (minNum === undefined) {
        minNum = this[i];
      } else if (this[i] < minNum) {
        minNum = this[i];
      }
    }
  }

  return minNum;
}

/** @module */

/**
 * <h3> max() ⇒ number|undefined </h3>
 * Returns the greatest of all elements of the vector.
 * @return {number|undefined}  The maximum number if the vector contains number; otherwise, undefined.
 * @example
 * const oneKItems = Vec.init(1000, x => x * x);
 * const max = oneKItems.max();
 * console.log(max);
 * // => 998001
 */

function max() {
  throwIfNullOrUndefined(this, 'this');

  if (this.length === 0) {
    return undefined;
  }

  let maxNum;

  for (let i = 0; i < this.length; i += 1) {
    if (isNumber(this[i])) {
      if (maxNum === undefined) {
        maxNum = this[i];
      } else if (this[i] > maxNum) {
        maxNum = this[i];
      }
    }
  }

  return maxNum;
}

/** @module */

/**
 * <h3> minBy(projection) ⇒ number|undefined </h3>
 * Returns the smallest of all elements of the vector.
 * @param {function} projection The function to transform the elements into a certain type.
 * @return {number|undefined} The minimum element.
 * @exception {TypeError} when projection is not a function or projection is a generator function.
 * @example
 * const thousandNums = Vec.init(1000, x => x + 1);
 * const smallestPerfectNumberUnder1000 = thousandNums.minBy(x => {
 *    const v = new Vec();
 *    for(let i = 1; i < x; i += 1) {
 *        if (x % i === 0) {
 *            v.push(i);
 *        }
 *    }
 *    if (!v.isEmpty() &&  v.reduce((x,y) => x + y) === x) return x;
 * });
 * console.log(smallestPerfectNumberUnder1000);
 * // => 6
 */

function minBy(projection) {
  throwIfNullOrUndefined(this, 'this');
  throwIfNotFunction(projection, 'projection');
  throwIfGeneratorFunction(projection, 'projection');
  let thisArg;

  if (arguments.length > 1) {
    thisArg = arguments[1];
  }

  if (this.length === 0) {
    return undefined;
  }

  let minNum;

  for (let i = 0; i < this.length; i += 1) {
    const projected = projection.call(thisArg, this[i]);

    if (isNumber(projected)) {
      if (minNum === undefined) {
        minNum = projected;
      } else if (projected < minNum) {
        minNum = projected;
      }
    }
  }

  return minNum;
}

/** @module */

/**
 * <h3> maxBy(projection) ⇒ number|undefined </h3>
 * Returns the greatest of all elements of the vector.
 * @param {function} projection The function to transform the elements into a certain type.
 * @return {number|undefined} The maximum element.
 * @exception {TypeError} when projection is not a function or projection is a generator function.
 * @example
 * const thousandNums = Vec.init(1000, x => x + 1);
 * const biggestPerfectNumberUnder1000 = thousandNums.maxBy(x => {
 *    const v = new Vec();
 *    for(let i = 1; i < x; i += 1) {
 *        if (x % i === 0) {
 *            v.push(i);
 *        }
 *    }
 *    if (!v.isEmpty() &&  v.reduce((x,y) => x + y) === x) return x;
 * });
 * console.log(biggestPerfectNumberUnder1000);
 * // => 496
 */

function maxBy(projection) {
  throwIfNullOrUndefined(this, 'this');
  throwIfNotFunction(projection, 'projection');
  throwIfGeneratorFunction(projection, 'projection');
  let thisArg;

  if (arguments.length > 1) {
    thisArg = arguments[1];
  }

  if (this.length === 0) {
    return undefined;
  }

  let maxNum;

  for (let i = 0; i < this.length; i += 1) {
    const projected = projection.call(thisArg, this[i]);

    if (isNumber(projected)) {
      if (maxNum === undefined) {
        maxNum = projected;
      } else if (projected > maxNum) {
        maxNum = projected;
      }
    }
  }

  return maxNum;
}

/** @module */

/**
 * <h3> sum() ⇒ number|undefined </h3>
 * Returns the sum of the elements in the vector.
 * @return {number|undefined} The sum of the elements in the vector if all the elements are number. Otherwise, undefined.
 * @example
 * const fiveNumbers = Vec.of(10,20,30,40,50);
 * const sum = fiveNumbers.sum();
 * console.log(sum);
 * // => 150
 */

function sum() {
  throwIfNullOrUndefined(this, 'this');

  if (this.length === 0) {
    return undefined;
  }

  let sumNum = 0;

  for (let i = 0; i < this.length; i += 1) {
    if (isNumber(this[i])) {
      sumNum += this[i];
    }
  }

  return sumNum;
}

/** @module */

/**
 * <h3> sumBy(projection) ⇒ number|undefined </h3>
 * Returns the sum of the results generated by applying the function to each element of the vector.
 * @param {function} projection The function to transform the vector elements into the type to be summed.
 * @return {number|undefined} The resulting sum.
 * @example
 * const hundredNumbers = Vec.init(100, x => x + 1);
 * const sumOfEvens = hundredNumbers.sumBy(x => x % 2 === 0 ? x : 0);
 * console.log(sumOfEvens);
 * // => 2550
 * const sumOfOdds = hundredNumbers.sumBy(x => x % 2 === 1 ? x : 0);
 * console.log(sumOfOdds);
 * // => 2500
 */

function sumBy(projection) {
  throwIfNullOrUndefined(this, 'this');
  throwIfNotFunction(projection, 'projection');
  throwIfGeneratorFunction(projection, 'projection');
  let thisArg;

  if (arguments.length > 1) {
    thisArg = arguments[1];
  }

  if (this.length === 0) {
    return undefined;
  }

  let sumNum = 0;

  for (let i = 0; i < this.length; i += 1) {
    const projected = projection.call(thisArg, this[i]);

    if (isNumber(projected)) {
      sumNum += projected;
    }
  }

  return sumNum;
}

/** @module */

/**
 * <h3> average() ⇒ number|undefined </h3>
 * Returns the average of the elements in the vector.
 * @return {number|undefined} The average of the elements in the vector or undefined if the vector is empty.
 * @example
 * const oneToTen = Vec.init(10, x => x + 1);
 * const avg = oneToTen.average();
 * console.log(avg);
 * // => 5.5
 */

function average() {
  throwIfNullOrUndefined(this, 'this');

  if (this.length === 0) {
    return undefined;
  }

  let sum = 0;

  for (let i = 0; i < this.length; i += 1) {
    if (isNumber(this[i])) {
      sum += this[i];
    }
  }

  return sum / this.length;
}

/** @module */

/**
 * <h3> averageBy(projection) ⇒ number|undefined </h3>
 * Returns the average of the elements generated by applying the function to each element of the vector.
 * @param {function} projection The function to transform the vector elements before averaging.
 * @return {number|undefined} The computed average or undefined if the source vector is empty.
 * @exception {TypeError} if projection is a generator function or not a function.
 * @example
 * const vecOfObjs = new Vec({ n: 1 }, { n: 1 }, { n: 1 }, { n: 1 }, { n: -1 }, { n: 1 });
 * const avgBy = vecOfObjs.averageBy(({ n }) => n);
 * console.log(avgBy);
 * // => 0.6666666666666666
 */

function averageBy(projection) {
  throwIfNullOrUndefined(this, 'this');
  throwIfNotFunction(projection, 'projection');
  throwIfGeneratorFunction(projection, 'projection');
  let thisArg;

  if (arguments.length > 1) {
    thisArg = arguments[1];
  }

  if (this.length === 0) {
    return undefined;
  }

  let sum = 0;

  for (let i = 0; i < this.length; i += 1) {
    const projected = projection.call(thisArg, this[i]);

    if (isNumber(projected)) {
      sum += projected;
    }
  }

  return sum / this.length;
}

/** @module */

/**
 * <h3> splitAt(index) ⇒ Vec </h3>
 * Splits the vector into two vectors, at the given index.
 * @param {number} index The index at which the vector is split.
 * @return {Vec} The result vector that contains the two split vectors.
 * @exception {TypeError} When index is negative.
 * @example
 * const twentyNumbers = Vec.init(20, x => x + 1);
 * const splitVec = twentyNumbers.splitAt(10);
 * console.log(splitVec);
 * // => [ [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ], [ 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 ] ]
 */

function splitAt(index) {
  throwIfNullOrUndefined(this, 'this');
  throwIfNegativeNumber(index, 'index');
  const idx = Math.floor(index);

  if (this.length < idx) {
    throw new TypeError('The vec has an insufficient number of elements.');
  }

  if (idx === 0) {
    return new Vec([], this.slice(0));
  }

  if (idx === this.length) {
    return new Vec(this.slice(0), []);
  }

  return new Vec(this.slice(0, idx), this.slice(idx));
}

/** @module */

/**
 * <h3> partition(predicate) ⇒ Vec </h3>
 * Splits the vector into two vectors, containing the elements for which the given predicate returns "true" and "false" respectively.
 * @param {function} predicate The function to test the input elements.
 * @return {Vec} A pair of vectors. The first containing the elements the predicate evaluated to true,
 * and the second containing those evaluated to false.
 * @exception {TypeError} when predicate is not a function or predicate is a generator function.
 * @example
 * const twelveNums = Vec.init(12, x => x + 1);
 * const [evens, odds] = twelveNums.partition(x => x % 2 === 0);
 * console.log(evens);
 * // => [ 2, 4, 6, 8, 10, 12 ]
 * console.log(odds);
 * // => [ 1, 3, 5, 7, 9, 11 ]
 */

function partition(predicate) {
  throwIfNullOrUndefined(this, 'this');
  throwIfNotFunction(predicate, 'predicate');
  throwIfGeneratorFunction(predicate, 'predicate');
  let thisArg;

  if (arguments.length > 1) {
    thisArg = arguments[1];
  }

  const left = new Vec();
  const right = new Vec();

  for (const item of this) {
    if (predicate.call(thisArg, item)) {
      left.push(item);
    } else {
      right.push(item);
    }
  }

  return new Vec(left, right);
}

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

/** @module */

/**
 * <h3> windowed(windowSize) ⇒ Vec </h3>
 * Returns a vector of sliding windows containing elements drawn from the source vector.
 * Each window is returned as a fresh vector.
 * @param {number} windowSize The number of elements in each window.
 * @return {Vec} The result array.
 * @exception {TypeError} When windowSize is negative.
 * @example
 * const zeroToFive = Vec.init(6, x => x);
 * const windows = zeroToFive.windowed(2);
 * console.log(windows);
 * // => [ [ 0, 1 ], [ 1, 2 ], [ 2, 3 ], [ 3, 4 ], [ 4, 5 ] ]
 */

function windowed(windowSize) {
  throwIfNullOrUndefined(this, 'this');
  throwIfNegativeNumber(windowSize, 'windowSize');
  const wsize = Math.floor(windowSize);

  if (wsize > this.length) {
    return empty();
  }

  const size = this.length - wsize + 1;
  const vec = new Vec(size);

  for (let i = 0; i < size; i += 1) {
    vec[i] = this.slice(i, wsize + i);
  }

  return vec;
}

/** @module */

/**
 * <h3> zip(other) ⇒ Vec </h3>
 * Combines the two vectors into a vector of pairs. The two vectors must have equal lengths
 * @param {Vec} other The other input vector.
 * @return {Vec} The vector of pairs.
 * @exception {TypeError} when other is null or undefined or the lengths of the source and other vectors are not the same.
 * @example
 * const oneToFourVec = Vec.of(1, 2, 3, 4);
 * const fiveToEightVec = Vec.of(5, 6, 7, 8);
 * const zipped = oneToFourVec.zip(fiveToEightVec);
 * console.log(zipped);
 * // => [ [ 1, 5 ], [ 2, 6 ], [ 3, 7 ], [ 4, 8 ] ]
 */

function zip(other) {
  throwIfNullOrUndefined(this, 'this');
  throwIfNullOrUndefined(other, 'other');
  const thisLen = this.length;

  if (thisLen !== other.length) {
    throw new TypeError('other has different array length.');
  }

  const vec = new Vec(thisLen);

  for (let i = 0; i < thisLen; i += 1) {
    vec[i] = new Vec(this[i], other[i]);
  }

  return vec;
}

/** @module */

/**
 * <h3> unzip() ⇒ Vec </h3>
 * Splits a vector of pairs into two vectors.
 * @return {Vec} The vector containing two vectors.
 * @example
 * const pairsOfVec = new Vec(
 *    new Vec(1, 2),
 *    new Vec(3, 4),
 *    new Vec(5, 6)
 * );
 * const unzipped = pairsOfVec.unzip();
 * console.log(unzipped);
 * // => [ [ 1, 3, 5 ], [ 2, 4, 6 ] ]
 */

function unzip() {
  throwIfNullOrUndefined(this, 'this');
  const vec1 = new Vec(this.length);
  const vec2 = new Vec(this.length);

  for (let i = 0; i < this.length; i += 1) {
    const [f, s] = this[i];
    throwIfNullOrUndefined(f, 'f');
    throwIfNullOrUndefined(s, 's');
    vec1[i] = f;
    vec2[i] = s;
  }

  return new Vec(vec1, vec2);
}

/** @module */

/**
 * <h3> distinct() ⇒ Vec </h3>
 * Returns a vector that contains no duplicate entries.
 * If an element occurs multiple times in the vector then the later occurrences are discarded.
 * @return {Vec} The result vector.
 * @exception {TypeError} if struturalEquality parameter is null or undefined.
 * @example
 * const mixedVec = Vec.of(1, 1, 1, 2, 2, 2, 3, 3, 3, { n: 1 }, { n: 1 });
 * const distinctVec_1 = mixedVec.distinct(false);
 * console.log(distinctVec_1);
 * // => [ 1, 2, 3, { n: 1 }, { n: 1 } ]
 * const distinctVec_2 = mixedVec.distinct(true);
 * console.log(distinctVec_2);
 * // => [ 1, 2, 3, { n: 1 } ]
 */

function distinct() {
  throwIfNullOrUndefined(this, 'this');
  const set = new Set();

  for (let i = 0; i < this.length; i += 1) {
    const key = this[i];

    if ([...set].every(x => !lodash_isequal(x, key))) {
      set.add(key);
    }
  }

  return Vec.from(set);
}

/** @module */

/**
 * <h3> distinctBy(projection) ⇒ Vec </h3>
 * Returns a vector that contains no duplicate entries according to the equality comparisons on the keys returned by the given key-generating function.
 * If an element occurs multiple times in the array then the later occurrences are discarded.
 * @param {function} projection A function transforming the vector items into comparable keys.
 * @return {Vec} The result vector.
 * @exception {TypeError} if struturalEquality parameter is null or undefined; or projection parameter is a generator function
 * @example
 * const mixedVec = Vec.of(
 *    { name: "Fsharp", family: { name: "ML" } },
 *    { name: "OCaml", family: { name: "ML" } },
 *    { name: "C++", family: { name: "Smalltalk" } }
 * );
 * const distinctedByVec_1 = mixedVec.distinctBy(x => x.family, false);
 * console.log(distinctedByVec_1);
 * // =>
 *  [ { name: 'Fsharp', family: { name: 'ML' } },
 *    { name: 'OCaml', family: { name: 'ML' } },
 *    { name: 'C++', family: { name: 'Smalltalk' } } ]
 *
 * const distinctedByVec_2 = mixedVec.distinctBy(x => x.family, true);
 * console.log(distinctedByVec_2);
 * // =>
 *  [ { name: 'Fsharp', family: { name: 'ML' } },
 *    { name: 'C++', family: { name: 'Smalltalk' } } ]
 */

function distinctBy(projection) {
  throwIfNullOrUndefined(this, 'this');
  throwIfNotFunction(projection, 'projection');
  throwIfGeneratorFunction(projection, 'projection');
  let thisArg;

  if (arguments.length > 1) {
    thisArg = arguments[1];
  }

  const set = new Set();
  const vec = new Vec();

  for (let i = 0; i < this.length; i += 1) {
    const value = this[i];
    const key = projection.call(thisArg, value);
    let hasKey = false;

    for (const k of set) {
      if (lodash_isequal(k, key)) {
        hasKey = true;
        break;
      }
    }

    if (!hasKey) {
      set.add(key);
      vec.push(value);
    }
  }

  return vec;
}

/** @module */

/**
 * <h3> pairwise() ⇒ Vec </h3>
 * Returns a vector of each element in the vector and its predecessor, with the exception of the first element
 * which is only returned as the predecessor of the second element.
 * @return {Vec} The result vector.
 * @example
 * const vowels = Vec.of('a', 'e', 'i', 'o', 'u');
 * const p = vowels.pairwise();
 * console.log(p);
 * // => [ [ 'a', 'e' ], [ 'e', 'i' ], [ 'i', 'o' ], [ 'o', 'u' ] ]
 */

function pairwise() {
  throwIfNullOrUndefined(this, 'this');

  if (this.length < 2) {
    return empty();
  }

  return Vec.init(this.length - 1, i => new Vec(this[i], this[i + 1]));
}

/** @module */

/**
 * <h3> except(...itemsToExclude) ⇒ Vec </h3>
 * Returns a new list with the distinct elements of the input array which do not appear in the itemsToExclude sequence.
 * @param {...*} itemsToExclude A sequence whose elements that also occur in the source vector will cause those elements to be removed from the result.
 * @return {Vec} A vector that contains the distinct elements of source vector that do not appear in itemsToExclude.
 * @exception {TypeError} if structuralEquality parameter is null or undefined.
 * @example
 * const nObjVec = Vec.of({ n: 1 }, { n: 1 }, { n: 2 }, { n: 2 }, { n: 2 }, { n: 4 });
 * const except_1 = nObjVec.except(false, { n: 1 }, { n: 4 });
 * console.log(except_1);
 * // no items excluded under same-value-zero equality, no objects are equal to one another unless they are referencing to the same instance
 * // => [ { n: 1 }, { n: 1 }, { n: 2 }, { n: 2 }, { n: 2 }, { n: 4 } ]
 * const except_2 = nObjVec.except(true, { n: 1 }, { n: 2 });
 * console.log(except_2);
 * // => [ { n: 4 } ]
 */

function except(...itemsToExclude) {
  throwIfNullOrUndefined(this, 'this');

  if (this.length === 0) {
    return this;
  }

  if (itemsToExclude.length === 0) {
    return this.copy();
  }

  const set = new Set();

  for (const item of itemsToExclude) {
    if ([...set].every(x => !lodash_isequal(x, item))) {
      set.add(item);
    }
  }

  return this.filter(item => {
    return [...set].every(x => !lodash_isequal(x, item));
  });
}

/** @module */

/**
 * <h3> groupBy(projection) ⇒ Vec </h3>
 * Applies a key-generating function to each element of a vector and yields a vector of unique keys.
 * Each unique key contains a vector of all elements that match to this key.
 * @param {Function} projection A function that transforms an element of the vector into a key.
 * @return {Vec} The result vector.
 * @exception {TypeError} when
 * structuralEquality parameter is null or undefined or
 * projection is a generator function or
 * projection is not a function.
 * @example
 *
 * const langs = Vec.of(
 *    { name: "Fsharp", family: { name: "ML" } },
 *    { name: "OCaml", family: { name: "ML" } },
 *    { name: "C++", family: { name: "Smalltalk" }},
 *    { name: "C#", family: { name: "Smalltalk" }},
 *    { name: "FcukTheCoup", family: { name: "Generation Z" }},
 * );
 * const groupsByFamily = langs.groupBy(({family}) => family, true);
 * groupsByFamily.forEach(([key, values]) => {
 *    console.log(`key: ${key.name}`);
 *    console.log(`\tvalues: `);
 *    console.log(values);
 * });
 * // =>
 * key: ML
 * values:
 *  [ { name: 'Fsharp', family: { name: 'ML' } },
 *    { name: 'OCaml', family: { name: 'ML' } } ]
 * key: Smalltalk
 * values:
 *  [ { name: 'C++', family: { name: 'Smalltalk' } },
 *    { name: 'C#', family: { name: 'Smalltalk' } } ]
 * key: Generation Z
 * values:
 *  [ { name: 'FcukTheCoup', family: { name: 'Generation Z' } } ]
 */

function groupBy(projection) {
  throwIfNullOrUndefined(this, 'this');
  throwIfNotFunction(projection, 'projection');
  throwIfGeneratorFunction(projection, 'projection');
  let thisArg;

  if (arguments.length > 1) {
    thisArg = arguments[1];
  }

  const map = new Map();

  for (const item of this) {
    const key = projection.call(thisArg, item);
    let foundKey = false;

    for (const k of map.keys()) {
      if (lodash_isequal(k, key)) {
        const values = map.get(k);
        values.push(item);
        foundKey = true;
        break;
      }
    }

    if (!foundKey) {
      map.set(key, Vec.of(item));
    }
  }

  const vec = new Vec();
  map.forEach((v, k) => vec.push(Vec.of(k, v)));
  return vec;
}

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

/** @module */

/**
 * <h3> binarySearch(item, comparer) ⇒ number </h3>
 * Searches the entire sorted vector for an element using the specified comparer and
 * returns the zero-based index of the element.
 * @param {*} item The object to locate.
 * @param {function} comparer The function to compare elements of the vector. if not provided, the default comparer will be used.
 * @return {number} The zero-based index of item in the sorted vector, if item is found; otherwise, -1.
 * @exception {TypeError} if the item to search is null or undefined.
 * @example
 * const randomNums = new Vec(10, 23, 32, 455, 233, 33, 456, 323, 42, 2, 45, 23, 66);
 * const descendingOrd = (x, y) => x > y ? -1 : x < y ? 1 : 0;
 * randomNums.sort(descendingOrd); // => [ 456, 455, 323, 233, 66, 45, 42, 33, 32, 23, 23, 10, 2 ]
 * const descendingIndex = randomNums.binarySearch(33, descendingOrd);
 * console.log(descendingIndex);
 * // => 7
 * const ascendingOrd = (x, y) => x < y ? -1 : x > y ? 1 : 0;
 * randomNums.sort(ascendingOrd); // => [ 2, 10, 23, 23, 32, 33, 42, 45, 66, 233, 323, 455, 456 ]
 * const ascendingIndex = randomNums.binarySearch(33); // default comparer is used here and it's the same as ascendingOrd
 * console.log(ascendingIndex);
 * // => 5
 */

function binarySearch(item, comparer) {
  throwIfNullOrUndefined(this, 'this');
  throwIfNullOrUndefined(item, 'item');
  const cmp = !isNull(comparer) && !isUndefined(comparer) ? comparer : (x, y) => {
    if (x > y) return 1;
    if (x < y) return -1;
    if (x === y) return 0;
    return -1;
  };

  if (this.length === 0) {
    return -1;
  }

  let thisArg;

  if (arguments.length > 2) {
    thisArg = arguments[2];
  }

  let low = 0;
  let high = this.length - 1;

  while (low <= high) {
    const middleIndex = Math.floor((low + high) / 2);
    const c = cmp.call(thisArg, this[middleIndex], item);

    if (c === 0) {
      return middleIndex;
    }

    if (c < 0) {
      low = middleIndex + 1;
    } else {
      high = middleIndex - 1;
    }
  }

  return -1;
}

/** @module */

/**
 * <h3> permute() ⇒ Vec </h3>
 * Returns a vector with all elements permuted.
 * The quickperm algorithm is used. https://www.quickperm.org/quickperm.php
 * @return {Vec} The result vector.
 * @example
 * const threeNums = Vec.of(1, 2, 3);
 * const permuted = threeNums.permute();
 * console.log(permuted);
 * // =>
 * //  [ [ 1, 2, 3 ],
 * //    [ 2, 1, 3 ],
 * //    [ 3, 1, 2 ],
 * //    [ 1, 3, 2 ],
 * //    [ 2, 3, 1 ],
 * //    [ 3, 2, 1 ] ]
 */

function permute() {
  throwIfNullOrUndefined(this, 'this');
  const n = this.length;

  if (n === 0) {
    return empty();
  }

  const result = new Vec();

  const pickup = () => {
    const tempVec = new Vec();

    for (let x = 0; x < n; x += 1) {
      tempVec.push(this[x]);
    }

    result.push(tempVec);
  };

  const p = new Vec(n);

  for (let i = 0; i < n; i += 1) {
    p[i] = 0;
  }

  pickup();
  let i = 1;
  let j;

  while (i < n) {
    if (p[i] < i) {
      j = i % 2 * p[i];
      const tmp = this[j];
      this[j] = this[i];
      this[i] = tmp;
      pickup();
      p[i] += 1;
      i = 1;
    } else {
      p[i] = 0;
      i += 1;
    }
  } // reset this to original order


  for (let y = 0; y < n; y += 1) {
    this[y] = result[0][y];
  }

  return result;
}

/** @module */

/**
 * <h3> transpose() ⇒ Vec </h3>
 * Returns the transpose of the vector.
 * @return {Vec} The transposed vector.
 * @example
 * const matrix = Vec.of([1, 2, 3, 4, 5], [6, 7, 8, 9, 10]);
 * const tranposed = matrix.transpose();
 * console.log(tranposed);
 * // => [ [ 1, 6 ], [ 2, 7 ], [ 3, 8 ], [ 4, 9 ], [ 5, 10 ] ]
 */

function transpose() {
  throwIfNullOrUndefined(this, 'this');

  if (this.length === 0) {
    return empty();
  }

  let innerLen;

  for (let i = 0; i < this.length; i += 1) {
    if (isNull(innerLen) || isUndefined(innerLen)) {
      innerLen = this[i].length;
    } else if (innerLen !== this[i].length) {
      throw new TypeError('all Array or Vec elements of source should have the same length.');
    }
  }

  const result = new Vec(innerLen);
  const len = this.length;

  for (let x = 0; x < innerLen; x += 1) {
    result[x] = new Vec(len);

    for (let y = 0; y < len; y += 1) {
      result[x][y] = this[y][x];
    }
  }

  return result;
}

/* eslint-disable */
/** @module */

/**
 * <h1> Vec APIs </h1>
 * <hr/>
 * <h3> Vec.allPairs(source1, source2) ⇒ Vec </h3>
 * Returns a new vector that contains all pairings of elements from the first and second arrays or vectors.
 * @param {Array|Vec} source1 The first input array or vector.
 * @param {Array|Vec} source2 The second input array or vector.
 * @returns {Vec} The resulting vector of pairs.
 * @exception {TypeError} if either of the input arguments is null or not of type array or vector.
 * @example
 * const source1 = new Vec(1,2,3);
 * const source2 = new Vec(4,5);
 * const pairs = Vec.allPairs(source1, source2);
 * console.log(pairs);
 * // =>  [ [ 1, 4 ], [ 1, 5 ], [ 2, 4 ], [ 2, 5 ], [ 3, 4 ], [ 3, 5 ] ]
 */

function allPairs(source1, source2) {
  if (!Array.isArray(source1) && !Vec.isVec(source1)) {
    throw new TypeError('source1 should be an Array or a Vec.');
  }

  if (!Array.isArray(source2) && !Vec.isVec(source2)) {
    throw new TypeError('source2 should be an Array or a Vec.');
  }

  const len1 = source1.length;
  const len2 = source2.length;
  const result = new Vec(len1 * len2);

  for (let i = 0; i < len1; i += 1) {
    for (let j = 0; j < len2; j += 1) {
      result[i * len2 + j] = new Vec(source1[i], source2[j]);
    }
  }

  return result;
}

/** @module */

/**
 * <h3> some2(predicate, source1, source2) ⇒ boolean </h3>
 * Tests if any pair of corresponding elements of the vectors satisfies the given predicate.
 * The predicate is applied to matching elements in the two collections up to the lesser of the two lengths of the collections.
 * If any application returns true then the overall result is true and no further elements are tested.
 * @param {function} predicate The function to test the input elements.
 * @param {Array | Vec} source1 The first input vector.
 * @param {Array | Vec} source2 The second input vector.
 * @return {boolean} True if any result from predicate is true. Otherwise, false.
 * @exception {TypeError} when
 *  predicate is not a function or
 *  predicate is a generator function  or
 *  source1 is not an array or a vector or
 *  source2 is not an array or a vector or
 *  the lengths of source1 and source2 are not the same.
 * @example
 * const fourNumbers_1 = Vec.of(25, 4, 55, 61);
 * const fourNumbers_2 = Vec.of(2, 4, 5, 56);
 * const hasEvenPair = Vec.some2((x, y) => x % 2 === 0 && y % 2 === 0, fourNumbers_1, fourNumbers_2);
 * console.log(hasEvenPair);
 * // => true
 */

function some2(predicate, source1, source2) {
  throwIfNotFunction(predicate, 'predicate');
  throwIfGeneratorFunction(predicate, 'predicate');
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

  return function loop(i) {
    return i < source1.length && (predicate(source1[i], source2[i]) || loop(i + 1));
  }(0);
}

/** @module */

/**
 * <h3> Vec.every2(predicate, source1, source2) ⇒ boolean </h3>
 * Tests if all corresponding elements of the vector satisfy the given predicate pairwise.
 * The predicate is applied to matching elements in the two collections up to the lesser of the two lengths of the collections.
 * If any application returns false then the overall result is false and no further elements are tested.
 * Otherwise; if one collection is longer than the other then { TypeError }will be thrown. Otherwise; true is returned.
 * @param {function} predicate The function to test the input elements.
 * @param {Array | Vec} source1 The first input array or vector.
 * @param {Array | Vec} source2 The second input array or vector.
 * @return {boolean} True if all of the array elements satisfy the predicate.
 * @exception {TypeError} when
 *  predicate is not a function or
 *  predicate is a generator function  or
 *  source1 is not an array or a vector or
 *  source2 is not an array or a vector or
 *  the lengths of source1 and source2 are not the same.
 * @example
 * const vec1 = Vec.of(2, 4, 6);
 * const vec2 = Vec.of(8, 10, 12);
 * const isEven = x => x % 2 === 0;
 * const allEven = Vec.every2(isEven, vec1, vec2);
 * console.log(allEven);
 * // => true
 */

function every2(predicate, source1, source2) {
  throwIfNotFunction(predicate, 'predicate');
  throwIfGeneratorFunction(predicate, 'predicate');
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

  return function loop(i) {
    return i >= source1.length || predicate(source1[i], source2[i]) && loop(i + 1);
  }(0);
}

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

/** @module */

/**
 * <h3> Vec.forEach2(action, source1, source2) </h3>
 * Applies the given function to pair of elements drawn from matching indices in two arrays or vectors.
 * The two input arrays or vectors must have the same lengths.
 * @param {function} action The function to apply.
 * @param {Array | Vec} source1 The first input array or vector.
 * @param {Array | Vec} source2 The second input array or vector.
 * @exception {TypeError} when
 * action is a generator function or
 * action is not a function or
 * source1 is neither an array nor a vector or
 * source2 is neither an array nor a vector.
 * @example
 * const charVec_1 = Vec.of('a', 'b', 'c', 'd');
 * const charVec_2 = Vec.of('d', 'e', 'f', 'g');
 * const charVecResult = new Vec();
 * Vec.forEach2((a, b, index) => charVecResult.push(a + b + index), charVec_1, charVec_2);
 * console.log(charVecResult);
 * // => [ 'ad0', 'be1', 'cf2', 'dg3' ]
 */

function forEach2(action, source1, source2) {
  throwIfNotFunction(action, 'action');
  throwIfGeneratorFunction(action, 'action');
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

  for (let i = 0; i < source1.length; i += 1) {
    action(source1[i], source2[i], i);
  }
}

/** @module */

/**
 * <h3> Vec.map2(mapping, source1, source2) ⇒ Vec </h3>
 * Builds a new collection whose elements are the results of applying the given function to the corresponding elements of the two vectors/arrays pairwise.
 * The two input arrays must have the same lengths.
 * @param {function} mapping The function to transform the pairs of the input elements.
 * @param {Array | Vec} source1 The first input array or vector.
 * @param {Array | Vec} source2 The second input array or vector.
 * @return {Vec} The vector of transformed elements.
 * @exception {TypeError} when
 * mapping is not a function or
 * mapping is a generator function or
 * source1 is neither an array nor a vector or
 * source2 is neither an array nor a vector or
 * the lengths of source1 and source2 are not the same.
 * @example
 * const v1 = Vec.of(1, 2, 3, 4, 5);
 * const v2 = Vec.of(1, 2, 3, 4, 5);
 * const mapping = (x, y, index) => x + y + index;
 * const mapped2 = Vec.map2(mapping, v1, v2);
 * console.log(mapped2);
 * // => [ 2, 5, 8, 11, 14 ]
 */

function map2(mapping, source1, source2) {
  throwIfNotFunction(mapping, 'mapping');
  throwIfGeneratorFunction(mapping, 'mapping');
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

  const result = new Vec(source1.length);

  for (let i = 0; i < source1.length; i += 1) {
    result[i] = mapping(source1[i], source2[i], i);
  }

  return result;
}

/** @module */

/**
 * <h3> Vec.map3(mapping, source1, source2, source3) ⇒ Vec </h3>
 * Builds a new collection whose elements are the results of applying the given function to the corresponding elements of the three vectors/arrays pairwise.
 * The two input arrays must have the same lengths.
 * @param {function} mapping The function to transform the pairs of the input elements.
 * @param {Array | Vec} source1 The first input array or vector.
 * @param {Array | Vec} source2 The second input array or vector.
 * @param {Array | Vec} source3 The third input array or vector.
 * @return {Vec} The vector of transformed elements.
 * @exception {TypeError} when
 *  mapping is not a function or
 *  mapping is a generator function or
 *  source1 is neither an array nor a vector or
 *  source2 is neither an array nor a vector or
 *  source3 is neither an array nor a vector or
 *  the lengths of source1, source2, and source3 are not the same.
 * @example
 * const vec_1 = Vec.of(1, 2, 3, 4, 5);
 * const vec_2 = Vec.of(1, 2, 3, 4, 5);
 * const vec_3 = Vec.of(1, 2, 3, 4, 5);
 * const mapping3 = (x, y, z, index) => x + y + z + index;
 * const mapped3 = Vec.map3(mapping3, vec_1, vec_2, vec_3);
 * console.log(mapped3);
 * // => [ 3, 7, 11, 15, 19 ]
 */

function map3(mapping, source1, source2, source3) {
  throwIfNotFunction(mapping, 'mapping');
  throwIfGeneratorFunction(mapping, 'mapping');
  throwIfNullOrUndefined(source1, 'source1');
  throwIfNullOrUndefined(source2, 'source2');
  throwIfNullOrUndefined(source3, 'source2');

  if (!Array.isArray(source1) && !Vec.isVec(source1)) {
    throw new TypeError('source1 should be an Array or a Vec.');
  }

  if (!Array.isArray(source2) && !Vec.isVec(source2)) {
    throw new TypeError('source2 should be an Array or a Vec.');
  }

  if (!Array.isArray(source3) && !Vec.isVec(source3)) {
    throw new TypeError('source3 should be an Array or a Vec.');
  }

  if (source1.length !== source2.length || source1.length !== source3.length) {
    throw new TypeError('source1, source2, and source3 have different lengths.');
  }

  const result = new Vec(source1.length);

  for (let i = 0; i < source1.length; i += 1) {
    result[i] = mapping(source1[i], source2[i], source3[i], i);
  }

  return result;
}

/** @module */

/**
 * <h3> Vec.zip3(source1, source2, source3) ⇒ Vec </h3>
 * Combines three vectors into a vector of pairs. The three vectors must have equal lengths.
 * @param {Array | Vec} source1 The first input array or vector.
 * @param {Array | Vec} source2 The second input array or vector.
 * @param {Array | Vec} source3 The third input array or vector.
 * @return {Vec} The result vector.
 * @exception {TypeError} when
 *  source1 is neither an array nor a vector or
 *  source2 is neither an array nor a vector or
 *  source3 is neither an array nor a vector or
 *  the lengths of source1, source2, and source3 are not the same.
 * @example
 * const sevenNumbers_1 = Vec.init(7, x => x);
 * const sevenNumbers_2 = Vec.init(7, x => x + x);
 * const sevenNumbers_3 = Vec.init(7, x => x * x);
 * const zipped3 = Vec.zip3(sevenNumbers_1, sevenNumbers_2, sevenNumbers_3);
 * console.log(zipped3);
 * // =>
 *  [ [ 0, 0, 0 ],
 *    [ 1, 2, 1 ],
 *    [ 2, 4, 4 ],
 *    [ 3, 6, 9 ],
 *    [ 4, 8, 16 ],
 *    [ 5, 10, 25 ],
 *    [ 6, 12, 36 ] ]
 */

function zip3(source1, source2, source3) {
  throwIfNullOrUndefined(source1, 'source1');
  throwIfNullOrUndefined(source2, 'source2');
  throwIfNullOrUndefined(source3, 'source2');

  if (!Array.isArray(source1) && !Vec.isVec(source1)) {
    throw new TypeError('source1 should be an Array or a Vec.');
  }

  if (!Array.isArray(source2) && !Vec.isVec(source2)) {
    throw new TypeError('source2 should be an Array or a Vec.');
  }

  if (!Array.isArray(source3) && !Vec.isVec(source3)) {
    throw new TypeError('source3 should be an Array or a Vec.');
  }

  if (source1.length !== source2.length || source1.length !== source3.length) {
    throw new TypeError('source1, source2, and source3 have different lengths.');
  }

  const result = new Vec(source1.length);

  for (let i = 0; i < source1.length; i += 1) {
    result[i] = new Vec(source1[i], source2[i], source3[i]);
  }

  return result;
}

/** @module */

/**
 * <h3> unfold(generator, state) ⇒ Vec </h3>
 * Returns a vector that contains the elements generated by the given computation.
 * The given initial state argument is passed to the element generator.
 * @param {function} generator A function that takes in the current state and
 * returns an array containing next element of the vector and the next state value.
 * @param {*} state The initial state value.
 * @return {Vec} The result vector.
 * @exception {TypeError} When generator is not a function or generator is a generator function.
 * @example
 * const oneToTwenty = Vec.unfold(x => x <= 20 ? [x, x + 1] : undefined, 1);
 * console.log(oneToTwenty);
 * // => [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 ]
 * const fib = (n) => Vec.unfold(([x, [a, b]]) => (x < n ? [a + b, [x + 1, [b, a + b]]] : null), [0, [0, 1]]);
 * const fibSeries = fib(10);
 * console.log(fibSeries);
 * // => [ 1, 2, 3, 5, 8, 13, 21, 34, 55, 89 ]
 */

function unfold(generator, state) {
  throwIfNullOrUndefined(state, 'state');
  throwIfNotFunction(generator, 'generator');
  throwIfGeneratorFunction(generator, 'generator');
  const result = new Vec();

  (function loop(s) {
    const gs = generator(s);

    if (isNotNull(gs) && isNotUndefined(gs)) {
      const [fst, snd] = gs;
      result.push(fst);

      if (isNotNull(snd) && isNotUndefined(snd)) {
        loop(snd);
      }
    }
  })(state);

  return result;
}

Vec.empty = empty;
Vec.init = init;
Vec.create = create;
Vec.isVec = isVec;
Vec.some2 = some2;
Vec.every2 = every2;
Vec.fold2 = fold2;
Vec.foldRight2 = foldRight2;
Vec.forEach2 = forEach2;
Vec.map2 = map2;
Vec.map3 = map3;
Vec.zip3 = zip3;
Vec.unfold = unfold;
Vec.allPairs = allPairs;
Vec.prototype.isEmpty = isEmpty;
Vec.prototype.copy = copy;
Vec.prototype.countBy = countBy;
Vec.prototype.findRight = findRight;
Vec.prototype.findIndexRight = findIndexRight;
Vec.prototype.head = head;
Vec.prototype.tail = tail;
Vec.prototype.get = get;
Vec.prototype.set = set;
Vec.prototype.last = last;
Vec.prototype.take = take;
Vec.prototype.takeWhile = takeWhile;
Vec.prototype.skipWhile = skipWhile;
Vec.prototype.min = min;
Vec.prototype.max = max;
Vec.prototype.minBy = minBy;
Vec.prototype.maxBy = maxBy;
Vec.prototype.sum = sum;
Vec.prototype.sumBy = sumBy;
Vec.prototype.average = average;
Vec.prototype.averageBy = averageBy;
Vec.prototype.splitAt = splitAt;
Vec.prototype.partition = partition;
Vec.prototype.scan = scan;
Vec.prototype.scanRight = scanRight;
Vec.prototype.windowed = windowed;
Vec.prototype.zip = zip;
Vec.prototype.unzip = unzip;
Vec.prototype.distinct = distinct;
Vec.prototype.distinctBy = distinctBy;
Vec.prototype.pairwise = pairwise;
Vec.prototype.except = except;
Vec.prototype.groupBy = groupBy;
Vec.prototype.mapFold = mapFold;
Vec.prototype.mapFoldRight = mapFoldRight;
Vec.prototype.chunkBySize = chunkBySize;
Vec.prototype.binarySearch = binarySearch;
Vec.prototype.permute = permute;
Vec.prototype.transpose = transpose;

export { Vec, isBigInt, isBoolean, lodash_isequal as isEqual, isFunction, isGeneratorFunction, isIterable, isNull, isNumber, isObject, isPrimitive, isString, isSymbol, isUndefined };
