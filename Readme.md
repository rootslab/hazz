### Hazz

[![NPM VERSION](http://img.shields.io/npm/v/hazz.svg?style=flat)](https://www.npmjs.org/package/hazz)
[![CODACY BADGE](https://img.shields.io/codacy/b18ed7d95b0a4707a0ff7b88b30d3def.svg?style=flat)](https://www.codacy.com/public/44gatti/hazz)
[![CODECLIMATE](http://img.shields.io/codeclimate/github/rootslab/hazz.svg?style=flat)](https://codeclimate.com/github/rootslab/hazz)
[![CODECLIMATE-TEST-COVERAGE](https://img.shields.io/codeclimate/coverage/github/rootslab/hazz.svg?style=flat)](https://codeclimate.com/github/rootslab/hazz)
[![LICENSE](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/rootslab/hazz#mit-license)

![NODE VERSION](https://img.shields.io/node/v/hazz.svg)
[![TRAVIS CI BUILD](http://img.shields.io/travis/rootslab/hazz.svg?style=flat)](http://travis-ci.org/rootslab/hazz)
[![BUILD STATUS](http://img.shields.io/david/rootslab/hazz.svg?style=flat)](https://david-dm.org/rootslab/hazz)
[![DEVDEPENDENCY STATUS](http://img.shields.io/david/dev/rootslab/hazz.svg?style=flat)](https://david-dm.org/rootslab/hazz#info=devDependencies)

[![NPM MONTHLY](http://img.shields.io/npm/dm/hazz.svg?style=flat)](http://npm-stat.com/charts.html?package=hazz)
![NPM YEARLY](https://img.shields.io/npm/dy/hazz.svg)

[![NPM GRAPH](https://nodei.co/npm/hazz.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/hazz/)

> __Hazz__, a pseudo-random-data filled table to generate 2 indipendent, very fast hash functions.


### Install

```bash
$ npm install hazz [-g]
```

> __require__:

```javascript
var Hazz  = require( 'hazz' );
```
### Run Tests

> __to run all test files, install devDependecies:__

```bash
 $ cd hazz/
 # install or update devDependecies
 $ npm install 
 # run tests
 $ npm test
```


### Constructor

> Specify how many bytes to parse, from every
> input key, to hash with pseudo-random data 

```javascript
Hazz( Number max_input_length )
// or
new Hazz( Number max_input_length )
```

###  Properties


```javascript
/*
 * the table containing pseudo-random data for generating hash numbers 
 */
Hazz.table

/*
 * max input key length  
 */
Hazz.ilength
```

### Methods

> Arguments between [] are optional.

```javascript
/*
 * re-fill table with fresh pseudo-random numbers (32 bits)
 */
Hazz#fill() : Hazz

/*
 * Use function 0 or 1 to hash data, if specified
 * it returns a number within a range; the minimum
 * range is obviously 2 (0, 1).
 * NOTE: 
 */
Hazz#do( Number hfn, Buffer || String || Array data [, Number range ] ) : Number


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