import Vec from '../src/vec/vec.main';

describe('binarySearch()', () => {
  class Person {
    constructor(name, age, title) {
      this.name = name;
      this.age = age;
      this.title = title;
    }

    get father() { return this._father; }

    set father(value) { this._father = value; }
  }

  test('should throw error if the vec is null or item to search is null', () => {
    const binarySearch = Vec.prototype.binarySearch;
    expect(() => binarySearch.call(null)).toThrow(TypeError);
    expect(() => binarySearch.call(new Vec(1, 2), null)).toThrow(TypeError);
  });

  test('should return -1 if the vec is empty', () => {
    const binarySearch = Vec.prototype.binarySearch;
    expect(binarySearch.call(new Vec(), 2)).toBe(-1);
  });

  test('test with elements of primitive type', () => {
    expect(new Vec(1, 2).binarySearch(2)).toBe(1);
    const vec = Vec.init(100, (x) => x + 1);
    expect(vec.binarySearch(1)).toBe((0));
    expect(vec.binarySearch(100)).toBe((99));
    expect(vec.binarySearch(80, (x, y) => x - y)).toBe((79));

    const vec1 = new Vec({ n: 1 }, { n: 2 });
    expect(vec1.binarySearch({ n: 1 }, (x, y) => x.n - y.n)).toBe(0);
    expect(vec1.binarySearch({ n: 1 })).toBe(-1);

    /* eslint-disable */
    expect(Vec.from([,,, 1, 2, 3, 4, 5, 7,,, ]).binarySearch(2)).toBe(4);
  });

  test('test with complex types', () => {
    const godFather = new Person('God', 10000, 'The Father');
    const holyGhostFather = new Person('God', 10000, 'The Father');

    const jesus = new Person('Jesus', 10000, 'The Son');
    jesus.father = godFather;
    const peter = new Person('Peter', 10000, 'The Disciple');
    peter.father = godFather;
    const andrew = new Person('Andrew', 10000, 'The Disciple');
    andrew.father = godFather;

    const moses = new Person('Moses', 10000, 'The Son');
    moses.father = holyGhostFather;
    const jude = new Person('Jude', 10000, 'The Traitor');
    jude.father = holyGhostFather;

    const vec = new Vec(andrew, godFather, jesus, jude, moses, peter);
    // eslint-disable-next-line no-nested-ternary
    const comparer = (x, y) => (x.name < y.name ? -1 : x.name > y.name ? 1 : 0);
    expect(vec.binarySearch(godFather, comparer)).toBe(1);
    expect(vec.binarySearch(jude, comparer)).toBe(3);
    expect(vec.binarySearch(peter, comparer)).toBe(5);
  });
});
