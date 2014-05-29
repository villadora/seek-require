var seeker = require('../');
var path = require('path');
var fs = require('fs');
var assert = require('assert');

describe('test seeking result', function() {
  var rs;
  
  it('simplest', function() {
    rs = seeker(fs.readFileSync(path.join(__dirname, 'fixtures/simplest.js'), 'utf8'));
    assert.equal(Object.keys(rs).length, 1);
  });

  it('couch-db base', function() {
    rs = seeker(fs.readFileSync(path.join(__dirname, 'fixtures/couch-db/base.js'), 'utf8'));
    
    assert.equal(Object.keys(rs).length, 4);
    assert.equal(rs.unresolved.length, 0);
  });

  it('dep with options', function() {
    rs = seeker(fs.readFileSync(path.join(__dirname, 'fixtures/dep.js'), 'utf8'));

    assert.equal(Object.keys(rs).length, 0);
    assert.equal(rs.unresolved.length, 1);

    rs = seeker(fs.readFileSync(path.join(__dirname, 'fixtures/dep.js'), 'utf8'), {
      strictArguments: false
    });

    assert.equal(Object.keys(rs).length, 1);
    assert.equal(rs.unresolved.length, 1);

    rs = seeker(fs.readFileSync(path.join(__dirname, 'fixtures/dep.js'), 'utf8'), {
      strictArguments: false,
      literalOnly: true
    });

    assert.equal(Object.keys(rs).length, 1);
    assert.equal(rs.unresolved.length, 0);
  });
});
