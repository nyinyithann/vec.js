import Vec from '../src/vec/vec.main';

describe('permute()', () => {
  test('should throw exception if arguments are invalid', () => {
    expect(() => Vec.prototype.permute.call(null, new Vec())).toThrow(TypeError);
  });

  test('should return correct permutation', () => {
    expect(new Vec().permute()).toStrictEqual(new Vec());
    const vec = new Vec(1, 2, 3);
    expect(vec.permute()).toStrictEqual(new Vec(
      Vec.of(1, 2, 3),
      Vec.of(2, 1, 3),
      Vec.of(3, 1, 2),
      Vec.of(1, 3, 2),
      Vec.of(2, 3, 1),
      Vec.of(3, 2, 1)
    ));
    expect(vec).toStrictEqual(new Vec(1, 2, 3));
    expect(new Vec().permute()).toStrictEqual(new Vec());

    const n1 = { n: 1 };
    const n2 = { n: 2 };
    const n3 = { n: 3 };
    const vecn = new Vec(n1, n2, n3);
    expect(vecn.permute()).toStrictEqual(new Vec(
      new Vec(n1, n2, n3),
      new Vec(n2, n1, n3),
      new Vec(n3, n1, n2),
      new Vec(n1, n3, n2),
      new Vec(n2, n3, n1),
      new Vec(n3, n2, n1)
    ));
    expect(vecn).toStrictEqual(new Vec(n1, n2, n3));
  });
});
