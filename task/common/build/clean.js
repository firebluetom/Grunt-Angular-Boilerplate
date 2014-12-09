/*
 * clean.js
 * Description: Completly clean out build target
 */
(function(module) {
    'use strict';

    module.exports = function(Grunt) {

        /* Set up bower */
        var Config = Grunt.config;
        var configKey = 'clean';

        /* Add bower to the config object */
        Config.set(configKey, {
            full: [Config.get('build.dest.target')],
            coreJs: [
                Config.get('build.dest.src.main') + Config.get('build.dest.src.core') + '/**/loader.js',
                Config.get('build.dest.src.main') + Config.get('build.dest.src.core') + '/core.js'
            ],
            libs: [
                Config.get('build.dest.target') + Config.get('build.dest.bower.src')
            ]
        });

        /* Create a task for testing this config */
        Grunt.registerTask('debug.clean', [configKey + ':full']);

    };

})(module);