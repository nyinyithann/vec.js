import Vec from '../src/vec/vec.main';

describe('maxBy()', () => {
  test('should throw error if the existing vec is null or undefined', () => {
    const maxBy = Vec.prototype.maxBy;
    expect(() => maxBy.call(null)).toThrow(TypeError);
    expect(() => maxBy.call(undefined)).toThrow(TypeError);
  });

  test('should throw error if projection is a generator function or not a function', () => {
    const vec = new Vec(1, 2, 3);
    expect(() => vec.maxBy(null)).toThrow(TypeError);
    expect(() => vec.maxBy(undefined)).toThrow(TypeError);
  });

  test('should return undefined if the vec is empty', () => {
    expect(new Vec().maxBy((x) => x)).toBe(undefined);
  });

  test('should return max of the vec that satisfied with projection', () => {
    let vec = new Vec({ n: 1000 }, 1, 2, 3, { four: 4 }, [[5], [5]], [6], (() => {}), function* () {}, 0, 100, -1);
    expect(vec.maxBy((x) => x)).toBe(100);

    vec = new Vec({ n: 10 }, { n: 109 }, { n: 1088 }, { n: 180 }, { n: -179 }, { n: 1 });
    expect(vec.maxBy(({ n }) => n)).toBe(1088);
  });

  test('predicate might be associate with a context', () => {
    const context = {
      propName: 'n',
    };
    const predicate = function (x) { return x[this.propName]; };
    const vec = new Vec({ n: 10 }, { n: 109 }, { n: 1088 }, { n: 180 }, { n: -179 }, { n: 1 });
    expect(vec.maxBy(predicate, context)).toBe(1088);
  });

  test('invocation via call/apply/bind should be fine', () => {
    class MyNum extends Number {}
    const myNum = new MyNum(100000);

    const vec = new Vec((() => 10), 1, 2, 3, { four: 4 }, [[5], [5]], myNum, [6], (() => {}), function* () {}, 0, 100, -1);
    const maxBy = Vec.prototype.maxBy;
    expect(maxBy.call(vec, (x) => x)).toBe(myNum);
    expect(maxBy.apply(vec, [(x) => x])).toBe(myNum);
    expect(maxBy.bind(vec)((x) => x)).toBe(myNum);
  });
});
