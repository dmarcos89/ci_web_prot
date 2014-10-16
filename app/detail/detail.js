'use strict';

angular.module('MainApp').controller('PostById', function($scope, Posts, Users, $routeParams, Favorite, $location) {
	  
	  // $scope.msg = "Detalle de un post";
	  var postid = $routeParams.postid;

	  Posts.get({ Id: postid }, function(data) {
	  	$scope.post = data;

	  	var userid = data['user_id']
			Users.get({ Id: userid }, function(data) {
      		$scope.user = data;

          // Chequeamos si el posteo ha sido favoriteado por el user
          var favoritos = data['favorites_posts'];
          var fav = false;          
          for (var i = 0; i < favoritos.length && !fav; i++) {
              var idaux = favoritos[i].id;
              if(idaux == postid){ 
                fav = true;
                $scope.fav = true;
              }
          }



    	});



      var postidrelacionado = 27; 
      Posts.get({ Id: postidrelacionado }, function(data2) {
          $scope.postrelacionado = data2;
          // var userid2 = data2['user_id']
          // Users.get({ Id: userid2 }, function(data3) {
          //   $scope.userrelacionado = data3;
          // }
      });


      $scope.nextPost = function(){
        $location.path('/post/'+postidrelacionado);
      }



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


    $scope.unFavorite = function(){
      // alert("dar favorito");
      var data = {user_id:1 , post_id:postid};
      // alert(JSON.stringify(data));
       Favorite.remove(data, successPostCallback, errorCallback);

        function successPostCallback(data){
          alert("desfav correcto");
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