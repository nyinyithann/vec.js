/* eslint-disable */


import isEqual from '../src/lodash_deepEq/isEqual';


describe('isEqual', function() {
  var symbol1 = Symbol ? Symbol('a') : true,
      symbol2 = Symbol ? Symbol('b') : false;

  it('should compare primitives', function() {
    var pairs = [
      [1, 1, true], [1, Object(1), true], [1, '1', false], [1, 2, false],
      [-0, -0, true], [0, 0, true], [0, Object(0), true], [Object(0), Object(0), true], [-0, 0, true], [0, '0', false], [0, null, false],
      [NaN, NaN, true], [NaN, Object(NaN), true], [Object(NaN), Object(NaN), true], [NaN, 'a', false], [NaN, Infinity, false],
      ['a', 'a', true], ['a', Object('a'), true], [Object('a'), Object('a'), true], ['a', 'b', false], ['a', ['a'], false],
      [true, true, true], [true, Object(true), true], [Object(true), Object(true), true], [true, 1, false], [true, 'a', false],
      [false, false, true], [false, Object(false), true], [Object(false), Object(false), true], [false, 0, false], [false, '', false],
      [symbol1, symbol1, true], [symbol1, Object(symbol1), true], [Object(symbol1), Object(symbol1), true], [symbol1, symbol2, false],
      [null, null, true], [null, undefined, false], [null, {}, false], [null, '', false],
      [undefined, undefined, true], [undefined, null, false], [undefined, '', false]
    ];

    var expected = pairs.map(function(pair) {
      return pair[2];
    });

    var actual = pairs.map( function(pair) {
      return isEqual(pair[0], pair[1]);
    });

    expect(isEqual(expected,actual)).toBe(true);
  });

  it('should compare arrays', function() {

    expect(isEqual(1,Object(1))).toBe(true);
    var array1 = [true, null, 1, 'a', undefined],
        array2 = [true, null, 1, 'a', undefined];

   expect(isEqual(array1,array2)).toStrictEqual(true);

    array1 = [[1, 2, 3], new Date(2012, 4, 23), /x/, { 'e': 1 }];
    array2 = [[1, 2, 3], new Date(2012, 4, 23), /x/, { 'e': 1 }];

    expect(isEqual(array1,array2)).toStrictEqual(true);

    array1 = [1];
    array1[2] = 3;

    array2 = [1];
    array2[1] = undefined;
    array2[2] = 3;

    expect(isEqual(array1,array2)).toStrictEqual(true);

    array1 = [Object(1), false, Object('a'), /x/, new Date(2012, 4, 23), ['a', 'b', [Object('c')]], { 'a': 1 }];
    array2 = [1, Object(false), 'a', /x/, new Date(2012, 4, 23), ['a', Object('b'), ['c']], { 'a': 1 }];

    expect(isEqual(1,Object(1))).toBe(true);

    array1 = [1, 2, 3];
    array2 = [3, 2, 1];

    expect(isEqual(array1,array2)).toStrictEqual(false);

    array1 = [1, 2];
    array2 = [1, 2, 3];

    expect(isEqual(array1,array2)).toStrictEqual(false);
  });

  it('should treat arrays with identical values but different non-index properties as equal', function() {
    var array1 = [1, 2, 3],
        array2 = [1, 2, 3];

    array1.every = array1.filter = array1.forEach =
        array1.indexOf = array1.lastIndexOf = array1.map =
            array1.some = array1.reduce = array1.reduceRight = null;

    array2.concat = array2.join = array2.pop =
        array2.reverse = array2.shift = array2.slice =
            array2.sort = array2.splice = array2.unshift = null;

    expect(isEqual(array1, array2)).toBe( true);

    array1 = [1, 2, 3];
    array1.a = 1;

    array2 = [1, 2, 3];
    array2.b = 1;

    expect(isEqual(array1, array2)).toBe( true);

    array1 = /c/.exec('abcde');
    array2 = ['c'];

    expect(isEqual(array1, array2)).toBe( true);
  });

  it('should compare sparse arrays', function() {
    var array = Array(1);

    expect(isEqual(array, Array(1))).toBe( true);
    expect(isEqual(array, [undefined])).toBe( true);
    expect(isEqual(array, Array(2))).toBe( false);
  });

  it('should compare plain objects', function() {
    var object1 = { 'a': true, 'b': null, 'c': 1, 'd': 'a', 'e': undefined },
        object2 = { 'a': true, 'b': null, 'c': 1, 'd': 'a', 'e': undefined };

    expect(isEqual(object1, object2)).toBe( true);

    object1 = { 'a': [1, 2, 3], 'b': new Date(2012, 4, 23), 'c': /x/, 'd': { 'e': 1 } };
    object2 = { 'a': [1, 2, 3], 'b': new Date(2012, 4, 23), 'c': /x/, 'd': { 'e': 1 } };

    expect(isEqual(object1, object2)).toBe( true);

    object1 = { 'a': 1, 'b': 2, 'c': 3 };
    object2 = { 'a': 3, 'b': 2, 'c': 1 };

    expect(isEqual(object1, object2)).toBe( false);

    object1 = { 'a': 1, 'b': 2, 'c': 3 };
    object2 = { 'd': 1, 'e': 2, 'f': 3 };

    expect(isEqual(object1, object2)).toBe( false);

    object1 = { 'a': 1, 'b': 2 };
    object2 = { 'a': 1, 'b': 2, 'c': 3 };

    expect(isEqual(object1, object2)).toBe( false);
  });

  it('should compare objects regardless of key order', function() {
    var object1 = { 'a': 1, 'b': 2, 'c': 3 },
        object2 = { 'c': 3, 'a': 1, 'b': 2 };

    expect(isEqual(object1, object2)).toBe( true);
  });

  const noop = function () {}
  it('should compare nested objects', function() {
    var object1 = {
      'a': [1, 2, 3],
      'b': true,
      'c': Object(1),
      'd': 'a',
      'e': {
        'f': ['a', Object('b'), 'c'],
        'g': Object(false),
        'h': new Date(2012, 4, 23),
        'i': noop,
        'j': 'a'
      }
    };

    var object2 = {
      'a': [1, Object(2), 3],
      'b': Object(true),
      'c': 1,
      'd': Object('a'),
      'e': {
        'f': ['a', 'b', 'c'],
        'g': false,
        'h': new Date(2012, 4, 23),
        'i': noop,
        'j': 'a'
      }
    };

    expect(isEqual(object1, object2)).toBe(true);
  });

  it('should compare object instances', function() {
    function Foo() {
      this.a = 1;
    }
    Foo.prototype.a = 1;

    function Bar() {
      this.a = 1;
    }
    Bar.prototype.a = 2;

    expect(isEqual(new Foo, new Foo)).toBe( true);
    expect(isEqual(new Foo, new Bar)).toBe( false);
    expect(isEqual({ 'a': 1 }, new Foo)).toBe( false);
    expect(isEqual({ 'a': 2 }, new Bar)).toBe( false);
  });

  it('should compare objects with constructor properties', function() {
    expect(isEqual({ 'constructor': 1 },   { 'constructor': 1 })).toBe( true);
    expect(isEqual({ 'constructor': 1 },   { 'constructor': '1' })).toBe( false);
    expect(isEqual({ 'constructor': [1] }, { 'constructor': [1] })).toBe( true);
    expect(isEqual({ 'constructor': [1] }, { 'constructor': ['1'] })).toBe( false);
    expect(isEqual({ 'constructor': Object }, {})).toBe( false);
  });

  it('should compare arrays with circular references', function() {
    var array1 = [],
        array2 = [];

    array1.push(array1);
    array2.push(array2);

    expect(isEqual(array1, array2)).toBe( true);

    array1.push('b');
    array2.push('b');

    expect(isEqual(array1, array2)).toBe( true);

    array1.push('c');
    array2.push('d');

    expect(isEqual(array1, array2)).toBe( false);

    array1 = ['a', 'b', 'c'];
    array1[1] = array1;
    array2 = ['a', ['a', 'b', 'c'], 'c'];

    expect(isEqual(array1, array2)).toBe( false);
  });

  it('should have transitive equivalence for circular references of arrays', function() {
    var array1 = [],
        array2 = [array1],
        array3 = [array2];

    array1[0] = array1;

    expect(isEqual(array1, array2)).toBe( true);
    expect(isEqual(array2, array3)).toBe( true);
    expect(isEqual(array1, array3)).toBe( true);
  });

  it('should compare objects with circular references', function() {
    var object1 = {},
        object2 = {};

    object1.a = object1;
    object2.a = object2;

    expect(isEqual(object1, object2)).toBe( true);

    object1.b = 0;
    object2.b = Object(0);

    expect(isEqual(object1, object2)).toBe( true);

    object1.c = Object(1);
    object2.c = Object(2);

    expect(isEqual(object1, object2)).toBe( false);

    object1 = { 'a': 1, 'b': 2, 'c': 3 };
    object1.b = object1;
    object2 = { 'a': 1, 'b': { 'a': 1, 'b': 2, 'c': 3 }, 'c': 3 };
    expect(isEqual(object1, object2)).toBe( false);

  });

  it('should have transitive equivalence for circular references of objects', function() {
    var object1 = {},
        object2 = { 'a': object1 },
        object3 = { 'a': object2 };

    object1.a = object1;

   expect(isEqual(object1, object2)).toBe( true);
   expect(isEqual(object2, object3)).toBe( true);
   expect(isEqual(object1, object3)).toBe( true);
  });

  it('should compare objects with multiple circular references', function() {
    var array1 = [{}],
        array2 = [{}];

    (array1[0].a = array1).push(array1);
    (array2[0].a = array2).push(array2);

    expect(isEqual(array1,array2)).toBe(true);

    array1[0].b = 0;
    array2[0].b = Object(0);

    expect(isEqual(array1,array2)).toBe(true);

    array1[0].c = Object(1);
    array2[0].c = Object(2);

    expect(isEqual(array1,array2)).toBe(false);
  });

  it('should compare objects with complex circular references', function() {
    var object1 = {
      'foo': { 'b': { 'c': { 'd': {} } } },
      'bar': { 'a': 2 }
    };

    var object2 = {
      'foo': { 'b': { 'c': { 'd': {} } } },
      'bar': { 'a': 2 }
    };

    object1.foo.b.c.d = object1;
    object1.bar.b = object1.foo.b;

    object2.foo.b.c.d = object2;
    object2.bar.b = object2.foo.b;

    expect(isEqual(object1, object2)).toBe( true);
  });

  it('should compare objects with shared property values', function() {
    var object1 = {
      'a': [1, 2]
    };

    var object2 = {
      'a': [1, 2],
      'b': [1, 2]
    };

    object1.b = object1.a;

    expect(isEqual(object1, object2)).toBe( true);
  });

  it('should treat objects created by `Object.create(null)` like plain objects', function() {


    var object1 = Object.create(null);
    object1.a = 1;

    var object2 = { 'a': 1 };

    expect(isEqual(object1, object2)).toBe( true);

  });

  it('should avoid common type coercions', function() {
    expect(isEqual(true, Object(false))).toBe( false);
    expect(isEqual(Object(false), Object(0))).toBe( false);
    expect(isEqual(false, Object(''))).toBe( false);
    expect(isEqual(Object(36), Object('36'))).toBe( false);
    expect(isEqual(0, '')).toBe( false);
    expect(isEqual(1, true)).toBe( false);
    expect(isEqual(1337756400000, new Date(2012, 4, 23))).toBe( false);
    expect(isEqual('36', 36)).toBe( false);
    expect(isEqual(36, '36')).toBe( false);
  });

  it('should compare `arguments` objects', function() {
    var args1 = (function() { return arguments; }()),
        args2 = (function() { return arguments; }()),
        args3 = (function() { return arguments; }(1, 2));

    expect(isEqual(args1, args2)).toBe( true);
    expect(isEqual(args1, args3)).toBe( false);
  });


  it('should compare array buffers', function() {
    if (ArrayBuffer) {
      var buffer = new Int8Array([-1]).buffer;

      expect(isEqual(buffer, new Uint8Array([255]).buffer)).toBe( true);
      expect(isEqual(buffer, new ArrayBuffer(1))).toBe( false);
    }
  });



  it('should compare buffers', function() {
    if (Buffer) {
      var buffer = new Buffer([1]);

      expect(isEqual(buffer, new Buffer([1]))).toBe( true);
      expect(isEqual(buffer, new Buffer([2]))).toBe( false);
      expect(isEqual(buffer, new Uint8Array([1]))).toBe( false);
    }
  });

  it('should compare date objects', function() {
    var date = new Date(2012, 4, 23);

    expect(isEqual(date, new Date(2012, 4, 23))).toBe( true);
    expect(isEqual(new Date('a'), new Date('b'))).toBe( true);
    expect(isEqual(date, new Date(2013, 3, 25))).toBe( false);

  });


  it('should compare functions', function() {
    function a() { return 1 + 2; }
    function b() { return 1 + 2; }

    expect(isEqual(a, a)).toBe( true);
    expect(isEqual(a, b)).toBe( false);
  });



  it('should compare maps with circular references', function() {
    if (Map) {
      var map1 = new Map,
          map2 = new Map;

      map1.set('a', map1);
      map2.set('a', map2);
      expect(isEqual(map1, map2)).toBe( true);

      map1.set('b', 1);
      map2.set('b', 2);
      expect(isEqual(map1, map2)).toBe( false);
    }
  });



  it('should compare regexes', function() {
    expect(isEqual(/x/gim, /x/gim)).toBe( true);
    expect(isEqual(/x/gim, /x/mgi)).toBe( true);
    expect(isEqual(/x/gi, /x/g)).toBe( false);
    expect(isEqual(/x/, /y/)).toBe( false);
    expect(isEqual(/x/g, { 'global': true, 'ignoreCase': false, 'multiline': false, 'source': 'x' })).toBe( false);
  });



  it('should compare sets with circular references', function() {
    if (Set) {
      var set1 = new Set,
          set2 = new Set;

      set1.add(set1);
      set2.add(set2);
      expect(isEqual(set1, set2)).toBe( true);

      set1.add(1);
      set2.add(2);
      expect(isEqual(set1, set2)).toBe( false);
    }
  });

  it('should compare symbol properties', function() {
    if (Symbol) {
      var object1 = { 'a': 1 },
          object2 = { 'a': 1 };

      object1[symbol1] = { 'a': { 'b': 2 } };
      object2[symbol1] = { 'a': { 'b': 2 } };

      Object.defineProperty(object2, symbol2, {
        'configurable': true,
        'enumerable': false,
        'writable': true,
        'value': 2
      });

     expect(isEqual(object1, object2)).toBe(true);

      object2[symbol1] = { 'a': 1 };
      expect(isEqual(object1, object2)).toBe(false);

      delete object2[symbol1];
      object2[Symbol('a')] = { 'a': { 'b': 2 } };
      expect(isEqual(object1, object2)).toBe(false);
    }
  });




});
