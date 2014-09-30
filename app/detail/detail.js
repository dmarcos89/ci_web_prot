'use strict';

angular.module('MainApp').controller('PostById', function($scope, Posts, $routeParams, Favorite) {
	  
	  // $scope.msg = "Detalle de un post";
	  var postid = $routeParams.postid;

	  Posts.get({ Id: postid }, function(data) {
	  	$scope.post = data;
		$scope.dynMarkers = [];
     
          $scope.dynMarkers[0] = new google.maps.Marker({
            title: "Marker: "
          });

          var lat = data['longitude'];
          var lng = data['latitude'];
		  var loc = new google.maps.LatLng(lat, lng);

          $scope.dynMarkers[0].setPosition(loc);
          $scope.dynMarkers[0].setMap($scope.map);

          $scope.map.setCenter(loc);
      });
	


	  $scope.doFavorite = function(){
	  	// alert("dar favorito");
	  	var data = {user_id:1 , post_id:postid};
	  	// alert(JSON.stringify(data));
	  	 Favorite.save(data, successPostCallback, errorCallback);

        function successPostCallback(data){
          alert("fav correcto");
          var r = JSON.stringify(data);
          alert(r);
        }
      function errorCallback(getResponseHeaders){
          alert('error');
          var r = JSON.stringify(getResponseHeaders);
          alert(r);
        }

	  };

	
	});