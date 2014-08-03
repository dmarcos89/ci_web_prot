'use strict';

angular.module('Security',['facebook']);

angular.module('Security').controller('LoginController', function($scope) {
      $scope.isAuthenticated = false;
      // $scope.isAuthenticated = true;
    });


angular.module('Security').config(['FacebookProvider', function(FacebookProvider) {
     // Here you could set your appId through the setAppId method and then initialize
     // or use the shortcut in the initialize method directly.
      FacebookProvider.init('494836457286098');
    }]);
