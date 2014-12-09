/*
 * lint/_js.js
 * Description:
 */
(function(module) {
    'use strict';

    module.exports = function(Grunt) {

        /* Set up bower */
        var Config = Grunt.config;
        var Pkg = Config.get('package');

        var configKey = 'jshint';
        var configValue = {};

        /* These config objects come from the concat/common.js file */
        var baseSourceCommon = Config.get('concatSourceCommon');
        /* These config objects come from the concat/_core.js file */
        var baseSourceCore = Config.get('concatSourceCore');

        /**
         * buildLinter
         * @param {string} name The name of the sub-task
         * @param {array} src An array of the target JS files
         */
        var buildLinter = function(name, src) {

            configValue[name] = {
                "curly": true,
                "eqnull": true,
                "eqeqeq": true,
                "undef": true,
                globals: {
                    "window": true,
                    "angular": true
                },
                options: {
                    '-W055': true,
                    '-W060': true
                },

                src: src
            };

        };

        /* Lint the common JS files */
        buildLinter('commonAll', baseSourceCommon.src);
        buildLinter('commonConcat', [baseSourceCommon.dest]);

        /* Lint the core JS files */
        buildLinter('coreAll', baseSourceCore.src);
        buildLinter('coreConcat', [baseSourceCore.dest]);

        /* Add common concat to the config object */
        Config.set(configKey, configValue);

        /* Add a task to debug lint */
        Grunt.registerTask('debug.lintJs', [configKey]);

    };

})(module);