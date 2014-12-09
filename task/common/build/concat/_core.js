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

        var FS = require('fs');

        var configKey = 'concat';
        var configValue = {};

        /* Get file system location for core/common */
        var baseFolder = Config.get('build.dest.src.main');
        var commonFolder = baseFolder + Config.get('build.dest.src.common');
        var coreFolder = baseFolder + Config.get('build.dest.src.core');

        var watchFiles = [];

        var coreFolderTargets = ['controller', 'directive', 'filter', 'service'];
        var concatBanner = '/*! ' + Pkg.name + ' - v' + Pkg.version + ' - ' + Config.get('environment.target') + ' - ' + Pkg.license + ' - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */\n';

        /* Let's get a full list of core modules */
        var coreFolderDirs = FS.readdirSync(coreFolder);
        var combineObj = {};

        /**
         * buildConcat
         * Call this function to add a concat for each core module
         * @param (option) {folderName} string This should contain the name of the folder you wish to target
         * @param (option) {targetDest} string Use this to target a custom dest file
         * @return {number} The result of adding num1 and num2.
         */
        var buildConcat = function(folderName, targetDest, targetFolders) {

            /* Exit if the folder name contains a . */
            if ( !! folderName && folderName.indexOf('.') !== -1) return {};

            /* Process the request */
            var tempFolderTargets = (!targetFolders) ? coreFolderTargets : targetFolders;
            var tempFolderBase = coreFolder + '/' + ((!folderName) ? '' : folderName + '/');
            var tempFolderObject = {
                src: [],
                dest: ((!targetDest) ? (tempFolderBase + 'loader.js') : targetDest),
                options: {
                    stripBanners: true,
                    banner: concatBanner,
                    process: function(src, filepath) {
                        /* TODO - Add some process to replace version number or other environment information on the spot */

                        return '\n /* Source File: ' + filepath + '*/\n' + src;
                    },
                }
            };

            /* Add a line for each item from the coreFolderTargets array */
            for (var i = 0; tempFolderTargets.length > i; i++) {

                tempFolderObject.src.push(tempFolderBase + tempFolderTargets[i] + '/**/*.js');

                /* Push to the watch array also */
                watchFiles.push(tempFolderBase + tempFolderTargets[i] + '/**/*.js');

            }

            /* Add this concat to the main configs */
            configValue[folderName] = tempFolderObject;

            /* Return the object */
            return configValue[folderName];

        };

        /* Build a concat for each module in the coreFolderDirs */
        for (var ii = 0; coreFolderDirs.length > ii; ii++) buildConcat(coreFolderDirs[ii]);

        /* For now we are just going to bring all the core module files into a single file */
        combineObj = buildConcat('combineCore', (Config.get('build.dest.target') + 'script/core.js'), []);

        /* Add a ref to pick up all the loader.js files in the core */
        combineObj.src.push(coreFolder + '/**/loader.js');

        /* Add bower to the config object */
        Config.set(configKey, configValue);

        /* Add the core watch files to the config */
        Config.set('coreJs', watchFiles);

        /* Set this as a config so the lint can have access */
        Config.set('concatSourceCore', {
            src: watchFiles,
            dest: (Config.get('build.dest.target') + 'script/core.js')
        });

        Grunt.registerTask('debug.coreFolders', function() {

            console.log(JSON.stringify(configValue));

        });

    };

})(module);