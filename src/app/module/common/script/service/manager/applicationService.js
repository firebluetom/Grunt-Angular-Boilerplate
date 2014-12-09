// this file sets up the routes defined in your viewManager
(function(Global, angular) {
    "use strict";

    /* Define some helper vars */
    var extend = angular.extend;

    /* Build the module */
    angular.module(Global.Application.name).service('applicationSrvs', ['$route', '$timeout',

        function($route, $timeout) {

            /* Create a init function of this service */
            var returnService = function() {

                /* Get ref to the class */
                var self = this;

                /* Create a placeholder for the application config */
                self.Application = Global.Application;

                /* Provider Ref */
                self.routeProvider = {};

            };

            /**
             * pushConfig
             * @param {object} platformConfig This will contain the platform config information
             */
            returnService.prototype.pushConfig = function(platformConfig) {

                /* Get ref to the class */
                var self = this;

                /* Merge the platformConfig with the Application config information */
                self.Application = extend(self.Application, platformConfig);

                /* Now that we may have new views we need to update routes */
                self.updateRoutes(self.Application.angular.views);

            };

            /** TODO - Maybe move this to it's own service?
             * updateRoutes
             * @param {object} platformRoutes An object with platform route data
             */
            returnService.prototype.updateRoutes = function(platformRoutes) {

                /* Get ref to this class */
                var self = this;

                var views = (!platformRoutes) ? self.Application.angular.views : platformRoutes;
                var currentView = null;

                //Loop through the views defined in general.js
                for (var viewKey in views) {
                    if (views.hasOwnProperty(viewKey)) {

                        currentView = views[viewKey];

                        /* Process the url to make sure we replace any needed values */
                        if (currentView.settings) {

                            currentView.settings.templateUrl = Global.Application.processViewUrl(currentView.settings.templateUrl);

                        }

                        //Check what kind of insert we should make
                        switch (viewKey) {
                            case 'otherwise':
                                self.routeProvider.otherwise(currentView);
                                break;

                            default:
                                self.routeProvider.when(currentView.hash, currentView.settings);
                                break;
                        }

                    }
                }

                /* After views have been start up the application  */
                $timeout(function() {
                    $route.reload();
                }, 0);

            };

            /* Start up the service and return for injection */
            return new returnService();

        }
    ]);

})(window, angular);