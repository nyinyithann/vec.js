import Vec from '../src/vec/vec.main';

describe('sumBy()', () => {
  test('should throw error if the existing vec is null or undefined', () => {
    const sumBy = Vec.prototype.sumBy;
    expect(() => sumBy.call(null)).toThrow(TypeError);
    expect(() => sumBy.call(undefined)).toThrow(TypeError);
  });

  test('should throw error if projection is a generator function or not a function', () => {
    const vec = new Vec(1, 2, 3);
    expect(() => vec.sumBy(null)).toThrow(TypeError);
    expect(() => vec.sumBy(undefined)).toThrow(TypeError);
  });

  test('should return undefined if the vec is empty', () => {
    expect(new Vec().sumBy((x) => x)).toBe(undefined);
  });

  test('should return sum of the vec that satisfied with projection', () => {
    let vec = new Vec({ n: 1000 }, 1, 2, 3, { four: 4 }, [[5], [5]], [6], (() => {}), function* () {}, 0, 100, -1);
    expect(vec.sumBy((x) => x)).toBe(1 + 2 + 3 + 100 + -1);

    vec = new Vec({ n: 10 }, { n: 109 }, { n: 1088 }, { n: 180 }, { n: -179 }, { n: 1 });
    expect(vec.sumBy(({ n }) => n)).toBe(10 + 109 + 1088 + 180 + -179 + 1);
  });

  test('predicate might be associate with a context', () => {
    const context = {
      propName: 'n',
    };
    const predicate = function (x) { return x[this.propName]; };
    const vec = new Vec({ n: 10 }, { n: 109 }, { n: 1088 }, { n: 180 }, { n: -179 }, { n: 1 });
    expect(vec.sumBy(predicate, context)).toBe(10 + 109 + 1088 + 180 + -179 + 1);
  });

  test('invocation via call/apply/bind should be fine', () => {
    class MyNum extends Number {}
    const myNum = new MyNum(100000);

    const vec = new Vec((() => 10), 1, 2, 3, { four: 4 }, [[5], [5]], myNum, [6], (() => {}), function* () {}, 0, 100, -1);
    const sumBy = Vec.prototype.sumBy;
    const expected = 1 + 2 + 3 + myNum + 0 + 100 + -1;
    expect(sumBy.call(vec, (x) => x)).toBe(expected);
    expect(sumBy.apply(vec, [(x) => x])).toBe(expected);
    expect(sumBy.bind(vec)((x) => x)).toBe(expected);
  });
});
