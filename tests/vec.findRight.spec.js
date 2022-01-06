import Vec from '../src/vec/vec.main';

describe('findRight()', () => {
  test('should throw type error if the vec is null or undefined, or '
    + 'predicate is a generator function or not a function', () => {
    const findRight = Vec.prototype.findRight;
    expect(() => findRight.call(null)).toThrow(TypeError);
    expect(() => Vec.empty().findRight(null)).toThrow(TypeError);
    expect(() => Vec.empty().findRight(undefined)).toThrow(TypeError);
    expect(() => Vec.empty().findRight(function* () {})).toThrow(TypeError);
  });

  test('invocation via call/apply/bind should work', () => {
    const findRight = Vec.prototype.findRight;
    const vec = new Vec(2, 3, 4, 200, 100, 2);
    expect(findRight.call(vec, (x) => x % 50 === 0)).toBe(100);
    expect(findRight.apply(vec, [(x) => x % 50 === 0])).toBe(100);
    expect(findRight.bind(vec)((x) => x % 50 === 0)).toBe(100);
  });

  test('predicate might be associate with a context', () => {
    const context = {
      fifty: 50,
    };
    const predicate = function (x) { return x > this.fifty; };
    const vec = new Vec(2, 3, 4, 200, 100, 2);
    expect(vec.findRight(predicate, context)).toBe(100);
  });

  test('should return the last element that satisfies the condition in predicate', () => {
    const vec = new Vec(1, 2, 42, 323, 423, 32, 23, 10, 11);
    expect(vec.findRight((x) => x % 2 === 0)).toBe(10);
    expect((new Vec(2, 3, 4, 5, 7, 4).findRight((x) => x % 2 === 1))).toBe(7);
  });

  test('if not found any element, should return undefined', () => {
    expect(new Vec(1, 2, 3).findRight((x) => x > 10)).toBe(undefined);
  });
});
