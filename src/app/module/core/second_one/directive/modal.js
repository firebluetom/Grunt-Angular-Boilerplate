//modal directive - taken from ng-modal.js

(function(Global, angular) {
    "use strict";

    angular.module(Global.Application.packageNames.secondOne).provider("ngModalDefaults", [
    	function() {
		    return {
		     	options: {
		        	closeButtonHtml: "<span class='instock-no-img large-instock-no'></span>"
			    },
			    $get: function() {
			        return this.options;
			    },
			    set: function(keyOrHash, value) {
			        var k, v, _results;
			        if (typeof keyOrHash === 'object') {
			        	_results = [];
			          for (k in keyOrHash) {
			            v = keyOrHash[k];
			            _results.push(this.options[k] = v);
			          }
			          return _results;
			        } else {
			        	this.options[keyOrHash] = value;
			          	return this.options[keyOrHash];
			        }
				}
		    };
		}
	]);

	angular.module(Global.Application.packageNames.secondOne).directive('modalDialog', ['ngModalDefaults', '$sce',
		function(ngModalDefaults, $sce) {
	    	return {
	        	restrict: 'E',
	        	scope: {
	        	    show: '=',
	          		dialogTitle: '@',
	          		dialogTitleVar: '=',
	          		titleClass: '@',
	          		onClose: '&?',
	          		hideModal: '&?'
	        	},
	        	replace: true,
	        	templateUrl: "platform/default/view/templates/modal.html",
				transclude: true,
	        	link: function(scope, element, attrs) {
	        		var setupCloseButton, setupStyle;
	          		setupCloseButton = function() {
	          			scope.closeButtonHtml = $sce.trustAsHtml(ngModalDefaults.closeButtonHtml);
	            		return scope.closeButtonHtml;
	          		};
					setupStyle = function() {
						scope.dialogStyle = {};
						if (attrs.width) {
							scope.dialogStyle.width = attrs.width;
						}
						if (attrs.height) {
							scope.dialogStyle.height = attrs.height;
						 	return scope.dialogStyle.height;
						}
					};
					if(!scope.hideModal){
						scope.hideModal = function() {
		          			scope.show = false;
		            		return scope.show;
		          		};
					}

	          		scope.$watch('show', function(newVal, oldVal) {
	            		if (newVal && !oldVal) {
	              			document.getElementsByTagName("body")[0].style.overflow = "hidden";
		            	} else {
		              		document.getElementsByTagName("body")[0].style.overflow = "";
		            	}
			            if ((!newVal && oldVal) && (scope.onClose !== null)) {
			              	return scope.onClose();
			            }
	          		});
	          		scope.$watch('dialogTitleVar', function(newVal, oldVal) {
	            		if (newVal) {
	              			scope.dialogTitle = newVal + "";
		            	}
	          		});
	          		setupCloseButton();
	          		return setupStyle();
	        	}
	      	};
    	}
    ]);

})(window, angular);