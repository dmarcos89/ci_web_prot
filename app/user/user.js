'use strict';

angular.module('MainApp').controller('ViewUser', function($scope, $rootScope ,$routeParams, Users, PostsByUser, $timeout, Follow) {
	  
	  var userid = $routeParams.userid;

	  $scope.msg = 'Detalle de un usuario';
	  // $scope.isFollower = false;
    // $scope.sameUser = false;

     $timeout(function(){
        
     

     var logueado = $rootScope.userid;
     // alert(logueado);

    Users.get({ Id: userid }, function(data) {
      $scope.user = data;
      // Chequeamos si el usuario logueado es SEGUIDOR de userid que se visita:
      var x = chequearSeguidor(logueado, userid, data);
      if(x == -1){
        $scope.sameUser = true;
        $scope.isFollower = false;
      }
      if(x == 1){
        $scope.sameUser = false;
        $scope.isFollower = true;
      }
      // alert($scope.checkFollow);

	  });

    PostsByUser.query({ Id: userid }, function(data) {
      // alert(data);
      $scope.posts = data;


    });
    
     }, 1500);

    $scope.follow = function(){
      alert("Seguir usuario");

      var data = {follower: logueado , followed: userid};
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

      var data = {follower: logueado , followed: userid};
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

      var data = {id: userid, username:$scope.username, first_name:$scope.first_name, last_name:$scope.last_name, email: $scope.email };
      // alert(JSON.stringify(data));
       Users.update(data, successPostCallback, errorCallback);

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


    function chequearSeguidor(idLogueado, idVisitado, datosUser){
      if(idLogueado === idVisitado){
        return -1; //-1 significa que estoy viendo mi propio perfil
      }else{
        var folls = datosUser.followers;
        var arrayLength = folls.length;
        var esSeguidor = false;
        for (var i = 0; i < arrayLength && !esSeguidor; i++) {
            // alert(folls[i].id);
            if(folls[i].id == idLogueado){
              return 1; // 0 significa que el idlogueado es seguidor del idvisitado
            }            
        }
        return 0;
      }
    }


  });



angular.module('MainApp').controller('DashboardController', function($scope, $timeout, Users, $routeParams, $rootScope) {
    
    $scope.txt = 'Perfil de usuario';

    // var userid = $routeParams.userid;

    $scope.msg = 'Detalle de un usuario';
    // $scope.isFollower = false;
    // $scope.sameUser = false;

     
     // alert(logueado);

      $timeout(function(){
        var logueado = $rootScope.userid;
      Users.get({ Id: logueado }, function(data) {
      $scope.user = data;
      // Chequeamos si el usuario logueado es SEGUIDOR de userid que se visita:
      var x = chequearSeguidor(logueado, userid, data);
      if(x == -1){
        $scope.sameUser = true;
        $scope.isFollower = false;
      }
      if(x == 1){
        $scope.sameUser = false;
        $scope.isFollower = true;
      }
      // alert($scope.checkFollow);

    });
    
    }, 1200);
    
  });









