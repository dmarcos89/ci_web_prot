'use strict';

angular.module('MainApp').controller('HomeController', function($scope, Posts2) {
  $scope.message = 'Esta es la home';

  Posts2.query(function(data){
	$scope.posts = data;
  });

});

