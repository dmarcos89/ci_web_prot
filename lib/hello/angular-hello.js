var helloApp = angular.module('hello', []);
helloApp.factory('hello', function() {
    return window.hello; // Assumes hello has been loaded
});