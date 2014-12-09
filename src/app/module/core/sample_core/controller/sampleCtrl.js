(function (Global, angular) {
 "use strict";

    angular.module(Global.Application.packageNames.sample).controller('sampleCtrl', ['$scope',
        function($scope) {

        	$scope.someOtherScopeVariable = 123123123123123123123123123123132;
        }
    ]);

})(window, angular);