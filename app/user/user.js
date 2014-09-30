'use strict';

angular.module('MainApp').controller('ViewUser', function($scope, $routeParams, Users, Posts, $timeout, Follow) {
	  
	  var userid = $routeParams.userid;

	  $scope.msg = 'Detalle de un usuario';
	  $scope.isFollower = false;

	  // $scope.tabs = [
   //    { title:'Posteos', content:'Listado de Posteos creados por el usuario' },
   //    { title:'Comentarios', content:'Listado de comentarios hechos por el usuario' },
   //    { title:'Seguidores', content:'Listado de seguidores del usuario' },
   //    { title:'Siguiendo', content:'Listado de personas a quien sigue el usuario' }

      // { title:'Dynamic Title 2', content:'Dynamic content 2', disabled: true }
    // ];

    // $scope.alertMe = function() {
    //   setTimeout(function() {
    //     alert('You\'ve selected the alert tab!');
    //   });
    // };

    Users.get({ Id: userid }, function(data) {
      $scope.user = data;
    
	  });

    $timeout(function(){
        Posts.query(function(data) {
          // alert(data);
          $scope.posts = data;
        });
      }, 100);
    

    $scope.follow = function(){
      alert("Seguir usuario");

      var data = {follower:1 , followed:1};
      // alert(JSON.stringify(data));
       Follow.save(data, successPostCallback, errorCallback);

        function successPostCallback(data){
          alert("follow correcto");
          var r = JSON.stringify(data);
          alert(r);
        }
      function errorCallback(getResponseHeaders){
          alert('follow error');
          var r = JSON.stringify(getResponseHeaders);
          alert(r);
        }

    };

    $scope.unfollow = function(){
      alert("dejar de seguir");
      $scope.isFollower = false;
    }

  });



angular.module('MainApp').controller('ProfileController', function($scope) {
    
    $scope.txt = 'Perfil de usuario';
    
  });



