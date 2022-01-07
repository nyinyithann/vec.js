import Vec from '../src/vec/vec.main';
import empty from '../src/vec/vec.empty';

describe('pairwise()', () => {
  test('should throw error if the existing vec is null or undefined', () => {
    const pairwise = Vec.prototype.pairwise;
    expect(() => pairwise.call(null)).toThrow(TypeError);
    expect(() => pairwise.call(undefined)).toThrow(TypeError);
  });

  test('should return empty vec if the length of the existing vec is less than 2', () => {
    expect(new Vec().pairwise()).toStrictEqual(empty());
  });

  test('should return correct result', () => {
    const vec = Vec.init(5, (x) => x);
    const expected = new Vec(
      new Vec(0, 1),
      new Vec(1, 2),
      new Vec(2, 3),
      new Vec(3, 4)
    );
    expect(vec.pairwise()).toStrictEqual(expected);
  });

  test('invocation via call/apply/bind should be fine', () => {
    const vec = Vec.init(5, (x) => x);
    const pairwise = Vec.prototype.pairwise;

    const expected = new Vec(
      new Vec(0, 1),
      new Vec(1, 2),
      new Vec(2, 3),
      new Vec(3, 4)
    );

    expect(pairwise.call(vec)).toStrictEqual(expected);
    expect(pairwise.apply(vec)).toStrictEqual(expected);
    expect(pairwise.bind(vec)()).toStrictEqual(expected);
  });
});
