# seek-require [![NPM version](https://badge.fury.io/js/seek-require.svg)](http://badge.fury.io/js/seek-require) [![Build Status](https://travis-ci.org/villadora/seek-require.svg?branch=master)](https://travis-ci.org/villadora/seek-require) [![Dependency Status](https://gemnasium.com/villadora/seek-require.svg)](https://gemnasium.com/villadora/seek-require)

<!-- description -->

## Installation

```bash
$ npm install seek-require --save
```

## Usage

Return object will contains the require calls with module as key.

For all unanalysable calls, the node will be stored in 'unresolved' property.

```js
var seeker = require('seek-require');
var ast = require('esprima').parse("var a = require('util');");

var options = {
  strictArguments: true
};

var requires = seeker(ast, require('escope').analyze(ast), options); // pass scopes so scopes could be re-use for performance
// or 
var requires = seeker(ast, options);
// requires = {
//   'util': [{<AST NodeObject>}] // an array of require calls nodes
// };

// 'unresolved' is a non-enumerable property in result, which means it will no show up in Object.keys(requires) or for(var p in requires);

var modules = Object.keys(requires); //  ['util']

for(var mod in requires) {
  console.log(mod); // only get 'util'
}


// all non standard require calls are in requires.unresolved
requires = seeker('var a = "util"; var b = require(a);', { literalOnly: false });

Object.keys(requires).length; // return 0

requires.unresolved.length; // return 1

```

### Options

* literalOnly =boolean=  only found require calls with literal arguments, default to _false_
* strictArguments =boolean= only accept one argument for require calls, default to _true_


## Licence

MIT
<!-- do not want to make nodeinit to complicated, you can edit this whenever you want. -->
