'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _mobileAssetLib = require('./mobile-asset-lib');

var _mobileAssetLib2 = _interopRequireDefault(_mobileAssetLib);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (grunt) {
	function getFiles(context) {
		var files = [];
		context.files.forEach(function (f) {
			return files.push(f);
		});
		return files;
	}

	function mobileAsset() {
		var _this = this;

		var done = this.async();
		var promise = function () {
			var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
				var options, processConfig, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, file, _source, sources, dests, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, source, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, dest;

				return _regenerator2.default.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								options = _this.options({
									defaultSpec: 'icons'
								});
								processConfig = options.processConfig || _mobileAssetLib2.default.DefaultSizes[options.defaultSpec];

								if (processConfig.ios != null || processConfig.android != null || processConfig.windows != null) {
									(0, _entries2.default)(processConfig).forEach(function (_ref2) {
										var _ref3 = (0, _slicedToArray3.default)(_ref2, 2),
										    platform = _ref3[0],
										    platformConfig = _ref3[1];

										processConfig[platform] = _mobileAssetLib2.default.ParseConfig(platformConfig);
									});
								} else {
									processConfig = _mobileAssetLib2.default.ParseConfig(processConfig);
								}
								_iteratorNormalCompletion = true;
								_didIteratorError = false;
								_iteratorError = undefined;
								_context.prev = 6;
								_iterator = (0, _getIterator3.default)(getFiles(_this));

							case 8:
								if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
									_context.next = 66;
									break;
								}

								file = _step.value;
								_source = file.src || file.source;
								sources = !(_source instanceof Array) ? [_source] : _source;
								dests = !(file.dest instanceof Array) ? [file.dest] : file.dest;
								_iteratorNormalCompletion2 = true;
								_didIteratorError2 = false;
								_iteratorError2 = undefined;
								_context.prev = 16;
								_iterator2 = (0, _getIterator3.default)(sources);

							case 18:
								if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
									_context.next = 49;
									break;
								}

								source = _step2.value;
								_iteratorNormalCompletion3 = true;
								_didIteratorError3 = false;
								_iteratorError3 = undefined;
								_context.prev = 23;
								_iterator3 = (0, _getIterator3.default)(dests);

							case 25:
								if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
									_context.next = 32;
									break;
								}

								dest = _step3.value;
								_context.next = 29;
								return _mobileAssetLib2.default.Process(source, dest, processConfig, options.gmConfig);

							case 29:
								_iteratorNormalCompletion3 = true;
								_context.next = 25;
								break;

							case 32:
								_context.next = 38;
								break;

							case 34:
								_context.prev = 34;
								_context.t0 = _context['catch'](23);
								_didIteratorError3 = true;
								_iteratorError3 = _context.t0;

							case 38:
								_context.prev = 38;
								_context.prev = 39;

								if (!_iteratorNormalCompletion3 && _iterator3.return) {
									_iterator3.return();
								}

							case 41:
								_context.prev = 41;

								if (!_didIteratorError3) {
									_context.next = 44;
									break;
								}

								throw _iteratorError3;

							case 44:
								return _context.finish(41);

							case 45:
								return _context.finish(38);

							case 46:
								_iteratorNormalCompletion2 = true;
								_context.next = 18;
								break;

							case 49:
								_context.next = 55;
								break;

							case 51:
								_context.prev = 51;
								_context.t1 = _context['catch'](16);
								_didIteratorError2 = true;
								_iteratorError2 = _context.t1;

							case 55:
								_context.prev = 55;
								_context.prev = 56;

								if (!_iteratorNormalCompletion2 && _iterator2.return) {
									_iterator2.return();
								}

							case 58:
								_context.prev = 58;

								if (!_didIteratorError2) {
									_context.next = 61;
									break;
								}

								throw _iteratorError2;

							case 61:
								return _context.finish(58);

							case 62:
								return _context.finish(55);

							case 63:
								_iteratorNormalCompletion = true;
								_context.next = 8;
								break;

							case 66:
								_context.next = 72;
								break;

							case 68:
								_context.prev = 68;
								_context.t2 = _context['catch'](6);
								_didIteratorError = true;
								_iteratorError = _context.t2;

							case 72:
								_context.prev = 72;
								_context.prev = 73;

								if (!_iteratorNormalCompletion && _iterator.return) {
									_iterator.return();
								}

							case 75:
								_context.prev = 75;

								if (!_didIteratorError) {
									_context.next = 78;
									break;
								}

								throw _iteratorError;

							case 78:
								return _context.finish(75);

							case 79:
								return _context.finish(72);

							case 80:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, _this, [[6, 68, 72, 80], [16, 51, 55, 63], [23, 34, 38, 46], [39,, 41, 45], [56,, 58, 62], [73,, 75, 79]]);
			}));

			return function promise() {
				return _ref.apply(this, arguments);
			};
		}();
		promise().then(done, function (e) {
			return done(e);
		});
	}

	grunt.registerMultiTask('mobile-asset', 'A plugin that generates mobile assets, such as icons.', mobileAsset);

	grunt.registerMultiTask('mobile_asset', 'A plugin that generates mobile assets, such as icons.', mobileAsset);
};

module.exports.DefaultSizes = _mobileAssetLib2.default.DefaultSizes;