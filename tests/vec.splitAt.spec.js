import Vec from '../src/vec/vec.main';

describe('splitAt()', () => {
  test('should throw error if the existing vec is null or undefined', () => {
    const splitAt = Vec.prototype.splitAt;
    expect(() => splitAt.call(null)).toThrow(TypeError);
    expect(() => splitAt.call(undefined)).toThrow(TypeError);
  });

  test('should throw error if index is greater than the length of the vec', () => {
    expect(() => new Vec(1, 2).splitAt(4)).toThrow(TypeError);
  });

  test('should return two split vecs', () => {
    const vec = Vec.init(10, (x) => x + 1);
    const splitVec = vec.splitAt(4);
    expect(splitVec[0]).toStrictEqual(new Vec(1, 2, 3, 4));
    expect(splitVec[1]).toStrictEqual(new Vec(5, 6, 7, 8, 9, 10));
    expect(vec.length).toBe(10);
    expect(vec.splitAt(0)).toStrictEqual(new Vec([], vec));
    expect(vec.splitAt(vec.length)).toStrictEqual(new Vec(vec, []));
  });

  test('invocation via call/apply/bind should be fine', () => {
    const vec = Vec.init(5, (x) => x + 1);
    const splitAt = Vec.prototype.splitAt;
    expect(splitAt.call(vec, 2)).toStrictEqual(new Vec(new Vec(1, 2), new Vec(3, 4, 5)));
    expect(splitAt.apply(vec, [2])).toStrictEqual(new Vec(new Vec(1, 2), new Vec(3, 4, 5)));
    expect(splitAt.bind(vec)(2)).toStrictEqual(new Vec(new Vec(1, 2), new Vec(3, 4, 5)));
  });
});
