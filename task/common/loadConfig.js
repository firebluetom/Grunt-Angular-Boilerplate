/*
 * loadConfig.js
 * Description: Load all config information for build
 */
(function(module) {
    'use strict';

    module.exports = function(Grunt) {

        /* Define vars */
        var Config = Grunt.config;

        var configFolerBase = './config/';
        var configFolders = {
            package: {
                folder: 'package.json'
            },
            environment: {
                folder: 'environment.json'
            },
            build: {
                folder: 'build.json'
            },
            platform: {
                folder: 'platform.json'
            }
        };

        /* Call this function to load JSON file */
        var loadFile = function(folderKey, withoutBase) {

            /* Define some local vars */
            var fileLocation = ((!withoutBase) ? configFolerBase : '') + configFolders[folderKey].folder;

            /* Check if file exist */
            var validFile = Grunt.file.exists(fileLocation);

            /* Placeholder for json data */
            var fileJson = {};

            if (!validFile) {

                /* Show error log */
                console.log(('ERROR => Config file could not load => ' + fileLocation).red);

            } else {

                /* Load data from JSON file */
                fileJson = Grunt.file.readJSON(fileLocation);

            }

            /* Add JSON information to the Grunt config */
            Config.set(folderKey, fileJson);

        };
        var logConfigData = function(key) {

            console.log('ConfigKey => ' + key + '\nConfigData => ' + JSON.stringify(Config.get(key)));

        };

        /* Import the package config information */
        loadFile('package', true);

        /* Import the environment config information */
        loadFile('environment');

        /* Import the build config information */
        loadFile('build');

        /* Import the platform config information */
        loadFile('platform');

        /* Create a task for testing this config */
        Grunt.registerTask('debug.config', 'Display current config information', function() {

            /* Output all config information */
            for (var configKey in configFolders) {

                if (configFolders.hasOwnProperty(configKey)) {

                    logConfigData(configKey);

                }

            }

        });

    };

})(module);