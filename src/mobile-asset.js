import MobileAsset from './mobile-asset-lib';

module.exports = function(grunt){
	function getFiles(context){
		let files = [];
		context.files.forEach(f => files.push(f));
		return files;
	}
	
	function mobileAsset(){
		let done = this.async();
		let promise = async () => {
			let options = this.options({
				defaultSpec: 'icons'
			});
		
			let processConfig = options.processConfig || MobileAsset.DefaultSizes[options.defaultSpec];
			if(processConfig.ios != null || processConfig.android != null || processConfig.windows != null){
				Object.entries(processConfig).forEach(([platform,platformConfig]) => {
					processConfig[platform] = MobileAsset.ParseConfig(platformConfig);
				});
			}
			else {
				processConfig = MobileAsset.ParseConfig(processConfig);
			}
			for(let file of getFiles(this)){
				let _source = file.src || file.source;
				let sources = do {
					if(!(_source instanceof Array)){
						[_source]
					}
					else {
						_source
					}
				};
				let dests = do {
					if(!(file.dest instanceof Array)){
						[file.dest];
					}
					else {
						file.dest;
					}
				}
				for(let source of sources){
					for(let dest of dests){
						await MobileAsset.Process(source,dest,processConfig,options.gmConfig);
					}
				}
			}
		};
		promise().then(
			done,
			e => done(e)
		);
	}
	
	grunt.registerMultiTask(
		'mobile-asset',
		'A plugin that generates mobile assets, such as icons.',
		mobileAsset
	);
	
	grunt.registerMultiTask(
		'mobile_asset',
		'A plugin that generates mobile assets, such as icons.',
		mobileAsset
	);
};

module.exports.DefaultSizes = MobileAsset.DefaultSizes;