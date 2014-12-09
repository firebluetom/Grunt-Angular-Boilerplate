/*
 * concat/config.js
 * Description: Task to concat all the platform config JSON data
 */
(function(module) {
    'use strict';

    module.exports = function(Grunt) {

        /* Set up bower */
        var Config = Grunt.config;
        var Pkg = Config.get('package');

        var configKey = 'concatJson';
        var configValue = {};

        var taskList = [];

        var activePlatforms = Config.get('platform.active');
        var platformFolderBase = Config.get('build.dest.src.main') + Config.get('build.dest.src.platform') + '/';
        var targetFolderBase = Config.get('build.dest.target') + Config.get('build.dest.src.platform') + '/';

        /**
         * buildPlatformConfig
         * @param {string} platformName The platform name to process a config for
         */
        var buildPlatformConfig = function(platformName) {

            var tmpName = 'config.' + platformName;
            var tmpSource = [platformFolderBase + 'default/config/'];

            /* If we are not the default platform add the platform configs */
            if (platformName !== 'default') tmpSource.push(platformFolderBase + platformName + '/config/');

            /* Add the concat to the list */
            configValue[tmpName] = {
                src: tmpSource,
                dest: {
                    dir: targetFolderBase + platformName + '/config/',
                    file: 'output.json'
                }
            };

            /* Push the task name to the list for easy calling later */
            taskList.push(configKey + ':' + tmpName);

        };

        /* Build a config for each active platform */
        for (var i = 0; activePlatforms.length > i; i++) buildPlatformConfig(activePlatforms[i]);

        /* Add compass to the config object */
        Config.set(configKey, configValue);

        /* Create a task to call at build time */
        Grunt.registerTask('concatConfig', taskList);

        Grunt.task.registerMultiTask('concatJson', 'Build Locale files.', function() {

            var that = this;
            var len = this.filesSrc.length;
            var outputDir = that.data.dest.dir;
            var outputFile = outputDir + that.data.dest.file;
            var originalFile;
            var destFile;
            var fileJson = {};
            var merged;

            var deepExtend = function() {
                if (arguments.length < 1 || typeof arguments[0] !== 'object') {
                    return false;
                }

                if (arguments.length < 2) return arguments[0];

                var target = arguments[0];

                // convert arguments to array and cut off target object
                var args = Array.prototype.slice.call(arguments, 1);

                var key, val, src, clone;

                args.forEach(function(obj) {
                    if (typeof obj !== 'object') return;

                    for (key in obj) {
                        if (!(key in obj)) continue;

                        src = target[key];
                        val = obj[key];

                        if (val === target) continue;

                        if (typeof val !== 'object' || val === null) {
                            target[key] = val;
                            continue;
                        }

                        if (typeof src !== 'object' || src === null) {
                            clone = (Array.isArray(val)) ? [] : {};
                            target[key] = deepExtend(clone, val);
                            continue;
                        }

                        if (Array.isArray(val)) {
                            clone = (Array.isArray(src)) ? src : [];
                        } else {
                            clone = (!Array.isArray(src)) ? src : {};
                        }

                        target[key] = deepExtend(clone, val);
                    }
                });

                return target;
            };

            var iterateTroughFiles = function(abspath, rootdir, subdir, filename) {

                if (abspath.indexOf('.json') !== -1) {

                    // If output dir doesnt exists, then create it
                    if (!Grunt.file.exists(outputDir)) Grunt.file.mkdir(outputDir);

                    originalFile = Grunt.file.readJSON(abspath);

                    /* Concat the latest file with the current built JSON */
                    fileJson = deepExtend(fileJson, originalFile);

                }

            };

            /* Remove the target file to make sure we have a clean JSON file */
            if (!Grunt.file.exists(outputFile)) Grunt.file.delete(outputFile);

            /* Cycle through the files to create the new JSON object */
            for (var x = 0; x < len; x++) {
                Grunt.file.recurse(this.filesSrc[x], iterateTroughFiles);
            }

            /* Write the final JSON value to the output file */
            Grunt.file.write(outputFile, JSON.stringify(fileJson));

            /* Let the user know the file was saved */
            console.log('File Created => ' + outputFile);

        });

    };

})(module);