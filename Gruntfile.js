/*
 * Gruntfile.js
 */
'use strict';

module.exports = function(Grunt) {

    /* Set up config object */
    Grunt.initConfig({});

    var Config = Grunt.config;

    /* Declare the folder order to load tasks */
    var taskFolderBase = 'task/';
    var taskFolders = [
        'common/build',
        'common/build/concat',
        'common/build/lint',
        'common/build/sass',
        'common/build/minify',
        'common/server',
        'common/deploy',
        'common/test',
        ''
    ];

    /* Load all grunt taskes */
    require('matchdep').filterDev('grunt-*').forEach(Grunt.loadNpmTasks);

    /* Load colors */
    require('colors');

    /* Load all config JSONs */
    Grunt.loadTasks(taskFolderBase + 'common');

    /* Build current build target based on configs */
    var buildTargetEnv = Config.get('environment.target');
    var buildTargetFolder = Config.get('build.dest.builds.main') + Config.get('build.dest.builds.' + buildTargetEnv);

    /* Make sure we change config to match current target */
    Config.set('build.dest.target', buildTargetFolder);

    /* Load in all task from the taskFolders array */
    for (var i = 0; taskFolders.length > i; i++) Grunt.loadTasks(taskFolderBase + taskFolders[i]);

};