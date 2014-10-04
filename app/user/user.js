'use strict';

angular.module('MainApp').controller('ViewUser', function($scope, $rootScope ,$routeParams, Users, PostsByUser, $timeout, Follow) {
	  
	  var userid = $routeParams.userid;

	  $scope.msg = 'Detalle de un usuario';
	  $scope.isFollower = false;



    // var useridAux = $rootScope.userid; 
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

    PostsByUser.query({ Id: userid }, function(data) {
      // alert(data);
      $scope.posts = data;


    });
    

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
      alert("Dejar de seguir");

      var data = {follower:1 , followed:1};
      // alert(JSON.stringify(data));
       Follow.remove(data, successPostCallback, errorCallback);

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




    $scope.editarPerfil = function(){
      alert("editar perfil usuario");

      var data = {id:1, username:$scope.username, first_name:$scope.first_name, last_name:$scope.last_name, email: $scope.email };
      // alert(JSON.stringify(data));
       Users.save(data, successPostCallback, errorCallback);

        function successPostCallback(data){
          alert("edicion de usuario correcto");
          var r = JSON.stringify(data);
          alert(r);
        }
      function errorCallback(getResponseHeaders){
          alert('edicion de usuario- error!!');
          var r = JSON.stringify(getResponseHeaders);
          alert(r);
        }

    };




  });



angular.module('MainApp').controller('ProfileController', function($scope) {
    
    $scope.txt = 'Perfil de usuario';
    
  });









