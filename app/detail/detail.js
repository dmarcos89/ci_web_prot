'use strict';

	angular.module('MainApp').controller('PostById', function($scope, Posts, $routeParams) {
	  
	  // $scope.msg = "Detalle de un post";
	  var postid = $routeParams.postid;

	  Posts.get({ Id: postid }, function(data) {
	  	$scope.post = data;
	  	$scope.lat = data["location"];

	  });
	


	
	});