import Vec from '../src/vec/vec.main';

describe('Vec.zip3', () => {
  test('should throw exception if arguments are invalid', () => {
    expect(() => Vec.zip3(null, new Vec(), new Vec())).toThrow(TypeError);
    expect(() => Vec.zip3(new Vec(), null, new Vec())).toThrow(TypeError);
    expect(() => Vec.zip3(new Vec(), new Vec(), null)).toThrow(TypeError);
    expect(() => Vec.zip3(new Vec(1, 2), new Vec(1, 2), new Vec(1, 2, 3))).toThrow(TypeError);
    expect(() => Vec.zip3(new Vec(1, 2, 3), new Vec(1, 2, 3), new Vec(1, 2))).toThrow(TypeError);
  });

  test('should zip 3 vectors', () => {
    const v1 = Vec.of(1, 2, 3, 4, 5);
    const v2 = Vec.of(1, 2, 3, 4, 5);
    const v3 = Vec.of(1, 2, 3, 4, 5);
    expect(Vec.zip3(v1, v2, v3))
      .toStrictEqual(new Vec(
        new Vec(1, 1, 1),
        new Vec(2, 2, 2),
        new Vec(3, 3, 3),
        new Vec(4, 4, 4),
        new Vec(5, 5, 5)
      ));
  });
});
