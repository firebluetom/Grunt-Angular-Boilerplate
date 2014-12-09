(function(module) {
    'use strict';

    var fs = require('fs');

    module.exports = function(Grunt) {

        /* Set up compass */
        var Config = Grunt.config;
        var target = Config.get('environment.target');

        var configKey = 'war';
        var configValue = {
            target: {
                options: {
                    war_dist_folder: Config.get('build.dest.target'),
                    war_verbose: true,
                    war_name: Config.get('build.war_name'),
                    webxml_welcome: 'index.html',
                    webxml_display_name: Config.get('build.war_name'),
                    webxml_mime_mapping: [{
                        extension: 'woff',
                        mime_type: 'application/font-woff'
                    }],
                    webxml: function(opts) {
                        return fs.readFileSync(Config.get('build.dest.src.java')+'/web.xml', 'binary');
                    },
                },
                files: [{
                    expand: true,
                    cwd: Config.get('build.dest.target'),
                    src: ['**', '!*.war'],
                    dest: ''
                }]
            }
        };

        /* Add compass to the config object */
        Config.set(configKey, configValue);

    };

})(module);