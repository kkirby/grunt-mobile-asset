'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var svg2png_shim = function () {
	var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(sourceFile, destFile) {
		return _regenerator2.default.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.t0 = _fs2.default;
						_context.t1 = destFile;
						_context.next = 4;
						return (0, _svg2png2.default)(_fs2.default.readFileSync(sourceFile));

					case 4:
						_context.t2 = _context.sent;

						_context.t0.writeFileSync.call(_context.t0, _context.t1, _context.t2);

					case 6:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, this);
	}));

	return function svg2png_shim(_x, _x2) {
		return _ref.apply(this, arguments);
	};
}();

var ProcessIcon = function () {
	var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(iconName, config, outputFolder, gmConfig) {
		var scale, type, name, width, height, resize, backgroundColor, gravity, tempIconName, imageData, tempTransformHolder, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, transformFile, iconInstance, resizeFlag;

		return _regenerator2.default.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						uniqid++;
						scale = config.scale, type = config.type, name = config.name, width = config.width, height = config.height, resize = config.resize, backgroundColor = config.backgroundColor, gravity = config.gravity;
						tempIconName = _path2.default.join(_os2.default.tmpdir(), '_icon' + uniqid + '.png');

						_fs2.default.writeFileSync(tempIconName, _fs2.default.readFileSync(iconName));
						iconName = tempIconName;

						if (!(config.transform != null)) {
							_context2.next = 36;
							break;
						}

						imageData = _fs2.default.readFileSync(iconName).toString('base64');
						tempTransformHolder = _path2.default.join(_os2.default.tmpdir(), '_iconTransform' + uniqid + '.svg');
						_iteratorNormalCompletion = true;
						_didIteratorError = false;
						_iteratorError = undefined;
						_context2.prev = 11;
						_iterator = (0, _getIterator3.default)(config.transform);

					case 13:
						if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
							_context2.next = 22;
							break;
						}

						transformFile = _step.value;

						if (!_path2.default.isAbsolute(transformFile)) {
							transformFile = _path2.default.resolve(_path2.default.join(__dirname, '..', 'transforms', transformFile));
						}

						_fs2.default.writeFileSync(tempTransformHolder, (0, _blueimpTmpl2.default)(_fs2.default.readFileSync(transformFile).toString(), (0, _extends3.default)({
							image: 'data:image/png;base64,' + imageData
						}, config)));
						_context2.next = 19;
						return svg2png_shim(tempTransformHolder, iconName);

					case 19:
						_iteratorNormalCompletion = true;
						_context2.next = 13;
						break;

					case 22:
						_context2.next = 28;
						break;

					case 24:
						_context2.prev = 24;
						_context2.t0 = _context2['catch'](11);
						_didIteratorError = true;
						_iteratorError = _context2.t0;

					case 28:
						_context2.prev = 28;
						_context2.prev = 29;

						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}

					case 31:
						_context2.prev = 31;

						if (!_didIteratorError) {
							_context2.next = 34;
							break;
						}

						throw _iteratorError;

					case 34:
						return _context2.finish(31);

					case 35:
						return _context2.finish(28);

					case 36:
						iconInstance = (0, _gm2.default)(iconName);

						iconInstance.options(gmConfig || {});
						resizeFlag = {
							fill: '^',
							exact: '!',
							fit: ''
						}[resize];

						iconInstance.background(backgroundColor).resize(width * scale, height * scale, resizeFlag).gravity(gravity).extent(width * scale, height * scale);
						_context2.next = 42;
						return _bluebird2.default.promisify(_mkdirp2.default)(outputFolder);

					case 42:
						_context2.next = 44;
						return _bluebird2.default.promisify(iconInstance.write.bind(iconInstance))(_path2.default.join(outputFolder, name.toString() + '.' + type.toString()));

					case 44:
					case 'end':
						return _context2.stop();
				}
			}
		}, _callee2, this, [[11, 24, 28, 36], [29,, 31, 35]]);
	}));

	return function ProcessIcon(_x6, _x7, _x8, _x9) {
		return _ref4.apply(this, arguments);
	};
}();

