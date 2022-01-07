import Vec from '../src/vec/vec.main';

describe('minBy()', () => {
  test('should throw error if the existing vec is null or undefined', () => {
    const minBy = Vec.prototype.minBy;
    expect(() => minBy.call(null)).toThrow(TypeError);
    expect(() => minBy.call(undefined)).toThrow(TypeError);
  });

  test('should throw error if projection is a generator function or not a function', () => {
    const vec = new Vec(1, 2, 3);
    expect(() => vec.minBy(null)).toThrow(TypeError);
    expect(() => vec.minBy(undefined)).toThrow(TypeError);
  });

  test('should return undefined if the vec is empty', () => {
    expect(new Vec().minBy((x) => x)).toBe(undefined);
  });

  test('should return min of the vec that satisfied with projection', () => {
    let vec = new Vec({ n: 1000 }, 1, 2, 3, { four: 4 }, [[5], [5]], [6], (() => {}), function* () {}, 0, 100, -1);
    expect(vec.minBy((x) => x)).toBe(-1);

    vec = new Vec({ n: 10 }, { n: 109 }, { n: 1088 }, { n: 180 }, { n: -179 }, { n: 1 });
    expect(vec.minBy(({ n }) => n)).toBe(-179);
  });

  test('predicate might be associate with a context', () => {
    const context = {
      propName: 'n',
    };
    const predicate = function (x) { return x[this.propName]; };
    const vec = new Vec({ n: 10 }, { n: 109 }, { n: 1088 }, { n: 180 }, { n: -179 }, { n: 1 });
    expect(vec.minBy(predicate, context)).toBe(-179);
  });

  test('invocation via call/apply/bind should be fine', () => {
    class MyNum extends Number {}
    const myNum = new MyNum(-100000);

    const vec = new Vec((() => 10), 1, 2, 3, { four: 4 }, [[5], [5]], [6], (() => {}), myNum, function* () {}, 0, 100, -1);
    const minBy = Vec.prototype.minBy;
    expect(minBy.call(vec, (x) => x)).toBe(myNum);
    expect(minBy.apply(vec, [(x) => x])).toBe(myNum);
    expect(minBy.bind(vec)((x) => x)).toBe(myNum);
  });
});
