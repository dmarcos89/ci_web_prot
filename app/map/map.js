'use strict';

angular.module('MainApp').controller('MapController', function($scope, Posts) {
	  
	  $scope.dynMarkers = [];

    Posts.query(function(data) {
          $scope.posts = data;
	      
          for (var i = 0; i <= $scope.posts.length; i++) {
      		$scope.dynMarkers[i] = new google.maps.Marker({
	            title: "Titulo post"
	          });
	          var lat = $scope.posts[i].latitude;
	          var lng = $scope.posts[i].longitude;
			  var loc = new google.maps.LatLng(lat, lng);
	          // alert(loc);
	          $scope.dynMarkers[i].setPosition(loc);
	          $scope.dynMarkers[i].setMap($scope.map);
          };
          

          // $scope.map.setCenter(loc);

        });

	});
