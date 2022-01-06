import Vec from '../src/vec/vec.core';

describe('vec.core', () => {
  test('Vec extends Array and all array methods should work fine.', () => {
    const vec = new Vec(1, 2, 3, 4, 5);
    const reducer = (x, y) => x + y;
    const sum = vec.reduce(reducer);
    expect(sum).toBe([1, 2, 3, 4, 5].reduce(reducer));
    expect(vec.toString()).toStrictEqual([1, 2, 3, 4, 5].toString());
    expect(vec.toLocaleString()).toStrictEqual(
      [1, 2, 3, 4, 5].toLocaleString()
    );
  });

  test('toString tag should be [object Vec]', () => {
    expect(Object.prototype.toString.call(new Vec())).toStrictEqual(
      '[object Array]'
    );
  });

  test('instanceof Vec is Vec', () => {
    expect(new Vec() instanceof Vec).toBe(true);
    expect(new Vec() instanceof Array).toBe(true);
  });
});
