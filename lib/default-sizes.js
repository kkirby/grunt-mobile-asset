"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray2 = require("babel-runtime/helpers/slicedToArray");

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	icons: {
		android: {
			name: "icon-%size%-%spec%",
			type: "png",
			transform: ["android.svg"],
			extend: [{ size: 36, spec: "ldpi" }, { size: 48, spec: "mdpi" }, { size: 72, spec: "hdpi" }, { size: 96, spec: "xhdpi" }, { size: 144, spec: "xxhdpi" }, { size: 192, spec: "xxxhdpi" }, { size: 512, spec: "artwork" }]
		},
		ios: {
			size: [29, 40, 50, 57, 60, 72, 76],
			type: "png",
			name: "icon-%size%",
			extend: [{ scale: 2, name: "%name%@%scale%x" }, { scale: 3, name: "%name%@%scale%x" }]
		},
		windows: {
			type: "png",
			extend: [{
				size: 50,
				name: "Store%size%x%size%Logo.scale-%scale(%)%",
				skip: true,
				extend: [{ scale: 1 }, { scale: 1.4 }, { scale: 1.8 }]
			}, {
				size: [30, 70, 150, 310],
				name: "Square%size%x%size%Logo.scale-%scale(%)%",
				skip: true,
				extend: [{ scale: 0.8 }, { scale: 1 }, { scale: 1.4 }, { scale: 1.8 }]
			}]
		}
	},
	launch: {
		android: {
			name: "launch-%width%-%height%",
			type: "png",
			extend: [{
				width: 320,
				height: 480
			}]
		},
		ios: {
			type: 'png',
			extend: "\n\t\t\t\t\tDefault-568h@2x~iphone            640x1136\n\t\t\t\t\tDefault-667h                      750x1334\n\t\t\t\t\tDefault-736h                      1242x2208\n\t\t\t\t\tDefault-Landscape-736h            2208x1242\n\t\t\t\t\tDefault-Landscape@2x~ipad         2048x1536\n\t\t\t\t\tDefault-Landscape~ipad            1024x768\n\t\t\t\t\tDefault-Portrait@2x~ipad          1536x2048\n\t\t\t\t\tDefault-Portrait~ipad             768x1024\n\t\t\t\t\tDefault@2x~iphone                 640x960\n\t\t\t\t\tDefault~iphone                    320x480\n\t\t\t\t".trim().split('\n').map(function (file) {
				var _file$trim$split = file.trim().split(/\s+/),
				    _file$trim$split2 = (0, _slicedToArray3.default)(_file$trim$split, 2),
				    name = _file$trim$split2[0],
				    size = _file$trim$split2[1];

				var _size$split$map = size.split('x').map(function (int) {
					return parseInt(int, 10);
				}),
				    _size$split$map2 = (0, _slicedToArray3.default)(_size$split$map, 2),
				    width = _size$split$map2[0],
				    height = _size$split$map2[1];

				return {
					name: name,
					width: width,
					height: height
				};
			})
		}
	}
};