var Process = function () {
	var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(iconName, outputFolder, config, gmConfig) {
		var _this2 = this;

		var tempIconName, extension;
		return _regenerator2.default.wrap(function _callee5$(_context5) {
			while (1) {
				switch (_context5.prev = _context5.next) {
					case 0:
						if (!((0, _getPrototypeOf2.default)(config).constructor.name == 'Object')) {
							_context5.next = 5;
							break;
						}

						_context5.next = 3;
						return _bluebird2.default.map((0, _entries2.default)(config), function () {
							var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(_ref7) {
								var _ref8 = (0, _slicedToArray3.default)(_ref7, 2),
								    platform = _ref8[0],
								    platformConfig = _ref8[1];

								return _regenerator2.default.wrap(function _callee3$(_context3) {
									while (1) {
										switch (_context3.prev = _context3.next) {
											case 0:
												_context3.next = 2;
												return Process(iconName, _path2.default.join(outputFolder, platform), platformConfig, gmConfig);

											case 2:
											case 'end':
												return _context3.stop();
										}
									}
								}, _callee3, _this2);
							}));

							return function (_x14) {
								return _ref6.apply(this, arguments);
							};
						}());

					case 3:
						_context5.next = 13;
						break;

					case 5:
						tempIconName = _path2.default.join(_os2.default.tmpdir(), '_icon.png');
						extension = iconName.substr(iconName.lastIndexOf('.') + 1);

						if (!(extension == 'svg')) {
							_context5.next = 11;
							break;
						}

						_context5.next = 10;
						return svg2png_shim(iconName, tempIconName);

					case 10:
						iconName = tempIconName;

					case 11:
						_context5.next = 13;
						return _bluebird2.default.map(config, function () {
							var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(item) {
								return _regenerator2.default.wrap(function _callee4$(_context4) {
									while (1) {
										switch (_context4.prev = _context4.next) {
											case 0:
												_context4.next = 2;
												return ProcessIcon(iconName, item, outputFolder, gmConfig);

											case 2:
											case 'end':
												return _context4.stop();
										}
									}
								}, _callee4, _this2);
							}));

							return function (_x15) {
								return _ref9.apply(this, arguments);
							};
						}());

					case 13:
					case 'end':
						return _context5.stop();
				}
			}
		}, _callee5, this);
	}));

	return function Process(_x10, _x11, _x12, _x13) {
		return _ref5.apply(this, arguments);
	};
}();

var _gm = require('gm');

var _gm2 = _interopRequireDefault(_gm);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _svg2png = require('svg2png');

var _svg2png2 = _interopRequireDefault(_svg2png);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _defaultSizes = require('./default-sizes');

var _defaultSizes2 = _interopRequireDefault(_defaultSizes);

var _regexEscape = require('./regex-escape');

var _regexEscape2 = _interopRequireDefault(_regexEscape);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _blueimpTmpl = require('blueimp-tmpl');

var _blueimpTmpl2 = _interopRequireDefault(_blueimpTmpl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ParamMap(str, params) {
	var before = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '%';
	var after = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '%';

	if (str != null) {
		(0, _entries2.default)(params).forEach(function (_ref2) {
			var _ref3 = (0, _slicedToArray3.default)(_ref2, 2),
			    param = _ref3[0],
			    value = _ref3[1];

			if (value != null) {
				var regex = RegExp([(0, _regexEscape2.default)(before + param), '(?:\\(([^\\)]+)\\))?', (0, _regexEscape2.default)(after)].join(''), 'g');
				str = str.replace(regex, function (full, modifiers) {
					if (modifiers) {
						// This bit of code doesn't seem right.
						return modifiers.split(',').reduce(function (current, modifier) {
							if (modifier == '%') {
								return parseFloat(value, 10) * 100;
							} else {
								var matches = modifier.match(/^(\d+)x$/);
								if (matches) {
									return Array(parseInt(matches[1], 10)).fill(value).join('');
								} else {
									return value;
								}
							}
						}, value);
					} else {
						return value;
					}
				});
			}
		});
	}
	return str;
}

function arrayParseConfig(configItem, parentConfig) {
	this.push.apply(this, (0, _toConsumableArray3.default)(ParseConfig(configItem, parentConfig)));
}

function transformArray(key, result) {
	var _this = this;

	var transformed = false;
	if (key instanceof Array) {
		transformed = key.some(function (k) {
			return transformArray.call(_this, k, result);
		});
	} else if (transformed = this[key] instanceof Array) {
		this[key].forEach(function (item) {
			return arrayParseConfig.call(result, (0, _defineProperty3.default)({}, key, item), _this);
		});
	}
	return transformed;
}

function ParseConfig(config) {
	var parentConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	var result = [];
	var bundle = (0, _extends3.default)({
		scale: 1,
		resize: 'fill',
		backgroundColor: 'transparent',
		gravity: 'center'
	}, parentConfig, config);
	if (bundle.size != null) {
		bundle.width = bundle.height = bundle.size;
	}
	bundle.preName = ParamMap(bundle.preName, { preName: parentConfig.preName });
	bundle.name = ParamMap(bundle.name, { name: parentConfig.name });
	bundle.postName = ParamMap(bundle.postName, { postName: parentConfig.postName });
	if (bundle.skip == null) {
		var transformed = transformArray.call(bundle, 'scale size'.split(' '), result);
		if (!transformed && bundle.width != null && bundle.height != null && bundle.name != null) {
			bundle.name = ParamMap(bundle.name, bundle);
			result.push(bundle);
		}
	}
	delete bundle.skip;
	if (config.extend != null) {
		config.extend.forEach(function (extend) {
			return arrayParseConfig.call(result, extend, bundle);
		});
	}
	delete bundle.extend;
	return result;
}

var uniqid = 0;
exports.default = { Process: Process, ParseConfig: ParseConfig, ProcessIcon: ProcessIcon, DefaultSizes: _defaultSizes2.default };