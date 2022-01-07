import Vec from '../src/vec/vec.main';

describe('last()', () => {
  test('should throw error if the existing vec is null or undefined', () => {
    const last = Vec.prototype.last;
    expect(() => last.call(null)).toThrow(TypeError);
  });

  test('should return the last element', () => {
    expect(new Vec(1, 2, 3).last()).toBe(3);
  });

  test('invocation via call/apply/bind should work', () => {
    const last = Vec.prototype.last;
    const vec = Vec.init(3, (x) => x + x);
    expect(last.call(vec)).toBe(4);
    expect(last.apply(vec)).toBe(4);
    expect(last.bind(vec)()).toBe(4);
  });

  test('should return undefined if the existing vec is empty', () => {
    expect(new Vec().last()).toBe(undefined);
  });
});
