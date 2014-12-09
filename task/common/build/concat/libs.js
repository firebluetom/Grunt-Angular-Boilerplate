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

        var srcFolder = Config.get('build.dest.src.main') + Config.get('build.dest.src.common') + '/script/'
        var libsSrcFolder = Config.get('build.dest.target') + Config.get('build.dest.bower.src');
        var libsConcatFolder = Config.get('build.dest.target') + Config.get('build.dest.bower.concat');

        var concatBanner = '/*! ' + Pkg.name + ' - v' + Pkg.version + ' - ' + Config.get('environment.target') + ' - ' + Pkg.license + ' - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */\n';

        /* Add the libs concat to the list */
        configValue['libs'] = {
            src: [
                libsSrcFolder + '**/angular.js', [libsSrcFolder + '**/*.js'],
                srcFolder + 'lib/*.js'
            ],
            dest: libsConcatFolder + 'libs.js',
            options: {
                stripBanners: true,
                banner: concatBanner,
                process: function(src, filepath) {
                    /* TODO - Add some process to replace version number or other environment information on the spot */
                    return '\n /* Source File: ' + filepath + '*/\n' + src;
                },
            }
        };

        /* Add libs concat to the config object */
        Config.set(configKey, configValue);

    };

})(module);