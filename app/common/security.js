'use strict';

angular.module('Security',['facebook']);


angular.module('Security').config(['FacebookProvider', function(FacebookProvider) {
     // Here you could set your appId through the setAppId method and then initialize
     // or use the shortcut in the initialize method directly.
      FacebookProvider.init('494836457286098');
    }]);


angular.module('Security').controller('LoginController', ['$scope', 'Facebook', 'Login_Common', 'Login_Facebook', 'Login_Twitter', function($scope, Facebook, Login_Common, Login_Facebook, Login_Twitter) {

	$scope.isAuthenticated = false;
	// $scope.isAuthenticated = true;
	$scope.username = 'Juancito';

  // Here, usually you should watch for when Facebook is ready and loaded
  
  // $scope.$watch(function() {
  //   return Facebook.isReady(); // This is for convenience, to notify if Facebook is loaded and ready to go.
  // }, function(newVal) {
  //   $scope.facebookReady = true; // You might want to use this to disable/show/hide buttons and else
  // });

  // From now on you can use the Facebook service just as Facebook api says
  // Take into account that you will need $scope.$apply when inside a Facebook function's scope and not angular
  $scope.login = function() {
    Facebook.login(function(response) {
      if (response.status === 'connected') {
        $scope.status = 'yes';
        alert('permisos aceptados por el usaurio...');
        $scope.isAuthenticated = true;

        // Aqui hay que hacer lo siguiente:
        // - enviar datos al server para login/registrar
        // - enviar al usuario a la siguiente pagina (o recargar donde está pero ahora esta logueado)
        
        
      } else {
        $scope.status = 'no';
        alert('el usuario no acepta los permisos de facebook...');
      }

      $scope.me();

    });
  };

  $scope.getLoginStatus = function() {
    Facebook.getLoginStatus(function(response) {
      if(response.status === 'connected') {
        $scope.$apply(function() {
          $scope.loggedIn = true;
        });
      }
      else {
        $scope.$apply(function() {
          $scope.loggedIn = false;
        });
      }
    });
  };

  $scope.me = function() {
    Facebook.api('/me', {fields: 'last_name'}, function(response) {
      $scope.$apply(function() {
        // Here you could re-check for user status (just in case)
        $scope.user = response;

        alert($scope.user);

      });
    });
  };




  $scope.doLoginCommon = function(){
    // alert("se apreta boton para hacer login comun" + $scope.login_email + " - " + $scope.login_password);

  // json nueva version con varias imagenes
      data = {username: $scope.login_email, password: $scope.login_password};
      Login_Common.save(data, successPostCallback, errorCallback);

    function successPostCallback(){
        alert("login ok");
      }
    function errorCallback(){
        alert("login error");
      }

  };



  $scope.doLoginFacebook = function(){
    // alert("se apreta boton para hacer login comun" + $scope.login_email + " - " + $scope.login_password);

  // json nueva version con varias imagenes
      data = {username: $scope.login_email, password: $scope.login_password};
      Login_Facebook.save(data, successPostCallback, errorCallback);

    function successPostCallback(){
        alert("login ok");
      }
    function errorCallback(){
        alert("login error");
      }

  };





}]);




