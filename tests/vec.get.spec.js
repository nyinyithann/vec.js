import Vec from '../src/vec/vec.main';

describe('get()', () => {
  test('should throw error if the existing vec is null or undefined', () => {
    const get = Vec.prototype.get;
    expect(() => get.call(null)).toThrow(TypeError);
  });

  test('should return the element from the index passed', () => {
    expect(new Vec(1, 2, 3).get(1)).toBe(2);
  });

  test('invocation via call/apply/bind should work', () => {
    const get = Vec.prototype.get;
    const vec = Vec.init(3, (x) => x + x);
    expect(get.call(vec, 2)).toBe(4);
    expect(get.apply(vec, [2])).toBe(4);
    expect(get.bind(vec)(2)).toBe(4);
  });

  test('should return undefined if index is out of range', () => {
    expect(new Vec(1, 2, 3).get(10)).toBe(undefined);
    expect(new Vec(1, 2, 3).get(-10)).toBe(undefined);
  });
});
