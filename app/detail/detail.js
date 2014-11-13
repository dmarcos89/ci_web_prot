'use strict';

angular.module('MainApp').controller('PostById', function($scope, $cookies, $rootScope, Posts, Users, $routeParams, Favorite, $location, UserFavorites, Comments) {
	  
	  // $scope.msg = "Detalle de un post";
	  var postid = $routeParams.postid;

	  Posts.get({ Id: postid }, function(data) {
	  	$scope.post = data;

      var userid2 = data.user_id;
      Users.get({ Id: userid2 }, function(data3) {
        $scope.usuariodelpost = data3;

        var tipologueo = data3.login_type;
        // alert(tipologueo);
        $scope.fotocreador = '';

        if(tipologueo === 'facebook'){
          $scope.fotocreador = data3.url_avatar;
        }
        if(tipologueo === 'twitter'){
          $scope.fotocreador = data3.url_avatar;
        }
        if(tipologueo === 'common'){
          $scope.fotocreador = data3.file_url;
        }


      });



      // Comments.get({ Id: postid }, function(data){
      //   alert(data);
      // });


      var postidrelacionado = parseInt(postid) + 1; 
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

          var lat = data['latitude'];
          var lng = data['longitude'];

		      var loc = new google.maps.LatLng(lat, lng);
          // alert(loc);
          $scope.dynMarkers[0].setPosition(loc);
          $scope.dynMarkers[0].setMap($scope.map);

          $scope.map.setCenter(loc);

      } );
	



    UserFavorites.query({ Id: $cookies.userid }, function(data) {
          // $scope.user = data;
          // Chequeamos si el posteo ha sido favoriteado por el user
          $scope.favoritos = data;
          var favoritos = data;
          var fav = false;          
          for (var i = 0; i < data.length && !fav; i++) {
              var idaux = data[i].id;
              // alert(idaux);
              if(idaux == postid){ 
                fav = true;
                $scope.fav = true;
              }
          }
      });





	  $scope.doFavorite = function(){
	  	// alert("dar favorito");
	  	var data = {user_id: $cookies.userid , post_id:postid};
	  	// alert(JSON.stringify(data));
	  	 Favorite.save(data, successPostCallback, errorCallback);

        function successPostCallback(data){
          // alert("fav correcto");
          var r = JSON.stringify(data);
          // alert(r);
          $scope.post.favorites_quantity ++;
          $scope.fav = true;
          toaster.pop('success', "Nuevo favorito", "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum quae quo minima neque, quam.");
        }
        
        function errorCallback(getResponseHeaders){
          alert('error');
          var r = JSON.stringify(getResponseHeaders);
          alert(r);
        }

	  };


    $scope.unFavorite = function(){
      // alert("dar favorito");
      var data = {user_id: $cookies.userid , post_id:postid};
      // alert(JSON.stringify(data));
       Favorite.remove(data, successPostCallback, errorCallback);

        function successPostCallback(data){
          // alert("desfav correcto");
          var r = JSON.stringify(data);
          // alert(r);
          $scope.post.favorites_quantity --;
          $scope.fav = false;
        }
        
        function errorCallback(getResponseHeaders){
          alert('error');
          var r = JSON.stringify(getResponseHeaders);
          alert(r);
        }

    };


    $scope.comentar = function(){
      var logueduser = $cookies.userjson.split(",");
      var aux1 = ((logueduser[3].split(":"))[1]);
      var nombreusuario = aux1.substring(1, aux1.length-1);
      var aux2 = ((logueduser[4].split(":"))[1]);
      var apellidousuario = aux2.substring(1, aux2.length-1);
      //alert(nombreusuario + ' ' + apellidousuario);

      //Actualizamos el html con el nuevo comentario
      var comment1 = {"text":$scope.textocomentario,"first_name":nombreusuario,"last_name":apellidousuario,"avatar":$rootScope.userthumb};
      $scope.post.comments.push(comment1);

      

      $scope.textocomentario = "";
    };

	
	});