import Vec from '../src/vec/vec.main';

describe('average()', () => {
  test('should throw error if the existing vec is null or undefined', () => {
    const average = Vec.prototype.average;
    expect(() => average.call(null)).toThrow(TypeError);
    expect(() => average.call(undefined)).toThrow(TypeError);
  });

  test('should return undefined if the vec is empty', () => {
    expect(new Vec().average()).toBe(undefined);
  });

  test('should return average of the vec', () => {
    const vec = new Vec({ n: 1000 }, 1, 2, 3, { four: 4 }, [[5], [5]], [6], (() => {}), function* () {}, 0, 100, -1);
    expect(vec.average()).toBe([1, 2, 3, 0, 100, -1].reduce((x, y) => x + y) / vec.length);
    expect(Vec.from([1, 2,, 3, 4]).average()).toStrictEqual(10 / 5);
  });

  test('invocation via call/apply/bind should be fine', () => {
    const vec = new Vec((() => {}), 1, 2, 3, { four: 4 }, [[5], [5]], [6], (() => {}), function* () {}, 0, 100, -1);
    const average = Vec.prototype.average;
    const expected = [1, 2, 3, 0, 100, -1].reduce((x, y) => x + y) / vec.length;
    expect(average.call(vec)).toBe(expected);
    expect(average.apply(vec)).toBe(expected);
    expect(average.bind(vec)()).toBe(expected);
  });
});
