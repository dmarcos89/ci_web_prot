'use strict';

angular.module('Security',['facebook']);


angular.module('Security').config(['FacebookProvider', function(FacebookProvider) {
        FacebookProvider.init('494836457286098');
      }]);

angular.module('Security').controller('LoginController', ['$scope', 'Facebook', 'Login_Common', 'Login_Facebook', 'Login_Twitter', 'Register_Common',function($scope, Facebook, Login_Common, Login_Facebook, Login_Twitter, Register_Common){


  $scope.isAuthenticated = false;
  $scope.username = '';


  angular.element(document).ready(function () {
        $scope.checkLogin();
      });

  $scope.checkLogin = function(){
    
    // Aqui primero deberia revisar por la cookie, y a partir de ahi ver si es usuario comun, fb o tw. Por ahora vamos directo a fb
    $scope.getLoginStatus();
  
  };



  // Here, usually you should watch for when Facebook is ready and loaded
  
  // $scope.$watch(function() {
  //   return Facebook.isReady(); // This is for convenience, to notify if Facebook is loaded and ready to go.
  // }, function(newVal) {
  //   $scope.facebookReady = true; // You might want to use this to disable/show/hide buttons and else
  // });

  $scope.getLoginStatus = function() {
    Facebook.getLoginStatus(function(response) {
      if(response.status === 'connected') {
        $scope.$apply(function() {
          // alert("Usuario logueado:"+$scope.facebookid+"-"+$scope.fullname+"-"+$scope.username+"-"+$scope.lastname+"-"+$scope.email+"-"+$scope.gender+"-"+$scope.locale);
          alert("usuario logueado");
          $scope.me();
          $scope.isAuthenticated = true;
          $scope.loginType = 'FB';
        });
      }
      else {
        $scope.$apply(function() {
          alert("el usuario no está logueado con facebook");
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

        // alert('Good to see you, ' + response.name + ':' + response.email);

      });
    });
  };







  $scope.doLoginCommon = function(){
      data = {email: $scope.login_email, password: $scope.login_password};
      Login_Common.save(data, successPostCallback, errorCallback);

      // ---------------------------
      // ESTO ES PARA PROBAR EL LOGIN CON FACEBOOK PERO DE FORMA MANUAL
      // data = {username: 'Ndsaaaaaa2', email: 'haaaaaaaola@dada.com', first_name: 'Naasdaae3', last_name: 'Aao3', facebook_id: 'F21312312okId3', avatar:'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xpf1/t1.0-1/c13.0.50.50/p50x50/10376166_10152166623504436_3969573622742641215_n.jpg'};
      // Login_Facebook.save(data, successPostCallback, errorCallback);
      // ------------------------

    function successPostCallback(){
        alert('login MANUAL ok');
        $scope.isAuthenticated = true;
        $scope.loginType = 'COMMON';
      }
    function errorCallback(){
      alert('error al hacer login MANUAL');
      }

  };




  $scope.doRegisterCommon = function(){
      data = {username: $scope.reg_first_name+" "+$scope.reg_last_name, email: $scope.reg_email, first_name: $scope.reg_first_name, last_name: $scope.reg_last_name, password: $scope.reg_password, city:"Ciudad", country:"Pais"};
      Register_Common.save(data, successPostCallback, errorCallback);

      function successPostCallback(){
        alert('registro MANUAL ok');
      }
      function errorCallback(){
      alert('error al hacer registro MANUAL');
      }

    };


  $scope.doLoginFacebook = function(){
    Facebook.login(function(response) {
      if (response.status === 'connected') {
        $scope.status = 'yes';
        // alert('permisos aceptados por el usaurio...');
        // $scope.isAuthenticated = true;
        $scope.me();
        
        var photoUrl = 'http://graph.facebook.com/';
        data = {username: $scope.fullname, email: $scope.email, first_name: $scope.first_name, last_name: $scope.last_name, facebook_id: $scope.facebookid, avatar: photoUrl+$scope.facebookid };
        Login_Facebook.save(data, successPostCallback, errorCallback);
        
        alert('Good to see you, ' + response.name + ':' + response.email);
        $scope.isAuthenticated = true;
        $scope.loginType = 'FB';

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


  $scope.doLogoutFacebook = function(){
    Facebook.logout(function(response){
      $scope.isAuthenticated = false;
      $scope.loginType = '';
    });
  };




  $scope.doLogout = function(){
    if($scope.loginType==='FB'){
      $scope.doLogoutFacebook();
    }
    // if($scope.loginType="TW"){

    // }
    // if($scope.loginType="COMMON"){

    // }  
  };


}]);




