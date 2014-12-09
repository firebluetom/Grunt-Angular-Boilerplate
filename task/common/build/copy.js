/*
 * copy.js
 * Description: Move files from src to target build
 * @todo: Allow for copies based on target build
 */
(function(module) {
    'use strict';

    module.exports = function(Grunt) {

        /* Set up bower */
        var Config = Grunt.config;
        var configKey = 'copy';

        /* Add bower to the config object */
        Config.set(configKey, {
            init: {
                files: [{
                    expand: true,
                    cwd: Config.get('build.dest.src.main'),
                    src: [
                        Config.get('build.fileTypes.html')
                    ],
                    dest: Config.get('build.dest.target'),
                    flatten: false,
                    filter: 'isFile',
                }]
            },
            assets: {
                files: [{
                    expand: true,
                    cwd: Config.get('build.dest.src.main') + '/platform',
                    src: Config.get('build.fileTypes.assets'),
                    dest: Config.get('build.dest.target') + 'platform',
                    flatten: false,
                    filter: 'isFile',
                },{
                    expand: true,
                    cwd: Config.get('build.dest.src.java'),
                    src: Config.get('build.fileTypes.all'),
                    dest: Config.get('build.dest.target') + 'WEB-INF',
                    flatten: false,
                    filter: 'isFile',
                }]
            }
        });

        /* Create a task for testing this config */
        Grunt.registerTask('debug.copy', [configKey + ':assets']);

    };

})(module);