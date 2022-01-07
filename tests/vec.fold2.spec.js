import Vec from '../src/vec/vec.main';
import empty from '../src/vec/vec.empty';

describe('Vec.fold2()', () => {
  test('should throw error if args are invalid', () => {
    const vec1 = Vec.of(1, 2);
    const vec2 = Vec.of(1, 2);
    const folder = (s, x, y) => s + x + y;

    expect(() => Vec.fold2(null, 0, vec1, vec2)).toThrow(TypeError);
    expect(() => Vec.fold2(folder, null, vec1, vec2)).toThrow(TypeError);
    expect(() => Vec.fold2(folder, 0, null, vec2)).toThrow(TypeError);
    expect(() => Vec.fold2(folder, 0, vec1, 0)).toThrow(TypeError);

    expect(() => Vec.fold2(folder, 0, vec1, vec1)).not.toThrow(TypeError);
    expect(() => Vec.fold2(folder, 0, [], [])).not.toThrow(TypeError);
    expect(() => Vec.fold2(function* () {}, 0, vec1, vec2)).toThrow(TypeError);
    expect(() => Vec.fold2(folder(), 0, { n: 10 }, [2])).toThrow(TypeError);
    expect(() => Vec.fold2(folder(), 0, [2], { n: 10 })).toThrow(TypeError);

    expect(() => Vec.fold2(folder(), 0, [1, 2], [2])).toThrow(TypeError);
    expect(() => Vec.fold2(folder(), 0, [1], [2, 2])).toThrow(TypeError);
  });

  test('should return correct result', () => {
    const vec1 = Vec.of(1, 2, 3, 4, 5);
    const vec2 = Vec.of(1, 2, 3, 4, 5);
    const folder = (s, x, y) => x + y + s;
    expect(Vec.fold2(folder, 0, empty(), empty())).toBe(0);
    expect(Vec.fold2(folder, 0, vec1, vec2)).toBe(30);

    expect(Vec.fold2((s, x, y) => s + x.n + y.n, 0,
      [{ n: 1 }, { n: 10 }], [{ n: 1 }, { n: 10 }])).toBe(22);

    const context = {
      prop: 'n',
      predicate(s, x, y) {
        return s + x[this.prop] + y[this.prop];
      },
    };
    expect(Vec.fold2(context.predicate.bind(context), 0, [{ n: 1 }, { n: 12 }], [{ n: 1 }, { n: 12 }])).toBe(26);

    // expect(Vec.fold2(folder, 0, [1, 2,, 3], [1, 2,, 3])).toBe(12);
  });
});
