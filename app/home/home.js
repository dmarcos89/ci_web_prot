'use strict';

angular.module('MainApp').controller('HomeController', function($scope, PopularPosts, Users) {
  $scope.message = 'Esta es la home';
  $scope.dynMarkers = [];

  PopularPosts.query( {n:20} , function(data){
    $scope.posts = data;
	  for (var i = 0; i <= $scope.posts.length; i++) {
	  	$scope.dynMarkers[i] = new google.maps.Marker({
            title: 'Titulo post'
          });
          var lat = $scope.posts[i].latitude;
          var lng = $scope.posts[i].longitude;
		  var loc = new google.maps.LatLng(lat, lng);
          // alert(loc);
          $scope.dynMarkers[i].setPosition(loc);
          $scope.dynMarkers[i].setMap($scope.map);
      };
  });


});


