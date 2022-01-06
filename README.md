# Vec.js 

Vec.js is a JavaScript library for nodeJS and browser. Vec.js extends JavaScript Array. The library is heavily inspired and influenced by F# Array module.


## Installation

```javascript
npm install @jazz/vec.js
```

## Getting started

`Vec` extends `Array`. All built-in methods of `Array` can be used with it. The following snippet demonstrates using `Array`'s built-in method `reduce` with `Vec`.

```javascript
const fnVec = Vec.of(x => x * x * x, x => x / 216, Math.sqrt);
const howLongAStormLast = d => fnVec.reduce((s, f) => f(s), d);
console.log(howLongAStormLast(10.5)); // => 2.315032397181517
```

`Vec` comes with additional 50+ methods. The following snippets demonstrate some of them.
```javascript
// unfold
const fibonacci = (n) => Vec.unfold(([x, [a, b]]) => (x < n ? [a + b, [x + 1, [b, a + b]]] : null), [0, [0, 1]]);
const fibOf10 = fibonacci(10);
console.log(fibOf10);
// => [ 1, 2, 3, 5, 8, 13, 21, 34, 55, 89 ]

// mapFold
const oneToTen = Vec.init(10, x => x + 1);
const mapFoldResult = oneToTen.mapFold((acc, elem) => [acc, acc + elem], 0);
console.log(mapFoldResult);
// => [ [ 0, 1, 3, 6, 10, 15, 21, 28, 36, 45 ], 55 ]

// scan
const scannedResult = oneToTen.scan((acc, elem) => acc + elem, 0);
console.log(scannedResult);
// => [ 0, 1, 3, 6, 10, 15, 21, 28, 36, 45, 55 ]

// groups
const groups = oneToTen.groupBy( x => x % 2 === 0 ? 'Even' : 'Odd', true);
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

const vec4 = Vec.init(5, x => x + 1); 
// => [ 1, 2, 3, 4, 5 ] 

const vec5 = Vec.unfold(x => x <= 5 ? [x, x + 1] : undefined, 1); 
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
- [Exploring ES6](https://exploringjs.com/es6.html) By [Dr. Axel Rauschmayer](https://2ality.com/p/about.html)
- [Understanding ECMAScript 6](https://leanpub.com/understandinges6) By [Nicholas C. Zakas](https://humanwhocodes.com/)
- [Collection Pipeline](https://martinfowler.com/articles/collection-pipeline/)
  by [Martin Fowler](https://martinfowler.com/)
- [javascript.info](https://javascript.info/)

### License

MIT
