import Vec from '../src/vec/vec.main';

describe('scanRight()', () => {
  test('should throw error if the existing vec is null or undefined', () => {
    const scanRight = Vec.prototype.scanRight;
    expect(() => scanRight.call(null)).toThrow(TypeError);
    expect(() => scanRight.call(undefined)).toThrow(TypeError);
  });

  test('should throw error if folder is a generator function or not a function', () => {
    const vec = new Vec(1, 2, 3);
    expect(() => vec.scanRight(null)).toThrow(TypeError);
    expect(() => vec.scanRight(undefined)).toThrow(TypeError);
  });

  test('should throw error if initialValue is null or undefined', () => {
    const vec = new Vec(1, 2, 3);
    expect(() => vec.scanRight(vec)).toThrow(TypeError);
    expect(() => vec.scanRight(vec)).toThrow(TypeError);
  });

  test('should return a vec with intermediary and final results', () => {
    const vec = Vec.init(5, (x) => x + 1);
    const expected = vec.scanRight((x, y) => x + y, 0);
    expect(expected).toStrictEqual(new Vec(15, 14, 12, 9, 5, 0));
    expect(Vec.create(1, 1).scanRight((x, y) => x + y, 0)).toStrictEqual(new Vec(1, 0));
    expect(Vec.empty().scanRight((x, y) => x + y, 0)).toStrictEqual(Vec.create(1, 0));
  });

  test('folder might be associated with a context', () => {
    const context = {
      one: 1,
    };
    const vec = Vec.init(5, (x) => x + 1);
    const folder = function (x, y) { return x + y + this.one; };
    const actual = new Vec(20, 18, 15, 11, 6, 0);
    const expected = vec.scanRight(folder, 0, context);
    expect(actual).toStrictEqual(expected);
  });

  test('invocation via call/apply/bind should be fine', () => {
    const vec = Vec.init(5, (x) => x + 1);
    const folder = (x, y) => x + y;
    const actual = new Vec(15, 14, 12, 9, 5, 0);
    const scanRight = Vec.prototype.scanRight;
    expect(scanRight.call(vec, folder, 0)).toStrictEqual(actual);
    expect(scanRight.apply(vec, [folder, 0])).toStrictEqual(actual);
    expect(scanRight.bind(vec)(folder, 0)).toStrictEqual(actual);
  });
});
