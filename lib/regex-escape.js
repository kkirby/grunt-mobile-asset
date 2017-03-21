'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var special = '-[](){}/+*?.^$|'.split('').join('\\');
var regex = RegExp('[' + special + ']', 'g');

exports.default = function (str) {
  return str.replace(regex, '\\$&');
};