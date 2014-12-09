// convert camel case to separate words with init caps
// Ex: helloWorld -> Hello World
(function(Global, angular) {

    angular.module(Global.Application.name).filter('unCamel', [
        function() {
	    	return function(something){
	    		if(something){
	    			var toReturn = something //something.replace(/([A-Z])/g, function($1){return " "+$1.toLowerCase();});
	    			.replace(/([a-z])([A-Z])/g, '$1 $2')
			        // space before last upper in a sequence followed by lower
			        // .replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1 $2$3')
			        // uppercase the first character
			        .replace(/^./, function(str){ return str.toUpperCase(); });
	    			toReturn = toReturn.split('_').join(' ');
	    			return toReturn;
	    		}
	    		else
	    			return something;
	    	};
		}
    ]);

})(window, angular);
