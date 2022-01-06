import Vec from '../src/vec/vec.main';

describe('unzip()', () => {
  test('should throw error if the existing vec is null or undefined', () => {
    const unzip = Vec.prototype.unzip;
    expect(() => unzip.call(null)).toThrow(TypeError);
    expect(() => unzip.call(undefined)).toThrow(TypeError);
    expect(() => unzip.call(new Vec(1, 2), new Vec())).toThrow(TypeError);
  });

  test('should throw error if the existing vec is corrupted', () => {
    const corrupted = new Vec(new Vec(1, 2), new Vec(2, 3), new Vec(2));
    expect(() => corrupted.unzip()).toThrow(TypeError);
  });

  test('should split into two vec', () => {
    const vec1 = Vec.init(5, (x) => x + 1);
    const vec2 = Vec.init(5, (x) => x + x);
    const zipped = vec1.zip(vec2);
    expect(zipped.unzip()).toStrictEqual(new Vec(vec1, vec2));
  });

  test('invocation via call/apply/bind should be fine', () => {
    const vec1 = Vec.init(5, (x) => x + 1);
    const vec2 = Vec.init(5, (x) => x + x);
    const zipped = vec1.zip(vec2);
    const unzip = Vec.prototype.unzip;

    expect(unzip.call(zipped)).toStrictEqual(new Vec(vec1, vec2));
    expect(unzip.apply(zipped)).toStrictEqual(new Vec(vec1, vec2));
    expect(unzip.bind(zipped)()).toStrictEqual(new Vec(vec1, vec2));
  });
});
