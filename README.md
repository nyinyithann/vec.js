# Vec.js [![Node.js CI](https://github.com/nyinyithann/vec.js/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/nyinyithann/vec.js/actions/workflows/node.js.yml)

Vec.js is a JavaScript library for nodeJS and browser. Vec.js extends JavaScript Array. The library is heavily inspired and influenced by F# Array module.

## Documentation

Please go to [Vec APIs](/api.docs/vec.api.md) to read more.

## Installation

```javascript
npm install @nyinyithann/vec.js
```

## Getting started

`Vec` extends `Array`. All built-in methods of `Array` can be used with it. The following snippet demonstrates using `Array`'s built-in method `reduce` with `Vec`.

```javascript
const fnVec = Vec.of(
  (x) => x * x * x,
  (x) => x / 216,
  Math.sqrt
);
const howLongAStormLast = (d) => fnVec.reduce((s, f) => f(s), d);
console.log(howLongAStormLast(10.5)); // => 2.315032397181517
```

`Vec` has the following methods.

#### Static Methods

```
empty
init
create
isVec
some2
every2
fold2
foldRight2
forEach2
map2
map3
zip3
unfold
allPairs
```

#### Instance Methods

```
isEmpty
copy
countBy
findRight
findIndexRight
head
tail
get
set
last
take
takeWhile
skipWhile
min
max
minBy
maxBy
sum
sumBy
average
averageBy
splitAt
partition
scan
scanRight
windowed
zip
unzip
distinct
distinctBy
pairwise
except
groupBy
mapFold
mapFoldRight
chunkBySize
binarySearch
permute
transpose
```

Some sample code below.

```javascript
// unfold
const fibonacci = (n) =>
  Vec.unfold(
    ([x, [a, b]]) => (x < n ? [a + b, [x + 1, [b, a + b]]] : null),
    [0, [0, 1]]
  );
const fibOf10 = fibonacci(10);
console.log(fibOf10);
// => [ 1, 2, 3, 5, 8, 13, 21, 34, 55, 89 ]

// mapFold
const oneToTen = Vec.init(10, (x) => x + 1);
const mapFoldResult = oneToTen.mapFold((acc, elem) => [acc, acc + elem], 0);
console.log(mapFoldResult);
// => [ [ 0, 1, 3, 6, 10, 15, 21, 28, 36, 45 ], 55 ]

// scan
const scannedResult = oneToTen.scan((acc, elem) => acc + elem, 0);
console.log(scannedResult);
// => [ 0, 1, 3, 6, 10, 15, 21, 28, 36, 45, 55 ]

// groups
const groups = oneToTen.groupBy((x) => (x % 2 === 0 ? "Even" : "Odd"), true);
console.log(groups);
// => [ [ 'Odd', [ 1, 3, 5, 7, 9 ] ], [ 'Even', [ 2, 4, 6, 8, 10 ] ] ]
```

`Vec` can be instantiated as follows:

```javascript
const vec = new Vec();
vec.push(1, 2, 3, 4, 5);
// => [ 1, 2, 3, 4, 5 ]

const vec1 = new Vec(1, 2, 3, 4, 5);
// => [ 1, 2, 3, 4, 5 ]

const vec2 = Vec.of(1, 2, 3, 4, 5);
// => [ 1, 2, 3, 4, 5 ]

const vec3 = Vec.from([1, 2, 3, 4, 5]);
// => [ 1, 2, 3, 4, 5 ]

const vec4 = Vec.init(5, (x) => x + 1);
// => [ 1, 2, 3, 4, 5 ]

const vec5 = Vec.unfold((x) => (x <= 5 ? [x, x + 1] : undefined), 1);
// => [ 1, 2, 3, 4, 5 ]

const vec6 = Vec.create(5, 1);
// => [ 1, 1, 1, 1, 1 ]

const emptyVec = Vec.empty();
emptyVec.push(1, 2, 3, 4, 5);
// => [ 1, 2, 3, 4, 5 ]
```

Please go to [Vec APIs](/api.docs/vec.api.md) to read more.

### Author

Nyi Nyi Than - [@nyinyithann](https://www.linkedin.com/in/nyinyithan/)

### Credit

- [F# Collections](https://fsharp.github.io/fsharp-core-docs/reference/fsharp-collections.html)
- [lodash - Vec.js shamelessly steals isEequal code from lodash :-)](https://github.com/lodash/lodash/blob/2da024c3b4/eqDeep.js)
- [Exploring ES6](https://exploringjs.com/es6.html) By [Dr. Axel Rauschmayer](https://2ality.com/p/about.html)
- [Understanding ECMAScript 6](https://leanpub.com/understandinges6) By [Nicholas C. Zakas](https://humanwhocodes.com/)
- [Collection Pipeline](https://martinfowler.com/articles/collection-pipeline/)
  by [Martin Fowler](https://martinfowler.com/)
- [javascript.info](https://javascript.info/)

### License

MIT
