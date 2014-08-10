'use strict';

angular.module('Security',['facebook']);


angular.module('Security').config(['FacebookProvider', function(FacebookProvider) {
        FacebookProvider.init('494836457286098');
      }]);

angular.module('Security').controller('LoginController', ['$scope', 'Facebook', 'Login_Common', 'Login_Facebook', 'Login_Twitter', function($scope, Facebook, Login_Common, Login_Facebook, Login_Twitter) {


  angular.element(document).ready(function () {
        $scope.checkLogin();
      });



	$scope.isAuthenticated = false;
	// $scope.isAuthenticated = true;
	$scope.username = '';

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
        $scope.me();



        
      } else {
        $scope.status = 'no';
        alert('el usuario no acepta los permisos de facebook...');
      }

      

    }, {scope: 'email'} );
  };

  $scope.getLoginStatus = function() {
    Facebook.getLoginStatus(function(response) {
      if(response.status === 'connected') {
        $scope.$apply(function() {
          $scope.loggedIn = true;
          // alert("el usuario ya está logueado con facebook...");
        });
      }
      else {
        $scope.$apply(function() {
          $scope.loggedIn = false;
          // alert("el usuario no está logueado con facebook");
        });
      }
    });
  };

  $scope.me = function() {
    Facebook.api('/me', function(response) {
      $scope.$apply(function() {
        // Here you could re-check for user status (just in case)
        $scope.user = response;
        $scope.facebookid = response.id;
        $scope.fullname = response.name;
        $scope.username = response.first_name;
        $scope.lastname = response.last_name;
        $scope.email = response.email;
        $scope.gender = response.gender;
        $scope.locale = response.locale;

        alert('Good to see you, ' + response.name + ':' + response.email);

      });
    });
  };




  $scope.doLoginCommon = function(){
    // alert("se apreta boton para hacer login comun" + $scope.login_email + " - " + $scope.login_password);

  // json nueva version con varias imagenes
      data = {email: $scope.login_email, password: $scope.login_password};
      Login_Common.save(data, successPostCallback, errorCallback);

    function successPostCallback(){
        alert("login ok");
      }
    function errorCallback(){
      alert("error al hacer login");
      }

  };



  $scope.doLoginFacebook = function(){

    Facebook.login(function(response) {
      if (response.status === 'connected') {
        $scope.status = 'yes';
        alert('permisos aceptados por el usaurio...');
        // $scope.isAuthenticated = true;
        $scope.me();
        // Aqui hay que hacer lo siguiente:
        // - enviar datos al server para login/registrar
        data = {user:{ username: $scope.fullname, email: $scope.email, first_name: $scope.first_name, last_name: $scope.last_name, facebook_id: $scope.facebookid}};
        Login_Facebook.save(data, successPostCallback, errorCallback);
        // - enviar al usuario a la siguiente pagina (o recargar donde está pero ahora esta logueado)
        
      } else {
        $scope.status = 'no';
        alert('el usuario no acepta los permisos de facebook...');
      }

    }, {scope: 'email'} );
      

    function successPostCallback(){
        alert("login ok con fb");
      }
    function errorCallback(){
        alert("login error al login con fb");
      }

  };



  $scope.checkLogin = function(){
    alert("chequear la cookie al cargar la pantalla...");
  };


}]);




