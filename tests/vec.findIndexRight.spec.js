import Vec from '../src/vec/vec.main';

describe('findIndexBack()', () => {
  test('should throw type error if the vec is null or undefined, or '
    + 'predicate is a generator function or not a function', () => {
    const findIndexRight = Vec.prototype.findIndexRight;
    expect(() => findIndexRight.call(null)).toThrow(TypeError);
    expect(() => Vec.empty().findIndexRight(null)).toThrow(TypeError);
    expect(() => Vec.empty().findIndexRight(undefined)).toThrow(TypeError);
    expect(() => Vec.empty().findIndexRight(function* () {})).toThrow(TypeError);
  });

  test('invocation via call/apply/bind should work', () => {
    const findIndexBack = Vec.prototype.findIndexRight;
    const vec = new Vec(2, 3, 4, 200, 100, 2);
    expect(findIndexBack.call(vec, (x) => x % 50 === 0)).toBe(4);
    expect(findIndexBack.apply(vec, [(x) => x % 50 === 0])).toBe(4);
    expect(findIndexBack.bind(vec)((x) => x % 50 === 0)).toBe(4);
  });

  test('predicate might be associate with a context', () => {
    const context = {
      fifty: 50,
    };
    const predicate = function (x) { return x > this.fifty; };
    const vec = new Vec(2, 3, 4, 200, 100, 2);
    expect(vec.findIndexRight(predicate, context)).toBe(4);
  });

  test('should return the last element\'s index that satisfies the condition in predicate', () => {
    const vec = new Vec(1, 2, 42, 323, 423, 32, 23, 10, 11);
    expect(vec.findIndexRight((x) => x % 2 === 0)).toBe(7);
    expect((new Vec(2, 3, 4, 5, 7, 4).findIndexRight((x) => x % 2 === 1))).toBe(4);

    /* eslint-disable */
    // values of 2 empty slots are equal
    expect(Vec.from([[1, 31], [2, 32], [,,], [3, 33]]).findIndexRight((x) => x[0] === x[1])).toBe(2);
  });

  test('if not found any element, should return -1', () => {
    expect(new Vec(1, 2, 3).findIndexRight((x) => x > 10)).toBe(-1);
  });
});
