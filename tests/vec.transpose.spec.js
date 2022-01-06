import Vec from '../src/vec/vec.main';

describe('Vec.transpose()', () => {
  test('should throw error for invalid arguments', () => {
    const transpose = Vec.prototype.transpose;
    expect(() => transpose.call(null)).toThrow(TypeError);
    expect(() => new Vec([1, 2], [1, 2, 3]).transpose()).toThrow(TypeError);
  });

  test('should return transposed vector', () => {
    const vec = new Vec(new Vec(1, 2, 3), new Vec(4, 5, 6));
    const actual = vec.transpose();
    const expected = new Vec(
      new Vec(1, 4),
      new Vec(2, 5),
      new Vec(3, 6)
    );
    expect(actual).toStrictEqual(expected);

    expect((new Vec([1, 2, 3])).transpose()).toStrictEqual(new Vec(
      Vec.of(1), Vec.of(2), Vec.of(3)
    ));

    expect((new Vec([])).transpose()).toStrictEqual(new Vec());

    expect(new Vec().transpose()).toStrictEqual(new Vec());
  });
});
