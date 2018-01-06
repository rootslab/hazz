### Hazz

[![NPM VERSION](http://img.shields.io/npm/v/hazz.svg?style=flat)](https://www.npmjs.org/package/hazz)
[![CODACY BADGE](https://img.shields.io/codacy/b18ed7d95b0a4707a0ff7b88b30d3def.svg?style=flat)](https://www.codacy.com/public/44gatti/hazz)
[![CODECLIMATE-TEST-COVERAGE](https://img.shields.io/codeclimate/c/rootslab/hazz.svg?style=flat)](https://codeclimate.com/github/rootslab/hazz)
[![LICENSE](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/rootslab/hazz#mit-license)

![NODE VERSION](https://img.shields.io/node/v/hazz.svg)
[![TRAVIS CI BUILD](http://img.shields.io/travis/rootslab/hazz.svg?style=flat)](http://travis-ci.org/rootslab/hazz)
[![BUILD STATUS](http://img.shields.io/david/rootslab/hazz.svg?style=flat)](https://david-dm.org/rootslab/hazz)
[![DEVDEPENDENCY STATUS](http://img.shields.io/david/dev/rootslab/hazz.svg?style=flat)](https://david-dm.org/rootslab/hazz#info=devDependencies)

[![NPM MONTHLY](http://img.shields.io/npm/dm/hazz.svg?style=flat)](http://npm-stat.com/charts.html?package=hazz)
![NPM YEARLY](https://img.shields.io/npm/dy/hazz.svg)
[![NPM TOTAL](https://img.shields.io/npm/dt/hazz.svg)](http://npm-stat.com/charts.html?package=hazz)

[![NPM GRAPH](https://nodei.co/npm/hazz.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/hazz/)

> __Hazz__, a __pseudo-random-data-filled-table__ to generate __k indipendent__ and __uniform__, __very fast__ (non-cryptographic) hash functions.

> If you need to hash __arbitrary long length__ inputs, without using a fixed (big) size pseudo-random table, a fast way is to __simulate__ a set of indipendent hash functions using a single crpyto-digest (with a sha-512 digest we can simulate up to 16 functions). Take a look to __[Mazz](https://github.com/rootslab/mazz)__ (the fast way of the __tonto__).

### Install

```bash
$ npm install hazz [-g]
```

> __require__:

```javascript
var Hazz  = require( 'hazz' );
```
### Run Tests

> __to run all test files, install devDependencies:__

```bash
 $ cd hazz/
 # install or update devDependencies
 $ npm install 
 # run tests
 $ npm test
```

> __to execute a single test file simply do__:

```bash
 $ node test/file-name.js
```

### Constructor

> Specify how many bytes to parse (at max), from every
> input key to hash, then the number of functions to use.

> NOTE: 
>  - default value for input length is 16 byte.
>  - default and minimum value for hfn is 2

> Arguments between [] are optional.

```javascript
Hazz( [ Number max_input_length [, Number hfn ] ] )
// or
new Hazz( [ Number max_input_length [, Number hfn ] ] )
```

###  Properties


```javascript
/*
 * the table containing pseudo-random data for generating hash numbers.
 * NOTE: the size of the table is: (max_input_length * hfn) kilobytes,
 * it doesn't depends on the expected population.
 */
Hazz.table

/*
 * max input key length  
 */
Hazz.ilength

/*
 * total number of hash functions  
 */
Hazz.hfn
```

### Methods

> Arguments between [] are optional.

```javascript
/*
 * re-fill table with fresh pseudo-random numbers
 */
Hazz#refill() : Hazz

/*
 * Specify a positive integer (from 0 to k-1) to use the k-th
 * hash function. If specified it returns a number within a
 * range.
 * 
 * NOTE: 
 *  - the input should be a Buffer (no Strings or Arrays).
 *  - the minimum range is obviously 2 (0, 1).
 *  - the integers produced are at min 4 byte long (>= 2^24),
 *    longer the input parsed, bigger the numbers produced.
 */
Hazz#do( Number hfn, Buffer data [, Number range ] ) : Number

/*
 * hash with all functions in parallel,
 * it returns an array of results
 */
Hazz#all( Buffer data [, Number range ] ) : Array


```

> See [examples](example/).

### MIT License

> Copyright (c) 2017-present &lt; Guglielmo Ferri : 44gatti@gmail.com &gt;

> Permission is hereby granted, free of charge, to any person obtaining
> a copy of this software and associated documentation files (the
> 'Software'), to deal in the Software without restriction, including
> without limitation the rights to use, copy, modify, merge, publish,
> distribute, sublicense, and/or sell copies of the Software, and to
> permit persons to whom the Software is furnished to do so, subject to
> the following conditions:

> __The above copyright notice and this permission notice shall be
> included in all copies or substantial portions of the Software.__

> THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
> EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
> MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
> IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
> CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
> TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
> SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[![GA](https://ga-beacon.appspot.com/UA-53998692-1/hazz/Readme?pixel)](https://github.com/igrigorik/ga-beacon)