import gm from 'gm';
import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';
import svg2png from 'svg2png';
import os from 'os';
import DefaultSizes from './default-sizes';
import regexEscape from './regex-escape';
import Promise from 'bluebird';
import tmpl from 'blueimp-tmpl';
import imageSize from 'image-size';

async function svg2png_shim(sourceFile,destFile){
	fs.writeFileSync(destFile,await svg2png(fs.readFileSync(sourceFile)));
}

function ParamMap(str,params,before = '%',after = '%'){
	if(str != null){
		Object.entries(params).forEach(([param,value]) => {
			if(value != null){
				let regex = RegExp([
					regexEscape(before + param),
					'(?:\\(([^\\)]+)\\))?',
					regexEscape(after)
				].join(''),'g');
				str = str.replace(regex,(full,modifiers) => {
					if(modifiers){
						// This bit of code doesn't seem right.
						return modifiers.split(',').reduce((current,modifier) => {
							if(modifier == '%'){
								return parseFloat(value,10) * 100;
							}
							else {
								let matches = modifier.match(/^(\d+)x$/);
								if(matches){
									return Array(parseInt(matches[1],10)).fill(value).join('');
								}
								else {
									return value;
								}
							}
						},value);
					}
					else {
						return value;
					}
				})
			}
		});
	}
	return str;
}

function arrayParseConfig(configItem,parentConfig){
	this.push(...ParseConfig(configItem,parentConfig));
}

function transformArray(key,result){
	let transformed = false;
	if(key instanceof Array){
		transformed = key.some(k => this::transformArray(k,result));
	}
	else if(transformed = this[key] instanceof Array){
		this[key].forEach(item => result::arrayParseConfig({[key]:item},this));
	}
	return transformed;
}

function ParseConfig(config,parentConfig = {}){
	let result = [];
	let bundle = {
		scale: 1,
		resize: 'fill',
		resizeFlags: '',
		backgroundColor: 'transparent',
		gravity: 'Center',
		resizeWidth: null,
		resizeHeight: null,
		...parentConfig,
		...config
	};
	if(bundle.size != null){
		bundle.width = bundle.height = bundle.size;
	}
	bundle.preName = ParamMap(bundle.preName,{preName:parentConfig.preName});
	bundle.name = ParamMap(bundle.name,{name:parentConfig.name});
	bundle.postName = ParamMap(bundle.postName,{postName:parentConfig.postName});
	if(bundle.skip == null){
		let transformed = bundle::transformArray('scale size'.split(' '),result);
		if(!transformed && (bundle.width != null && bundle.height != null && bundle.name != null)){
			bundle.name = ParamMap(bundle.name,bundle);
			result.push(bundle);
		}
	}
	delete bundle.skip;
	if(config.extend != null){
		config.extend.forEach(extend => result::arrayParseConfig(extend,bundle));
	}
	delete bundle.extend;
	return result;
}

let uniqid = 0;

let imageCache = (() => {
	const CACHE = {};
		
	return function(name,fn){
		if(typeof CACHE[name] == 'undefined'){
			CACHE[name] = fn();
		}
		return CACHE[name];
	}
})();

async function ProcessIcon(iconName,config,outputFolder,gmConfig){
	uniqid++;
	let {scale,type,name,width,height,resize,resizeFlags,resizeWidth,resizeHeight,backgroundColor,gravity} = config;
	let inputImageDimensions = imageCache(
		iconName,
		() => imageSize(iconName)
	);
	let tempIconName = path.join(os.tmpdir(),'_icon'+uniqid+'.png');
	fs.writeFileSync(tempIconName,fs.readFileSync(iconName));
	iconName = tempIconName;
	if(config.transform != null){
		let imageData = fs.readFileSync(iconName).toString('base64');
		let tempTransformHolder = path.join(os.tmpdir(),'_iconTransform'+uniqid+'.svg');
		for(let transformFile of config.transform){
			if(!path.isAbsolute(transformFile)){
				transformFile = path.resolve(path.join(__dirname,'..','transforms',transformFile));
			}
			
			fs.writeFileSync(
				tempTransformHolder,
				tmpl(
					fs.readFileSync(transformFile).toString(),
					{
						image: 'data:image/png;base64,' + imageData,
						...config,
						inputImageDimensions
					}
				)
			);
			await svg2png_shim(tempTransformHolder,iconName);
		}
	}
	let iconInstance = gm(iconName);
	iconInstance.options(gmConfig || {});
	let resizeFlag = {
		fill: '^',
		exact: '!',
		fit: '',
	}[resize] + resizeFlags;
	var aspect = inputImageDimensions.width / inputImageDimensions.height;
	
	if(resizeWidth !== null){
		if(typeof resizeWidth == 'string' && resizeWidth.indexOf('%') != -1){
			resizeWidth = Math.round(width * ((parseInt(resizeWidth,10) * scale) / 100));
		}
		if(resizeHeight == null){
			resizeHeight = Math.round(resizeWidth / aspect);
		}
	}
	
	if(resizeHeight !== null){
		if(typeof resizeHeight == 'string' && resizeHeight.indexOf('%') != -1){
			resizeHeight = Math.round(height * ((parseInt(resizeHeight,10) * scale) / 100));
		}
		if(resizeWidth == null){
			resizeWidth = Math.round(resizeHeight * aspect);
		}
	}
	
	if(resizeWidth == null && resizeHeight == null){
		resizeWidth = width;
		resizeHeight = height;
	}
	
	iconInstance
		.background(backgroundColor)
		.resize(resizeWidth * scale,resizeHeight * scale,resizeFlag)
		.gravity(gravity)
		.extent(width * scale,height * scale);
	await Promise.promisify(mkdirp)(outputFolder);
	await Promise.promisify(iconInstance.write.bind(iconInstance))(
		path.join(outputFolder,name.toString()+'.'+type.toString())
	);
}

async function Process(iconName,outputFolder,config,gmConfig){
	if(Object.getPrototypeOf(config).constructor.name == 'Object'){
		await Promise.map(Object.entries(config),async ([platform,platformConfig]) => {
			await Process(iconName,path.join(outputFolder,platform),platformConfig,gmConfig);
		});
	}
	else {
		let tempIconName = path.join(os.tmpdir(),'_icon.png');
		let extension = iconName.substr(iconName.lastIndexOf('.') + 1);
		if(extension == 'svg'){
			await svg2png_shim(iconName,tempIconName);
			iconName = tempIconName;
		}
		await Promise.map(config,async (item) => {
			await ProcessIcon(iconName,item,outputFolder,gmConfig);
		});
	}
}

export default {Process,ParseConfig,ProcessIcon,DefaultSizes};