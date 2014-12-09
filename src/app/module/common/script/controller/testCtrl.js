(function (Global, angular) {
 "use strict";

 	angular.module(Global.Application.name).controller('testCtrl', ['$scope', '$timeout', '$q', // dependency injection which is minification safe
        function($scope, $timeout, $q) {

            // this is a common controller, available throughout the application, not dependent on a cores
            $scope.scopeValue = 'testing';
        }
    ]);

})(window, angular);