'use strict';

	angular.module('MainApp').controller('PostById', function($scope, Posts, $routeParams) {
	  
	  // $scope.msg = "Detalle de un post";
	  var postid = $routeParams.postid;

	  Posts.get({ Id: postid }, function(data) {
	  	$scope.post = data;
	  	// $scope.lat = data["location"];
	  	var yourString = data["location"];
		var result = yourString.substring(1, yourString.length-1);
		var coordenadas = result.split(",");
		
		$scope.dynMarkers = [];
     
          $scope.dynMarkers[0] = new google.maps.Marker({
            title: "Marker: "
          });

          var lat = coordenadas[0];
          var lng = coordenadas[1];
		  var loc = new google.maps.LatLng(lat, lng);

          $scope.dynMarkers[0].setPosition(loc);
          $scope.dynMarkers[0].setMap($scope.map);
          $scope.map.center = loc;
        

       


	  });
	


	
	});