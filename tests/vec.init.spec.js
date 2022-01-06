import Vec from '../src/vec/vec.main';

describe('Vec.init()', () => {
  test('should generate list by invoking initializer up to the given count',
    () => {
      const vec = Vec.init(3, (x) => x);
      expect(vec.length).toStrictEqual(3);
    });

  test('should throw TypeError if the initializer is a generator function or not a function',
    () => {
      expect(() => Vec.init(5, {})).toThrow(TypeError);
      expect(() => Vec.init(5, function* () {
      })).toThrow(TypeError);
    });

  test('should throw TypeError if count is a negative number', () => {
    expect(() => Vec.init(-1, (x) => x)).toThrow(TypeError);
    expect(() => Vec.init([1], (x) => x)).toThrow(TypeError);
    expect(() => Vec.init({}, (x) => x)).toThrow(TypeError);
  });

  test('should return an empty List if count is 0', () => {
    const vec = Vec.init(0, (x) => x);
    expect(vec.isEmpty()).toBe(true);
  });
});
