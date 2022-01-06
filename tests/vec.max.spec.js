import Vec from '../src/vec/vec.main';

describe('max()', () => {
  test('should throw error if the existing vec is null or undefined', () => {
    const max = Vec.prototype.min;
    expect(() => max.call(null)).toThrow(TypeError);
    expect(() => max.call(undefined)).toThrow(TypeError);
  });

  test('should return undefined if the vec is empty', () => {
    expect(new Vec().max()).toBe(undefined);
  });

  test('should return min of the vec', () => {
    const vec = new Vec({ n: 1000 }, 1, 2, 3, { four: 4 }, [[5], [5]], [6], (() => {}), function* () {}, 0, 100, -1);
    expect(vec.max()).toBe(100);
  });

  test('invocation via call/apply/bind should be fine', () => {
    const vec = new Vec((() => {}), 1, 2, 3, { four: 4 }, [[5], [5]], [6], (() => {}), function* () {}, 0, 100, -1);
    const max = Vec.prototype.max;
    expect(max.call(vec)).toBe(100);
    expect(max.apply(vec)).toBe(100);
    expect(max.bind(vec)()).toBe(100);
  });
});
