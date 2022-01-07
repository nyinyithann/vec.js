import Vec from '../src/vec/vec.main';

describe('take()', () => {
  test('should throw error if the existing vec is null or undefined', () => {
    const take = Vec.prototype.take;
    expect(() => take.call(null))
      .toThrow(Error);
  });

  test('if the count is zeo or less than zero, empty vec should be returned', () => {
    expect(new Vec(1, 2, 3).take(0))
      .toStrictEqual(new Vec());
    expect(new Vec(1, 2, 3).take(-1))
      .toStrictEqual(new Vec());
  });

  test('if the count is equal to or greater than the length of the vec, the vec should be returned', () => {
    expect(new Vec(1, 2, 3).take(3))
      .toStrictEqual(new Vec(1, 2, 3));
    expect(new Vec(1, 2, 3).take(30))
      .toStrictEqual(new Vec(1, 2, 3));
  });

  test('should return the first N elements of the vec', () => {
    const vec = new Vec(1, 2, 3, 4, 5);
    expect(vec.take(2))
      .toStrictEqual(new Vec(1, 2));
    expect(vec.take(5))
      .toStrictEqual(new Vec(1, 2, 3, 4, 5));
    expect(vec.take(15))
      .toStrictEqual(new Vec(1, 2, 3, 4, 5));
  });

  test('invocation via call/apply/bind should work', () => {
    const vec = new Vec(1, 2, 3, 4, 5);
    const take = Vec.prototype.take;
    expect(take.call(vec, 2)).toStrictEqual(new Vec(1, 2));
    expect(take.apply(vec, [2])).toStrictEqual(new Vec(1, 2));
    expect(take.bind(vec)(2)).toStrictEqual(new Vec(1, 2));
  });
});
