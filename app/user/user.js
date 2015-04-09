'use strict';

angular.module('MainApp').controller('ViewUser', function($scope, $rootScope ,$routeParams, Users, PostsByUser, Posts, $timeout, Follow, UserFollowed, UserFollowers, UserFavorites) {
	  
	  var userid = $routeParams.userid;

	  $scope.msg = 'Detalle de un usuario';
	  // $scope.isFollower = false;
    // $scope.sameUser = false;


    $timeout(function(){
        
     // var logueado = $rootScope.userid;
     // alert(logueado);

      Users.get({ Id: userid }, function(data) {
        $scope.user = data;

        $scope.fotoPerfil = 'aaa';
        

        UserFollowed.query({ Id: $rootScope.userid }, function(datos) {
          $scope.siguiendo = datos;
          // alert(JSON.stringify(datos));

          // Chequeamos si el usuario logueado es SEGUIDOR de userid que se visita:
          var x = chequearSeguidor($rootScope.userid, userid, $scope.siguiendo);
          if(x === -1){
            $scope.sameUser = true;
            $scope.isFollower = false;
          }
          if(x === 1){
            $scope.sameUser = false;
            $scope.isFollower = true;
          }
          if(x === 0){
            $scope.sameUser = false;
            $scope.isFollower = false;
          }
        });
      


        UserFollowed.query({ Id: userid }, function(datos){
          $scope.siguiendo2 = datos;
        });

        UserFollowers.query({ Id: userid }, function(datos){
          $scope.seguidores = datos;
        });

        UserFavorites.query({ Id: userid }, function(datos){
          $scope.favoritos = datos;
        });


	    });

      // PostsByUser.query({ Id: userid }, function(data) {
      //   $scope.posts = data;
      //   if(data){
      //     alert("con posts");
      //   }else{
      //     alert("sin posts;");
      //   }
      // });


      PostsByUser.query({ Id: userid }, successPostCallback, errorCallback);
       $scope.cantidadposteos = 0;
 
       function successPostCallback(data){
            $scope.posts = data;
            $scope.cantidadposteos = data.length;
          // alert("con posts");
        }
      function errorCallback(getResponseHeaders){
          var r = JSON.stringify(getResponseHeaders);
          // alert(r);
          // $scope.posts = [];
        }
    
    }, 1500);



    $scope.follow = function(){
      // alert('Seguir usuario');

      var data = {follower: $rootScope.userid , followed: userid};
      // alert(JSON.stringify(data));
       Follow.save(data, successPostCallback, errorCallback);

        function successPostCallback(data){
          // alert("follow correcto");
          var r = JSON.stringify(data);
          // alert(r);
          $scope.isFollower = true;
        }
      function errorCallback(getResponseHeaders){
          // alert('follow error');
          var r = JSON.stringify(getResponseHeaders);
          // alert(r);
        }

    };

    $scope.unfollow = function(){
      // alert("Dejar de seguir");

      var data = {follower: $rootScope.userid , followed: userid};
      // alert(JSON.stringify(data));
       Follow.remove(data, successPostCallback, errorCallback);

        function successPostCallback(data){
          // alert("follow correcto");
          var r = JSON.stringify(data);
          // alert(r);
          $scope.isFollower = false;
        }
      function errorCallback(getResponseHeaders){
          // alert('follow error');
          var r = JSON.stringify(getResponseHeaders);
          // alert(r);
        }

    };




   


    function chequearSeguidor(idLogueado, idVisitado, datosUser){
      if(idLogueado === idVisitado){
        return -1; //-1 significa que estoy viendo mi propio perfil
      }else{
        var folls = datosUser;
        var arrayLength = folls.length;
        // alert("largo "+arrayLength);
        var esSeguidor = false;
        for (var i = 0; i < arrayLength && !esSeguidor; i++) {
          // alert(folls[i].id + "==?" + idVisitado );
          if(Number(folls[i].id) === Number(idVisitado)){
            // alert("1");
            esSeguidor = true;
            return 1; // 0 significa que el idlogueado es seguidor del idvisitado
          }
        }
        // alert("0");
        return 0;
      }
    }


  });



angular.module('MainApp').controller('DashboardController', function($scope, $timeout, Users, $routeParams, $rootScope, $location) {
      $timeout(function(){
        if($rootScope.userid == ''){
            $location.path('/home');
        }else{

            Users.get({ Id: $rootScope.userid }, function(data) {
            $scope.user = data;
            // Chequeamos si el usuario logueado es SEGUIDOR de userid que se visita:
            var x = chequearSeguidor($rootScope.userid, userid, data);
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
      }
    
    }, 1200);
    
  });


angular.module('MainApp').controller('NotificationsController', function($scope, $rootScope, Notifications, $timeout) {

  $scope.notifs = '';

  var x = function(){
      if($rootScope.isAuthenticated == true){
        // console.log('a');
        Notifications.query({ user_id: $rootScope.userid }, success, errorcall );
        $timeout(x, 5000);
      }else{
        // console.log('no hay logueado. no chequeamos notif');
        $timeout(x, 5000);
      }
    };

    x();
     
    function success(data){
      // alert('b');
      // console.log(data);
      $scope.notifs = data;
    }

    function errorcall(getResponseHeaders){
      // alert('c');
      console.log(getResponseHeaders);
    }

    
  });









