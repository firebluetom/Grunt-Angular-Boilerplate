(function(Global, angular) {
    "use strict";

	angular.module(Global.Application.packageNames.sample).filter('encodeURIComponent', [
		function() {
	    	return encodeURIComponent;
		}
	]);

})(window, angular);