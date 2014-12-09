/*
 * bower.js
 * Description: Create a task to install all frontend dep
 */
(function(module) {
    'use strict';

    module.exports = function(Grunt) {

        /* Set up bower */
        var Config = Grunt.config;
        var configKey = 'bower';

        /* Add bower to the config object */
        Config.set(configKey, {
            build: {
                dest: Config.get('build.dest.target') + Config.get('build.dest.bower.src')
            }
        });

        /* Create a task for testing this config */
        Grunt.registerTask('debug.bower', [configKey + ":build"]);

    };

})(module);