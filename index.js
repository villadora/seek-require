var esprima = require('esprima'),
  escope = require('escope'),
  estraverse = require('estraverse');

function findRef(scope, ident) {
  var refs = scope.references;
  for (var i = 0; i < refs.length; ++i) {
    var ref = refs[i];
    if (ref.identifier === ident) {
      return ref;
    }
  }

  var found;
  (scope.childScopes || []).forEach(function(s, i) {
    var rs = findRef(s, ident);
    if (rs) found = rs;
  });

  return found;
}

/**
 * @name SROption
 * @class
 * @property {boolean} literalOnly, only found require calls with literal arguments, default to false
 * @property {boolean} strictArguments, only accept one argument for require calls, default to true
 */


/**
 * @param {String|AST} ast
 * @param {Array.<Scope>=} scopes
 * @param {SROption=} options
 */
module.exports = function(ast, scopes, options) {
  if (typeof ast == 'string')
    ast = esprima.parse(ast, {
      loc: true,
      range: true
    });

  if (Object.prototype.toString.call(scopes) == '[object Object]') {
    options = scopes;
    scopes = undefined;
  }

  // read options
  options = options || {};
  var literalOnly = ('literalOnly' in options) ? options.literalOnly : false;
  var strictArguments = ('strictArguments' in options) ? options.strictArguments : true;

  // get global scope
  scopes = scopes || escope.analyze(ast).scopes;
  var gs = scopes.filter(function(scope) {
    return scope.type == 'global';
  })[0];

  var rs = {};

  Object.defineProperty(rs, 'unresolved', {
    enumerable: false, // use default false value to avoid show in enumeration
    configurable: false, // use default false value to avoid reconfig
    writable: false, // use default false value to avoid override
    value: []
  });

  if (!gs) gs = scopes[0]; // if no global scope, choose top scope

  ast = estraverse.traverse(ast, {
    enter: function(current, parent) {
      // strict require for now
      if (current.type === 'CallExpression' && current.callee.type === 'Identifier' &&
        current.callee.name === 'require' && current.arguments.length > 0) {

        if (strictArguments && current.arguments.length !== 1) {
          return;
        }

        if (literalOnly && current.arguments[0].type !== 'Literal') {
          return;
        }


        var ref = findRef(gs, current.callee);

        if (!ref.resolved) { // global require function

          // non arguments
          if (current.arguments.length === 0) {
            rs.unresolved.push(current);
            return;
          }

          var arg1 = current.arguments[0];

          // non-literal arguments, dynamic require
          if (arg1.type !== 'Literal') {
            rs.unresolved.push(current);
            return;
          }

          // normal requires
          var name = current.arguments[0].value;
          var list = rs[name] = rs[name] || [];
          list.push(current);
        }
      }
    }
  });

  return rs;
};
