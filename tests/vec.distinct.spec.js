import Vec from '../src/vec/vec.main';

describe('distinct()', () => {
  test('should throw error if the existing vec is null or undefined', () => {
    const distinct = Vec.prototype.distinct;
    expect(() => distinct.call(null)).toThrow(TypeError);
    expect(() => distinct.call(undefined)).toThrow(TypeError);
  });

  test('should return a vec containing unique elements', () => {
    const vec = new Vec([1, 2, 3], [1, 2, 3]);
    expect(vec.distinct()).toStrictEqual(new Vec([1, 2, 3]));
   

    vec.length = 0;
    vec.push({ n: 1 }, { n: 3 }, { n: 3 }, { n: 1 }, { n: 1 });
    expect(vec.distinct()).toStrictEqual(new Vec({ n: 1 }, { n: 3 }));
    

    vec.length = 0;
    vec.push({ n: 1, m: 10 }, { n: 3 }, { n: 3 }, { n: 1, m: 10 }, { n: 1 });
    expect(vec.distinct()).toStrictEqual(new Vec({ n: 1, m: 10 }, { n: 3 }, { n: 1 }));
    

    vec.length = 0;
    vec.push(1, 2, 3, 1, 2, 3, () => {}, () => {});
    expect(vec.distinct().length).toBe(5);

    expect(Vec.from([,,,,,, 1, 1, 1, 1]).distinct()).toStrictEqual(Vec.from(
      [, 1]
    ));
  });

  test('invocation via call/apply/bind should be fine', () => {
    const distinct = Vec.prototype.distinct;
    const vec = new Vec([1, 2, 3], [1, 2, 3]);
    expect(distinct.call(vec, true)).toStrictEqual(new Vec([1, 2, 3]));
    expect(distinct.apply(vec, [true])).toStrictEqual(new Vec([1, 2, 3]));
    expect(distinct.bind(vec)(true)).toStrictEqual(new Vec([1, 2, 3]));
  });
});
