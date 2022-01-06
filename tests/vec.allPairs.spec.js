/* eslint-disable */

import Vec from '../src/vec/vec.main';

describe('allPairs()', () => {
  test('should throw exception if arguments are invalid', () => {
    expect(() => Vec.allPairs(null, new Vec())).toThrow(TypeError);
    expect(() => Vec.allPairs([], null)).toThrow(TypeError);
  })

  test('should return correct result', () => {
    const vec = new Vec(1, 2, 3);
    const other = new Vec(4, 5);
    const actual = Vec.allPairs(vec, other);
    expect(actual)
      .toStrictEqual(new Vec(
        new Vec(1, 4),
        new Vec(1, 5),
        new Vec(2, 4),
        new Vec(2, 5),
        new Vec(3, 4),
        new Vec(3, 5)
      ));

    const vec2 = new Vec();
    const other2 = new Vec(4, 5);
    const actual2 = Vec.allPairs(vec2, other2);
    expect(actual2).toStrictEqual(new Vec());

    const vec3 = new Vec();
    const other3 = new Vec();
    const actual3 = Vec.allPairs(vec3, other3);
    expect(actual3)
      .toStrictEqual(new Vec());

    const vec4 = new Vec();
    const other4 = new Vec(1, 2);
    const actual4 = Vec.allPairs(vec4, other4);
    expect(actual4)
      .toStrictEqual(new Vec());

    const vec5 = Vec.of(1);
    const other5 = Vec.of(2);
    const actual5 = Vec.allPairs(vec5, other5);
    expect(actual5)
      .toStrictEqual(new Vec(new Vec(1, 2)));

    expect(Vec.allPairs(Vec.from([, 1, ,]),[, 0]))
      .toStrictEqual(new Vec(
        Vec.from([, ,]),
        Vec.from([, 0]),
        Vec.from([1, ,]),
        Vec.from([1, 0]),
        Vec.from([, ,]),
        Vec.from([, 0])
      ));
  });
});
