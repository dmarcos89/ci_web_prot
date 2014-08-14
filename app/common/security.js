'use strict';

angular.module('Security',['facebook']);


angular.module('Security').config(['FacebookProvider', function(FacebookProvider) {
        FacebookProvider.init('494836457286098');
        
        // OAuthProvider.setPublicKey('wQumgTM0FsHymnnG7nBJk1yIiVQ');

      
        // OAuthProvider.setHandler('twitter', function (OAuthData) {
        //   alert(OAuthData.result.access_token);
        // });



      }]);

angular.module('Security').controller('LoginController', ['$scope', 'Facebook', 'Login_Common', 'Login_Facebook', 'Login_Twitter', 'Register_Common', '$cookies',function($scope, Facebook, Login_Common, Login_Facebook, Login_Twitter, Register_Common, $cookies){


 
  $scope.isAuthenticated = '';
  $scope.username = '';


  angular.element(document).ready(function () {
        $scope.checkLogin();
      });

  $scope.checkLogin = function(){
    
    //Primero chequeamos las cookies del navegador para ver si hay algun usuario logueado, y en caso positivo ver que tipo es
    var cookieLoginType = $cookies.loginType;
    var cookieUser = $cookies.username;


    if(cookieLoginType === 'COMMON'){
      // $scope.isAuthenticated = true;
      // $scope.username = cookieUser;
      // $scope.loginType = 'COMMON';
      updateLoginVars(true,'COMMON',cookieUser);
    }

    if(cookieLoginType === 'FB'){
      // $scope.getLoginStatus();
      // $scope.isAuthenticated = true;
      // $scope.username = cookieUser;
      // $scope.loginType = 'FB';
      updateLoginVars(true,'FB',cookieUser);
    }

    if(cookieLoginType === 'TW'){
      // $scope.getLoginStatus();
      // $scope.isAuthenticated = true;
      // $scope.username = cookieUser;
      // $scope.loginType = 'FB';
      updateLoginVars(true,'TW',cookieUser);
    }
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
          $scope.loginType = 'FB';
          $scope.isAuthenticated = true;
          $cookies.loginType = 'FB';
          $cookies.isAuthenticated = true;


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

      
    function successPostCallback(){
        alert('login MANUAL ok');
        updateLoginVars(true,'COMMON','Nombre del user');

      }
    function errorCallback(){
      alert('error al hacer login MANUAL');
      }

  };




  $scope.doRegisterCommon = function(){
    
      data = {username: $scope.reg_first_name+" "+$scope.reg_last_name, email: $scope.reg_email, first_name: $scope.reg_first_name, last_name: $scope.reg_last_name, password: $scope.reg_password, city:"Ciudad", country:"Pais"};
      Register_Common.save(data, successPostCallback, errorCallback);


      // ---------------------------
      // ESTO ES PARA PROBAR EL REGISTRO CON FACEBOOK PERO DE FORMA MANUAL LOCALMENTE
      // data = {username: 'facebook manual', email: 'face@book.com', first_name: 'facebook', last_name: 'manual', facebook_id: 'da736732864kjahsd', avatar:'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xpf1/t1.0-1/c13.0.50.50/p50x50/10376166_10152166623504436_3969573622742641215_n.jpg'};
      // Login_Facebook.save(data, successPostCallback, errorCallback);
      // ------------------------




      function successPostCallback(){
        alert('registro MANUAL ok');
        updateLoginVars(true,'COMMON',$scope.reg_first_name+" "+$scope.reg_last_name);
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
        alert('Good to see you, ' + $scope.username + ':' + $scope.lastname);

        var photoUrl = 'http://graph.facebook.com/';
        data = {username: $scope.fullname, email: $scope.email, first_name: $scope.first_name, last_name: $scope.last_name, facebook_id: $scope.facebookid, avatar: photoUrl+$scope.facebookid };
        Login_Facebook.save(data, successPostCallback, errorCallback);
        
        
        // $scope.isAuthenticated = true;
        // $scope.loginType = 'FB';
        // $scope.username = $scope.fullname;
        // $cookies.isAuthenticated = true;
        // $cookies.loginType = 'FB';
        // $cookies.username = $scope.fullname;
        updateLoginVars(true,'FB',$scope.fullname);

      } else {
        $scope.status = 'no';
        // alert('el usuario no acepta los permisos de facebook...');
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
      //Actualizo variables
      // $scope.isAuthenticated = false;
      // $scope.loginType = '';
      // $scope.username = '';
      // //Actualizo cookies
      // $cookies.isAuthenticated = false;
      // $cookies.loginType = '';
      // $cookies.username = '';
      updateLoginVars(false,'','');
    });
  };


// OauthProvider.setHandler = function ("twitter", logtwitter) {}

// function logtwitter(){
//   alert ("logueado?");
// }





  $scope.doLogout = function(){
    if($scope.loginType==='FB'){
      $scope.doLogoutFacebook();
    }
    // if($scope.loginType="TW"){

    // }
    if($scope.loginType === 'COMMON'){
      //Actualizo variables
      updateLoginVars(false,'','');
    }

    if($scope.loginType === 'TW'){
      
      updateLoginVars(false,'','');
    }
  };


  // // Retrieving a cookie
  //   var favoriteCookie = $cookies.myFavorite;
  //   // Setting a cookie
  //   $cookies.myFavorite = 'oatmeal';


  function updateLoginVars(isAuthenticated, loginType, username){
      $scope.isAuthenticated = isAuthenticated;
      $scope.loginType = loginType;
      $scope.username = username;
      //Actualizo cookies
      $cookies.isAuthenticated = isAuthenticated;
      $cookies.loginType = loginType;
      $cookies.username = username;
    }



  $scope.doLoginTwitter = function(){
    // alert("DSA");
    // hello( 'twitter', []).login( function(){
    //   alert('You are signed in to Twitter');
    // });
    hello.login('twitter', {
        scope: 'email',
        display: 'popup'
      }, function(auth, status) {

          hello( 'twitter' ).api('me').success(function(json){
            updateLoginVars(true,'TW',json.name);

            alert('Your name is '+ json.name);
            data = {username: json.name, email: "email", first_name: "nombre", last_name: "apellido", facebook_id: $scope.facebookid, avatar: photoUrl+$scope.facebookid };
            Login_Twitter.save(data, successPostCallback, errorCallback);
            
          }).error(function(){
            alert('Whoops! Error Login Twitter');
          });

        });


  };

}]);




