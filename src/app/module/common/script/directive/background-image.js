/*
 * Instructions: create a div or other tag, include back-img as attribute, then pass img-url="{{yourValue}}"
 * into the next attribute and your background image will update
 */
(function(Global, angular) {

    angular.module(Global.Application.name).directive('backImg', function(){
    	return {
    		restrict: 'A',
            scope: {
            	imgUrl: '@',
                cover: "@"
            },
            link: function (scope, element, attrs) {
                // save original border
                var origParentBorder = element.parent().css('border');
            	scope.$watch('imgUrl', function(newVal, oldVal){
            		var url = scope.imgUrl;
                    if(url === ''){
                        url = "platform/default/images/no_image.png"; // have a no_image.png in your images folder to show a default image in case this one is not available
                        element.parent().css('border', "none");
                    } else {
                        element.parent().css('border', origParentBorder);
                    }
                    element.css({
                        'background-image': 'url(' + url +')',
                        'background-size' : (scope.cover === 'true') ? 'cover' : 'contain' ,
                        'background-repeat': 'no-repeat',
                        'background-position': 'center',
                        // uncomment below to animate each side of the border below
                        //'transition' : 'border-left 100ms 0 ease, border-top 100ms 50ms ease, border-right 100ms 100ms ease, border-bottom 100ms 150ms ease'
                    });

            	});
            }
    	};
    });

})(window, angular);
