import empty from '../src/vec/vec.empty';
import Vec from '../src/vec/vec.main';

describe('except()', () => {
  test('should throw error if the existing vec is null or undefined, or itemsToExclude is null or undefined', () => {
    const except = Vec.prototype.except;
    expect(() => except.call(null)).toThrow(TypeError);
    expect(() => except.call(undefined)).toThrow(TypeError);

    expect(() => new Vec(1, 2, 3).except(true)).not.toThrow(TypeError);
  });

  test('should return empty if the length of existing vec is 0', () => {
    expect(new Vec().except(1, 2, 3)).toStrictEqual(empty());
  });

  test('should exclude items passed as arguments', () => {
    expect(new Vec(1, 2, 3).except()).toStrictEqual(new Vec(1, 2, 3));
    expect(new Vec(1, 2, 3, 4, 5).except(2, 3, 4)).toStrictEqual(new Vec(1, 5));
    expect(
      new Vec([1], [2], [3], [4], [5]).except([2], [3], [4])
    ).toStrictEqual(new Vec([1], [5]));
    expect(
      new Vec({ n: 1 }, { n: 1 }, { n: 2 }, { n: 2 }, { n: 5 }).except(
        { n: 1 },
        { n: 1 },
        { n: 2 }
      )
    ).toStrictEqual(new Vec({ n: 5 }));

    expect(
      new Vec([1], [2], [3], [4], [5]).except([2], [3], [4])
    ).toStrictEqual(new Vec([1], [5]));

    expect(new Vec(1, 2, 3).except(null, 1)).toStrictEqual(new Vec(2, 3));
  });

  test('invocation via call/apply/bind should be fine', () => {
    const vec = new Vec(1, 2, 3, 4, 5);
    const except = Vec.prototype.except;
    expect(except.call(vec, true, 2, 3, 4)).toStrictEqual(new Vec(1, 5));
    expect(except.apply(vec, [true, 2, 3, 4])).toStrictEqual(new Vec(1, 5));
    expect(except.bind(vec)(true, 2, 3, 4)).toStrictEqual(new Vec(1, 5));
  });
});
