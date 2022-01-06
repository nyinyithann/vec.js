import Vec from '../src/vec/vec.main';

describe('takeWhile()', () => {
  test('should throw error if the existing vec is null or undefined', () => {
    const takeWhile = Vec.prototype.takeWhile;
    expect(() => takeWhile.call(null))
      .toThrow(Error);
  });

  test('should throw error if predicate is a generator function or not a function', () => {
    const vec = new Vec(1, 2, 3);
    expect(() => vec.takeWhile(null)).toThrow(TypeError);
    expect(() => vec.takeWhile(undefined)).toThrow(TypeError);
  });

  test('should return elements satisfied by predicate', () => {
    const vec = Vec.init(10, (x) => x + 1);
    expect(vec.takeWhile((x) => x % 2 === 1)).toStrictEqual(Vec.create(1, 1));
    expect(vec.takeWhile((x) => x < 3)).toStrictEqual(new Vec(1, 2));
    expect(vec.takeWhile((x) => x > 3)).toStrictEqual(new Vec());
    expect(vec.takeWhile((x) => x > 0)).toStrictEqual(vec);
  });

  test('invocation via call/apply/bind should be fine', () => {
    const vec = Vec.init(10, (x) => x + 1);
    const takeWhile = Vec.prototype.takeWhile;
    expect(takeWhile.call(vec, (x) => x % 2 === 1)).toStrictEqual(Vec.create(1, 1));
    expect(takeWhile.apply(vec, [(x) => x < 3])).toStrictEqual(new Vec(1, 2));
    expect(takeWhile.bind(vec)((x) => x > 3)).toStrictEqual(new Vec());
  });

  test('predicate can be a method of an object', () => {
    const obj = {
      x: 0,
      predicate(y) {
        return y > this.x;
      },
    };
    const vec = Vec.init(10, (x) => x + 1);
    expect(vec.takeWhile(obj.predicate, obj)).toStrictEqual(vec);
  });
});
