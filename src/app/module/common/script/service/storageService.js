/* storage.js
 * It is assumed we are working on a modern browser with local storage.
 * Data is persisted for 30 minutes by default.
 */

(function(Global, angular) {
    "use strict";

    angular.module(Global.Application.name).service('storageService', [
        function() {
            document.domain = window.location.hostname;
            var storageToUse = localStorage;
            // storageToUse = sessionStorage;

            var storageObject = {
                save: function(key, jsonData, expirationMin){// default is 30 minute expiration
                    if(!expirationMin)
                        expirationMin = 30;
                    var expirationMS = expirationMin * 60 * 1000;
                    var record = {
                        value: JSON.stringify(jsonData),
                        timestamp: new Date().getTime() + expirationMS
                    };
                    storageToUse.setItem(key, JSON.stringify(record));

                    return jsonData;
                },
                load: function(key){
                    var record = JSON.parse(storageToUse.getItem(key));

                    if (!record){
                        return false;
                    }
                    return (new Date().getTime() < record.timestamp && JSON.parse(record.value));
                },
                remove: function(key){
                    storageToUse.removeItem(key);
                }
            };

            // implementation using localStorage. Possibility to use $cookie service instead.
        	return storageObject;
        }
    ]);

})(window, angular);