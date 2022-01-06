import Vec from '../src/vec/vec.main';

describe('head()', () => {
  test('should throw error if the existing vec is null, undefined, or empty', () => {
    const head = Vec.prototype.head;
    expect(() => head.call(null)).toThrow(TypeError);
  });

  test('should return the first element of a vec', () => {
    expect(new Vec(1, 2, 3).head()).toBe(1);
  });

  test('invocation via call/apply/bind should work', () => {
    const head = Vec.prototype.head;
    const vec = Vec.init(3, (x) => x);
    expect(head.call(vec)).toBe(0);
    expect(head.apply(vec)).toBe(0);
    expect(head.bind(vec)()).toBe(0);
    expect(new Vec().head()).toBe(undefined);
  });
});
