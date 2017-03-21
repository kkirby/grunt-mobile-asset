# grunt-mobile-asset

This is a grunt plugin used to convert images to different sizes. Very useful when generating launch images or icons for mobile applications. Check out [Gruntfile.js](https://github.com/kkirby/grunt-mobile-asset/blob/master/Gruntfile.js) for usage and [src/default-sizes.js](https://github.com/kkirby/grunt-mobile-asset/blob/master/src/default-sizes.js) for examples of the spec you can supply.

This library requires either imagemagick or graphicsmagic. You can switch between either by use of the option `gmConfig`:

```javascript
{
	gmConfig: {
		imageMagick: true
	}
}
```

## Capabilities of library

-	The ability to resize an image to any dimension based on a configuration
-	Accepts SVG and any image type that graphicsmagic supports
-	Transform the icon through to an SVG filter (useful for adding rounded borders)
-	Flexible configuration allowing scales, inheritance, specifiying multiple sizes, etc.

## Example

This is pulled from [default-sizes.js](https://github.com/kkirby/grunt-mobile-asset/master/src/default-sizes.js):

```javascript
export default {
	icons: {
		android: {
			name: "icon-%size%-%spec%",
			type: "png",
			transform: ["android.svg"],
			extend: [
				{ size: 36, spec: "ldpi" },
				{ size: 48, spec: "mdpi" },
				{ size: 72, spec: "hdpi" },
				{ size: 96, spec: "xhdpi" },
				{ size: 144, spec: "xxhdpi" },
				{ size: 192, spec: "xxxhdpi" },
				{ size: 512, spec: "artwork" }
			]
		},
		ios: {
			size: [
				29,
				40,
				50,
				57,
				60,
				72,
				76
			],
			type: "png",
			name: "icon-%size%",
			extend: [
				{ scale: 2, name: "%name%@%scale%x" },
				{ scale: 3, name: "%name%@%scale%x" }
			]
		},
		windows: {
			type: "png",
			extend: [
				{
					size: 50,
					name: "Store%size%x%size%Logo.scale-%scale(%)%",
					skip: true,
					extend: [{ scale: 1 }, { scale: 1.4 }, { scale: 1.8 }]
				},
				{
					size: [30, 70, 150, 310],
					name: "Square%size%x%size%Logo.scale-%scale(%)%",
					skip: true,
					extend: [{ scale: 0.8 }, { scale: 1 }, { scale: 1.4 }, { scale: 1.8 }]
				}
			]
		}
	},
	launch: {
		android: {
			name: "launch-%width%-%height%",
			type: "png",
			extend: [
				{
					width: 320,
					height: 480
				}
			]
		},
		ios: {
			type: 'png',
			extend: do {
				`
					Default-568h@2x~iphone            640x1136
					Default-667h                      750x1334
					Default-736h                      1242x2208
					Default-Landscape-736h            2208x1242
					Default-Landscape@2x~ipad         2048x1536
					Default-Landscape~ipad            1024x768
					Default-Portrait@2x~ipad          1536x2048
					Default-Portrait~ipad             768x1024
					Default@2x~iphone                 640x960
					Default~iphone                    320x480
				`.trim().split('\n').map(file => {
					let [name,size] = file.trim().split(/\s+/)
					let [width,height] = size.split('x').map(int => parseInt(int,10));
					return {
						name,
						width,
						height
					}
				});
			}
		}
	}
};
```

This will produce these files:

```
android/icon-144-xxhdpi.png
android/icon-192-xxxhdpi.png
android/icon-36-ldpi.png
android/icon-48-mdpi.png
android/icon-512-artwork.png
android/icon-72-hdpi.png
android/icon-96-xhdpi.png
android/launch-320-480.png
ios/Default-568h@2x~iphone.png
ios/Default-667h.png
ios/Default-736h.png
ios/Default-Landscape-736h.png
ios/Default-Landscape@2x~ipad.png
ios/Default-Landscape~ipad.png
ios/Default-Portrait@2x~ipad.png
ios/Default-Portrait~ipad.png
ios/Default@2x~iphone.png
ios/Default~iphone.png
ios/icon-29.png
ios/icon-29@2x.png
ios/icon-29@3x.png
ios/icon-40.png
ios/icon-40@2x.png
ios/icon-40@3x.png
ios/icon-50.png
ios/icon-50@2x.png
ios/icon-50@3x.png
ios/icon-57.png
ios/icon-57@2x.png
ios/icon-57@3x.png
ios/icon-60.png
ios/icon-60@2x.png
ios/icon-60@3x.png
ios/icon-72.png
ios/icon-72@2x.png
ios/icon-72@3x.png
ios/icon-76.png
ios/icon-76@2x.png
ios/icon-76@3x.png
windows/Square150x150Logo.scale-100.png
windows/Square150x150Logo.scale-140.png
windows/Square150x150Logo.scale-180.png
windows/Square150x150Logo.scale-80.png
windows/Square30x30Logo.scale-100.png
windows/Square30x30Logo.scale-140.png
windows/Square30x30Logo.scale-180.png
windows/Square30x30Logo.scale-80.png
windows/Square310x310Logo.scale-100.png
windows/Square310x310Logo.scale-140.png
windows/Square310x310Logo.scale-180.png
windows/Square310x310Logo.scale-80.png
windows/Square70x70Logo.scale-100.png
windows/Square70x70Logo.scale-140.png
windows/Square70x70Logo.scale-180.png
windows/Square70x70Logo.scale-80.png
windows/Store50x50Logo.scale-100.png
windows/Store50x50Logo.scale-140.png
windows/Store50x50Logo.scale-180.png
```

Here is an example grunt task:

```javascript
grunt.initConfig({
	mobile_asset: {
		// This produces just icons since `icons` is default.
		default_options: {
			files: {
				'tmp/': 'test/icon.svg'
			}
		},
		// This will produce launch images.
		launch: {
			options: {
				defaultSpec: 'launch'
			},
			files: {
				'tmp/': 'test/launchimage.png'
			}
		}
	}

});
```

You can also pass a `processConfig` option inside of `options` to specify the configuration to use as opposed to using the default one.