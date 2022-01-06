import Vec from '../src/vec/vec.main';
import empty from '../src/vec/vec.empty';

describe('Vec.foldRight2()', () => {
  test('should throw error if args are invalid', () => {
    const vec1 = Vec.of(1, 2);
    const vec2 = Vec.of(1, 2);
    const folder = (s, x, y) => s + x + y;

    expect(() => Vec.foldRight2(null, vec1, vec2, 0)).toThrow(TypeError);
    expect(() => Vec.foldRight2(folder, vec1, vec2, null)).toThrow(TypeError);
    expect(() => Vec.foldRight2(folder, null, vec2, 0)).toThrow(TypeError);
    expect(() => Vec.foldRight2(folder, vec1, null, 0)).toThrow(TypeError);

    expect(() => Vec.foldRight2(folder, vec1, vec1, 0)).not.toThrow(TypeError);
    expect(() => Vec.foldRight2(folder, [], [], 0)).not.toThrow(TypeError);
    expect(() => Vec.foldRight2(function* () {}, vec1, vec2, 0)).toThrow(TypeError);
    expect(() => Vec.foldRight2(folder(), { n: 10 }, [2], 0)).toThrow(TypeError);
    expect(() => Vec.foldRight2(folder(), [2], { n: 10 }, 0)).toThrow(TypeError);

    expect(() => Vec.foldRight2(folder(), [1, 2], [2], 0)).toThrow(TypeError);
    expect(() => Vec.foldRight2(folder(), 0[1], [2, 2], 0)).toThrow(TypeError);
  });

  test('should return correct result', () => {
    const vec1 = Vec.of(1, 2, 3, 4, 5);
    const vec2 = Vec.of(1, 2, 3, 4, 5);
    const folder = (s, x, y) => x + y + s;
    expect(Vec.foldRight2(folder, empty(), empty(), 0)).toBe(0);
    expect(Vec.foldRight2(folder, vec1, vec2, 0)).toBe(30);

    expect(Vec.foldRight2((x, y, s) => x.n + y.n + s,
      [{ n: 1 }, { n: 10 }], [{ n: 1 }, { n: 10 }], 0)).toBe(22);

    const context = {
      prop: 'n',
      predicate(x, y, s) {
        return x[this.prop] + y[this.prop] + s;
      },
    };
    expect(Vec.foldRight2(context.predicate.bind(context), [{ n: 1 }, { n: 12 }], [{ n: 1 }, { n: 12 }], 0)).toBe(26);
  });
});
