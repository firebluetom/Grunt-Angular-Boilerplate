// this is not unlike bootstrapping your application.
// loads configurations for different modules
(function(Global, angular) {
    "use strict";

    /* Build the module */
    angular.module(Global.Application.name).service('platformSrvs', ['$http', 'applicationSrvs',

        function($http, applicationSrvs) {

            /* Create a init function of this service */
            var returnService = function() {

                /* Get ref to the class */
                var self = this;

                /* Store the current platform from the global application config */
                self.focusPlatform = Global.Application.platform;

                /* Ref to the config data */

                /* Define some flags for the platform service */
                self.flag = {
                    loaded: {
                        config: 0,
                        styles: 0
                    }
                };

                /* Define the paths for styles and config data */
                self.paths = {
                    base: Global.Application.baseViewPath,
                    styles: Global.Application.url.style.base,
                    config: Global.Application.url.config.base
                };

                /* Load any config information from the server */
                self.loadConfig();

                /* Load in the styles on init */
                self.loadStyles();

            };

            /**
             * loadStyleSheet
             */
            var loadStyleSheet = function(url, rtnCallback) {

                if (document.createStyleSheet) {

                    try {
                        document.createStyleSheet(url);
                    } catch (e) {}

                } else {

                    //Creates a link element
                    var css = document.createElement('link');

                    //Attach correct attributes
                    css.rel = 'stylesheet';
                    css.type = 'text/css';
                    css.media = "all";
                    css.href = url;

                    //Apped to the head
                    document.getElementsByTagName("head")[0].appendChild(css);
                }

                //Check if rtnCallback is a function and than execute it
                if (typeof rtnCallback === 'function') rtnCallback();

            };

            /**
             * getPath
             * @param {string} type The type of the path to create
             * @param (optional) {string} appendToPath Any string you wish to append to the end of the path
             * @return {string} Returns a string with the full path you asked for
             */
            returnService.prototype.getPath = function(type, appendToPath) {

                /* Get ref to the class */
                var self = this;

                /* Check if appendToPath is empty */
                if (!appendToPath) appendToPath = '';

                /* Return the path with base attached */
                return self.paths.base + self.paths[type] + appendToPath;

            };

            /**
             * loadStyles
             * This method will load the correct style sheet for the platform you are on
             */
            returnService.prototype.loadStyles = function() {

                /* Get ref to the class */
                var self = this;

                /* Make sure the styles has not been loaded */
                if (!self.flag.loaded.styles) {

                    /* Build url and load in styles */
                    var styleUrl = self.getPath('styles', 'style.css');
                    loadStyleSheet(styleUrl);

                }

            };

            /**
             * loadConfig
             * This method will make sure we pick up any platform specific config information
             */
            returnService.prototype.loadConfig = function() {

                /* Get ref to the class */
                var self = this;

                /* Make sure the config data has not been loaded */
                if (!self.flag.loaded.config) {

                    /* Load in config data */
                    $http.get(self.getPath('config', 'output.json')).then(function(response) {

                        /* Push the result data into the storage obejct */
                        applicationSrvs.pushConfig(response.data);

                        /* Set the config flag to 1 */
                        self.flag.loaded.config = 1;

                    }, function() {

                        /* Push the result data into the storage obejct */
                        applicationSrvs.pushConfig({});

                        /* Set the config flag to 0 */
                        self.flag.loaded.config = 0;

                    });

                }

            };

            /* Start up the service and return for injection */
            return new returnService();

        }
    ]);

})(window, angular);