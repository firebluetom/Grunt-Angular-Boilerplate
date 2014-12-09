/*
 * _default.js
 * Description:
 */
(function(module) {
    'use strict';

    module.exports = function(Grunt) {

        /* Set up compass */
        var Config = Grunt.config;
        var target = Config.get('environment.target');

        var configKey = 'compass';
        var configValue = {
            clean: {
                options: {
                    clean: true,
                    quiet: true
                }
            }
        };

        /* Get list off active platforms to build a style sheet for */
        var activePlatforms = Config.get('platform.active');
        var platformFolderBase = Config.get('build.dest.src.main') + Config.get('build.dest.src.platform') + '/';
        var targetFolderBase = Config.get('build.dest.target') + Config.get('build.dest.src.platform') + '/';

        /**
         * buildPlatformConfig
         * @param {string} platformName The platform name to process a compass config for
         */
        var buildPlatformConfig = function(platformName) {

            var tempSassFolder = platformFolderBase + platformName + '/style/sass';
            var tempCssFolder = targetFolderBase + platformName + '/style';

            configValue[platformName] = {
                options: {
                    environment: ((target === 'prod') ? 'production' : 'production'), //TODO - Fix this to point at the correct env
                    outputStyle: 'nested', //'compressed',

                    /*dryRun: true, Uncomment to just see what is going to happen */
                    quiet: false,
                    trace: true,
                    force: true,

                    cssDir: tempCssFolder,
                    sassDir: tempSassFolder
                }
            };

        };

        /* Build a config for each active platform */
        for (var i = 0; activePlatforms.length > i; i++) buildPlatformConfig(activePlatforms[i]);

        /* Add compass to the config object */
        Config.set(configKey, configValue);

        /* Create a task for testing this config */
        Grunt.registerTask('debug.compass', [configKey + ":clean", configKey + ":default"]);

    };

})(module);