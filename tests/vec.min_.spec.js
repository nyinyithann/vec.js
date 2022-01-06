import Vec from '../src/vec/vec.main';

describe('min()', () => {
  test('should throw error if the existing vec is null or undefined', () => {
    const min = Vec.prototype.min;
    expect(() => min.call(null)).toThrow(TypeError);
    expect(() => min.call(undefined)).toThrow(TypeError);
  });

  test('should return undefined if the vec is empty', () => {
    expect(new Vec().min()).toBe(undefined);
  });

  test('should return min of the vec', () => {
    const vec = new Vec({ n: 1000 }, 1, 2, 3, { four: 4 }, [[5], [5]], [6], (() => {}), function* () {}, 0, 100, -1);
    expect(vec.min()).toBe(-1);
  });

  test('invocation via call/apply/bind should be fine', () => {
    const vec = new Vec((() => 10), 1, 2, 3, { four: 4 }, [[5], [5]], [6], (() => {}), function* () {}, 0, 100, -1);
    const min = Vec.prototype.min;
    expect(min.call(vec)).toBe(-1);
    expect(min.apply(vec)).toBe(-1);
    expect(min.bind(vec)()).toBe(-1);
  });
});
