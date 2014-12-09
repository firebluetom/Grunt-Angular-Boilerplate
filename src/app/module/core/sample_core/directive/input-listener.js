// input-listener.js
// a simple listener for up, down, and enter to be used with autocomplete
// Ex: <input type='text' input-listener on-down='myScopeFuntion()' />
(function(Global, angular) {

    angular.module(Global.Application.packageNames.sample).directive('inputListener', [
        function(){
            return {
                restrict: 'A',
                scope: {
                	onUp: "&", // when you press the up button, run this function
                	onDown: "&", // when you press the down button, run this function
                	onEnter: "&" // when you press enter, run this function
                },
                link: function(scope, element, attrs) {
                	// define some key numbers for later
                	var keys = {left: 37, up: 38, right: 39, down: 40 , enter: 13, esc: 27, tab: 9};

                	element[0].addEventListener("keydown",function (e){
                		var keycode = e.keyCode || e.which;
                		switch (keycode){
	          				case keys.up:
	          					if(scope.onUp)
	          						scope.onUp();
	          					prevention(e);
	          					break;
	          				case keys.down:
	          					if(scope.onDown)
	          						scope.onDown();
	          					prevention(e);
	          					break;
	          				case keys.enter:
	          					if(scope.onEnter)
	          						scope.onEnter();
	          					prevention(e);
	          					break;
	          			}

                	});
                	function prevention(event){
                		try {
                			event.preventDefault();
                			// event.stopPropagation();
                		} catch(error){console.log(error);}
                	}
                }
            };
        }
    ]);

})(window, angular);