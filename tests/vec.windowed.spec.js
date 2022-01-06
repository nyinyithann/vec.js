import Vec from '../src/vec/vec.main';

describe('windowed()', () => {
  test('should throw error if the existing vec is null or undefined, or windowSize is negative', () => {
    const windowed = Vec.prototype.windowed;
    expect(() => windowed.call(null)).toThrow(Error);
    expect(() => windowed.call(new Vec(), -1)).toThrow(Error);
  });

  test('should return a vec of sliding windows containing elements drawn from the input array', () => {
    const vec = Vec.init(10, (x) => x + 1);
    const expected = vec.windowed(8);
    const actual = new Vec(
      new Vec(1, 2, 3, 4, 5, 6, 7, 8),
      new Vec(2, 3, 4, 5, 6, 7, 8, 9),
      new Vec(3, 4, 5, 6, 7, 8, 9, 10)
    );
    expect(expected).toStrictEqual(actual);
    expect(vec.windowed(10)).toStrictEqual(new Vec(vec));
    expect(vec.windowed(vec.length + 1)).toStrictEqual(new Vec());
  });

  test('invocation via call/apply/bind should be fine', () => {
    const vec = Vec.init(10, (x) => x + 1);
    const windowed = Vec.prototype.windowed;
    const actual = new Vec(
      new Vec(1, 2, 3, 4, 5, 6, 7, 8),
      new Vec(2, 3, 4, 5, 6, 7, 8, 9),
      new Vec(3, 4, 5, 6, 7, 8, 9, 10)
    );

    expect(windowed.call(vec, 8)).toStrictEqual(actual);
    expect(windowed.apply(vec, [8])).toStrictEqual(actual);
    expect(windowed.bind(vec)(8)).toStrictEqual(actual);
  });
});
