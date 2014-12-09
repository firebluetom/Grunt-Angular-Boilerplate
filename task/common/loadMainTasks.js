/*
 * loadMainTasks.js
 * Description: as named
 */
(function(module) {
    'use strict';

    module.exports = function(Grunt) {

        /* Set up bower */
        var Config = Grunt.config;

        /* Define the default task that will clean/build/run this project */
        Grunt.registerTask('default', [
            'show:build',
            'rebuild.init',
            'rebuild.sass',

            // 'debug.minify',

            'run'
        ]);

        /* Default help task to clean/build code base */
        Grunt.registerTask('rebuild.init', [
            'clean:full',
            'copy:init',
            'concatJs',
            'concatConfig'
        ]);

        Grunt.registerTask('rebuild.sass', [
            'compass',
            'copy:assets'
        ]);

        /* Task to concat all the needed js files */
        Grunt.registerTask('concatJs', [
            'bower',
            'concat',
            'clean:coreJs',
            'clean:libs',
            'jshint'
        ]);

        //Grunt.registerTask('minifyFiles', [
          //  'minify:JS'
        //]);

        /* Task to run test cases */
        Grunt.registerTask('run.test', [
            'karma'
        ]);

    };

})(module);