import Vec from "../src/vec/vec.main";

describe("countBy()", () => {
  class Person {
    constructor(name, age, title) {
      this.name = name;
      this.age = age;
      this.title = title;
    }

    get father() {
      return this._father;
    }

    set father(value) {
      this._father = value;
    }
  }

  test("should throw null if the existing vec is null or undefined when invoke via call/apply/bind", () => {
    const countBy = Vec.prototype.countBy;
    expect(() => countBy.call(null)).toThrow(TypeError);
    expect(() => countBy.apply(null)).toThrow(TypeError);
    expect(() => countBy.bind(null)()).toThrow(TypeError);
  });

  test("invocation via call/apply/bind should work", () => {
    const vec = new Vec(1, 1, 2, 2, 2, 4);
    const countBy = Vec.prototype.countBy;
    expect(countBy.call(vec, (x) => x)).toStrictEqual(
      new Vec(new Vec(1, 2), new Vec(2, 3), new Vec(4, 1))
    );
    expect(countBy.apply(vec, [(x) => x])).toStrictEqual(
      new Vec(new Vec(1, 2), new Vec(2, 3), new Vec(4, 1))
    );
    expect(countBy.bind(vec)((x) => x)).toStrictEqual(
      new Vec(new Vec(1, 2), new Vec(2, 3), new Vec(4, 1))
    );
  });

  test("should throw TypeError if projection is a generator function or not a function", () => {
    expect(() => new Vec(1, 2).countBy(null)).toThrow(TypeError);
    expect(() => new Vec(1, 2).countBy(undefined)).toThrow(TypeError);
    expect(() => new Vec(1, 2).countBy(void 0)).toThrow(TypeError);
  });

  test("should work with different context of projection", () => {
    const obj = {
      prop: "name",
    };
    const projection = function (x) {
      return x[this.prop];
    };
    const mrA = new Person("A", 20);
    const mrB = new Person("B", 15);
    const vec = new Vec(mrA, mrA, mrB);
    expect(vec.countBy(projection, obj)).toStrictEqual(
      new Vec(new Vec("A", 2), new Vec("B", 1))
    );
  });

  test("should return result obj ", () => {
    const p1 = { name: "foo" };
    const p2 = { name: "foo" };
    const vec = new Vec(
      1,
      1,
      2,
      2,
      2,
      4,
      5,
      6,
      6,
      6,
      6,
      10,
      true,
      true,
      false,
      p1,
      p2
    );
    expect(vec.countBy((x) => x)).toStrictEqual(
      new Vec(
        new Vec(1, 2),
        new Vec(2, 3),
        new Vec(4, 1),
        new Vec(5, 1),
        new Vec(6, 4),
        new Vec(10, 1),
        new Vec(true, 2),
        new Vec(false, 1),
        new Vec(p1, 2)
      )
    );

    const mrA = new Person("A", 20);
    const mrB = new Person("B", 15);
    const mrC = new Person("C", 15);
    const vec1 = new Vec(
      mrA,
      mrA,
      mrA,
      mrB,
      mrB,
      mrC,
      mrC,
      mrC,
      null,
      null,
      undefined,
      undefined
    );
    expect(vec1.countBy((x) => (x ? x.name : undefined))).toStrictEqual(
      new Vec(
        new Vec("A", 3),
        new Vec("B", 2),
        new Vec("C", 3),
        new Vec(undefined, 4)
      )
    );

    expect(Vec.from([, , 1, 1]).countBy((x) => x)).toStrictEqual(
      new Vec(Vec.from([, 2]), new Vec(1, 2))
    );
  });

  test("should work with nested type", () => {
    const godFather = new Person("God", 10000, "The Father");
    const holyGhostFather = new Person("God", 10000, "The Father");

    const jesus = new Person("Jesus", 10000, "The Son");
    jesus.father = godFather;
    const peter = new Person("Peter", 10000, "The Disciple");
    peter.father = godFather;
    const andrew = new Person("Andrew", 10000, "The Disciple");
    andrew.father = godFather;

    const moses = new Person("Moses", 10000, "The Son");
    moses.father = holyGhostFather;
    const jude = new Person("Jude", 10000, "The Traitor");
    jude.father = holyGhostFather;

    const vec = new Vec(jesus, peter, andrew, moses, jude);
    let received = vec.countBy(({ father }) => father);
    let actual = new Vec(new Vec(new Person("God", 10000, "The Father"), 5));
    expect(received).toStrictEqual(actual);
  });
});
