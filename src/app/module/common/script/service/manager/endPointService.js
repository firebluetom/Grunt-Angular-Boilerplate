// this is an endpoint service, it's a TODO
(function(Global, angular) {

    "use strict";

    /* Define some helper vars */
    var extend = angular.extend;

    /* Build the base service */
    angular.module(Global.Application.name).service('endPointSrvs', [

        function() {

            /* Create a init function of this service */
            var returnService = function() {

                /* Get ref to the class */
                var self = this;

            };

            /**
             * getUrl
             * @param {string} targetService
             * @return {string} Returns the request url or an empty string
             */
            returnService.prototype.getUrl = function(targetEndPoint) {

                /* Get ref to the class */
                var self = this;

                /* This will be the url that is returned */
                var returnUrl = '';

                /* Return the url */
                return returnUrl;

            };


            /* Start up the service and return for injection */
            return new returnService();
        }

    ]);

})(window, angular);