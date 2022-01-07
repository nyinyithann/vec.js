import Vec from '../src/vec/vec.main';
import empty from '../src/vec/vec.empty';

describe('mapFold()', () => {
  test('should throw error for invalid args', () => {
    const mapFold = Vec.prototype.mapFold;
    expect(() => mapFold.call(null)).toThrow(TypeError);
    expect(() => mapFold.call(new Vec(1, 2), null, 1)).toThrow(TypeError);
    expect(() => mapFold.call(new Vec(1, 2), function* () {}, 1)).toThrow(TypeError);
  });

  test('should return empty vec and acc if the length of the vec is zero', () => {
    expect(new Vec().mapFold((x, y) => [x + y, x + y], 1)).toStrictEqual(new Vec(empty(), 1));
  });

  test('result should be correct', () => {
    const num1To10 = Vec.init(10, (x) => x + 1);
    const mapping = (s, x) => [s + x, s + x];
    const expected = new Vec(new Vec(1, 3, 6, 10, 15, 21, 28, 36, 45, 55), 55);
    expect(num1To10.mapFold(mapping, 0)).toStrictEqual(expected);

    const mapFold = Vec.prototype.mapFold;
    expect(mapFold.call(num1To10, mapping, 0)).toStrictEqual(expected);
    expect(mapFold.apply(num1To10, [mapping, 0])).toStrictEqual(expected);
    expect(mapFold.bind(num1To10)(mapping, 0)).toStrictEqual(expected);

    const context = {
      one: 1,
    };
    const mapping1 = function (s, x) { return [s + x + this.one, s + x + this.one]; };

    const expected1 = new Vec(new Vec(2, 5, 9, 14, 20, 27, 35, 44, 54, 65), 65);
    expect(mapFold.call(num1To10, mapping1, 0, context)).toStrictEqual(expected1);
  });
});
