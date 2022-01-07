/* eslint-disable */
import { isIterable, isFunction, isGeneratorFunction } from "./util";

export function throwIfNotIterable(value, name = "value") {
  if (!isIterable(value)) {
    throw new TypeError(`${name} must be iterable.`);
  }
}

export function throwIfNullOrUndefined(value, name = "value") {
  if (value == null || typeof value === "undefined") {
    throw new TypeError(`${name} is null or not defined.`);
  }
}

export function throwIfNotFunction(value, name = "value") {
  if (!isFunction(value)) {
    throw new TypeError(`${name} is not a function.`);
  }
}

export function throwIfNegativeNumber(value, name = "value") {
  if (!Number.isFinite(value) || value < 0) {
    throw new TypeError(`${name} must be a non-negative number.`);
  }
}

export function throwIfGeneratorFunction(value, name = "value") {
  if (isGeneratorFunction(value)) {
    throw new TypeError(
      `${name} is a generator function. It should be a normal function.`
    );
  }
}

export function throwIfNotAFiniteNumber(value, name = "value") {
  if (!Number.isFinite(value)) {
    throw new TypeError(`${name} is not a finite number.`);
  }
}

export function throwIfIndexNotFound() {
  throw new TypeError(
    "An index satisfying the predicate was not found in the vector."
  );
}

export function throwIfIndexOutOfRanged() {
  throw new TypeError("The index is out of range.");
}

export function throwIfContainerEmpty(value) {
  if (value.length === 0) throw new TypeError("The container is empty.");
}
