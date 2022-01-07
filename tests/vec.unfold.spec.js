import Vec from '../src/vec/vec.main';

describe('Vec.unfold()', () => {
  test('should throw exception if arguments are invalid', () => {
    expect(() => Vec.unfold({}, 1)).toThrow(TypeError);
    expect(() => Vec.unfold(function* () {}, new Vec(), new Vec())).toThrow(TypeError);
    expect(() => Vec.unfold(() => {}, null)).toThrow(TypeError);
  });

  test('should return a vec after unfolding', () => {
    const actual = Vec.unfold((x) => (x <= 10 ? [x, x + 1] : undefined), 1);
    const expected = Vec.init(10, (x) => x + 1);
    expect(actual).toStrictEqual(expected);

    const fib = (n) => Vec.unfold(([x, [a, b]]) => (x < n ? [a + b, [x + 1, [b, a + b]]] : null), [0, [0, 1]]);
    expect(fib(10)).toStrictEqual(new Vec(1, 2, 3, 5, 8, 13, 21, 34, 55, 89));
  });
});
