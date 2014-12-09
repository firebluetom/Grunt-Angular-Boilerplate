/*
 * server.js
 * Description: Server tasks
 */
(function(module) {
    'use strict';

    module.exports = function(Grunt) {

        /* Set up bower */
        var Config = Grunt.config;
        var serverBase = Config.get('build.dest.target');
        var serverType = Config.get('environment.target');

        /* Server connect task */
        Grunt.registerTask('server', function() {

            var fs = require('fs');
            var mimeLookup = require('mime');

            //Base folder
            var baseFolder = './' + serverBase.substring(0, serverBase.length - 1);

            var http = require('http');
            var url = require('url');

            var port = {
                'dev': 3000,
                'qa': 3030,
                'prod': 8080
            };

            /* We need these line incase we would like to have a proxy for certain paths */
            var httpProxy = require('http-proxy');
            var proxy = new httpProxy.RoutingProxy();
            var proxyServer = 'localhost',
                proxyPort = 8080;

            /* Start our server and watch the desired port for changes */
            http.createServer(function(Request, Response) {

                //First check if we need a proxy otherwise load through normal flow
                //https://mobile1vip.qa.ch3.s.com
                if (Request.url.match(/^(\/mobileapi5-22\/)/g)) {
                    console.log(Request.url);

                    /* Adjust url */
                    Request.url = 'http://mobile1vip.qa.ch3.s.com' + Request.url;

                    return proxy.proxyRequest(Request, Response, {
                        host: proxyServer,
                        port: proxyPort
                    });
                }

                var url_parts = url.parse(Request.url, true);
                var query = url_parts.query;

                var buildURL = function(parts) {

                    return baseFolder + ((!parts.pathname || parts.pathname === '/') ? '/index.html' : parts.pathname);

                };

                var requestURL = buildURL(url_parts);

                fs.exists(requestURL, function(exists) {

                    /* change the color of certain file types */
                    switch (true) {
                        case (requestURL.indexOf('.json') !== -1):
                            console.log((requestURL).bold.grey);
                            break;
                        case (requestURL.indexOf('.css') !== -1):
                            console.log((requestURL).magenta);
                            break;
                        case (requestURL.indexOf('.js') !== -1):
                            console.log((requestURL).green);
                            break;
                        case (requestURL.indexOf('.html') !== -1):
                            console.log((requestURL).cyan);
                            break;

                        default:
                            console.log((requestURL).grey);
                            break;
                    };

                    if (exists) {
                        fs.readFile(requestURL, function(error, content) {
                            if (error) {
                                Response.writeHead(500);
                                Response.end('Damn - ' + Request.url);
                            } else {
                                Response.writeHead(200, {
                                    'Content-Type': mimeLookup.lookup(requestURL)
                                });
                                Response.end(content, 'utf-8');
                            }
                        });
                    } else {
                        Response.writeHead(404);
                        Response.end('Damn 404 - ' + requestURL);
                    }
                });

            }).listen(port[serverType]);

            console.log('Server running at http://localhost:' + port[serverType] + '/');

        });

        /* Create a task to start server */
        Grunt.registerTask('run', ['server', 'watch']);

    };

})(module);