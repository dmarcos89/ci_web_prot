'use strict';

angular.module('Security',['facebook']);


angular.module('Security').config(['FacebookProvider', function(FacebookProvider) {
        FacebookProvider.init('494836457286098');
        
        // OAuthProvider.setPublicKey('wQumgTM0FsHymnnG7nBJk1yIiVQ');

      
        // OAuthProvider.setHandler('twitter', function (OAuthData) {
        //   alert(OAuthData.result.access_token);
        // });



      }]);

angular.module('Security').controller('LoginController', ['$scope', '$rootScope', 'Facebook', 'Login_Common', 'Login_Facebook', 'Login_Twitter', 'Register_Common', '$cookies', '$location', function($scope, $rootScope, Facebook, Login_Common, Login_Facebook, Login_Twitter, Register_Common, $cookies, $location){


 
  // $scope.isAuthenticated = '';
  // $scope.username = '';
  // $scope.userid = '';


  $rootScope.isAuthenticated = '';
  $rootScope.username = '';
  $rootScope.userid = '';
  $rootScope.userjson = '';

   $rootScope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };

  angular.element(document).ready(function () {
        $scope.checkLogin();
      });

  $scope.checkLogin = function(){
    
    //Primero chequeamos las cookies del navegador para ver si hay algun usuario logueado, y en caso positivo ver que tipo es
    var cookieLoginType = $cookies.loginType;
    var cookieUser = $cookies.username;
    var cookieId = $cookies.userid;
    var cookiejson = $cookies.userjson;


    if(cookieLoginType === 'COMMON'){
      updateLoginVars(true,'COMMON',cookieUser,cookieId, cookiejson);
    }

    if(cookieLoginType === 'FB'){
      updateLoginVars(true,'FB',cookieUser,cookieId, cookiejson);
    }

    if(cookieLoginType === 'TW'){
      updateLoginVars(true,'TW',cookieUser,cookieId, cookiejson);
    }
  };

  $scope.doLoginCommon = function(){
    console.log("probando login");

      var data = {email: $scope.login_email, password: $scope.login_password};
      Login_Common.save(data, successPostCallback, errorCallback);

      

    function successPostCallback(data){
        alert('login MANUAL ok');
        var r = JSON.stringify(data);
        alert(r);
        var name = data['first_name'];
        var id = data['id'];
        updateLoginVars(true,'COMMON',name, id, data);

        
        // Cerramos el login modal a mano
        $("#myModal").modal('toggle');


        $location.path('/dashboard');


      }
    function errorCallback(getResponseHeaders){
        alert('error al hacer login MANUAL');
        var r = JSON.stringify(getResponseHeaders);
        alert(r);
        alert(getResponseHeaders['data']);
      }

  };




  $scope.doRegisterCommon = function(){
    
      var data = {username: $scope.reg_first_name+" "+$scope.reg_last_name, email: $scope.reg_email, first_name: $scope.reg_first_name, last_name: $scope.reg_last_name, password: $scope.reg_password, city:"Ciudad", country:"Pais"};
      Register_Common.save(data, successPostCallback, errorCallback);


      // ---------------------------
      // ESTO ES PARA PROBAR EL REGISTRO CON FACEBOOK PERO DE FORMA MANUAL LOCALMENTE
      // data = {username: 'facebook manual', email: 'face@book.com', first_name: 'facebook', last_name: 'manual', facebook_id: 'da736732864kjahsd', avatar:'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xpf1/t1.0-1/c13.0.50.50/p50x50/10376166_10152166623504436_3969573622742641215_n.jpg'};
      // Login_Facebook.save(data, successPostCallback, errorCallback);
      // ------------------------




      function successPostCallback(data){
        alert('registro MANUAL ok');
        var r = JSON.stringify(data);
        // alert(r);
        // alert(data['id'])
        var id = data['id'];
        updateLoginVars(true,'COMMON',$scope.reg_first_name,id, data);

        // Cerramos el register modal a mano
        $('#myModal2').modal('toggle');

        // Luego de registrar al usuario, lo enviamos a su dashboard
        $location.path('/dashboard');
       
      }
      function errorCallback(getResponseHeaders){
        alert('error al hacer registro MANUAL');
        alert(getResponseHeaders['data']);
      }

    };


  $scope.doLoginFacebook = function(){
    if(Facebook.isReady()){
      Facebook.login(function(response) {
      if (response.status === 'connected') {
        $scope.status = 'yes';
        console.log(response);
        // alert('permisos aceptados por el usaurio...');
        // $scope.isAuthenticated = true;
        $scope.me();
      } else {
        $scope.status = 'no';
        alert('el usuario no acepta los permisos de facebook...');
      }

    }, {scope: 'email'} );
      
    
    }

  };

  $scope.me = function() {
    Facebook.api('/me', function(response) {
      $scope.$apply(function() {
        // Here you could re-check for user status (just in case)
        console.log("entro al me");
        console.log(response);
        $scope.user = response;
        $scope.facebookid = response.id;
        $scope.fullname = response.name;
        $scope.username = response.first_name;
        $scope.lastname = response.last_name;
        $scope.email = response.email;
        $scope.gender = response.gender;
        $scope.locale = response.locale;
        alert('Good to see you, ' + response.name + ':' + response.email);
        var photoUrl = 'http://graph.facebook.com/';
        var data = {username: $scope.fullname, email: $scope.email, first_name: $scope.first_name, last_name: $scope.last_name, facebook_id: $scope.facebookid, avatar: photoUrl+$scope.facebookid };
        Login_Facebook.save(data, successPostCallback, errorCallback);

        function successPostCallback(data){
          alert("login ok con fb");
          var r = JSON.stringify(data);
          alert(r);
          var id = data['id'];
          updateLoginVars(true,'FB',$scope.fullname,id, data);
        }
        function errorCallback(getResponseHeaders){
          alert("login error al login con fb");
          var r = JSON.stringify(getResponseHeaders);
          alert(r);
        }

      });
    });
  };


  $scope.doLogoutFacebook = function(){
    Facebook.logout(function(response){
      updateLoginVars(false,'','','','');
    });
  };



  $scope.doLogout = function(){
    if($scope.loginType==='FB'){
      $scope.doLogoutFacebook();
    }
    // if($scope.loginType="TW"){

    // }
    if($scope.loginType === 'COMMON'){
      //Actualizo variables
      updateLoginVars(false,'','','','');
    }

    if($scope.loginType === 'TW'){
      
      updateLoginVars(false,'','','','');
    }

    $location.path('/home');

  };


  function updateLoginVars(isAuthenticated, loginType, username, userid, json){
      $rootScope.isAuthenticated = isAuthenticated;
      $rootScope.loginType = loginType;
      $rootScope.username = username;
      $rootScope.userid = userid;
      $rootScope.userjson = json;
      //Actualizo cookies
      $cookies.isAuthenticated = isAuthenticated;
      $cookies.loginType = loginType;
      $cookies.username = username;
      $cookies.userid = userid;
      $cookies.userjson = json;
    }



  $scope.doLoginTwitter = function(){
   hello.login('twitter', {
        scope: 'email',
        display: 'popup'
      }, function(auth, status) {

          hello( 'twitter' ).api('me').success(function(json){
            updateLoginVars(true,'TW',json.name);

            alert('Your name is '+ json.name);
            var data = {username: json.name, email: "email", first_name: "nombre", last_name: "apellido", facebook_id: $scope.facebookid, avatar: photoUrl+$scope.facebookid };
            Login_Twitter.save(data, successPostCallback, errorCallback);
            
          }).error(function(){
            alert('Whoops! Error Login Twitter');
          });

        });
  };




}]);






