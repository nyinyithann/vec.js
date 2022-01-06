import Vec from '../src/vec/vec.main';

describe('sum()', () => {
  test('should throw error if the existing vec is null or undefined', () => {
    const sum = Vec.prototype.sum;
    expect(() => sum.call(null)).toThrow(TypeError);
    expect(() => sum.call(undefined)).toThrow(TypeError);
  });

  test('should return undefined if the vec is empty', () => {
    expect(new Vec().sum()).toBe(undefined);
  });

  test('should return sum of the vec', () => {
    const vec = new Vec({ n: 1000 }, 1, 2, 3, { four: 4 }, [[5], [5]], [6], (() => {}), function* () {}, 0, 100, -1);
    expect(vec.sum()).toBe([1, 2, 3, 0, 100, -1].reduce((x, y) => x + y));
  });

  test('invocation via call/apply/bind should be fine', () => {
    const vec = new Vec((() => {}), 1, 2, 3, { four: 4 }, [[5], [5]], [6], (() => {}), function* () {}, 0, 100, -1);
    const sum = Vec.prototype.sum;
    expect(sum.call(vec)).toBe([1, 2, 3, 0, 100, -1].reduce((x, y) => x + y));
    expect(sum.apply(vec)).toBe([1, 2, 3, 0, 100, -1].reduce((x, y) => x + y));
    expect(sum.bind(vec)()).toBe([1, 2, 3, 0, 100, -1].reduce((x, y) => x + y));
  });
});
