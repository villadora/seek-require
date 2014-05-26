(function(require) {
  require('hello');
})(function(a) {
  console.log(a);
});

var util = require('util' + '');

require('path', true);