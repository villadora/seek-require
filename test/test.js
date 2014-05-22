var seeker = require('../');
var path = require('path');
var fs = require('fs');
var assert = require('assert');

var rs = seeker(fs.readFileSync(path.join(__dirname, 'fixtures/simplest.js'), 'utf8'));
assert.equal(Object.keys(rs).length, 1);

console.log(seeker(fs.readFileSync(path.join(__dirname, 'fixtures/couch-db/lib/base.js'), 'utf8')));
