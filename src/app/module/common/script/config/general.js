(function(global) {
    "use strict";

    //Set some global flags
    var Application = function() {

        var self = this;

        /* Flags */
        self.isLoaded = false;

        self.debugMode = true;

        self.name = 'myApp';

        /* additional packages you want to load into the application, define them here, they will be added on top of default deps */
        self.packageNames = {
            sample : "core.sample",
            secondOne: "core.secondCore"
        };

        self.version = '0.0.1';

        /* This is the loader application naem */
        self.loader = 'myAppName_loader';

        self.platform = 'default';
        self.environment = 'dev';

        self.baseViewPath = 'platform/' + self.platform;

        console.info('Running in => ' + self.environment);

        /* TODO - Move this to it's own folder */
        self.angular = {
            deps: {
                loader: [
                    'ngSanitize',
                    'ngTouch',
                    'ngRoute',
                    'ngResource',
                    'ngAnimate',
                    'pasvaz.bindonce'
                ],
                main: [

                ]
            },
            views: {}
        };

        /* add the packages into loader object to make them dependencies */
        for(var key in self.packageNames){
            self.angular.deps.loader.push(self.packageNames[key]);
        }

        /* TODO - Move these urls someplace else */
        self.url = {
            style: {
                base: '/style/'
            },
            config: {
                base: '/config/'
            }
        };

    };

    /**
     * processViewUrl
     * @param {url} string The url to process data on
     * TODO - Make this more dynamic to any application config information
     */
    Application.prototype.processViewUrl = function(url) {

        /* Ref to the Application class */
        var self = this;

        /* Replace {{baseViewPath}} */
        url = url.replace('{{baseViewPath}}', self.baseViewPath);

        /* Replace {{platform}} */
        url = url.replace('{{platform}}', self.platform);

        return url;

    };

    /* Add objects to the global */
    global.Application = new Application();

})(window);