'use strict';

angular.module('MainApp').controller('MapController', function($scope, Posts) {
	  
	  $scope.dynMarkers = [];

    Posts.query(function(data) {
          $scope.posts = data;
	      
        });

	});
