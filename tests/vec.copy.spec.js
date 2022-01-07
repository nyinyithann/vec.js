import Vec from '../src/vec/vec.main';

describe('vec.copy()', () => {
  test('should shallow copy existing elements', () => {
    const vec1 = new Vec(10);
    const copy1 = vec1.copy();
    expect(copy1.length).toBe(10);
    expect(vec1).toStrictEqual(copy1);
    expect(copy1.includes(undefined) && copy1.indexOf(undefined) === -1).toBe(true);

    const vec2 = new Vec(1, 2, 3, 4, 5);
    const copy2 = vec2.copy();
    expect(copy2.length).toBe(5);
    expect([...copy2]).toStrictEqual([1, 2, 3, 4, 5]);

    const copy = Vec.prototype.copy;
    expect(copy.call(vec2)).toStrictEqual(vec2);
    expect(copy.apply(vec2)).toStrictEqual(vec2);
    expect(copy.bind(vec2)()).toStrictEqual(vec2);
    expect(() => copy.call(null)).toThrow(TypeError);
  });
});
