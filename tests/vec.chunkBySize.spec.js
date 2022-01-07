import Vec from '../src/vec/vec.main';
import empty from '../src/vec/vec.empty';
/* eslint-disable */

describe('chunkBySize()', () => {
  test('should throw exception if arguments are invalid', () => {
    expect(() => Vec.prototype.chunkBySize.call(null)).toThrow(TypeError);
    expect(() => new Vec(1, 2, 3).chunkBySize(-1)).toThrow(TypeError);
  });

  test('should return correct result', () => {
    const vec = Vec.init(10, (x) => x + 1);

    expect(vec.chunkBySize(vec.length + 1)).toStrictEqual(new Vec(vec));
    expect(new Vec().chunkBySize(1)).toStrictEqual(empty());

    const expected1 = vec.chunkBySize(3);
    const actual1 = new Vec(
      new Vec(1, 2, 3),
      new Vec(4, 5, 6),
      new Vec(7, 8, 9),
      Vec.of(10)
    );
    expect(actual1).toStrictEqual(expected1);

    const expected2 = vec.chunkBySize(2.4);
    const actual2 = new Vec(
      new Vec(1, 2),
      new Vec(3, 4),
      new Vec(5, 6),
      new Vec(7, 8),
      new Vec(9, 10)
    );
    expect(actual2).toStrictEqual(expected2);

    const expected3 = vec.chunkBySize(9);
    const actual3 = new Vec(
      new Vec(1, 2, 3, 4, 5, 6, 7, 8, 9),
      Vec.of(10)
    );
    expect(actual3).toStrictEqual(expected3);

    const expected4 = vec.chunkBySize(10);
    const actual4 = new Vec(
      new Vec(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
    );
    expect(actual4).toStrictEqual(expected4);
  });

  expect(Vec.from([,, 1, 2, 3]).chunkBySize(4)).toStrictEqual(new Vec(
    Vec.from([,, 1, 2]),
    Vec.of(3)
  ));
});
