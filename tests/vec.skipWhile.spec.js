import Vec from '../src/vec/vec.main';

describe('skipWhile()', () => {
  test('should throw error if the existing vec is null or undefined', () => {
    const skipWhile = Vec.prototype.skipWhile;
    expect(() => skipWhile.call(null))
      .toThrow(Error);
  });

  test('should throw error if predicate is a generator function or not a function', () => {
    const vec = new Vec(1, 2, 3);
    expect(() => vec.skipWhile(null)).toThrow(TypeError);
    expect(() => vec.skipWhile(undefined)).toThrow(TypeError);
  });

  test('should skip elements satisfied by predicate', () => {
    const vec = Vec.init(10, (x) => x + 1);
    expect(vec.skipWhile((x) => x % 2 === 1).length).toBe(9);
    expect(vec.skipWhile((x) => x % 2 === 1)).toStrictEqual(vec.slice(1));
    expect(vec.skipWhile((x) => x < 3)).toStrictEqual(vec.slice(2));
    expect(vec.skipWhile((x) => x > 3)).toStrictEqual(vec);
    expect(vec.skipWhile((x) => x > 0)).toStrictEqual(new Vec());
  });

  test('invocation via call/apply/bind should be fine', () => {
    const vec = Vec.init(10, (x) => x + 1);
    const skipWhile = Vec.prototype.skipWhile;
    expect(skipWhile.call(vec, (x) => x % 2 === 1)).toStrictEqual(vec.slice(1));
    expect(skipWhile.apply(vec, [(x) => x < 3])).toStrictEqual(vec.slice(2));
    expect(skipWhile.bind(vec)((x) => x > 3)).toStrictEqual(vec);
  });

  test('predicate can be a method of an object', () => {
    const obj = {
      x: 0,
      predicate(y) {
        return y > this.x;
      },
    };
    const vec = Vec.init(10, (x) => x + 1);
    expect(vec.skipWhile(obj.predicate, obj)).toStrictEqual(new Vec());
  });
});
