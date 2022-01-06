import Vec from '../src/vec/vec.main';

describe('tail()', () => {
  test('should throw error if the existing vec is null, undefined, or empty', () => {
    const tail = Vec.prototype.tail;
    expect(() => tail.call(null)).toThrow(TypeError);
  });

  test('should return the rest of the vec except the first', () => {
    expect(new Vec(1, 2, 3).tail()).toStrictEqual(new Vec(2, 3));
    expect(new Vec(1).tail()).toStrictEqual(new Vec());
  });

  test('invocation via call/apply/bind should work', () => {
    const tail = Vec.prototype.tail;
    const vec = Vec.init(3, (x) => x);
    expect(tail.call(vec)).toStrictEqual(new Vec(1, 2));
    expect(tail.apply(vec)).toStrictEqual(new Vec(1, 2));
    expect(tail.bind(vec)()).toStrictEqual(new Vec(1, 2));
    expect(new Vec().tail()).toStrictEqual(new Vec());
  });
});
