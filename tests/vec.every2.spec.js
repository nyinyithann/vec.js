import Vec from '../src/vec/vec.main';
import empty from '../src/vec/vec.empty';

describe('Vec.every2()', () => {
  test('should throw error if args are invalid', () => {
    const vec1 = Vec.of(1, 2);
    const vec2 = Vec.of(1, 2);
    const predicate = (x, y) => x === y;
    expect(() => Vec.every2(null, vec1, vec2)).toThrow(TypeError);
    expect(() => Vec.every2(predicate, null, vec2)).toThrow(TypeError);
    expect(() => Vec.every2(predicate, vec1, null)).toThrow(TypeError);
    expect(() => Vec.every2(predicate, vec1, vec1)).not.toThrow(TypeError);
    expect(() => Vec.every2(predicate, [], [])).not.toThrow(TypeError);
    expect(() => Vec.every2(function* () {}, vec1, vec2)).toThrow(TypeError);

    expect(() => Vec.every2(predicate(), { n: 10 }, [2])).toThrow(TypeError);
    expect(() => Vec.every2(predicate(), [2], { n: 10 })).toThrow(TypeError);

    expect(() => Vec.every2(predicate(), [1, 2], [2])).toThrow(TypeError);
  });

  test('should return correct result', () => {
    expect(Vec.every2((x, y) => x === y, empty(), empty())).toBe(true);
    expect(Vec.every2((x, y) => x !== y, empty(), empty())).toBe(true);

    expect(Vec.every2((x, y) => x === y, Vec.from([1, 2]), Vec.from([1, 2]))).toBe(true);
    expect(Vec.every2((x, y) => x === y, Vec.from([1, 22]), Vec.from([1, 222]))).toBe(false);
    expect(Vec.every2((x, y) => x !== y, Vec.from([1, 2]), Vec.from([1, 2]))).toBe(false);
    expect(Vec.every2((x, y) => x !== y, Vec.from([1, 22]), Vec.from([1, 222]))).toBe(false);

    expect(Vec.every2((x, y) => x.n === y.n, [{ n: 1 }, { n: 12 }], [{ n: 1 }, { n: 12 }])).toBe(true);
    expect(Vec.every2((x, y) => x.n !== y.n, [{ n: 1 }, { n: 2 }], [{ n: 1 }, { n: 2 }])).toBe(false);

    const context = {
      prop: 'n',
      predicate(x, y) {
        return x[this.prop] === y[this.prop];
      },
    };
    expect(Vec.every2(context.predicate.bind(context), [{ n: 1 }, { n: 12 }], [{ n: 1 }, { n: 12 }])).toBe(true);

    /* eslint-disable */
    expect(Vec.every2((x, y) => x === y, Vec.from([1, 2, , ]), Vec.from([1, 2, ,]))).toBe(true);
  });
});
