/* eslint-disable */
export function getTag(value) {
  return typeof value === 'object' && value != null
    ? Object.prototype.toString.call(value)
    : '';
}

export function isNull(value) {
  return value == null;
}

export function isUndefined(value) {
  return typeof value === 'undefined';
}

export function isNumber(value) {
  return typeof value === 'number' || getTag(value) === '[object Number]';
}

export function isBigInt(value) {
  return typeof value === 'bigint' || getTag(value) === '[object BigInt]';
}

export function isSymbol(value) {
  return typeof value === 'symbol' || getTag(value) === '[object Symbol]';
}

export function isString(value) {
  return typeof value === 'string' || getTag(value) === '[object String]';
}

export function isBoolean(value) {
  return typeof value === 'boolean' || getTag(value) === '[object Boolean]';
}

export function isNotNull(value) {
  return !isNull(value);
}

export function isNotUndefined(value) {
  return !isUndefined(value);
}

export function isIterable(source) {
  return isNotNull(source) && isNotUndefined(source[Symbol.iterator]);
}

export function isFunction(value) {
  return typeof value === 'function';
}

export function isNotFunction(value) {
  return !isFunction(value);
}

export function isGeneratorFunction(value) {
  return isNotNull(value) && value[Symbol.toStringTag] === 'GeneratorFunction';
}

export function isObject(value) {
  return value != null && typeof value === 'object';
}

export function isPrimitive(value) {
  return (
    isNull(value) ||
    isUndefined(value) ||
    isNumber(value) ||
    isBigInt(value) ||
    isSymbol(value) ||
    isString(value) ||
    isBoolean(value)
  );
}
