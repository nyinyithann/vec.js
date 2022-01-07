import Vec from "../src/vec/vec.main";

describe("scan()", () => {
  test("should throw error if the existing vec is null or undefined", () => {
    const scan = Vec.prototype.scan;
    expect(() => scan.call(null)).toThrow(TypeError);
    expect(() => scan.call(undefined)).toThrow(TypeError);
  });

  test("should throw error if folder is a generator function or not a function", () => {
    const vec = new Vec(1, 2, 3);
    expect(() => vec.scan(null)).toThrow(TypeError);
    expect(() => vec.scan(undefined)).toThrow(TypeError);
  });

  test("should throw error if initialValue is null or undefined", () => {
    const vec = new Vec(1, 2, 3);
    expect(() => vec.scan(vec)).toThrow(TypeError);
    expect(() => vec.scan(vec)).toThrow(TypeError);
  });

  test("should return a vec with intermediary and final results", () => {
    const vec = Vec.init(5, (x) => x + 1);
    const expected = vec.scan((x, y) => x + y, 0);
    expect(expected).toStrictEqual(new Vec(0, 1, 3, 6, 10, 15));
    expect(Vec.create(1, 1).scan((x, y) => x + y, 0)).toStrictEqual(
      new Vec(0, 1)
    );
    expect(Vec.empty().scan((x, y) => x + y, 0)).toStrictEqual(
      Vec.create(1, 0)
    );
  });

  test("folder might be associated with a context", () => {
    const context = {
      one: 1,
    };
    const vec = Vec.init(5, (x) => x + 1);
    const folder = function (x, y) {
      return x + y + this.one;
    };
    const actual = new Vec(0, 2, 5, 9, 14, 20);
    const expected = vec.scan(folder, 0, context);
    expect(actual).toStrictEqual(expected);
  });

  test("invocation via call/apply/bind should be fine", () => {
    const vec = Vec.init(5, (x) => x + 1);
    const folder = (x, y) => x + y;
    const actual = new Vec(0, 1, 3, 6, 10, 15);
    const scan = Vec.prototype.scan;
    expect(scan.call(vec, folder, 0)).toStrictEqual(actual);
    expect(scan.apply(vec, [folder, 0])).toStrictEqual(actual);
    expect(scan.bind(vec)(folder, 0)).toStrictEqual(actual);
  });
});
