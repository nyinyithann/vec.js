import Vec from '../src/vec/vec.main';

describe('zip()', () => {
  test('should throw error if the existing vec is null or undefined, or other\'s length is not the same as existing vec ', () => {
    const zip = Vec.prototype.zip;
    expect(() => zip.call(null)).toThrow(TypeError);
    expect(() => zip.call(undefined)).toThrow(TypeError);
    expect(() => zip.call(new Vec(1, 2), new Vec())).toThrow(TypeError);
  });

  test('should return a vec containing vecs of apris', () => {
    const vec1 = Vec.init(5, (x) => x + 1);
    const vec2 = Vec.init(5, (x) => x + x);
    const expected = vec1.zip(vec2);
    const actual = new Vec(
      new Vec(1, 0),
      new Vec(2, 2),
      new Vec(3, 4),
      new Vec(4, 6),
      new Vec(5, 8)
    );
    expect(expected).toStrictEqual(actual);
  });

  test('invocation via call/apply/bind should be fine', () => {
    const zip = Vec.prototype.zip;
    const vec1 = Vec.init(5, (x) => x + 1);
    const vec2 = Vec.init(5, (x) => x + x);
    const actual = new Vec(
      new Vec(1, 0),
      new Vec(2, 2),
      new Vec(3, 4),
      new Vec(4, 6),
      new Vec(5, 8)
    );
    expect(zip.call(vec1, vec2)).toStrictEqual(actual);
    expect(zip.apply(vec1, [vec2])).toStrictEqual(actual);
    expect(zip.bind(vec1)(vec2)).toStrictEqual(actual);
  });
});
