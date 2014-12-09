/*
 * concat/core.js
 * Description:
 */
(function(module) {
    'use strict';

    module.exports = function(Grunt) {

        /* Set up bower */
        var Config = Grunt.config;
        var Pkg = Config.get('package');

        var configKey = 'concat';
        var configValue = Config.get(configKey);

        var srcFolder = Config.get('build.dest.src.main') + Config.get('build.dest.src.common') + '/script/';
        var platformFolder = Config.get('build.dest.src.main') + Config.get('build.dest.src.platform') + '/';
        var concatFolder = Config.get('build.dest.target') + 'script/';

        var concatBanner = '/*! ' + Pkg.name + ' - v' + Pkg.version + ' - ' + Config.get('environment.target') + ' - ' + Pkg.license + ' - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */\n';

        var concatSource = {
            src: [
                srcFolder + 'config/general.js',
                platformFolder + 'default/config/viewManager.js',
                srcFolder + 'application.js', [
                    srcFolder + '**/*.js',
                    '!' + srcFolder + 'lib/*.js'
                ]
            ],
            dest: concatFolder + 'common.js'
        };

        /* Add the common concat to the list */
        configValue['common'] = {
            src: concatSource.src,
            dest: concatSource.dest,
            options: {
                stripBanners: true,
                banner: concatBanner,
                process: function(src, filepath) {
                    /* TODO - Add some process to replace version number or other environment information on the spot */
                    return '\n /* Source File: ' + filepath + '*/\n' + src;
                },
            }
        };

        /* Add common concat to the config object */
        Config.set(configKey, configValue);

        /* Set this as a config so the lint can have access */
        Config.set('concatSourceCommon', concatSource);

    };

})(module);