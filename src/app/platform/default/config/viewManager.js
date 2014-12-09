/*
 * viewManager.js
 */
(function(Global) {
    "use strict";

    Global.Application.angular.views = {
        //This will be used when a view path is not found
        "otherwise": {
            "redirectTo": "/sample"
        },
        "sample": {
            "hash": "/sample",
            "settings": {
                "templateUrl": "{{baseViewPath}}/view/home.html",
                "controller": "testCtrl"
            }
        },
        "page": {
            "hash": "/page",
            "settings": {
                "templateUrl": "{{baseViewPath}}/view/page.html",
                "controller": "sampleCtrl"
            }
        }
    };

})(window);