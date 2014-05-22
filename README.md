# seek-require [![NPM version](https://badge.fury.io/js/seek-require.svg)](http://badge.fury.io/js/seek-require) [![Build Status](https://travis-ci.org/villadora/seek-require.svg?branch=master)](https://travis-ci.org/villadora/seek-require) [![Dependency Status](https://gemnasium.com/villadora/seek-require.svg)](https://gemnasium.com/villadora/seek-require)

<!-- description -->

## Installation

```bash
$ npm install seek-require --save
```

## Usage

```js
var seeker = require('seek-require');
var ast = require('esprima').parse("var a = require('util');");

var requires = seeker(ast);
// requires = {
//    'util': [{<AST NodeObject>}]
// };

```
## TODOs

1. add options
2. err report
3. unstrict requires

## Licence

MIT
<!-- do not want to make nodeinit to complicated, you can edit this whenever you want. -->
