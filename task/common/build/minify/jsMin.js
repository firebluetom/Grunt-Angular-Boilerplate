/*
 * jsMin.js
 * Description: minify javascript files. TODO
 */
(function(module) {
    'use strict';

    module.exports = function(Grunt) {

        var Config = Grunt.config;
        var configKey = 'minify';

        var concatSourceCommon = Config.get('concatSourceCommon');
        // add to config object
        var targets = { files: {}};
        targets.files[concatSourceCommon.dest.replace('.js', '.min.js')] = [concatSourceCommon.dest];
        // console.log(targets);
        Config.set(configKey, {
            uglify: {
			    targets: targets
			}
        });

        /* Create a task for testing this config */
        Grunt.registerTask('debug.minify', [configKey + ":uglify"]);

    };

})(module);