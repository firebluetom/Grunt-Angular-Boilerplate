/*
 * show.js
 * Description: Task to display information about project
 */
(function(module) {
    'use strict';

    module.exports = function(Grunt) {

        /* Set up bower */
        var Config = Grunt.config;
        var configKey = 'show';

        /* Add bower to the config object */
        Config.set(configKey, {
            build: function() {

                var configPackage = Config.get('package');
                var configEnv = Config.get('environment');
                var configBuild = Config.get('build');

                console.log('\n############### START BUILD SETTINGS #################\n'.magenta);

                console.log('Package Name '.green + (configPackage.name).bold);
                console.log('Package Version '.green + (configPackage.version).bold);
                console.log('\nTarget Env '.green + (configEnv.target).bold);
                console.log('Target Folder '.green + (configBuild.dest.target).bold);

                console.log('\n############### END BUILD SETTINGS #################\n'.magenta);

            }
        });

        /* Create a task for showing data */
        Grunt.registerTask(configKey, 'Shows desired data about project', function(target) {

            Config.get('show.' + target)();

        });

        /* Create a task for testing this config */
        Grunt.registerTask('debug.show', [configKey + ':build']);

    };

})(module);