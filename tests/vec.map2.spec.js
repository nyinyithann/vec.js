import Vec from '../src/vec/vec.main';

describe('Vec.map2()', () => {
  test('should throw exception if arguments are invalid', () => {
    expect(() => Vec.map2({}, new Vec(), new Vec())).toThrow(TypeError);
    expect(() => Vec.map2(function* () {}, new Vec(), new Vec())).toThrow(TypeError);
    expect(() => Vec.map2(() => {}, null, new Vec())).toThrow(TypeError);
    expect(() => Vec.map2(() => {}, new Vec(), null)).toThrow(TypeError);
    expect(() => Vec.map2(() => {}, { }, new Vec())).toThrow(TypeError);
    expect(() => Vec.map2(() => {}, new Vec(), { })).toThrow(TypeError);
    expect(() => Vec.map2(() => {}, new Vec(1, 2), Vec.of(1))).toThrow(TypeError);
  });

  test('should perform mapping operation on 2 vectors', () => {
    const v1 = Vec.of(1, 2, 3, 4, 5);
    const v2 = Vec.of(1, 2, 3, 4, 5);
    const mapping = (x, y, i) => x + y + i;
    expect(Vec.map2(mapping, v1, v2)).toStrictEqual(new Vec(
      2, 5, 8, 11, 14
    ));
  });
});
