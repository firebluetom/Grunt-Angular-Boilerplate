/*
 * karma.js
 * Description:
 */
(function(module) {
    'use strict';

    module.exports = function(Grunt) {

        /* Set up bower */
        var Config = Grunt.config;
        var configKey = 'karma';

        /* Add bower to the config object */
        Config.set(configKey, {
            unit: {
                configFile: 'karma.conf.js'
            }
        });

    };

})(module);