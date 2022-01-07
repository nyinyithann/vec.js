import Vec from '../src/vec/vec.main';

describe('set()', () => {
  test('should throw error if the existing vec is null or undefined', () => {
    const get = Vec.prototype.set;
    expect(() => get.call(null)).toThrow(TypeError);
  });

  test('should return the value once the setting is successful', () => {
    const vec = new Vec(1, 2, 3, 4, 5);
    const actual = vec.set(10, 100);
    expect(actual).toBe(100);
    expect(vec.length).toBe(11);
  });

  test('invocation via call/apply/bind should work', () => {
    const set = Vec.prototype.set;
    const vec = Vec.init(3, (x) => x + x);
    expect(set.call(vec, 5, 15)).toBe(15);
    expect(set.apply(vec, [5, 15])).toBe(15);
    expect(set.bind(vec)(5, 15)).toBe(15);
  });
});
