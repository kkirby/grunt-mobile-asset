/*
 * grunt-mobile-asset
 * https://github.com/kkirby/grunt-mobile-asset
 *
 * Copyright (c) 2014 Kyle Kirbatski
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
	grunt.initConfig({
		mobile_asset: {
			// This produces just icons since `icons` is default.
			default_options: {
				options: {},
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

	// Actually load this plugin's task(s).
	grunt.loadTasks('tasks');

};
