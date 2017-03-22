"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
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
			type: "png",
			extend: [{ name: 'land-hdpi', width: 800, height: 480 }, { name: 'land-ldpi', width: 320, height: 200 }, { name: 'land-mdpi', width: 480, height: 320 }, { name: 'land-xhdpi', width: 1280, height: 720 }, { name: 'port-hdpi', width: 480, height: 800 }, { name: 'port-ldpi', width: 200, height: 320 }, { name: 'port-mdpi', width: 320, height: 480 }, { name: 'port-xhdpi', width: 720, height: 1280 }]
		},
		ios: {
			type: 'png',
			extend: [{ name: 'Default-568h@2x~iphone', width: 640, height: 1136 }, { name: 'Default-667h', width: 750, height: 1334 }, { name: 'Default-736h', width: 1242, height: 2208 }, { name: 'Default-Landscape-736h', width: 2208, height: 1242 }, { name: 'Default-Landscape@2x~ipad', width: 2048, height: 1536 }, { name: 'Default-Landscape~ipad', width: 1024, height: 768 }, { name: 'Default-Portrait@2x~ipad', width: 1536, height: 2048 }, { name: 'Default-Portrait~ipad', width: 768, height: 1024 }, { name: 'Default@2x~iphone', width: 640, height: 960 }, { name: 'Default~iphone', width: 320, height: 480 }]
		}
	}
};