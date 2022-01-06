import Vec from '../src/vec/vec.main';

describe('partition()', () => {
  test('should throw error if the existing vec is null or undefined', () => {
    const partition = Vec.prototype.partition;
    expect(() => partition.call(null))
      .toThrow(TypeError);
    expect(() => partition.call(undefined))
      .toThrow(TypeError);
  });

  test('should throw error if predicate is a generator function or not a function', () => {
    const vec = new Vec(1, 2, 3);
    expect(() => vec.partition(null))
      .toThrow(TypeError);
    expect(() => vec.partition(undefined))
      .toThrow(TypeError);
  });

  test('should return two vec after partition', () => {
    const vec = Vec.init(10, (x) => x + 1);
    const [even, odd] = vec.partition((x) => x % 2 === 0);
    expect(even).toStrictEqual(new Vec(2, 4, 6, 8, 10));
    expect(odd).toStrictEqual(new Vec(1, 3, 5, 7, 9));
  });

  test('predicate might be associate with a context', () => {
    const context = {
      divider: 2,
    };
    const predicate = function (x) { return x % this.divider === 0; };
    const vec = Vec.init(10, (x) => x + 1);
    const expected = new Vec(new Vec(2, 4, 6, 8, 10), new Vec(1, 3, 5, 7, 9));
    expect(vec.partition(predicate, context)).toStrictEqual(expected);
  });

  test('invocation via call/apply/bind should be fine', () => {
    const vec = Vec.init(10, (x) => x + 1);
    const expected = new Vec(new Vec(2, 4, 6, 8, 10), new Vec(1, 3, 5, 7, 9));
    const partition = Vec.prototype.partition;
    expect(partition.call(vec, (x) => x % 2 === 0)).toStrictEqual(expected);
    expect(partition.apply(vec, [(x) => x % 2 === 0])).toStrictEqual(expected);
    expect(partition.bind(vec)((x) => x % 2 === 0)).toStrictEqual(expected);
  });
});
