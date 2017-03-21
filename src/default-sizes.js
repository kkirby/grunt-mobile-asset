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