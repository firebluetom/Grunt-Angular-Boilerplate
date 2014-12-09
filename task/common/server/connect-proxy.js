/*
 * connect-proxy.js
 * This is a TODO, not even started, just copied some stuff
 */
(function(module) {
    'use strict';

    module.exports = function(Grunt) {

        /* Set up bower */
        var Config = Grunt.config;
        var configKey = 'watch';

        /* Add bower to the config object */
        Config.set(configKey, {
            html: {
                files: Config.get('build.dest.src.main') + '/' + Config.get('build.fileTypes.html'),
                tasks: ['copy:init']
            },
            scss: {
                files: Config.get('build.dest.src.main') + '/' + Config.get('build.fileTypes.scss'),
                tasks: ['rebuild.sass']
            },

            /* Watch for changes on the core JS */
            /*            coreJs: {
                files: Config.get('coreJs'),
                tasks: [
                    'concatJs'
                ]
            },*/
            /* Watch for changes on the common JS */
            commonJs: {
                files: [Config.get('build.dest.src.main') + '/**/*.js'],
                tasks: ['concatJs']
            },

            configJson: {
                files: [Config.get('build.dest.src.main') + Config.get('build.dest.src.platform') + '/**/*.json'],
                tasks: ['concatConfig']
            }

        });

        /* Create a task for testing this config */
        Grunt.registerTask('debug.watch', [configKey + ':html']);

    };

})(module);