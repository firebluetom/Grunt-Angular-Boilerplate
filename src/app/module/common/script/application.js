/*
 * application.js
 */
(function(Global, angular) {
    "use strict";

    /* This will create the main application that depends on the loader applications status */

    /* Instantiate packages so that they are available for injection */
    angular.forEach(Global.Application.packageNames, function(value, index){
        angular.module(value, []);
    });

    var mainApplication = angular.module(Global.Application.name, Global.Application.angular.deps.loader.concat(Global.Application.angular.deps.main));

    /* Local ref to the route provided */
    var routeProvider = null;

    /**
     * This function will start up the application and cause all views to be loaded
     */
    mainApplication.config(['$routeProvider', '$locationProvider', '$httpProvider',
        function($routeProvider, $locationProvider, $httpProvider) {

            /* Create a ref to the routeProvider */
            routeProvider = $routeProvider;

        }
    ]).run(['$rootScope', 'applicationSrvs', 'platformSrvs', '$templateCache', '$http',
        function($rootScope, applicationSrvs, platformSrvs, $templateCache, $http) {
            /* We need this run method to make sure certain global services are loaded prior to othe controllers/services */


            /* Add the route provider ref to the application service */
            applicationSrvs.routeProvider = routeProvider;

            //REMOVEME
            $rootScope.getViewPath = function(viewEnd) {

                return Global.Application.baseViewPath + '/view' + viewEnd;

            };

        }
    ]);

})(window, angular);